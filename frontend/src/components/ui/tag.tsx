import { cn } from '@/lib/utils';
import { HTMLProps } from 'react';

interface TagProps extends HTMLProps<HTMLDivElement> {}

export function Tag({ className, children }: TagProps) {
  return (
    <div
      className={cn(
        'rounded-full px-3 py-1 bg-red-600 text-center flex items-center font-medium w-max',
        className,
      )}
    >
      {children}
    </div>
  );
}
