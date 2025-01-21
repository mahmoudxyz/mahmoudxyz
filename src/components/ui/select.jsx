import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils"; 

const Select = React.forwardRef(
  ({ children, className, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(props.value || "");

    React.useEffect(() => {
      if (props.value !== undefined) {
        setValue(props.value);
      }
    }, [props.value]);

    const handleValueChange = (newValue) => {
      setValue(newValue);
      if (props.onValueChange) {
        props.onValueChange(newValue);
      }
      setOpen(false);
    };

    return (
      <div ref={ref} className={cn("relative", className)}>
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return null;
          
          return React.cloneElement(child, {
            open,
            setOpen,
            value,
            onValueChange: handleValueChange,
          });
        })}
      </div>
    );
  }
);
Select.displayName = "Select";

const SelectTrigger = React.forwardRef(
  ({ children, className, open, setOpen, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown
          className={cn(
            "h-4 w-4 opacity-50 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
    );
  }
);
SelectTrigger.displayName = "SelectTrigger";

const SelectValue = React.forwardRef(
  ({ className, placeholder, value, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("block truncate", className)}
        {...props}
      >
        {value || placeholder}
      </span>
    );
  }
);
SelectValue.displayName = "SelectValue";

const SelectContent = React.forwardRef(
  ({ children, className, open, ...props }, ref) => {
    if (!open) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80",
          "left-0 top-full mt-1 w-full"
        )}
        {...props}
      >
        <div className="p-1">{children}</div>
      </div>
    );
  }
);
SelectContent.displayName = "SelectContent";

const SelectItem = React.forwardRef(
  ({ children, className, value, onValueChange, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
        onClick={() => onValueChange?.(value)}
        {...props}
      >
        <span className="flex-1">{children}</span>
      </button>
    );
  }
);
SelectItem.displayName = "SelectItem";

// Add a utils file if you don't have one
const utils = {
  cn: (...classes) => {
    return classes.filter(Boolean).join(" ");
  }
};

export {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
};