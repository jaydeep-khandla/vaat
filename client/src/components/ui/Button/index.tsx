import React from "react";
import { cva } from "class-variance-authority";
import clsx from "clsx";
import styles from "./Button.module.css";

const buttonVarients = cva(styles.btn, {
  variants: {
    variant: {
      default: styles.default,
      outline: styles.outline,
      primary: styles.primary,
      secondary: styles.secondary,
      destructive: styles.destructive,
      ghost: styles.ghost,
      link: styles.link,
    },
    size: {
      sm: styles.sm,
      md: styles.md,
      lg: styles.lg,
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?:
    | "default"
    | "outline"
    | "primary"
    | "secondary"
    | "destructive"
    | "ghost"
    | "link";
  size?: "sm" | "md" | "lg";
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }: ButtonProps, ref) => {
    const variantClassName = buttonVarients({ variant, size });

    const combinedClassName = clsx(variantClassName, className);

    return <button className={combinedClassName} ref={ref} {...props} />;
  }
);

export default Button;
