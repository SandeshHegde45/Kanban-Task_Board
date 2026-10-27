import ThemeToggle from "../../theme/components/ThemeToggle";

const previewColumns = [
  { tint: "bg-[#e4e8fb]", cards: 2 },
  { tint: "bg-[#fff0c7]", cards: 1 },
  { tint: "bg-[#d8f3e6]", cards: 3 },
];

export default function AuthLayout({ title, subtitle, footer, children }) {
  return (
    <main className="mx-auto grid min-h-screen max-w-6xl gap-6 p-4 lg:grid-cols-2 lg:p-8">
      <aside className="hidden flex-col justify-between rounded-[28px] bg-[#161b33] p-10 text-white lg:flex">
        <h2 className="font-display text-4xl font-extrabold leading-tight">Plan your work, one column at a time.</h2>
        <div className="grid grid-cols-3 gap-3">
          {previewColumns.map((col, i) => (
            <div key={i} className={`${col.tint} space-y-2 rounded-2xl p-2.5`}>
              {Array.from({ length: col.cards }).map((_, j) => (
                <div key={j} className="h-12 rounded-xl bg-white" />
              ))}
            </div>
          ))}
        </div>
        <p className="text-sm text-white/60">Your tasks are saved to your account on this device.</p>
      </aside>

      <section className="relative flex items-center justify-center rounded-[28px] bg-surface p-6 shadow-sm ring-1 ring-ink/5 sm:p-10">
        <ThemeToggle className="absolute right-4 top-4" />
        <div className="w-full max-w-sm">
          <h1 className="font-display text-3xl font-extrabold">{title}</h1>
          <p className="mb-6 mt-1 text-ink/60">{subtitle}</p>
          {children}
          <p className="mt-6 text-center text-sm text-ink/60">{footer}</p>
        </div>
      </section>
    </main>
  );
}
