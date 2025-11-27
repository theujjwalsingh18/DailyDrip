import React from "react";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border border-[hsl(214.3,31.8%,91.4%)] bg-[hsl(0,0%,100%)] text-[hsl(222.2,84%,4.9%)] shadow-[0_2px_4px_hsl(188_94%_43%_/_0.05)]",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
));
CardHeader.displayName = "CardHeader";


const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-[hsl(215.4,16.3%,46.9%)]", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
));
CardFooter.displayName = "CardFooter";

const cardPropTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

Card.propTypes = cardPropTypes;
CardHeader.propTypes = cardPropTypes;
CardTitle.propTypes = cardPropTypes;
CardDescription.propTypes = cardPropTypes;
CardContent.propTypes = cardPropTypes;
CardFooter.propTypes = cardPropTypes;

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };