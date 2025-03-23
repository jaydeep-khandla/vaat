import React from 'react';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import styles from './Button.module.css';

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
      icon: styles.icon,
      sm: styles.sm,
      md: styles.md,
      lg: styles.lg,
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?:
    | 'default'
    | 'outline'
    | 'primary'
    | 'secondary'
    | 'destructive'
    | 'ghost'
    | 'link';
  size?: 'icon' | 'sm' | 'md' | 'lg';
};

function Button(
  { className, variant, size, children, ...props }: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const variantClassName = buttonVarients({ variant, size });
  const combinedClassName = clsx(variantClassName, className);

  const renderedChildren = React.Children.map(children, function (child) {
    return React.isValidElement(child)
      ? React.cloneElement(child, { ...props })
      : child;
  });

  return (
    <button className={combinedClassName} ref={ref} {...props}>
      {renderedChildren}
    </button>
  );
}

export default React.forwardRef<HTMLButtonElement, ButtonProps>(Button);
