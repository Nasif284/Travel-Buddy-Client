"use client";

import { useForm } from "react-hook-form";
import PasswordField from "../components/PasswordField";
import { useRegister } from "@/src/features/user/auth/hooks/auth.hooks";
import { RegisterFormData, RegisterSchema } from "../validators/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";


const SignUpPage = () => {
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate({
      fullName: data.fullName,

      email: data.email,

      password: data.password,
    });
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>

      <div>
        <label htmlFor="fullName" className="block text-sm font-semibold mb-2 text-[#3f4944]">
          Full name
        </label>

        <input
          id="fullName"
          type="text"
          autoComplete="name"
          placeholder="John Doe"
          {...register("fullName", {
            required: "Full name is required",
          })}
          className="w-full h-12 px-4 rounded-xl bg-[#e0e3e0] border-none focus:ring-2 focus:ring-[#005440] focus:bg-white transition-all text-[#181d1a] placeholder:text-[#6f7a74]/60 outline-none"
        />

        {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold mb-2 text-[#3f4944]">
          Email
        </label>

        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="name@example.com"
          {...register("email", {
            required: "Email is required",
          })}
          className="w-full h-12 px-4 rounded-xl bg-[#e0e3e0] border-none focus:ring-2 focus:ring-[#005440] focus:bg-white transition-all text-[#181d1a] placeholder:text-[#6f7a74]/60 outline-none"
        />

        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
      </div>


      <div className="grid grid-cols-2 gap-4">
        <PasswordField<RegisterFormData>
          id="password"
          label="Password"
          placeholder="••••••••"
          register={register}
          error={errors.password?.message}
        />

        <PasswordField<RegisterFormData>
          id="confirmPassword"
          label="Confirm password"
          placeholder="••••••••"
          register={register}
          error={errors.confirmPassword?.message}
        />
      </div>

      <div className="pt-4">
        <button type="submit" disabled={registerMutation.isPending} className="w-full h-12 bg-[#0f6e56] text-white font-bold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center text-lg disabled:opacity-50">
          {registerMutation.isPending ? "Creating..." : "Create account"}
        </button>
      </div>
    </form>
  );
};

export default SignUpPage;
