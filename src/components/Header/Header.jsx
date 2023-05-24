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



  const handleChange = useCallback((id, value) => {

    state.map((item) => {
      // e.targetからkeyかid,refを用いてどこを変えているかを知る必要がある。
      if (item.id === id) {
        message.push({...item, name:value});
        // console.log(message);
      } else {
        message.push(item);
      }
    });

    setState((state) => message);

    return {state};
    
  },[state]);


  return (
    <>

      {/* <p>{state[0].name}</p> */}

      <ul>
        {state.map((item,index) => {
          return (
          <div key={item.id}>
            <li>
              <div>
                {item.id}
              </div>
              <div>
                {/* onChangeに関数でpropsを渡すことで親コンポーネントのitem.idをidとして引き継ぐことができる。 */}
                <input type="text" value={item.name} onChange={(e) => handleChange(item.id,e.target.value)} />
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
