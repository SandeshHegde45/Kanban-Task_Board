import { useForm } from "react-hook-form";
import Button from "../../../shared/components/Button";
import Field, { inputStyle } from "../../../shared/components/Field";
import { toInputDate } from "../../../shared/utils/date";
import { PRIORITIES, STATUSES } from "../constants";

export default function TaskForm({ task, members = [], defaultStatus = "todo", onSubmit, onCancel }) {
  const isEdit = Boolean(task);
  const today = toInputDate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: task
      ? { ...task, assigneeId: task.assigneeId ?? "" }
      : { title: "", description: "", priority: "medium", status: defaultStatus, dueDate: "", assigneeId: "" },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <Field label="Title" error={errors.title}>
        <input
          autoFocus
          placeholder="e.g. Review pull request"
          className={inputStyle}
          {...register("title", {
            required: "Give your task a title",
            validate: (v) => v.trim().length >= 3 || "Title needs at least 3 characters",
            maxLength: { value: 80, message: "Keep the title under 80 characters" },
          })}
        />
      </Field>

      <Field label="Description (optional)" error={errors.description}>
        <textarea
          rows={3}
          placeholder="Add a few details"
          className={`${inputStyle} resize-none`}
          {...register("description", { maxLength: { value: 300, message: "Keep the description under 300 characters" } })}
        />
      </Field>

      <fieldset>
        <legend className="mb-1.5 text-sm font-semibold">Priority</legend>
        <div className="grid grid-cols-3 gap-2">
          {PRIORITIES.map((p) => (
            <label key={p.value} className="cursor-pointer">
              <input type="radio" value={p.value} className="peer sr-only" {...register("priority")} />
              <span className={`block rounded-2xl bg-mist py-2.5 text-center text-sm font-semibold ring-1 ring-ink/10 transition peer-focus-visible:ring-2 peer-focus-visible:ring-ink ${p.active}`}>
                {p.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Due date" error={errors.dueDate}>
          <input
            type="date"
            className={inputStyle}
            {...register("dueDate", {
              required: "Pick a due date",
              validate: (v) => isEdit || v >= today || "Due date can't be in the past",
            })}
          />
        </Field>
        <Field label="Status">
          <select className={inputStyle} {...register("status")}>
            {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </Field>
      </div>

      <Field label="Assignee">
        <select className={inputStyle} {...register("assigneeId")}>
          <option value="">Unassigned</option>
          {members.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
      </Field>

      <div className="flex justify-end gap-2 pt-2">
        <Button variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit">{isEdit ? "Save changes" : "Add task"}</Button>
      </div>
    </form>
  );
}
