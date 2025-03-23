import styles from './Icons.module.css';

export function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={styles.mailIcon}
      {...props}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export function KeyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={styles.keyIcon}
      {...props}
    >
      <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
      <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
    </svg>
  );
}

export function EyeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={styles.eyeIcon}
      {...props}
    >
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function EyeOffIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={styles.eyeOffIcon}
      {...props}
    >
      <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
      <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
      <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
      <path d="m2 2 20 20" />
    </svg>
  );
}

export function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="none"
      version="1.1"
      width="15.25"
      height="16"
      viewBox="0 0 15.25 16"
      className={styles.googleIcon}
      {...props}
    >
      <defs>
        <clipPath id="master_svg0_35_373">
          <rect x="0" y="0" width="15.25" height="16" rx="0" />
        </clipPath>
      </defs>
      <g clipPath="url(#master_svg0_35_373)">
        <g transform="matrix(1,0,0,-1,0,32.25)">
          <path
            d="M15.25,23.6875Q15.1875,20.3125,13.1875,18.25Q11.1562,16.1875,7.75,16.125Q5.59375,16.15625,3.84375,17.1875Q2.09375,18.21875,1.0625,19.96875Q0.03125,21.71875,0,23.875Q0.03125,26.03125,1.0625,27.7812Q2.09375,29.5312,3.84375,30.5625Q5.59375,31.5938,7.75,31.625Q10.9062,31.5625,12.9375,29.5938L10.8438,27.5625Q9.375,28.875,7.5625,28.75Q5.75,28.6562,4.375,27.375Q3.03125,26.0625,2.9375,23.875Q3,21.78125,4.34375,20.40625Q5.71875,19.03125,7.75,18.96875Q9.28125,19,10.2188,19.59375Q11.1562,20.1875,11.625,20.9375Q12.0625,21.71875,12.1562,22.3125L7.75,22.3125L7.75,25L15.125,25Q15.25,24.4375,15.25,23.6875Z"
            fill="#F87171"
            fillOpacity="1"
            // style={{ mixBlendMode: "passthrough" }}
          />
        </g>
      </g>
    </svg>
  );
}

export function MicroSoftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="currentColor"
      stroke="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={styles.microSoftIcon}
      {...props}
    >
      <defs>
        <clipPath id="master_svg0_35_378">
          <rect x="0" y="0" width="14" height="16" rx="0" />
        </clipPath>
      </defs>
      <g clipPath="url(#master_svg0_35_378)">
        <g transform="matrix(1,0,0,-1,0,30.75)">
          <path
            d="M0,29.375L6.71875,29.375L0,29.375L6.71875,29.375L6.71875,22.65625L0,22.65625L0,29.375ZM7.28125,29.375L14,29.375L7.28125,29.375L14,29.375L14,22.65625L7.28125,22.65625L7.28125,29.375ZM0,22.09375L6.71875,22.09375L0,22.09375L6.71875,22.09375L6.71875,15.375L0,15.375L0,22.09375ZM7.28125,22.09375L14,22.09375L7.28125,22.09375L14,22.09375L14,15.375L7.28125,15.375L7.28125,22.09375Z"
            fill="#60A5FA"
            fillOpacity="1"
            // style={{ mixBlendMode: "passthrough" }}
          />
        </g>
      </g>
    </svg>
  );
}
