import { useForm } from "react-hook-form";
import Button from "../../../shared/components/Button";
import Field, { inputStyle } from "../../../shared/components/Field";
import { PROJECT_COLORS } from "../constants";

export default function ProjectForm({ project, onSubmit, onCancel }) {
  const isEdit = Boolean(project);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: project ?? { name: "", description: "", color: PROJECT_COLORS[0].value },
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
