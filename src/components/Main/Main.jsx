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
    investmentPeriod: 10,
    // グラフ描画
    boolState: false
  };

  let displayResult = {
    // 合計投資額
    totalInvestment: 0,
    // 最終資産
    finalAsset: 0,
    // 最終利益
    bottomLine: 0,
    // 総資産利益率
    returnOnAssets: 0,
  }







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

    // return {state};
    
  },[state]);

  const handleAdd = useCallback((e) => {
    setFoo((prevFoo) => prevFoo + 1);
    
    setState((prevState) => [...prevState, initialState]);
  },[foo]);

  

  const handleDisplay = useCallback((state, index) => {
    state.map((items) => {
      if (items.id ===state[index].id) {
        displayResult = {
          // 合計投資額
          totalInvestment: Number(items.principal) + Number(items.monthlyMoney) * Number(items.investmentPeriod) * 12,
          // 最終資産
          finalAsset: 0,
          // 最終利益
          bottomLine: 0,
          // 総資産利益率
          returnOnAssets: 0,
        }

        // id:foo,
        // name:'新規作成'+String(foo),
        // // 元本
        // principal: 100000, 
        // // 毎月積立金額
        // monthlyMoney: 2000,
        // // 年利
        // annualInterest: 4,
        // // 増減配当率
        // IncreaseDecreaseRate: 3,
        // // コスト年率
        // costAnnualRate: 1,
        // // 投資期間
        // investmentPeriod: 10,
        // // グラフ描画
        // boolState: false


        message.push({...items, boolState : !items.boolState, displayResult});


      } else {
        message.push(items);
      }
    });
    console.log(message);

    setState((state) => message);
    
  },[state]);



  const handleDelete = useCallback((state, index) => {
    const deleteState = [...state];
    deleteState.splice(index, 1);
    setState((state) => deleteState);
  },[]);


  return (
    <>
      {state.map((items,index) => {
        return (
        <div key={items.id} className={classes.data}>
          <h3>
            {items.name}
          </h3>


          <ul className={classes.items}>
              {/* onChangeに関数でpropsを渡すことで親コンポーネントを引き継ぐことができる。 */}
              {/* nameを使用することで、e.target.nameで照合することができる。 */}
              <li>
                <div className={classes.item}>
                  <p>名前</p>
                  <input className={classes.input} type="text" name="name" value={items.name} onChange={(e) => handleChange(items, e.target)} />
                </div>
              </li>
              <li>
                <div className={classes.item}>
                  <p>元本</p>
                  <input className={classes.input} type="text" name="principal" value={items.principal} onChange={(e) => handleChange(items, e.target)} />
                </div>
              </li>
              <li>
                <div className={classes.item}>
                  <p>毎月積立金額</p>
                  <input className={classes.input} type="text" name="monthlyMoney" value={items.monthlyMoney} onChange={(e) => handleChange(items, e.target)} />
                </div>
              </li>
              <li>
                <div className={classes.item}>
                  <p>年利</p>
                  <input className={classes.input} type="text" name="annualInterest" value={items.annualInterest} onChange={(e) => handleChange(items, e.target)} />
                </div>
              </li>
              <li>
                <div className={classes.item}>
                  <p>増配率</p>
                  <input className={classes.input} type="text" name="IncreaseDecreaseRate" value={items.IncreaseDecreaseRate} onChange={(e) => handleChange(items, e.target)} />
                </div>
              </li>
              <li>
                <div className={classes.item}>
                  <p>コスト年率</p>
                  <input className={classes.input} type="text" name="costAnnualRate" value={items.costAnnualRate} onChange={(e) => handleChange(items, e.target)} />
                </div>
              </li>
              <li>
                <div className={classes.item}>
                  <p>投資期間</p>
                  <input className={classes.input} type="text" name="investmentPeriod" value={items.investmentPeriod} onChange={(e) => handleChange(items, e.target)} />
                </div>
              </li>
          </ul>
          <div className={classes.btns}>
            <button name={items.id} onClick={(e) => handleDisplay(state, index)} className={classes.btnMiniG}>
              
              {items.boolState ? <small>非表示</small> : <small>表示</small> }
            </button>
            <button onClick={(e) => handleDelete(state,index)} className={classes.btnMiniR}>
              <small>削除</small> 
            </button>
          </div>

          {items.boolState ? (
            <div className={classes.display}>
              <h3>結果</h3>
              <div>
                
              </div>
              <h3>{items.displayResult.totalInvestment}</h3>
              <p></p>
              
            </div>


          ) : null}


        </div>
        );
      })}

      <button onClick={handleAdd} className={classes.btn}>
        新規追加
      </button>
      
    </>
  )
}
