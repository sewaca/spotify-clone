import { ReactNode } from "react";
import styles from "./main-layout.module.css";
import Button from "~/components/Button";

interface MainLayoutProps {
  children?: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <section className={styles.mainWrapper}>
      <nav className={styles.nav}>
        <div className={styles.mainLinks}>
          <ul>
            <li className={styles.active}>
              <svg viewBox="0 0 24 24" className={styles.homeIcon}>
                <path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732l7.5-4.33z"></path>
              </svg>
              <svg viewBox="0 0 24 24" className={styles.homeIconActive}>
                <path d="M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732l-7.5-4.33z"></path>
              </svg>
              <span>Home</span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" className={styles.searchIcon}>
                <path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 1 0 1.414-1.414l-4.344-4.344a9.157 9.157 0 0 0 2.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"></path>
              </svg>
              <svg viewBox="0 0 24 24" className={styles.searchIconActive}>
                <path d="M15.356 10.558c0 2.623-2.16 4.75-4.823 4.75-2.664 0-4.824-2.127-4.824-4.75s2.16-4.75 4.824-4.75c2.664 0 4.823 2.127 4.823 4.75z"></path>
                <path d="M1.126 10.558c0-5.14 4.226-9.28 9.407-9.28 5.18 0 9.407 4.14 9.407 9.28a9.157 9.157 0 0 1-2.077 5.816l4.344 4.344a1 1 0 0 1-1.414 1.414l-4.353-4.353a9.454 9.454 0 0 1-5.907 2.058c-5.18 0-9.407-4.14-9.407-9.28zm9.407-7.28c-4.105 0-7.407 3.274-7.407 7.28s3.302 7.279 7.407 7.279 7.407-3.273 7.407-7.28c0-4.005-3.302-7.278-7.407-7.278z"></path>
              </svg>
              <span>Search</span>
            </li>
          </ul>
        </div>
        <div className={styles.library}>
          <ul style={{ padding: "8px" }}>
            <div className={styles.libraryHeader}>
              <li>
                <svg viewBox="0 0 24 24">
                  <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"></path>
                </svg>
                <span>Your Library</span>
              </li>
              <button className={styles.addPlaylist}>
                <svg viewBox="0 0 16 16">
                  <path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z"></path>
                </svg>
              </button>
            </div>
            <li className={styles.promoBlock}>
              <h2>Create your playlist</h2>
              <p>It's easy, we'll help you</p>
              <Button size="small">Create playlist</Button>
            </li>
            <li className={styles.promoBlock}>
              <h2>Let's find some podcasts to follow</h2>
              <p>We'll keep you updated on new episodes</p>
              <Button size="small">Browse podcasts</Button>
            </li>
          </ul>
        </div>
      </nav>
      <main className={styles.mainSection}>
        <header
          className={styles.pageHeader}
          style={{ backgroundColor: "rgba(0,0,0,.5)" }}
        >
          <div className={styles.navButtons}>
            <Button type="icon" color="none" disabled>
              <svg viewBox="0 0 16 16">
                <path d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0z"></path>
              </svg>
            </Button>
            <Button type="icon" color="none" disabled>
              <svg viewBox="0 0 16 16">
                <path d="M4.97.47a.75.75 0 0 0 0 1.06L11.44 8l-6.47 6.47a.75.75 0 1 0 1.06 1.06L13.56 8 6.03.47a.75.75 0 0 0-1.06 0z"></path>
              </svg>
            </Button>
          </div>
          <div className={styles.accountButtons}>
            <Button type="text">Sign up</Button>
            <Button size="large">Log in</Button>
          </div>
        </header>
        {children}
      </main>
    </section>
  );
}
