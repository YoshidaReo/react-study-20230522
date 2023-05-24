import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useCallback, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export function Header() {
  const [foo, setFoo] = useState(0);
  const [state,setState] = useState([]);
  const message = [];

  const initialState = {id:foo, name:'新規作成'+String(foo)};


  const handleAdd = useCallback((e) => {
    setFoo((prevFoo) => prevFoo + 1);
    // console.log(foo);
    setState((prevState) => [...prevState, initialState]);
  },[foo]);

  const handleChange = useCallback((e) => {
    
    state.map((item,index) => {
      // console.log(item);
      // console.log(e);

      if (item.id === 0) {
        message.push({...item, name:e.target.value});
      } else {
        message.push(item);
      }
    });
    console.log(message);
    setState((state) => message);
    
    // setState(e.target.value.trim());
  },[state]);


  return (
    <>

      {/* <p>{state[0].name}</p> */}

      <ul>
        {state.map((item) => {
          return (
          <div key={item.id}>
            <li>
              <div>
                {item.id}
              </div>
              <div>
                <input type="text" value={item.name} onChange={handleChange} key={item.id}/>
              </div>
              <button>
                編集
              </button>
            </li>

          
          </div>
          );
        })}
      </ul>

      {/* <input type="text" value={text} onChange={handleOnChange}/> */}




      <button onClick={handleAdd}>
        追加
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
