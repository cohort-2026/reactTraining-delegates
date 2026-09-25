import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../schemas/signup";
import type { SignupInput } from "../schemas/signup";

const inputClass =
  "rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 aria-invalid:border-red-600 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100";
const errorClass = "text-sm text-red-700 dark:text-red-400";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function SignupForm() {
  const [joinedName, setJoinedName] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "", teamSize: 1 },
  });

  async function onSubmit(values: SignupInput) {
    await wait(300); // pretend to call an API
    setJoinedName(values.name);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4">
      <div className="grid gap-1">
        <label htmlFor="name" className="font-medium">Name</label>
        <input id="name" {...register("name")} className={inputClass}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined} />
        {errors.name && (
          <p id="name-error" role="alert" className={errorClass}>{errors.name.message}</p>
        )}
      </div>

      <div className="grid gap-1">
        <label htmlFor="email" className="font-medium">Email</label>
        <input id="email" type="email" {...register("email")} className={inputClass}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined} />
        {errors.email && (
          <p id="email-error" role="alert" className={errorClass}>{errors.email.message}</p>
        )}
      </div>

      <div className="grid gap-1">
        <label htmlFor="password" className="font-medium">Password</label>
        <input id="password" type="password" {...register("password")} className={inputClass}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "password-error" : undefined} />
        {errors.password && (
          <p id="password-error" role="alert" className={errorClass}>{errors.password.message}</p>
        )}
      </div>

      <div className="grid gap-1">
        <label htmlFor="teamSize" className="font-medium">Team size</label>
        <input id="teamSize" type="number" {...register("teamSize")} className={inputClass}
          aria-invalid={!!errors.teamSize}
          aria-describedby={errors.teamSize ? "teamSize-error" : undefined} />
        {errors.teamSize && (
          <p id="teamSize-error" role="alert" className={errorClass}>{errors.teamSize.message}</p>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}
        className="rounded-md bg-cyan-700 px-4 py-2 font-semibold text-white hover:bg-cyan-800 disabled:opacity-60">
        {isSubmitting ? "Joining..." : "Join the beta"}
      </button>

      {joinedName && (
        <p role="status" className="text-emerald-700 dark:text-emerald-400">
          Thanks, {joinedName}! Check your inbox to confirm.
        </p>
      )}
    </form>
  );
}
