// src/components/ui/alert.jsx
import { cn } from "@/lib/utils"

const Alert = ({
  className,
  variant = "default",
  ...props
}) => {
  return (
    <div
      role="alert"
      className={cn(
        "relative w-full rounded-lg border px-4 py-3 text-sm",
        className
      )}
      {...props}
    />
  )
}

const AlertDescription = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn("text-sm [&_p]:leading-relaxed", className)}
      {...props}
    />
  )
}

export { Alert, AlertDescription }