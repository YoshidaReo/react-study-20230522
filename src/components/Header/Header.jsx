import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useCallback, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export function Header() {
  const [foo, setFoo] = useState(0);
  const [state,setState] = useState([]);
  // 更新用の空配列、オブジェクトを使用する。
  const message = [];
  const obj ={};


  const initialState = {
    id:foo,
    name:'新規作成'+String(foo),
    // 元本
    principal: 10, 
    // 毎月積立金額
    monthlyMoney: 2,
    // 年利
    annualInterest: 4,
    // 増減配当率
    IncreaseDecreaseRate: 3,
    // コスト年率
    costAnnualRate: 1,
    // 投資期間
    investmentPeriod: 10
  };



  const handleAdd = useCallback((e) => {
    setFoo((prevFoo) => prevFoo + 1);
    
    setState((prevState) => [...prevState, initialState]);
  },[foo]);



  const handleChange = useCallback((prevItem, target) => {
    // console.log(prevItem);

    state.map((item) => {
      if (item.id === prevItem.id) {
        message.push({...item, [target.name] : target.value});

      } else {
        message.push(item);
      }
    });
    // console.log(message);
    setState((state) => message);
    console.log(state);

    return {state};
    
  },[state]);

  const listItems = state.map(items =>
    <li key={items.id}>
      <h3>{items.name}</h3>

    </li>
  );



  return (
    <>
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
                <input type="text" name="name" value={item.name} onChange={(e) => handleChange(item, e.target)} />
                <input type="text" name="principal" value={item.principal} onChange={(e) => handleChange(item, e.target)} />
                <input type="text" name="monthlyMoney" value={item.monthlyMoney} onChange={(e) => handleChange(item, e.target)} />
                <input type="text" name="annualInterest" value={item.annualInterest} onChange={(e) => handleChange(item, e.target)} />
                <input type="text" name="IncreaseDecreaseRate" value={item.IncreaseDecreaseRate} onChange={(e) => handleChange(item, e.target)} />
                <input type="text" name="costAnnualRate" value={item.costAnnualRate} onChange={(e) => handleChange(item, e.target)} />
                <input type="text" name="investmentPeriod" value={item.investmentPeriod} onChange={(e) => handleChange(item, e.target)} />
              </div>
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
