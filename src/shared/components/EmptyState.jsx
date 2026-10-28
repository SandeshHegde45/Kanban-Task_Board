export default function EmptyState({ icon: Icon, title, text, children }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center rounded-[28px] border-2 border-dashed border-ink/15 bg-surface/70 px-6 py-14 text-center">
      <span className="mb-4 grid size-14 place-items-center rounded-2xl bg-ink text-on-ink">
        <Icon size={26} />
      </span>
      <h3 className="font-display text-xl font-extrabold">{title}</h3>
      <p className="mb-5 mt-1 text-sm text-ink/60">{text}</p>
      {children}
    </div>
  );
}
