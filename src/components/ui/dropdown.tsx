import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const dropdownVariants = cva(
  "relative inline-block text-left",
  {
    variants: {
      size: {
        default: "w-48",
        sm: "w-40",
        lg: "w-56",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface DropdownProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dropdownVariants> {
  asChild?: boolean;
}

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  ({ className, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={cn(dropdownVariants({ size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Dropdown.displayName = "Dropdown";

export { Dropdown, dropdownVariants };
