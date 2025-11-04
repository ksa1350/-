import Button from './Button.jsx';

const EmptyState = ({ onCreate }) => (
  <section className="card flex flex-col items-center gap-4 text-center">
    <h3 className="text-lg font-semibold text-white">No menus yet</h3>
    <p className="max-w-sm text-sm text-slate-300">
      Create your first menu to start organizing dishes, sections, and pricing for
      your restaurant or catering business.
    </p>
    <Button onClick={onCreate}>Create menu</Button>
  </section>
);

export default EmptyState;
