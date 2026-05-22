"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AdminLoginFormData, adminLoginSchema } from "../validations/admin.auth.validations";
import { useAdminLogin } from "../hooks/admin-auth.hooks";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const adminLogin = useAdminLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginFormData>({
    resolver: zodResolver(adminLoginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data: AdminLoginFormData) => {
    adminLogin.mutate(data);
  };
  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#3f4944]">
            Email Address
          </label>
          <input id="email" type="email" placeholder="admin@travelbuddy.com" autoComplete="email" {...register("email")} className="w-full h-12 px-4 bg-[#f6f3ef] border-none rounded-xl text-[#1c1c1a] placeholder:text-[#6f7a74] focus:ring-2 focus:ring-[#005440] transition-all outline-none" /> {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-[#3f4944]">
            Password
          </label>
          <div className="relative">
            <input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" autoComplete="current-password" {...register("password")} className="w-full h-12 px-4 pr-12 bg-[#f6f3ef] border-none rounded-xl text-[#1c1c1a] placeholder:text-[#6f7a74] focus:ring-2 focus:ring-[#005440] transition-all outline-none" />{" "}
            <button type="button" onClick={() => setShowPassword((v) => !v)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#bec9c3] hover:text-[#1c1c1a] transition-colors">
              {showPassword ? (
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 0 0 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                </svg>
              )}
            </button>
          </div>
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={adminLogin.isPending}
        className="w-full h-12 text-white font-bold rounded-xl shadow-lg active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        style={{
          background: "linear-gradient(135deg, #005440 0%, #0f6e56 100%)",
        }}
      >
        {adminLogin.isPending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
};

export default LoginForm;
