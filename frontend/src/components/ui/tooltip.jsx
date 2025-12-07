import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '../../lib/utils.js';

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = ({ className, sideOffset = 6, ...props }) => (
  <TooltipPrimitive.Content
    sideOffset={sideOffset}
    className={cn(
      'z-50 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-900 shadow-lg',
      className,
    )}
    {...props}
  />
);

export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent };


