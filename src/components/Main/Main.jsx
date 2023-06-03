import { Inter } from 'next/font/google'
import classes from '@/components/Main/Main.module.css'
import { useCallback, useState } from 'react'


const inter = Inter({ subsets: ['latin'] })


export function Main() {
  const [foo, setFoo] = useState(0);
  const [state,setState] = useState([]);
  // 更新用の空配列、オブジェクトを使用する。
  const message = [];
  const result = [];
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
    // // コスト年率
    // costAnnualRate: 1,
    // 投資期間
    investmentPeriod: 10,
    // グラフ描画
    boolState: false,

    // 合計投資額
    totalInvestment: 0,
    // 最終資産
    finalAsset: 0,
    // 最終利益
    bottomLine: 0,
    // 総資産利益率
    returnOnAssets: 0,
  };


  const handleChange = useCallback((prevItems, target) => {

    // messageでinputを入力できるようにする。
    state.map((items) => {
      if (items.id === prevItems.id) {
        message.push({...items, 
          [target.name] : target.value,
        });

      } else {
        message.push(items);
      }
    });
    console.log(message);


    // resultで表示結果を変化できるようにする。
    message.map((items) => {
      if (items.id === prevItems.id) {
        // 合計投資額
        const totalInvestmentResult = (Number(items.principal) + Number(items.monthlyMoney) * Number(items.investmentPeriod) * 12);

        // 最終資産。増配率は翌年以降に適用する（一年複利計算）。
        let finalAssetResult = Number(items.principal);
        for (let i = 1; i <= Number(items.investmentPeriod); i++){
          finalAssetResult = (finalAssetResult + Number(items.monthlyMoney) * 12) * (1 + Number(items.annualInterest / 100) * (1 + Number(items.IncreaseDecreaseRate) * (i - 1) / 100));
        };

        // 最終利益
        const bottomLineResult = (finalAssetResult - totalInvestmentResult);

        // 総資産利益率
        const returnOnAssetsResult = (bottomLineResult / finalAssetResult * 100);


        result.push({...items,
          // 合計投資額
          totalInvestment : totalInvestmentResult,
          finalAsset: finalAssetResult,
          bottomLine: bottomLineResult,
          returnOnAssets: returnOnAssetsResult

        });

      } else {
        result.push(items);
      }

    });
    console.log(result);

    setState((state) => result);

  },[state]);



  const handleAdd = useCallback((e) => {
    setFoo((prevFoo) => prevFoo + 1);
    
    setState((prevState) => [...prevState, initialState]);
  },[foo]);

  

  const handleDisplay = useCallback((state, index) => {
    state.map((items) => {
      if (items.id ===state[index].id) {
        message.push({...items, boolState : !items.boolState});



      } else {
        message.push(items);
      }
    });
    console.log(message);
    console.log(state);
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
                  <input className={classes.input} type="tel" name="principal" value={items.principal} onChange={(e) => handleChange(items, e.target)} />
                </div>
              </li>
              <li>
                <div className={classes.item}>
                  <p>毎月積立金額</p>
                  <input className={classes.input} type="tel" name="monthlyMoney" value={items.monthlyMoney} onChange={(e) => handleChange(items, e.target)} />
                </div>
              </li>
              <li>
                <div className={classes.item}>
                  <p>年利</p>
                  <input className={classes.input} type="tel" name="annualInterest" value={items.annualInterest} onChange={(e) => handleChange(items, e.target)} />
                </div>
              </li>
              <li>
                <div className={classes.item}>
                  <p>増配率</p>
                  <input className={classes.input} type="tel" name="IncreaseDecreaseRate" value={items.IncreaseDecreaseRate} onChange={(e) => handleChange(items, e.target)} />
                </div>
              </li>
              {/* <li>
                <div className={classes.item}>
                  <p>コスト年率</p>
                  <input className={classes.input} type="tel" name="costAnnualRate" value={items.costAnnualRate} onChange={(e) => handleChange(items, e.target)} />
                </div>
              </li> */}
              <li>
                <div className={classes.item}>
                  <p>投資期間</p>
                  <input className={classes.input} type="tel" name="investmentPeriod" value={items.investmentPeriod} onChange={(e) => handleChange(items, e.target)} />
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
                <h3>合計投資額:{items.totalInvestment}</h3>
                <p>最終資産額:{items.finalAsset}</p>
                <p>最終利益:{items.bottomLine}</p>
                <p>総資産利益率:{items.returnOnAssets}%</p>
              </div>
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
