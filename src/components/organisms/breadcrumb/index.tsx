import type { LucideIcon } from 'lucide-react';

import React from 'react';

import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Breadcrumb as UIBreadcrumb,
} from '@/components/ui/breadcrumb';

//#region TYPES
/**
 * Interface representing each breadcrumb item.
 * @param label - The display name of the breadcrumb.
 * @param href - The optional URL that the breadcrumb links to.
 */
export interface IBreadCrumb {
  label: string;
  href?: string;
}
//#endregion

//#region BREADCRUMB
/**
 * Breadcrumb component that displays a list of breadcrumb items.
 * Optionally accepts a custom separator icon.
 * @param items - An array of breadcrumb items.
 * @param Separator - An optional custom separator icon.
 * @param props - Additional HTML attributes for the breadcrumb container.
 */
interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: IBreadCrumb[];
  Separator?: LucideIcon;
}

/**
 * Breadcrumb component that displays a list of breadcrumb items.
 * @param params - The component props
 * @param params.items - An array of breadcrumb items
 * @param params.Separator - An optional custom separator icon
 * @param params.props - Additional HTML attributes for the breadcrumb container
 * @returns The breadcrumb component
 */
export function Breadcrumb({ items, Separator, ...props }: BreadcrumbProps) {
  return (
    <UIBreadcrumb {...props}>
      <BreadcrumbList className='text-inherit'>
        {items.map((item, index) => {
          return (
            <React.Fragment key={item.label}>
              <CustomBreadcrumbItem item={item} />
              {index !== items.length - 1 && (
                // Render separator unless it's the last breadcrumb item
                <BreadcrumbSeparator>{Separator ? <Separator /> : null}</BreadcrumbSeparator>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </UIBreadcrumb>
  );
}
//#endregion

//#region BREADCRUMBITEM
/**
 * Custom breadcrumb item component that handles either a link or a page.
 * @param item - The breadcrumb item containing the label and optional href.
 * @param props - Additional HTML attributes for the breadcrumb item.
 */
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
    // If href is defined, render a link
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

  // If no href, render the item as a page (non-clickable)
  return (
    <BreadcrumbItem {...props}>
      <BreadcrumbPage className='text-inherit'>{item.label}</BreadcrumbPage>
    </BreadcrumbItem>
  );
}
//#endregion
