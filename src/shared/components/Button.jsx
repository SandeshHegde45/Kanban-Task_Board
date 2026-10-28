const variants = {
  primary: "bg-ink text-on-ink hover:bg-ink/85",
  ghost: "bg-surface text-ink ring-1 ring-ink/10 hover:bg-ink/5",
  danger: "bg-rose-600 text-white hover:bg-rose-700",
};

export default function Button({ variant = "primary", className = "", ...props }) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
