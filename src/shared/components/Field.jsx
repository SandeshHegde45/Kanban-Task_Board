export const inputStyle =
  "w-full rounded-2xl bg-mist px-4 py-3 text-sm outline-none ring-1 ring-ink/10 focus:ring-2 focus:ring-ink";

export default function Field({ label, error, hint, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold">{label}</span>
      {children}
      {error ? (
        <span role="alert" className="mt-1 block text-xs text-rose-600 dark:text-rose-400">{error.message}</span>
      ) : (
        hint && <span className="mt-1 block text-xs text-ink/50">{hint}</span>
      )}
    </label>
  );
}
