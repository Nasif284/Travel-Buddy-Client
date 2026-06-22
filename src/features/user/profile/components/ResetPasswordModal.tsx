import { useAuthStore } from "@/src/store/auth.store";
import { useState } from "react";
import { useResetPassword } from "../hooks/profile.hooks";

export default function ResetPasswordModal({ onClose }: { onClose: () => void }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const user = useAuthStore((state) => state.user);

  const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword;
  const reset = useResetPassword();

  const handleSubmit = async () => {
    if (!passwordsMatch) return;
    if (!user) {
      return;
    }
    reset.mutate({ email: user.email!, password: newPassword });
    onClose();
  };

  return (
    <div
      className="
        fixed inset-0 z-[999]
        bg-black/40 backdrop-blur-sm
        flex items-center justify-center
        p-4
      "
    >
      <div
        className="
          w-full max-w-lg
          bg-white
          rounded-3xl
          overflow-hidden
          shadow-2xl
        "
      >
        <div className="p-8 border-b border-[#bec9c3]/10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black font-headline">Reset Password</h2>

            <button onClick={onClose} className="text-[#3f4944] hover:text-black">
              ✕
            </button>
          </div>

          <p className="text-sm text-[#3f4944] mt-2">Choose a strong password to keep your account secure.</p>
        </div>

        <div className="p-8 space-y-5">
          <div>
            <label className="block text-xs font-bold mb-2">New Password</label>

            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="
                w-full h-12
                rounded-xl
                bg-[#f1f4f1]
                px-4
                outline-none
              "
            />
          </div>

          <div>
            <label className="block text-xs font-bold mb-2">Confirm Password</label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="
                w-full h-12
                rounded-xl
                bg-[#f1f4f1]
                px-4
                outline-none
              "
            />
          </div>

          {confirmPassword && !passwordsMatch && <p className="text-sm text-red-500">Passwords do not match.</p>}
        </div>

        <div className="p-6 bg-[#f8faf8] flex justify-end gap-3">
          <button
            onClick={onClose}
            className="
              px-5 py-2
              rounded-xl
              border border-[#bec9c3]/30
              font-semibold
            "
          >
            Cancel
          </button>

          <button
            disabled={!newPassword || !passwordsMatch}
            onClick={handleSubmit}
            className="
              px-6 py-2
              rounded-xl
              bg-[#0f6e56]
              text-white
              font-bold
              disabled:opacity-40
            "
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}
