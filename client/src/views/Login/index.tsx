import { useState } from 'react';
import styles from '@/layouts/AuthPage/AuthPage.module.css';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import {
  MailIcon,
  KeyIcon,
  EyeIcon,
  EyeOffIcon,
  GoogleIcon,
  MicroSoftIcon,
} from '@/components/icons';
import { useGlobalContext } from '@/contexts/contextHooks';
import { useLocation } from 'react-router';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { navigateTo } = useGlobalContext();
  const location = useLocation();

  function handleLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Login logic here
    console.log('Login form submitted');
    navigateTo('/verify', {
      replace: true,
      state: { from: location.pathname },
    });
  }

  return (
    <div className={styles.authPage__formContent}>
      <h2 className={styles.authPage__title}>{'Welcome Back,'}</h2>
      <form onSubmit={handleLoginSubmit} className={styles.authPage__form}>
        <div className={styles.authPage__inputGroup}>
          <Input
            id="email"
            label="Email"
            type="text"
            variant="filled"
            placeholder="Email"
            // state={"error"}
            helperText={'Enter your email address'}
            leftIcon={<MailIcon style={{ height: '20px', width: '20px' }} />}
            className={styles.authPage__input}
          />
        </div>
        <div className={styles.authPage__inputGroup}>
          <div className={styles.authPage__inputWrapper}>
            <Input
              id="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="filled"
              placeholder="Password"
              // state={"error"}
              helperText={'Password must be at least 8 characters'}
              className={styles.authPage__input}
              leftIcon={<KeyIcon style={{ height: '20px', width: '20px' }} />}
            />
            <Button
              variant="ghost"
              size="icon"
              type="button"
              className={styles.authPage__showPasswordButton}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </Button>
          </div>
        </div>
        <div className={styles.authPage__forgotPassword}>
          <div className={styles.authPage__rememberMe}>
            <label htmlFor="remember" className={styles.authPage__label}>
              Remember Me
            </label>
            <Input
              id="remember"
              type="checkbox"
              className={styles.authPage__checkbox}
              containerClassName={styles.authPage__checkboxContainer}
            />
          </div>
          <Button
            variant="link"
            size="icon"
            type="button"
            className={styles.authPage__forgotPasswordLink}
          >
            Forgot Password?
          </Button>
        </div>
        <Button type="submit" className={styles.authPage__signInButton}>
          {'Sign In'}
        </Button>
        <div className={styles.authPage__divider}>
          <div className={styles.authPage__dividerLineWrapper}>
            <span className={styles.authPage__dividerLine}></span>
          </div>
          <div className={styles.authPage__dividerTextWrapper}>
            <span className={styles.authPage__dividerText}>
              {'Or Continue With'}
            </span>
          </div>
        </div>
        <div className={styles.authPage__socialButtons}>
          <Button
            variant="outline"
            type="button"
            className={styles.authPage__googleButton}
          >
            <GoogleIcon style={{ height: '14px', width: '14px' }} />
            {'Google'}
          </Button>
          <Button
            variant="outline"
            type="button"
            className={styles.authPage__microsoftButton}
          >
            <MicroSoftIcon style={{ height: '14px', width: '14px' }} />
            {'Microsoft'}
          </Button>
        </div>
      </form>
      <p className={styles.authPage__signupPrompt}>
        <span>{"Don't have an account? "}</span>
        <Button
          variant="link"
          size="icon"
          type="button"
          className={styles.authPage__signupLink}
          onClick={() => navigateTo('/signup', { replace: true })}
        >
          {'Sign Up'}
        </Button>
      </p>
    </div>
  );
}
