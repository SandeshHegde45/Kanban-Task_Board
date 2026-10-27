import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Field, { inputStyle } from "../../../shared/components/Field";

export default function PasswordField({ label, error, hint, registration, autoComplete }) {
  const [visible, setVisible] = useState(false);
  const Icon = visible ? EyeOff : Eye;

  return (
    <Field label={label} error={error} hint={hint}>
      <div className="relative">
        <input type={visible ? "text" : "password"} autoComplete={autoComplete} className={`${inputStyle} pr-12`} {...registration} />
        <button
          type="button"
          aria-label={visible ? "Hide password" : "Show password"}
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-ink/40 hover:text-ink focus-visible:outline-2 focus-visible:outline-ink"
        >
          <Icon size={18} />
        </button>
      </div>
    </Field>
  );
}
