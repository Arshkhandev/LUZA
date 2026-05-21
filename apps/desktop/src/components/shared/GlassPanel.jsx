import { cn } from "../../utils/cn";

export function GlassPanel({ children, className }) {
  return <section className={cn("glass-panel rounded-lg", className)}>{children}</section>;
}
