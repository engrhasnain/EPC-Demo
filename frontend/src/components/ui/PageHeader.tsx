export function PageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold text-brand-black">{title}</h1>
      {description ? <p className="mt-1 text-sm text-neutral-500">{description}</p> : null}
    </div>
  );
}
