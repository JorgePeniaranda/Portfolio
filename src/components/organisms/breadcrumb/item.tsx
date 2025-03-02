import type { IBreadCrumb } from '@/types/breadcrumb';

import React from 'react';

import { BreadcrumbItem, BreadcrumbLink, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { useTranslations } from '@/hooks/use-translations';

interface CustomBreadcrumbItemProps extends React.HTMLAttributes<HTMLElement> {
  item: IBreadCrumb;
}

/**
 * Custom breadcrumb item component that handles either a link or a page.
 * @param params - The component props
 * @param params.item - The breadcrumb item containing the label and optional href
 * @param params.props - Additional HTML attributes for the breadcrumb item
 * @returns The custom breadcrumb item component
 */
export function CustomBreadcrumbItem({ item, ...props }: CustomBreadcrumbItemProps) {
  const { t } = useTranslations();

  if (item.href !== undefined) {
    return (
      <BreadcrumbItem {...props}>
        <BreadcrumbLink asChild>
          <a
            aria-label={t('components.breadcrumb-item.link-aria-label', { label: item.label })}
            className='text-inherit'
            href={item.href}
          >
            {item.label}
          </a>
        </BreadcrumbLink>
      </BreadcrumbItem>
    );
  }

  return (
    <BreadcrumbItem {...props}>
      <BreadcrumbPage
        aria-label={t('components.breadcrumb-item.page-aria-label', { label: item.label })}
        className='text-inherit'
      >
        {item.label}
      </BreadcrumbPage>
    </BreadcrumbItem>
  );
}
