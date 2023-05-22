import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useCallback, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export function Header() {
  const [foo, setFoo] = useState(2);
  const initialState = [
    {id:1, name:'新規作成1'}
  ]
  const [state,setState] = useState(initialState);


  const handleClick = (e) => {
    setFoo((prevFoo) => prevFoo + 1);
    console.log(foo);
    setState((prevState) => [...prevState, {id:foo, name:'新規作成'+foo}]);
  }





  return (
    <>




      {/* <p>{state[0].name}</p> */}

      <ul>
        {state.map((item) => {
          return (
          <li key={item.id}>
            {item.id}
            {item.name}
          </li>
          );
        })}
      </ul>


      <button onClick={handleClick}>
        保存
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
