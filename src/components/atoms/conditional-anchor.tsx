import { cn } from '@/helpers/common/classnames';
import { useTranslations } from '@/hooks/use-translations';

interface ConditionalAnchor extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  disabledButtonProps: React.HTMLAttributes<HTMLSpanElement>;
  children: React.ReactNode;
  disabled?: boolean;
}

/**
 * Conditional anchor component.
 * @param params - The component props.
 * @param params.disabled - Whether the anchor should be disabled.
 * @param params.disabledButtonProps - The props for the disabled button.
 * @param params.children - The children of the anchor.
 * @param params.props - The props for the anchor.
 * @returns The conditional anchor.
 */
export function ConditionalAnchor({
  disabled = false,
  disabledButtonProps,
  children,
  ...props
}: ConditionalAnchor) {
  const { t } = useTranslations();

  if (disabled) {
    return (
      <span
        {...disabledButtonProps}
        aria-label={t('components.conditional-anchor.disabled-aria-label')}
        className={cn(props.className, disabledButtonProps.className)}
      >
        {children}
      </span>
    );
  }

  return <a {...props}>{children}</a>;
}
