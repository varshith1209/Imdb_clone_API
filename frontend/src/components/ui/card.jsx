import * as React from 'react';
import { cn } from '../../lib/utils.js';

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl', className)}
    {...props}
  />
));
Card.displayName = 'Card';

const CardHeader = ({ className, ...props }) => (
  <div className={cn('flex flex-col gap-1.5 p-6', className)} {...props} />
);
const CardContent = ({ className, ...props }) => <div className={cn('p-6 pt-0', className)} {...props} />;
const CardFooter = ({ className, ...props }) => <div className={cn('p-6 pt-0', className)} {...props} />;

export { Card, CardHeader, CardContent, CardFooter };


