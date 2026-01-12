import type { ReactNode } from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import DocsSitemap from '@site/src/components/DocsSitemap';
import styles from './index.module.css';

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const logoUrl = useBaseUrl('/img/logo.svg');
  return (
    <Layout title={siteConfig.title}>
      <main className={clsx(styles.main)}>
        <div className={styles.twoColLayout}>
          {/* Left Column - Fixed width, scroll-fixed */}
          <aside className={styles.leftCol}>
            <div className={styles.leftColContent}>
              {/* Title and Logo Section */}
              <div className={styles.headerSection}>
                <h1>{siteConfig.title}</h1>
                <p className={styles.tagline}>{siteConfig.tagline}</p>

                {/* Big Logo */}
                <div className={styles.logoContainer}>
                  <img src={logoUrl} alt="zudo-bus Logo" className={styles.bigLogo} />
                </div>
              </div>

              {/* Quick Links */}
              <section className={styles.linksSection}>
                <h2>Related Links</h2>
                <ul className={styles.linksList}>
                  <li>
                    <a href="https://takazudomodular.com/" rel="noopener noreferrer">
                      Takazudo Modular
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/Takazudo/zudo-bus" rel="noopener noreferrer">
                      GitHub Repository
                    </a>
                  </li>
                  <li>
                    <a href="https://takazudomodular.com/pj/zudo-pd/" rel="noopener noreferrer">
                      zudo-pd (USB-PD Power Supply)
                    </a>
                  </li>
                </ul>
              </section>

              {/* Stats Section */}
              <section className={styles.statsSection}>
                <h2>Features</h2>
                <div className={styles.statsGrid}>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>+12V</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>-12V</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>+5V</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>8-12 Modules</div>
                  </div>
                </div>
              </section>
            </div>
          </aside>

          {/* Right Column - Remaining space */}
          <div className={styles.rightCol}>
            {/* Full Documentation Sitemap */}
            <DocsSitemap />
          </div>
        </div>
      </main>
    </Layout>
  );
}
