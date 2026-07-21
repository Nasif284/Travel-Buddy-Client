"use client";

import { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CategoryCode, CreateExpenseRequestDTO, ExpenseModalProps, ExpenseParticipantDTO, ExpenseResponseDTO, SplitCode } from "../interface/interface";
import { CATEGORY_CONFIG } from "../pages/ExpensePage";
import { ExpenseFormValues, expenseSchema } from "../validators/validators";
import SplitPreview from "./SplitPreview";
import { Member } from "../../members/interfaces/interfaces";
import { useCreateExpense, useUpdateExpense } from "../hooks/hooks";

export const Icons = {
  calendar: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  close: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  check: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  save: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  ),
  equal: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="9" x2="19" y2="9" />
      <line x1="5" y1="15" x2="19" y2="15" />
    </svg>
  ),
  percent: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="5" x2="5" y2="19" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
  ),
  editIcon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  sharesIcon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  ),
};

const SPLIT_METHODS: { code: SplitCode; label: string; icon: React.ReactNode }[] = [
  { code: "EQUAL", label: "Equal", icon: Icons.equal },
  { code: "PERCENTAGE", label: "Percentage", icon: Icons.percent },
  { code: "CUSTOM", label: "Custom", icon: Icons.editIcon },
  { code: "SHARES", label: "Shares", icon: Icons.sharesIcon },
];

