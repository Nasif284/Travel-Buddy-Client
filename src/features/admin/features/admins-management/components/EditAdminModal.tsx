import { AdminAccount, icons, ROLE_BADGE_CLASS, ROLE_INFO } from "../interfaces/interfaces";
import PasswordField from "./PasswordField";
import RoleCard from "./RoleCard";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Icon from "./Icon";
import { getInitials } from "../pages/AdminsListingPage";
import { EditAdminFormData, EditAdminSchema } from "../validators/validators";
import { useEditAdmin } from "../hooks/hooks";

const SUSPENSION_REASONS = ["No longer employed", "Security concern", "Temporary leave", "Policy violation", "Other"];
export default function EditAdminModal({ admin, onClose }: { admin: AdminAccount; onClose: () => void }) {
  const edit = useEditAdmin();
  const {
    control,
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditAdminFormData>({
    resolver: zodResolver(EditAdminSchema),

    defaultValues: {
      role: admin.role,
      status: {
        statusCode: admin.status,
        reason: "",
      },
      password: "",
      confirmPassword: "",
    },
  });

  if (!admin) return null;

  const selectedRole = watch("role");
  const selectedStatus = watch("status.statusCode");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const onSubmit = (data: EditAdminFormData) => {
    if (!admin) return;
    let payload;
    if (data.status?.statusCode == "Active") {
      payload = {
        role: data.role !== admin.role ? data.role : "",
        status: {
          statusCode: data.status?.statusCode !== admin.status ? data.status?.statusCode!.toLowerCase() : "",
          reason: data.status?.reason || undefined,
        },
        password: data.password || undefined,
      };
    } else {
      payload = {
        role: "",
        status: {
          statusCode: data.status?.statusCode !== admin.status ? data.status?.statusCode!.toLowerCase() : "",
          reason: data.status?.reason || undefined,
        },
        password: undefined,
      };
    }

    edit.mutate(
      { data: payload, id: admin.id },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="fixed inset-0 z-50 flex items-center justify-center bg-[#1c1c1a]/40 p-6 backdrop-blur-sm">
      <div className="relative flex max-h-[90vh] w-full max-w-[600px] flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
        {/* Header */}
        <header className="relative flex flex-col px-8 pb-6 pt-8">
          <button type="button" onClick={onClose} className="absolute right-6 top-6 text-stone-400 transition-colors hover:text-stone-700">
            <Icon path={icons.close} className="h-6 w-6" />
          </button>

          <h1 className="text-[20px] font-bold tracking-tight text-stone-900">Edit admin</h1>

          <p className="mt-1 text-sm text-stone-500">Manage role, status and credentials for this admin account.</p>

          <div className="mt-6 flex items-center rounded-lg bg-stone-50 p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#005440] to-[#0f6e56] text-sm font-bold text-white">{getInitials(admin.name)}</div>

            <div className="ml-3 flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-stone-900">{admin.name}</span>

                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${ROLE_BADGE_CLASS[admin.role]}`}>{admin.role}</span>
              </div>

              <span className="text-xs text-stone-500">{admin.email}</span>
            </div>
          </div>
        </header>

        <div className="mx-8 h-px bg-stone-200/60" />

        {/* Scrollable */}
        <div className="flex-1 space-y-8 overflow-y-auto px-8 py-6">
          {/* ROLE */}
          {selectedStatus == "Active" && (
            <section className="space-y-4">
              <label className="text-[12px] font-bold uppercase tracking-widest text-stone-500">Administrative role</label>

              <Controller
                control={control}
                name="role"
                render={({ field }) => (
                  <div className="grid grid-cols-3 gap-3">
                    {ROLE_INFO.map((role) => (
                      <RoleCard key={role.label} role={role.label} icon={role.icon} description={role.description} selected={field.value === role.label} onSelect={() => field.onChange(role.label)} />
                    ))}
                  </div>
                )}
              />

              {errors.role && <p className="text-xs font-medium text-red-600">{errors.role.message}</p>}
            </section>
          )}

          <div className="h-px bg-stone-200/60" />

          {/* STATUS */}

          <section className="space-y-4">
            <label className="text-[12px] font-bold uppercase tracking-widest text-stone-500">Account status</label>

            <Controller
              control={control}
              name="status.statusCode"
              render={({ field }) => (
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      value: "active",
                      label: "Active",
                      icon: null,
                      dot: "bg-green-500",
                      desc: "Full access enabled.",
                    },
                    {
                      value: "suspended",
                      label: "Suspended",
                      icon: icons.info,
                      dot: null,
                      desc: "Temporarily restricts login.",
                    },
                    {
                      value: "deactivated",
                      label: "Deactivated",
                      icon: icons.close,
                      dot: null,
                      desc: "Disables account fully.",
                    },
                  ].map((status) => (
                    <label key={status.value} className={`relative flex cursor-pointer flex-col rounded-lg p-4 transition-all ${field.value === status.label ? "border-2 border-[#0f6e56] bg-emerald-50/40 shadow-sm" : "border border-stone-200 bg-stone-50 hover:border-stone-300"}`}>
                      <input type="radio" checked={field.value === status.label} onChange={() => field.onChange(status.label)} className="absolute right-3 top-3 h-4 w-4 border-stone-300 text-[#0f6e56] focus:ring-[#0f6e56]" />

                      <div className="mb-3 flex items-center">{status.dot ? <span className={`h-2.5 w-2.5 rounded-full ${status.dot}`} /> : <Icon path={status.icon!} className={`h-5 w-5 ${status.value === "suspended" ? "text-amber-500" : "text-stone-400"}`} />}</div>

                      <span className="text-sm font-bold text-stone-900">{status.label}</span>

                      <span className="mt-1 text-[11px] leading-tight text-stone-500">{status.desc}</span>
                    </label>
                  ))}
                </div>
              )}
            />

            {errors.status?.statusCode && <p className="text-xs font-medium text-red-600">{errors.status.statusCode.message}</p>}

            {selectedStatus === "Suspended" && (
              <div className="space-y-2 pt-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-stone-500">Reason for suspension</label>

                <select {...register("status.reason")} className="w-full rounded-lg border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 focus:border-[#0f6e56] focus:ring-0">
                  <option value="">Select a reason...</option>

                  {SUSPENSION_REASONS.map((reason) => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>

                {errors.status?.reason && <p className="text-xs font-medium text-red-600">{errors.status.reason.message}</p>}
              </div>
            )}

            {selectedStatus !== "Active" && (
              <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3">
                <Icon path={icons.info} className="mt-0.5 h-[18px] w-[18px] shrink-0 text-amber-600" />

                <p className="text-[11px] font-medium text-amber-800">Status change takes effect immediately. The admin will be notified by email of the account status update.</p>
              </div>
            )}
          </section>

          <div className="h-px bg-stone-200/60" />

          {/* RESET PASSWORD */}
          {selectedStatus == "Active" && (
            <section className="space-y-4">
              <label className="text-[12px] font-bold uppercase tracking-widest text-stone-500">Reset password</label>

              <div className="grid grid-cols-2 gap-4">
                <Controller control={control} name="password" render={({ field }) => <PasswordField label="New password" value={field.value ?? ""} onChange={field.onChange} />} />

                <Controller control={control} name="confirmPassword" render={({ field }) => <PasswordField label="Confirm new password" value={field.value ?? ""} onChange={field.onChange} />} />

                {errors.password && <p className="-mt-4 text-xs text-red-500">{errors.password.message}</p>}
                {errors.confirmPassword && <p className="-mt-4 text-xs text-red-500">{errors.confirmPassword.message}</p>}
              </div>
            </section>
          )}
        </div>

        {/* Footer */}

        <footer className="flex items-center justify-between border-t border-stone-200/60 bg-white px-8 py-6">
          <button type="button" onClick={onClose} className="px-6 py-2 text-sm font-bold text-stone-500 transition-colors hover:text-stone-800">
            Cancel
          </button>

          <button type="submit" disabled={isSubmitting} className="h-[48px] w-[160px] rounded-xl bg-gradient-to-br from-[#005440] to-[#0f6e56] px-10 text-sm font-bold text-white shadow-lg transition-all hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40">
            {isSubmitting ? "Saving..." : "Save changes"}
          </button>
        </footer>
      </div>
    </form>
  );
}
