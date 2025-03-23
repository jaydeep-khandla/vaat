import styles from './AuthPage.module.css';
import { ReactNode } from 'react';

interface AuthPageProps {
  children: ReactNode;
}

export default function AuthPage(props: AuthPageProps) {
  // const [showPassword, setShowPassword] = useState(false);
  // const [isLoginForm, setIsLoginForm] = useState(true);

  // const [key, setKey] = useState(0);

  // function switchForm() {
  //   setIsLoginForm(!isLoginForm);
  //   setKey(key === 0 ? 1 : 0);
  // }

  return (
    <div className={styles.authPage__container}>
      <div className={styles.authPage__content}>
        <div className={styles.authPage__formWrapper}>
          <div className={styles.authPage__formContainer}>
            {/* {isLoginForm ? (
              <div className={styles.authPage__formContent} key={key}>
                <h2 className={styles.authPage__title}>{"Welcome Back,"}</h2>
                <form action="" className={styles.authPage__form}>
                  <div className={styles.authPage__inputGroup}>
                    <Input
                      id="email"
                      label="Email"
                      type="text"
                      variant="filled"
                      // state={"error"}
                      helperText={"Enter your email address"}
                      leftIcon={
                        <MailIcon style={{ height: "20px", width: "20px" }} />
                      }
                      className={styles.authPage__input}
                    />
                  </div>
                  <div className={styles.authPage__inputGroup}>
                    <div className={styles.authPage__inputWrapper}>
                      <Input
                        id="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        variant="filled"
                        // state={"error"}
                        helperText={"Password must be at least 8 characters"}
                        className={styles.authPage__input}
                        leftIcon={
                          <KeyIcon style={{ height: "20px", width: "20px" }} />
                        }
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
                      <label
                        htmlFor="remember"
                        className={styles.authPage__label}
                      >
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
                      className={styles.authPage__forgotPasswordLink}
                    >
                      Forgot Password?
                    </Button>
                  </div>
                  <Button className={styles.authPage__signInButton}>
                    {"Sign In"}
                  </Button>
                  <div className={styles.authPage__divider}>
                    <div className={styles.authPage__dividerLineWrapper}>
                      <span className={styles.authPage__dividerLine}></span>
                    </div>
                    <div className={styles.authPage__dividerTextWrapper}>
                      <span className={styles.authPage__dividerText}>
                        {"Or Continue With"}
                      </span>
                    </div>
                  </div>
                  <div className={styles.authPage__socialButtons}>
                    <Button
                      variant="outline"
                      className={styles.authPage__googleButton}
                    >
                      <GoogleIcon style={{ height: "14px", width: "14px" }} />
                      {"Google"}
                    </Button>
                    <Button
                      variant="outline"
                      className={styles.authPage__microsoftButton}
                    >
                      <MicroSoftIcon
                        style={{ height: "14px", width: "14px" }}
                      />
                      {"Microsoft"}
                    </Button>
                  </div>
                </form>
                <p className={styles.authPage__signupPrompt}>
                  <span>{"Don't have an account? "}</span>
                  <Button
                    variant="link"
                    size="icon"
                    className={styles.authPage__signupLink}
                    onClick={switchForm}
                  >
                    {"Sign Up"}
                  </Button>
                </p>
              </div>
            ) : (
              <div className={styles.authPage__formContent} key={key}>
                <h2 className={styles.authPage__title}>{"Join The family,"}</h2>
                <form action="" className={styles.authPage__form}>
                  <div className={styles.authPage__inputGroup}>
                    <Input
                      id="email"
                      label="Email"
                      type="text"
                      variant="filled"
                      // state={"error"}
                      helperText={"Enter your email address"}
                      leftIcon={
                        <MailIcon style={{ height: "20px", width: "20px" }} />
                      }
                      className={styles.authPage__input}
                    />
                  </div>
                  <div className={styles.authPage__inputGroup}>
                    <div className={styles.authPage__inputWrapper}>
                      <Input
                        id="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        variant="filled"
                        // state={"error"}
                        helperText={"Password must be at least 8 characters"}
                        className={styles.authPage__input}
                        leftIcon={
                          <KeyIcon style={{ height: "20px", width: "20px" }} />
                        }
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
                  <div className={styles.authPage__inputGroup}>
                    <div className={styles.authPage__inputWrapper}>
                      <Input
                        id="confirmPassword"
                        label="Confirm Password"
                        type={showPassword ? "text" : "password"}
                        variant="filled"
                        // state={"error"}
                        helperText={"Re-Enter same Password to Confirm It"}
                        className={styles.authPage__input}
                        leftIcon={
                          <KeyIcon style={{ height: "20px", width: "20px" }} />
                        }
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
                  <Button className={styles.authPage__signInButton}>
                    {"Sign Up"}
                  </Button>
                  <div className={styles.authPage__divider}>
                    <div className={styles.authPage__dividerLineWrapper}>
                      <span className={styles.authPage__dividerLine}></span>
                    </div>
                    <div className={styles.authPage__dividerTextWrapper}>
                      <span className={styles.authPage__dividerText}>
                        {"Or Continue With"}
                      </span>
                    </div>
                  </div>
                  <div className={styles.authPage__socialButtons}>
                    <Button
                      variant="outline"
                      className={styles.authPage__googleButton}
                    >
                      <GoogleIcon style={{ height: "14px", width: "14px" }} />
                      {"Google"}
                    </Button>
                    <Button
                      variant="outline"
                      className={styles.authPage__microsoftButton}
                    >
                      <MicroSoftIcon
                        style={{ height: "14px", width: "14px" }}
                      />
                      {"Microsoft"}
                    </Button>
                  </div>
                </form>
                <p className={styles.authPage__signupPrompt}>
                  <span>{"Already have an account? "}</span>
                  <Button
                    variant="link"
                    size="icon"
                    className={styles.authPage__signupLink}
                    onClick={switchForm}
                  >
                    {"Sign In"}
                  </Button>
                </p>
              </div>
            )} */}
            {props.children}
          </div>
          <div className={styles.authPage__imageWrapper}>
            <div>
              <img src="" alt="" className={styles.authPage__illustration} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
