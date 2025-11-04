const FeatureCard = ({ title, description, icon: Icon }) => (
  <article className="card flex flex-col gap-4">
    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-500/10 text-brand-300">
      <Icon className="h-6 w-6" aria-hidden="true" />
    </div>
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-slate-300">{description}</p>
    </div>
  </article>
);

export default FeatureCard;
