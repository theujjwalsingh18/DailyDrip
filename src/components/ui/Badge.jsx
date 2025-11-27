import * as React from "react";
import PropTypes from "prop-types";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border border-[hsl(214.3,31.8%,91.4%)] px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[hsl(188,94%,43%)] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[hsl(188,94%,43%)] text-[hsl(0,0%,100%)] hover:bg-[hsl(188,94%,43%)/0.8]",
        secondary:
          "border-transparent bg-[hsl(24,95%,53%)] text-[hsl(0,0%,100%)] hover:bg-[hsl(24,95%,53%)/0.8]",
        destructive:
          "border-transparent bg-[hsl(0,84.2%,60.2%)] text-[hsl(210,40%,98%)] hover:bg-[hsl(0,84.2%,60.2%)/0.8]",
        outline: "text-[hsl(222.2,84%,4.9%)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

Badge.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(["default", "secondary", "destructive", "outline"]),
  children: PropTypes.node,
};

export { Badge, badgeVariants };