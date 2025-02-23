import type { IBreadCrumb } from '@/types/breadcrumb';

import React from 'react';

import { BreadcrumbItem, BreadcrumbLink, BreadcrumbPage } from '@/components/ui/breadcrumb';

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
  if (item.href !== undefined) {
    return (
      <BreadcrumbItem {...props}>
        <BreadcrumbLink asChild>
          <a className='text-inherit' href={item.href}>
            {item.label}
          </a>
        </BreadcrumbLink>
      </BreadcrumbItem>
    );
  }

  return (
    <BreadcrumbItem {...props}>
      <BreadcrumbPage className='text-inherit'>{item.label}</BreadcrumbPage>
    </BreadcrumbItem>
  );
}
