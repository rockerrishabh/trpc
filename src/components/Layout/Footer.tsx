import Link from "next/link";
import styles from "../../styles/Footer.module.css";

function Footer() {
  return (
    <footer className={styles.Footer}>
      <div className={`${styles.Div}`}>
        <Link href="/">
          <a className={styles.A}>
            <span
              className={`${styles.Span} dark:text-gray-200 dark:hover:text-red-500/90 hover:text-red-500/90`}
            >
              Blog
            </span>
          </a>
        </Link>
        <p className={`${styles.P} dark:text-gray-200 `}>© 2022</p>
      </div>
      <div className={styles.LinkDiv}>
        <Link href="/">
          <a className={`${styles.Privacy} dark:text-gray-200`}>
            Privacy Policy
          </a>
        </Link>
        <Link href="/">
          <a className={`${styles.Terms} dark:text-gray-200`}>
            Terms and Conditions
          </a>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
