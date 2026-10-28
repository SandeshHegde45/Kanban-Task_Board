export default function IconButton({ label, className = "", children, ...props }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`grid size-8 place-items-center rounded-full transition hover:bg-ink/10 hover:text-ink focus-visible:outline-2 focus-visible:outline-ink ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
