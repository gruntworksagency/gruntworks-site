import { ArrowRight, type LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';

const ArrowRightIcon: React.FC<LucideProps> = ({ className, ...props }) => {
  return (
    <ArrowRight
      className={cn(
        'h-6 w-6 text-steel-blue transition-opacity hover:opacity-80',
        className
      )}
      {...props}
    />
  );
};

export { ArrowRightIcon }; 