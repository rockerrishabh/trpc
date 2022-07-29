import Link from "next/link";
import styles from "../../styles/Footer.module.css";

function Footer() {
  return (
    <footer className={styles.Footer}>
      <div className={`${styles.Div} group`}>
        <Link href="/">
          <a className={styles.A}>
            <span className={`${styles.Span} group-hover:text-indigo-500/90`}>
              Blog
            </span>
          </a>
        </Link>
        <p className={`${styles.P} group-hover:text-gray-500/80`}>© 2022</p>
      </div>
      <div className={styles.LinkDiv}>
        <Link href="/">
          <a className={styles.Privacy}>Privacy Policy</a>
        </Link>
        <Link href="/">
          <a className={styles.Terms}>Terms and Conditions</a>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
