import { cn } from '@/helpers/common/classnames';

interface ConditionalAnchor extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  disabledButtonProps: React.HTMLAttributes<HTMLSpanElement>;
  children: React.ReactNode;
  disabled?: boolean;
}

export function ConditionalAnchor({
  disabled = false,
  disabledButtonProps,
  children,
  ...props
}: ConditionalAnchor) {
  if (disabled) {
    return (
      <span
        {...disabledButtonProps}
        aria-label='disabled link button'
        className={cn(props.className, disabledButtonProps.className)}
      >
        {children}
      </span>
    );
  }

  return <a {...props}>{children}</a>;
}
