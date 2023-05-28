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



  const handleChange = useCallback((prevItems, target) => {
    // console.log(prevItems);

    state.map((items) => {
      if (items.id === prevItems.id) {
        message.push({...items, [target.name] : target.value});

      } else {
        message.push(items);
      }
    });
    // console.log(message);
    setState((state) => message);

    return {state};
    
  },[state]);



  return (
    <>
        {state.map((items,index) => {
          return (
          <div key={items.id}>

            <div>
              {items.id}
            </div>
            <ul>
                {/* onChangeに関数でpropsを渡すことで親コンポーネントを引き継ぐことができる。 */}
                {/* nameを使用することで、e.target.nameで照合することができる。 */}
                <li>
                  <div >
                    <p>名前</p>
                    <input type="text" name="name" value={items.name} onChange={(e) => handleChange(items, e.target)} />
                  </div>
                </li>
                <li>
                  <div>
                    <p>元本</p>
                    <input type="text" name="principal" value={items.principal} onChange={(e) => handleChange(items, e.target)} />
                  </div>
                </li>
                <li>
                  <div>
                    <p>毎月積立金額</p>
                    <input type="text" name="monthlyMoney" value={items.monthlyMoney} onChange={(e) => handleChange(items, e.target)} />
                  </div>
                </li>
                <li>
                  <div>
                    <p>年利</p>
                    <input type="text" name="annualInterest" value={items.annualInterest} onChange={(e) => handleChange(items, e.target)} />
                  </div>
                </li>
                <li>
                  <div>
                    <p>増減配当率</p>
                    <input type="text" name="IncreaseDecreaseRate" value={items.IncreaseDecreaseRate} onChange={(e) => handleChange(items, e.target)} />
                  </div>
                </li>
                <li>
                  <div>
                    <p>コスト年率</p>
                    <input type="text" name="costAnnualRate" value={items.costAnnualRate} onChange={(e) => handleChange(items, e.target)} />
                  </div>
                </li>
                <li>
                  <div>
                    <p>投資期間</p>
                    <input type="text" name="investmentPeriod" value={items.investmentPeriod} onChange={(e) => handleChange(items, e.target)} />
                  </div>
                </li>
            </ul>
          </div>


          
          );
        })}



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
