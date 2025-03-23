import React from "react";
import { cva } from "class-variance-authority";
import clsx from "clsx";
import styles from "./Input.module.css";

const inputVariants = cva(styles.input, {
  variants: {
    variant: {
      default: styles.default,
      outline: styles.outline,
      filled: styles.filled,
      underlined: styles.underlined,
    },
    size: {
      sm: styles.sm,
      md: styles.md,
      lg: styles.lg,
    },
    state: {
      error: styles.error,
      success: styles.success,
      warning: styles.warning,
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  className?: string;
  variant?: "default" | "outline" | "filled" | "underlined";
  size?: "sm" | "md" | "lg";
  state?: "error" | "success" | "warning" | null;
  label?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
};

function Input(
  {
    className,
    variant,
    size = "md",
    state,
    label,
    helperText,
    leftIcon,
    rightIcon,
    containerClassName,
    ...props
  }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const inputClassName = inputVariants({ variant, size, state });
  const combinedClassName = clsx(inputClassName, className);

  return (
    <div className={clsx(styles.container, containerClassName)}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputWrapper}>
        {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
        <input className={combinedClassName} ref={ref} {...props} />
        {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
      </div>
      {helperText && (
        <p className={clsx(styles.helperText, state && styles[state])}>
          {helperText}
        </p>
      )}
    </div>
  );
}

export default React.forwardRef<HTMLInputElement, InputProps>(Input);
