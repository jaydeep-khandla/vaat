import React, { useState, useEffect, useRef, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import styles from './Popover.module.css';
import { cva, type VariantProps } from 'class-variance-authority';

// Create a context to share the trigger ref
const TriggerContext =
  React.createContext<React.RefObject<HTMLDivElement> | null>(null);

interface PopoverRootProps {
  children: ReactNode;
  className?: string;
}

// Create a popover root component to wrap the trigger and popover
export function PopoverRoot({ children, className }: PopoverRootProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  return (
    <TriggerContext.Provider value={triggerRef}>
      <div className={clsx(className)}>{children}</div>
    </TriggerContext.Provider>
  );
}

// Popover component variants
const popoverVariants = cva(styles.popover, {
  variants: {
    align: {
      top: styles.top,
      'top-right': styles.topRight,
      right: styles.right,
      'bottom-right': styles.bottomRight,
      bottom: styles.bottom,
      'bottom-left': styles.bottomLeft,
      left: styles.left,
      'top-left': styles.topLeft,
      center: styles.center,
    },
  },
  defaultVariants: {
    align: 'center',
  },
});

export type PopoverAlign = NonNullable<
  VariantProps<typeof popoverVariants>['align']
>;

// Popover component props
interface PopoverProps {
  children: ReactNode;
  visible: boolean;
  onClose: () => void;
  className?: string;
  style?: React.CSSProperties;
  align?: PopoverAlign;
  offset?: number;
}

export function Popover({
  children,
  visible,
  onClose,
  className,
  style,
  align = 'center',
  offset = 16,
}: PopoverProps) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = React.useContext(TriggerContext);

  const calculatePosition = () => {
    if (!popoverRef.current || !visible) return;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const popoverRect = popoverRef.current.getBoundingClientRect();
    const popoverWidth = popoverRect.width;
    const popoverHeight = popoverRect.height;

    let top = 0;
    let left = 0;

    switch (align) {
      case 'top':
        top = offset;
        left = (windowWidth - popoverWidth) / 2;
        break;
      case 'top-right':
        top = offset;
        left = windowWidth - popoverWidth - offset;
        break;
      case 'right':
        top = (windowHeight - popoverHeight) / 2;
        left = windowWidth - popoverWidth - offset;
        break;
      case 'bottom-right':
        top = windowHeight - popoverHeight - offset;
        left = windowWidth - popoverWidth - offset;
        break;
      case 'bottom':
        top = windowHeight - popoverHeight - offset;
        left = (windowWidth - popoverWidth) / 2;
        break;
      case 'bottom-left':
        top = windowHeight - popoverHeight - offset;
        left = offset;
        break;
      case 'left':
        top = (windowHeight - popoverHeight) / 2;
        left = offset;
        break;
      case 'top-left':
        top = offset;
        left = offset;
        break;
      case 'center':
        top = (windowHeight - popoverHeight) / 2;
        left = (windowWidth - popoverWidth) / 2;
        break;
    }

    // Ensure popover stays within viewport bounds
    top = Math.max(
      offset,
      Math.min(top, windowHeight - popoverHeight - offset)
    );
    left = Math.max(
      offset,
      Math.min(left, windowWidth - popoverWidth - offset)
    );

    return { top, left };
  };

  // Calculate initial position
  useEffect(() => {
    if (visible) {
      const newPosition = calculatePosition();
      if (newPosition) {
        setPosition(newPosition);
      }
    }
  }, [visible, align, offset]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const newPosition = calculatePosition();
      if (newPosition) {
        setPosition(newPosition);
      }
    };

    if (visible) {
      window.addEventListener('resize', handleResize);
      // Also handle scroll events to keep popover positioned correctly
      window.addEventListener('scroll', handleResize);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize);
    };
  }, [visible, align, offset]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        !triggerRef?.current?.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    if (visible) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClose, visible, triggerRef]);

  if (!visible) return null;

  return ReactDOM.createPortal(
    <div
      className={clsx(
        popoverVariants({ align }),
        visible && styles.visible,
        className
      )}
      ref={popoverRef}
      style={{
        ...(!style?.top && !style?.left
          ? {
              top: `${position.top}px`,
              left: `${position.left}px`,
            }
          : {}),
        ...style,
      }}
    >
      {children}
    </div>,
    document.body
  );
}

interface PopoverTriggerProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function PopoverTrigger({
  children,
  onClick,
  className,
}: PopoverTriggerProps) {
  const triggerRef = React.useContext(TriggerContext);

  // const handleClick = () => {
  //   if (onClick) onClick(); // Call passed onClick handler
  // };

  return (
    <div
      ref={triggerRef}
      className={clsx(styles.popoverTrigger, className)}
      onClick={onClick}
      aria-haspopup="true"
      aria-expanded="true"
    >
      {children}
    </div>
  );
}

interface PopoverComponentProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function PopoverContent({ children, className }: PopoverComponentProps) {
  return (
    <div className={clsx(styles.popoverContent, className)}>{children}</div>
  );
}

export function PopoverHeader({ children, className }: PopoverComponentProps) {
  return (
    <div className={clsx(styles.popoverHeader, className)}>{children}</div>
  );
}

export function PopoverFooter({ children, className }: PopoverComponentProps) {
  return (
    <div className={clsx(styles.popoverFooter, className)}>{children}</div>
  );
}

export function PopoverTitle({ children, className }: PopoverComponentProps) {
  return <h3 className={clsx(styles.popoverTitle, className)}>{children}</h3>;
}

export function PopoverAction({
  children,
  className,
  onClick,
}: PopoverComponentProps) {
  return (
    <div
      className={clsx(styles.popoverTrigger, className)}
      onClick={onClick}
      aria-haspopup="true"
      aria-expanded="true"
    >
      {children}
    </div>
  );
}
