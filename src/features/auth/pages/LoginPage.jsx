import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import Field, { inputStyle } from "../../../shared/components/Field";
import { EMAIL_RE } from "../../../shared/utils/validation";
import AuthLayout from "../components/AuthLayout";
import AuthSubmit from "../components/AuthSubmit";
import PasswordField from "../components/PasswordField";
import { announceUnread } from "../../notifications/notificationThunks";
import { clearError, loginUser } from "../authSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((s) => s.auth);
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { email: "", password: "" } });

  const onSubmit = (data) =>
    dispatch(loginUser(data)).unwrap().then((user) => dispatch(announceUnread(user.id))).catch(() => { });

  useEffect(() => () => { dispatch(clearError()); }, [dispatch]);

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to see your board."
      footer={<>New here? <Link to="/register" className="font-semibold text-ink underline underline-offset-4">Create an account</Link></>}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {error && <p role="alert" className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:bg-rose-500/15 dark:text-rose-300">{error}</p>}

        <Field label="Email" error={errors.email}>
          <input
            type="email"
            autoComplete="email"
            autoFocus
            className={inputStyle}
            {...register("email", { required: "Enter your email", pattern: { value: EMAIL_RE, message: "Enter a valid email address" } })}
          />
        </Field>

        <PasswordField
          label="Password"
          autoComplete="current-password"
          error={errors.password}
          registration={register("password", { required: "Enter your password" })}
        />

        <AuthSubmit loading={status === "loading"} idleLabel="Log in" loadingLabel="Logging in" />
      </form>
    </AuthLayout>
  );
}
