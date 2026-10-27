import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import Field, { inputStyle } from "../../../shared/components/Field";
import { EMAIL_RE } from "../../../shared/utils/validation";
import AuthLayout from "../components/AuthLayout";
import AuthSubmit from "../components/AuthSubmit";
import PasswordField from "../components/PasswordField";
import { clearError, registerUser } from "../authSlice";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((s) => s.auth);
  const { register, handleSubmit, getValues, formState: { errors } } = useForm({
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  useEffect(() => () => { dispatch(clearError()); }, [dispatch]);

  const onSubmit = ({ name, email, password }) => dispatch(registerUser({ name, email, password }));

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start organising your tasks in a minute."
      footer={<>Already have an account? <Link to="/login" className="font-semibold text-ink underline underline-offset-4">Log in</Link></>}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {error && <p role="alert" className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:bg-rose-500/15 dark:text-rose-300">{error}</p>}

        <Field label="Name" error={errors.name}>
          <input
            autoComplete="name"
            autoFocus
            className={inputStyle}
            {...register("name", {
              required: "Enter your name",
              validate: (v) => v.trim().length >= 2 || "Name needs at least 2 characters",
            })}
          />
        </Field>

        <Field label="Email" error={errors.email}>
          <input
            type="email"
            autoComplete="email"
            className={inputStyle}
            {...register("email", { required: "Enter your email", pattern: { value: EMAIL_RE, message: "Enter a valid email address" } })}
          />
        </Field>

        <PasswordField
          label="Password"
          autoComplete="new-password"
          hint="At least 8 characters with a letter and a number."
          error={errors.password}
          registration={register("password", {
            required: "Create a password",
            minLength: { value: 8, message: "Use at least 8 characters" },
            validate: (v) => (/[A-Za-z]/.test(v) && /\d/.test(v)) || "Include at least one letter and one number",
          })}
        />

        <PasswordField
          label="Confirm password"
          autoComplete="new-password"
          error={errors.confirmPassword}
          registration={register("confirmPassword", {
            required: "Confirm your password",
            validate: (v) => v === getValues("password") || "Passwords don't match",
          })}
        />

        <AuthSubmit loading={status === "loading"} idleLabel="Create account" loadingLabel="Creating account" />
      </form>
    </AuthLayout>
  );
}
