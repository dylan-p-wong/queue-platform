import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <main className={styles.main}>
        <div className={styles.grid}>
          <a href="/admin/queues" className={styles.card}>
            <h2>Admin &rarr;</h2>
            <p>Login or Register to access admin panel.</p>
          </a>

          <a href="https://github.com/dylan-p-wong/queue-platform" className={styles.card}>
            <h2>How it works &rarr;</h2>
            <p>Learn about how the queue platform works.</p>
          </a>

        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
