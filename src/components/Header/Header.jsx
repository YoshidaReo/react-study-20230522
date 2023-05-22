import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useCallback, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export function Header() {
  const [foo,setFoo] = useState(1);

  const handleClick = useCallback((e) => {
    setFoo(function (foo) {
      return foo + 1;
    });
    alert(foo);
  },[foo]);

  return (
    <>
      <button onClick={handleClick}>
        ボタン
      </button>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/pages/index.js</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>
    </>
  )
}