function formatAmount(n: number): string {
  return `₹${n.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}
export default function ExpenseModal({ id, mode, initial, onClose, members, expenseId }: ExpenseModalProps) {
  const memberById = Object.fromEntries(members.map((m) => [m.id, m]));

  function buildDefaultParticipants(splitMethod: string): { memberId: string; value: string }[] {
    const defaultVal = splitMethod === "SHARES" ? "1" : splitMethod === "PERCENTAGE" ? String(Math.round(100 / members.length)) : "0";
    return members.map((m) => ({ memberId: m.id, value: defaultVal }));
  }

  function fromDTO(exp: ExpenseResponseDTO): ExpenseFormValues {
    return {
      title: exp.title,
      amount: String(exp.amount),
      category: exp.category.code,
      paidById: exp.paidBy.id,
      splitMethod: exp.splitMethod.code as SplitCode,
      description: exp.description ?? "",
      participants: exp.participants.map((p) => {
        let value = "0";
        if (exp.splitMethod.code === "PERCENTAGE") value = String(p.percentage ?? 0);
        else if (exp.splitMethod.code === "CUSTOM") value = String(p.amount);
        else if (exp.splitMethod.code === "SHARES") value = String(p.shares ?? 1);
        else value = String(p.percentage ?? Math.round(100 / members.length));
        return { memberId: p.memberId, value };
      }),
    };
  }

  const defaultValues: ExpenseFormValues = initial
    ? fromDTO(initial)
    : {
        title: "",
        amount: "",
        category: "OTHERS",
        paidById: "me",
        splitMethod: "EQUAL",
        description: "",
        participants: buildDefaultParticipants("EQUAL"),
      };
  function computeParticipantAmount(method: SplitCode, totalAmount: number, participants: { memberId: string; value: string }[], index: number): string | null {
    const raw = parseFloat(participants[index]?.value || "0") || 0;
    if (totalAmount <= 0) return null;

    if (method === "EQUAL") {
      return formatAmount(totalAmount / participants.length);
    }
    if (method === "PERCENTAGE") {
      const amount = (raw / 100) * totalAmount;
      return raw > 0 ? formatAmount(amount) : null;
    }
    if (method === "CUSTOM") {
      return raw > 0 ? formatAmount(raw) : null;
    }
    if (method === "SHARES") {
      const totalShares = participants.reduce((a, p) => a + (parseFloat(p.value) || 0), 0);
      if (totalShares <= 0 || raw <= 0) return null;
      return formatAmount((raw / totalShares) * totalAmount);
    }
    return null;
  }
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields } = useFieldArray({ control, name: "participants" });

  const watchedAmount = watch("amount");
  const watchedMethod = watch("splitMethod") as SplitCode;
  const watchedParticipants = watch("participants");
  const watchedPaidById = watch("paidById");
  const watchedCategory = watch("category") as CategoryCode;

  const totalAmount = parseFloat(watchedAmount) || 0;

  useEffect(() => {
    const defaults = buildDefaultParticipants(watchedMethod);
    defaults.forEach((d, i) => {
      setValue(`participants.${i}.value`, d.value, { shouldValidate: false });
    });
  }, [watchedMethod]);

  // ── Submit ───────────────────────────────────────────────────────────────
  const add = useCreateExpense();
  const edit = useUpdateExpense();
  function onSubmit(values: ExpenseFormValues) {
    const amt = parseFloat(values.amount);

    const createDTO: CreateExpenseRequestDTO = {
      title: values.title,
      description: values.description || undefined,
      amount: amt,
      categoryCode: values.category,
      splitMethodCode: values.splitMethod,
      paidById: values.paidById,
      participants: values.participants.map((p) => {
        const raw = parseFloat(p.value) || 0;
        const dto: ExpenseParticipantDTO = { memberId: p.memberId };
        if (values.splitMethod === "EQUAL") {
          dto.amount = amt / values.participants.length;
          dto.percentage = 100 / values.participants.length;
          dto.shares = 1;
        } else if (values.splitMethod === "PERCENTAGE") {
          dto.percentage = raw;
          dto.amount = (raw / 100) * amt;
        } else if (values.splitMethod === "CUSTOM") {
          dto.amount = raw;
        } else if (values.splitMethod === "SHARES") {
          const totalShares = values.participants.reduce((a, pp) => a + (parseFloat(pp.value) || 0), 0);
          dto.shares = raw;
          dto.amount = totalShares > 0 ? (raw / totalShares) * amt : 0;
        }
        return dto;
      }),
    };
    if (mode == "add") {
      add.mutate(
        { id, data: createDTO },
        {
          onSuccess: () => {
            onClose();
          },
        },
      );
    } else {
      if (!initial?.id) {
        throw new Error("expense id missing");
      }
      edit.mutate(
        { id, expenseId:initial.id, data: createDTO },
        {
          onSuccess: () => {
            onClose();
          },
        },
      );
    }
  }

  const equalAmount = totalAmount > 0 ? formatAmount(totalAmount / members.length) : null;

  function getParticipantError(index: number): string | undefined {
    return errors.participants?.[index]?.value?.message;
  }
  const participantsGlobalError = errors.participants?.message as string | undefined;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-[640px] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <header className="flex items-center justify-between px-8 pt-8 pb-4">
          <h2 className="text-2xl font-extrabold font-headline tracking-tight text-[#005440]">{mode === "add" ? "Add New Expense" : "Edit Expense"}</h2>
          <button type="button" onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#e5e9e5] transition-colors text-[#3f4944]">
            {Icons.close}
          </button>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-hidden">
          <div className="px-8 py-4 overflow-y-auto [&::-webkit-scrollbar]:hidden space-y-8 pb-8 flex-1">
            {/* ── Amount ─────────────────────────────────────────── */}
            <div className="text-center py-4">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-[#005440] font-headline">₹</span>
                <input {...register("amount")} type="number" min="0" step="any" placeholder="0" className="w-48 text-6xl font-black font-headline text-[#181d1a] border-none focus:ring-0 bg-transparent placeholder:text-[#e0e3e0] text-center outline-none" />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3f4944] mt-2">Enter Amount</p>
              {errors.amount && <p className="text-xs text-[#ba1a1a] mt-1">{errors.amount.message}</p>}
            </div>

            {/* ── Expense name ───────────────────────────────────── */}
            <div className="space-y-2">
              <label className="text-sm font-bold font-headline text-[#005440] uppercase tracking-wide">Expense Name</label>
              <input {...register("title")} type="text" placeholder="e.g., Boat Rental to Nusa Penida" className="w-full h-12 px-4 rounded-xl bg-[#e5e9e5] border-none focus:bg-white focus:ring-2 focus:ring-[#0f6e56]/20 transition-all text-[#181d1a] placeholder:text-[#bec9c3] outline-none text-sm" />
              {errors.title && <p className="text-xs text-[#ba1a1a]">{errors.title.message}</p>}
            </div>

            {/* ── Category ───────────────────────────────────────── */}
            <div className="space-y-3">
              <label className="text-sm font-bold font-headline text-[#005440] uppercase tracking-wide">Category</label>
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(CATEGORY_CONFIG) as CategoryCode[]).map((code) => {
                      const cfg = CATEGORY_CONFIG[code];
                      const active = field.value === code;
                      return (
                        <button
                          key={code}
                          type="button"
                          onClick={() => field.onChange(code)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all
                            ${active ? "bg-[#0f6e56] text-white" : "bg-[#e5e9e5] text-[#3f4944] hover:bg-[#e0e3e0]"}`}
                        >
                          <span className={active ? "text-white" : cfg.text}>{cfg.icon}</span>
                          {cfg.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              />
            </div>

            {/* ── Paid by ────────────────────────────────────────── */}
            <div className="space-y-3">
              <label className="text-sm font-bold font-headline text-[#005440] uppercase tracking-wide">Paid By</label>
              <Controller
                control={control}
                name="paidById"
                render={({ field }) => (
                  <div className="flex items-center gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden pb-2">
                    {members.map((m: Member) => {
                      const selected = field.value === m.id;
                      return (
                        <div
                          key={m.id}
                          onClick={() => field.onChange(m.id)}
                          className={`flex flex-col items-center gap-2 min-w-[72px] cursor-pointer transition-opacity
                            ${selected ? "opacity-100" : "opacity-60 hover:opacity-100"}`}
                        >
                          <div className="relative">
                            <img
                              src={m.avatarUrl!}
                              alt={m.name}
                              className={`w-14 h-14 rounded-full object-cover transition-all
                                ${selected ? "border-4 border-[#005440]" : "grayscale hover:grayscale-0"}`}
                            />
                            {selected && <div className="absolute -bottom-1 -right-1 bg-[#005440] text-white rounded-full p-0.5 border-2 border-white">{Icons.check}</div>}
                          </div>
                          <span className={`text-xs font-bold ${selected ? "text-[#005440]" : "text-[#3f4944]"}`}>{m.name}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              />
            </div>

            {/* ── Split method ───────────────────────────────────── */}
            <div className="space-y-4">
              <label className="text-sm font-bold font-headline text-[#005440] uppercase tracking-wide">Split Method</label>

              <Controller
                control={control}
                name="splitMethod"
                render={({ field }) => (
                  <div className="grid grid-cols-4 p-1.5 bg-[#e5e9e5] rounded-2xl">
                    {SPLIT_METHODS.map((s) => {
                      const active = field.value === s.code;
                      return (
                        <button
                          key={s.code}
                          type="button"
                          onClick={() => field.onChange(s.code)}
                          className={`py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all
                            ${active ? "bg-white shadow-sm text-[#005440] font-bold" : "text-[#3f4944] hover:text-[#005440]"}`}
                        >
                          {s.icon} {s.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              />

              {/* ── Equal: show pre-computed amount ──────────────── */}
              {watchedMethod === "EQUAL" && (
                <div className="space-y-2">
                  {equalAmount && (
                    <p className="text-xs text-[#3f4944] px-1">
                      Each person pays <span className="font-bold text-[#005440]">{equalAmount}</span>
                    </p>
                  )}
                  <div className="grid grid-cols-2 gap-3">
                    {members.map((m: Member) => (
                      <div key={m.id} className="flex items-center gap-3 p-3 rounded-2xl bg-[#f1f4f1]">
                        <img src={m.avatarUrl} alt={m.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-[#3f4944]">{m.name}</p>
                          <p className="text-sm font-black text-[#005440]">{equalAmount ?? "—"}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {watchedMethod !== "EQUAL" && (
                <div className="space-y-3">
                  <SplitPreview method={watchedMethod} totalAmount={totalAmount} participants={watchedParticipants} />

                  <div className="grid grid-cols-2 gap-3">
                    {fields.map((field, index) => {
                      const member = memberById[field.memberId];
                      const computedAmt = computeParticipantAmount(watchedMethod, totalAmount, watchedParticipants, index);
                      const fieldError = getParticipantError(index);

                      const suffix = watchedMethod === "PERCENTAGE" ? "%" : watchedMethod === "SHARES" ? "shares" : "₹";

                      return (
                        <div
                          key={field.id}
                          className={`flex items-center gap-3 p-3 rounded-2xl transition-colors
                            ${fieldError ? "bg-[#ffdad6]/40 ring-1 ring-[#ba1a1a]/30" : "bg-[#e5e9e5]"}`}
                        >
                          <img src={member?.avatarUrl} alt={member?.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-[#3f4944] mb-0.5">{member?.name}</p>
                            <div className="flex items-center gap-1">
                              {watchedMethod === "CUSTOM" && <span className="text-xs font-bold text-[#005440]">₹</span>}
                              <Controller control={control} name={`participants.${index}.value`} render={({ field: f }) => <input {...f} type="number" min="0" step={watchedMethod === "SHARES" ? "1" : "any"} placeholder="0" className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm font-bold text-[#005440] outline-none" />} />
                              {watchedMethod !== "CUSTOM" && <span className="text-xs font-bold text-[#bec9c3] whitespace-nowrap">{suffix}</span>}
                            </div>
                            {/* Live computed amount */}
                            {computedAmt && <p className="text-[10px] font-semibold text-[#3f4944] mt-0.5">= {computedAmt}</p>}
                            {/* Per-field validation error */}
                            {fieldError && <p className="text-[10px] text-[#ba1a1a] mt-0.5">{fieldError}</p>}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Global validation error (sum mismatch) */}
                  {participantsGlobalError && <p className="text-xs text-[#ba1a1a] bg-[#ffdad6]/30 px-3 py-2 rounded-xl">⚠ {participantsGlobalError}</p>}
                </div>
              )}
            </div>
          </div>

          {/* ── Footer ───────────────────────────────────────────── */}
          <footer className="p-8 pt-4 border-t border-[#bec9c3]/10">
            <button type="submit" disabled={isSubmitting} className="w-full h-14 bg-[#005440] text-white font-headline font-bold text-lg rounded-xl active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#005440]/20 hover:bg-[#0f6e56] disabled:opacity-60 disabled:cursor-not-allowed">
              {Icons.save}
              {isSubmitting ? "Saving…" : "Save Expense"}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
