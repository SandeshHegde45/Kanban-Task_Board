import { useForm } from "react-hook-form";
import Button from "../../../shared/components/Button";
import Field, { inputStyle } from "../../../shared/components/Field";
import { PROJECT_COLORS, PROJECT_ICONS } from "../constants";

export default function ProjectForm({ project, onSubmit, onCancel }) {
  const isEdit = Boolean(project);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: project
      ? { ...project, icon: project.icon ?? PROJECT_ICONS[0].value }
      : { name: "", description: "", color: PROJECT_COLORS[0].value, icon: "" },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <Field label="Project name" error={errors.name}>
        <input
          autoFocus
          placeholder="e.g. Mobile app"
          className={inputStyle}
          {...register("name", {
            required: "Give your project a name",
            validate: (v) => v.trim().length >= 2 || "Name needs at least 2 characters",
            maxLength: { value: 40, message: "Keep the name under 40 characters" },
          })}
        />
      </Field>

      <Field label="Description (optional)" error={errors.description}>
        <textarea
          rows={3}
          placeholder="What is this project about?"
          className={`${inputStyle} resize-none`}
          {...register("description", { maxLength: { value: 120, message: "Keep the description under 120 characters" } })}
        />
      </Field>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold">Project icon</legend>
        <div className="grid grid-cols-5 gap-2">
          {PROJECT_ICONS.map(({ value, label, Icon }) => (
            <label key={value} className="cursor-pointer" title={label}>
              <input
                type="radio"
                value={value}
                aria-label={label}
                className="peer sr-only"
                {...register("icon", { required: "Choose an icon for your project" })}
              />
              <span className="grid size-11 place-items-center rounded-xl bg-mist text-ink/60 ring-offset-2 transition hover:text-ink peer-checked:bg-ink peer-checked:text-on-ink peer-checked:ring-2 peer-checked:ring-ink peer-focus-visible:ring-2 peer-focus-visible:ring-ink">
                <Icon size={20} aria-hidden="true" />
              </span>
            </label>
          ))}
        </div>
        {errors.icon && <p className="mt-1 text-sm text-rose-600">{errors.icon.message}</p>}
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold">Colour</legend>
        <div className="flex gap-3">
          {PROJECT_COLORS.map((c) => (
            <label key={c.value} className="cursor-pointer" title={c.label}>
              <input type="radio" value={c.value} className="peer sr-only" {...register("color")} />
              <span className={`block size-9 rounded-full ring-offset-2 transition peer-checked:ring-2 peer-checked:ring-ink peer-focus-visible:ring-2 peer-focus-visible:ring-ink ${c.tile}`} />
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex justify-end gap-2 pt-2">
        <Button variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit">{isEdit ? "Save changes" : "Create project"}</Button>
      </div>
    </form>
  );
}
