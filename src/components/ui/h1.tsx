import { cn } from '@/lib/utils';

function H1({ className, ...props }: React.ComponentProps<'h1'>) {
  return (
    <h1
      className={cn(
        'text-3xl font-semibold leading-tight md:text-5xl',
        className,
      )}
      {...props}
    />
  );
}

export { H1 };
