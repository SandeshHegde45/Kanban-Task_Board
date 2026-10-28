import Avatar from "./Avatar";

export default function AvatarStack({ users, max = 3 }) {
  const shown = users.slice(0, max);
  const extra = users.length - shown.length;

  return (
    <span className="flex -space-x-2">
      {shown.map((u) => <Avatar key={u.id} user={u} className="size-7 text-xs ring-2 ring-surface" />)}
      {extra > 0 && (
        <span className="grid size-7 place-items-center rounded-full bg-mist text-xs font-semibold ring-2 ring-surface">+{extra}</span>
      )}
    </span>
  );
}
