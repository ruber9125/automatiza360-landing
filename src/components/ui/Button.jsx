import './Button.css';

/**
 * Botón reutilizable.
 * variant: 'primary' | 'secondary' | 'ghost'
 * size:    'md' | 'lg'
 * Se renderiza como <a> si recibe href, si no como <button>.
 */
export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  icon = true,
  className = '',
  ...rest
}) {
  const classes = ['btn', `btn--${variant}`, `btn--${size}`, className]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      <span className="btn__label">{children}</span>
      {icon && variant === 'primary' && (
        <svg className="btn__arrow" viewBox="0 0 20 20" aria-hidden="true">
          <path
            d="M4 10h11M11 5.5 15.5 10 11 14.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </>
  );

  if (href) {
    return (
      <a className={classes} href={href} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} type="button" {...rest}>
      {content}
    </button>
  );
}
