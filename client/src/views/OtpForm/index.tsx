import Button from '@/components/ui/Button';
import { useGlobalContext } from '@/contexts/contextHooks';
import React, { useState } from 'react';
import styles from '@/layouts/AuthPage/AuthPage.module.css';
import Input from '@/components/ui/Input';
import { useLocation } from 'react-router';
import Spinner from '@/components/ui/Spinner';

const OTP_LENGTH = 4;

export default function OtpForm() {
  const [otp, setOtp] = React.useState(Array(OTP_LENGTH).fill(''));
  const [autoSubmitting, setAutoSubmitting] = React.useState(true);
  const [loading, setLoading] = useState(false);
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
  const { navigateTo } = useGlobalContext();
  const location = useLocation();

  const fromRoute = location.state?.from || null;

  React.useEffect(() => {
    if (fromRoute !== '/login' && fromRoute !== '/signup') {
      navigateTo(fromRoute || '/', { replace: true });
      return;
    }

    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [fromRoute, navigateTo]);

  React.useEffect(() => {
    // Auto-submit when all fields are filled
    if (otp.every((digit) => digit !== '') && autoSubmitting) {
      handleSubmit();
      setAutoSubmitting(false);
    }
  }, [otp, autoSubmitting]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const { value } = e.target;
    if (value === '' || /^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input if current input is filled
      if (value !== '' && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim();

    // Check if pasted content is numeric and has expected length
    if (/^\d+$/.test(pasteData) && pasteData.length <= OTP_LENGTH) {
      const digits = pasteData.split('').slice(0, OTP_LENGTH);

      // Fill the OTP array with pasted digits
      const newOtp = [...otp];
      digits.forEach((digit, idx) => {
        if (idx < OTP_LENGTH) newOtp[idx] = digit;
      });

      setOtp(newOtp);
      setAutoSubmitting(true);

      // Focus the next empty input or the last input
      const nextEmptyIndex = newOtp.findIndex((val) => val === '');
      if (nextEmptyIndex !== -1) {
        inputRefs.current[nextEmptyIndex]?.focus();
      } else {
        inputRefs.current[5]?.focus();
      }
    }
  }

  const handleSubmit = () => {
    setLoading(true);
    const otpValue = otp.join('');
    console.log('OTP submitted:', otpValue);
    // Add API call to verify OTP
    // On success, navigate to the next page

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const handleResendOtp = () => {
    // Reset OTP fields
    setOtp(Array(OTP_LENGTH).fill(''));
    // Focus first input
    inputRefs.current[0]?.focus();
    // Add API call to resend OTP
    console.log('Resend OTP');
  };

  return (
    <div className={styles.authPage__formContent}>
      <h2 className={styles.authPage__title}>{'Verify Your Email'}</h2>
      <p className={styles.authPage__subtitle}>
        {`Enter the ${OTP_LENGTH}-digit code sent to your email address`}
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className={styles.authPage__form}
      >
        <div className={styles.authPage__otpGroup}>
          {Array(OTP_LENGTH)
            .fill(null)
            .map((_, index) => (
              <Input
                key={index}
                variant="filled"
                type="text"
                maxLength={1}
                value={otp[index]}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={index === 0 ? handlePaste : undefined}
                ref={(el) => (inputRefs.current[index] = el)}
                className={styles.authPage__otpInput}
                containerClassName={styles.authPage__otpInputContainer}
                aria-label={`digit ${index + 1}`}
                autoComplete="one-time-code"
              />
            ))}
        </div>

        <Button
          type="submit"
          className={styles.authPage__signInButton}
          disabled={otp.some((digit) => digit === '')}
        >
          {loading ? <Spinner /> : 'Verify'}
        </Button>

        <div className={styles.authPage__resendOtp}>
          <span>Didn't receive the code? </span>
          <Button
            variant="link"
            size="icon"
            type="button"
            className={styles.authPage__forgotPasswordLink}
            onClick={handleResendOtp}
          >
            Resend OTP
          </Button>
        </div>
      </form>

      <p className={styles.authPage__signupPrompt}>
        <span>{'Go back to '}</span>
        <Button
          variant="link"
          size="icon"
          type="button"
          className={styles.authPage__signupLink}
          onClick={() => navigateTo('/login', { replace: true })}
        >
          Login
        </Button>
        <span>{'or '}</span>
        <Button
          variant="link"
          size="icon"
          type="button"
          className={styles.authPage__signupLink}
          onClick={() => navigateTo('/signup', { replace: true })}
        >
          Sign Up
        </Button>
      </p>
    </div>
  );
}
