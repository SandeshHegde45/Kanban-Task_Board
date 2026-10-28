import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { UserMinus, UserPlus } from "lucide-react";
import Avatar from "../../../shared/components/Avatar";
import Button from "../../../shared/components/Button";
import Field, { inputStyle } from "../../../shared/components/Field";
import IconButton from "../../../shared/components/IconButton";
import Modal from "../../../shared/components/Modal";
import { EMAIL_RE } from "../../../shared/utils/validation";
import { addMemberToProject, removeMemberFromProject } from "../projectThunks";

export default function MembersModal({ project, canManage, onClose }) {
  const dispatch = useDispatch();
  const me = useSelector((s) => s.auth.user);
  const users = useSelector((s) => s.users);
  const members = project.memberIds.map((id) => users.find((u) => u.id === id)).filter(Boolean);
  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm({ defaultValues: { email: "" } });

  const onAdd = ({ email }) => {
    const person = users.find((u) => u.email === email.trim().toLowerCase());
    if (!person) return setError("email", { message: "No account with this email. Ask them to sign up first." });
    if (project.memberIds.includes(person.id)) return setError("email", { message: `${person.name} is already in this project.` });
    dispatch(addMemberToProject({ projectId: project.id, userId: person.id }));
    reset();
  };

  return (
    <Modal title="Project members" onClose={onClose}>
      {canManage && (
        <form onSubmit={handleSubmit(onAdd)} noValidate className="mb-5">
          <Field label="Add someone by email" error={errors.email}>
            <div className="flex gap-2">
              <input
                type="email"
                autoFocus
                placeholder="teammate@example.com"
                className={inputStyle}
                {...register("email", { required: "Enter their email", pattern: { value: EMAIL_RE, message: "Enter a valid email address" } })}
              />
              <Button type="submit"><UserPlus size={16} /> Add</Button>
            </div>
          </Field>
        </form>
      )}

      <ul className="space-y-1">
        {members.map((m) => (
          <li key={m.id} className="flex items-center gap-3 rounded-2xl px-2 py-2">
            <Avatar user={m} />
            <span className="min-w-0 flex-1 text-sm leading-tight">
              <span className="block truncate font-semibold">{m.name}{m.id === me.id && " (you)"}</span>
              <span className="block truncate text-xs text-ink/50">{m.email}</span>
            </span>
            <span className="rounded-full bg-mist px-2.5 py-1 text-xs font-semibold text-ink/60">{m.id === project.ownerId ? "Owner" : "Member"}</span>
            {canManage && m.id !== project.ownerId && (
              <IconButton
                label={`Remove ${m.name}`}
                onClick={() => dispatch(removeMemberFromProject({ projectId: project.id, userId: m.id }))}
                className="hover:text-rose-600!"
              >
                <UserMinus size={16} />
              </IconButton>
            )}
          </li>
        ))}
      </ul>
      {!canManage && <p className="mt-4 text-xs text-ink/50">Only the project owner can add or remove people.</p>}
    </Modal>
  );
}
