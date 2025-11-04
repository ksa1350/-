const formatDate = (value) => {
  try {
    return new Date(value ?? Date.now()).toLocaleDateString();
  } catch (error) {
    return '—';
  }
};

const MenuCard = ({ title, description, updatedAt }) => (
  <article className="card flex flex-col gap-3">
    <header className="flex items-center justify-between gap-3">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
        Updated {formatDate(updatedAt)}
      </span>
    </header>
    {description ? <p className="text-sm text-slate-300">{description}</p> : null}
  </article>
);

export default MenuCard;
