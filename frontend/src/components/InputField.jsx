import clsx from 'clsx';
import { forwardRef } from 'react';

const baseInputStyles =
  'block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/40';

const InputField = forwardRef(({ label, error, className, type = 'text', ...props }, ref) => (
  <label className={clsx('flex flex-col gap-1 text-sm font-medium text-slate-200', className)}>
    <span>{label}</span>
    <input ref={ref} type={type} className={baseInputStyles} {...props} />
    {error ? <span className="text-sm text-red-400">{error}</span> : null}
  </label>
));

InputField.displayName = 'InputField';

export default InputField;
