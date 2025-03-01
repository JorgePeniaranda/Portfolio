import type { RowData } from '@tanstack/react-table';
import type { TranslationKey } from './translation';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    deleteRows?: (indexes: number[]) => void;
    translateFn?: (key: TranslationKey, vars?: Record<string, string | number>) => string;
  }
}
