import Image from 'next/image'
import { Inter } from 'next/font/google'
import classes from '@/components/Main/Main.module.css'
import { useCallback, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export function Main() {
  const [foo, setFoo] = useState(0);
  const [state,setState] = useState([]);
  // 更新用の空配列、オブジェクトを使用する。
  const message = [];
  const obj ={};


  const initialState = {
    id:foo,
    name:'新規作成'+String(foo),
    // 元本
    principal: 100000, 
    // 毎月積立金額
    monthlyMoney: 2000,
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
        <div key={items.id} className={classes.data}>

          <h4>
            {items.name}
          </h4>
          <ul className={classes.items}>
              {/* onChangeに関数でpropsを渡すことで親コンポーネントを引き継ぐことができる。 */}
              {/* nameを使用することで、e.target.nameで照合することができる。 */}
              <li className={classes.li}>
                <div className={classes.item}>
                  <p>名前</p>
                  <input type="text" name="name" value={items.name} onChange={(e) => handleChange(items, e.target)} />
                </div>
              </li>
              <li>
                <div className={classes.item}>
                  <p>元本</p>
                  <input type="text" name="principal" value={items.principal} onChange={(e) => handleChange(items, e.target)} />
                </div>
              </li>
              <li>
                <div className={classes.item}>
                  <p>毎月積立金額</p>
                  <input type="text" name="monthlyMoney" value={items.monthlyMoney} onChange={(e) => handleChange(items, e.target)} />
                </div>
              </li>
              <li>
                <div className={classes.item}>
                  <p>年利</p>
                  <input type="text" name="annualInterest" value={items.annualInterest} onChange={(e) => handleChange(items, e.target)} />
                </div>
              </li>
              <li>
                <div className={classes.item}>
                  <p>増減配当率</p>
                  <input type="text" name="IncreaseDecreaseRate" value={items.IncreaseDecreaseRate} onChange={(e) => handleChange(items, e.target)} />
                </div>
              </li>
              <li>
                <div className={classes.item}>
                  <p>コスト年率</p>
                  <input type="text" name="costAnnualRate" value={items.costAnnualRate} onChange={(e) => handleChange(items, e.target)} />
                </div>
              </li>
              <li>
                <div className={classes.item}>
                  <p>投資期間</p>
                  <input type="text" name="investmentPeriod" value={items.investmentPeriod} onChange={(e) => handleChange(items, e.target)} />
                </div>
              </li>
          </ul>
        </div>
        );
      })}

      <button onClick={handleAdd} className={classes.btn}>
        新規追加
      </button>
      
    </>
  )
}
