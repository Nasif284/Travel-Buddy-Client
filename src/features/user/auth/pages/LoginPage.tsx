"use client";

import Link from "next/link";

import { useForm } from "react-hook-form";

import PasswordField from "../components/PasswordField";

import { useLogin } from "@/src/features/user/auth/hooks/auth.hooks";
import { LoginFormData, loginSchema } from "../validators/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const login = useLogin();

  const {
    register,

    handleSubmit,

    formState: { errors },
  } = useForm<LoginFormData>({
     resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    
  });

  const onSubmit = (data: LoginFormValues) => {
    login.mutate(data);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label htmlFor="email" className="block text-sm font-semibold mb-2 text-[#3f4944]">
          Email Address
        </label>

        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          {...register("email", {
            required: "Email is required",
          })}
          className="w-full h-12 px-4 rounded-xl bg-[#e0e3e0]"
        />

        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
      </div>

      <PasswordField id="password" label="Password" placeholder="••••••••" register={register} error={errors.password?.message} />

      <Link href="/forgot-password" className="text-xs font-bold text-[#005440] hover:underline">
        Forgot password?
      </Link>

      <div className="pt-4">
        <button type="submit" className="w-full h-12 bg-[#0f6e56] text-white font-bold rounded-xl">
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginPage;
