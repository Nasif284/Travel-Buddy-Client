import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import CapabilitiesPreview from "./CapabilitiesPreview";
import Icon from "./Icon";
import PasswordField from "./PasswordField";
import RoleCard from "./RoleCard";

import { icons, Role, ROLE_INFO } from "../interfaces/interfaces";
import { CreateAdminFormData, CreateAdminSchema } from "../validators/validators";
import { useCreateAdmin } from "../hooks/hooks";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreateAdminModal({ open, onClose }: Props) {
  const create = useCreateAdmin();

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<CreateAdminFormData>({
    resolver: zodResolver(CreateAdminSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      role: "Super Admin",
    },
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  if (!open) return null;

  const role = watch("role");

  const submit = (data: CreateAdminFormData) => {
      create.mutate(data, {
          onSuccess: () => {
              onClose()
        }
    })
    reset();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1c1c1a]/40 backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center p-6">
        <div className="bg-white w-full max-w-[720px] max-h-[90vh] rounded-xl shadow-2xl border border-stone-200/60 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex-shrink-0 px-8 pt-8 pb-6 border-b border-stone-200/60 flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-extrabold text-stone-900">Create a new admin</h3>

              <p className="text-sm text-stone-500 mt-2">Grant access to internal tools.</p>
            </div>

            <button type="button" onClick={onClose} className="text-stone-400 hover:text-stone-700 transition-colors">
              <Icon path={icons.close} className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit(submit)} className="flex flex-col flex-1 min-h-0">
            {/* Scrollable Body */}
            <div className="flex-1 min-h-0 overflow-y-auto px-8 py-6 space-y-6">
              {/* Full Name */}
              <div>
                <label className="text-sm font-bold uppercase text-stone-900">Full Name</label>

                <input {...register("fullName")} placeholder="Muhammad Nasif" className="mt-2 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0f6e56]" />

                {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-bold uppercase text-stone-900">Email</label>

                <input {...register("email")} placeholder="admin@travelbuddy.com" className="mt-2 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0f6e56]" />

                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <Controller control={control} name="password" render={({ field }) => <PasswordField label="Password" value={field.value} onChange={field.onChange} />} />

              {errors.password && <p className="-mt-4 text-xs text-red-500">{errors.password.message}</p>}

              {/* Role */}
              <div>
                <label className="text-sm font-bold uppercase text-stone-900">Role</label>

                <Controller
                  control={control}
                  name="role"
                  render={({ field }) => (
                    <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                      {ROLE_INFO.map((r) => (
                        <RoleCard key={r.label} role={r.label} icon={r.icon} description={r.description} selected={field.value === r.label} onSelect={() => field.onChange(r.label)} />
                      ))}
                    </div>
                  )}
                />

                {errors.role && <p className="mt-2 text-xs text-red-500">{errors.role.message}</p>}
              </div>

              <CapabilitiesPreview role={role as Role} />
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 border-t border-stone-200 bg-stone-50 px-8 py-6 flex justify-end gap-4">
              <button type="button" onClick={onClose} className="rounded-xl px-6 py-3 text-stone-600 hover:bg-stone-100 transition-colors">
                Cancel
              </button>

              <button type="submit" disabled={!isValid || isSubmitting} className="rounded-xl bg-[#0f6e56] px-8 py-3 font-semibold text-white transition-all disabled:opacity-40">
                {isSubmitting ? "Creating..." : "Create Admin"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
