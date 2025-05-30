import { ArrowLeft, type LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';

// Use LucideProps for better type compatibility with lucide-react icons
const ArrowLeftIcon: React.FC<LucideProps> = ({ className, ...props }) => {
  return (
    <ArrowLeft
      className={cn(
        'h-6 w-6 text-steel-blue transition-opacity hover:opacity-80',
        className
      )}
      {...props}
    />
  );
};

export { ArrowLeftIcon }; 