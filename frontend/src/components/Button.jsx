import clsx from 'clsx';

const baseStyles =
  'inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60';

const variants = {
  primary:
    'bg-brand-500 text-white shadow-lg shadow-brand-500/30 hover:bg-brand-400 focus-visible:outline-brand-200',
  secondary:
    'bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white/60',
  ghost: 'text-white hover:bg-white/10 focus-visible:outline-white/40',
};

const Button = ({
  as: Component = 'button',
  variant = 'primary',
  className,
  type = 'button',
  children,
  ...props
}) => {
  const componentProps = Component === 'button' ? { type } : {};
  return (
    <Component
      className={clsx(baseStyles, variants[variant], className)}
      {...componentProps}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;
