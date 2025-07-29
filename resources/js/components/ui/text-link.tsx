import { cn } from '@/lib/utils'

interface TextLinkProps {
  className?: string;
  children: React.ReactNode;
}
interface TextLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  children: React.ReactNode;
}

export default function TextLink({ className, children, ...props }: TextLinkProps) {
  return (
    <a
      {...props}
      className={cn(
        'font-medium text-primary underline underline-offset-4 hover:text-primary/80',
        className
      )}
    >
      {children}
    </a>
  );
}
