import type { IBreadCrumb } from '@/types/breadcrumb';
import type { LucideIcon } from 'lucide-react';

import React from 'react';

import { CustomBreadcrumbItem } from './item';

import {
  BreadcrumbList,
  BreadcrumbSeparator,
  Breadcrumb as UIBreadcrumb,
} from '@/components/ui/breadcrumb';
import useTranslations from '@/hooks/use-translations';

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
  const { t } = useTranslations();

  return (
    <UIBreadcrumb {...props} aria-label={t('components.breadcrumb.aria-label')}>
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
