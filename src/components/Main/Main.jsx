import { Inter } from 'next/font/google'
import classes from '@/components/Main/Main.module.css'
import { useCallback, useState } from 'react'
import { Chart } from '../Chart/Chart';
import { TableGenerate } from '../TableGenerate/TableGenerate';


const inter = Inter({ subsets: ['latin'] })


export function Main() {
  const [foo, setFoo] = useState(0);
  const [state,setState] = useState([]);
  const [table,setTable] = useState([]);
  // 更新用の空配列、オブジェクトを使用する。
  const message = [];
  const message2 = [];
  // const message3 = [];
  const tableDate = [];
  // let totalInvestmentResult = [];
  // let finalAssetResult = [];
  let totalInvestmentResult = 0;
  let finalAssetResult = 0;



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
    table: table,

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

    // stateの中身（table)を変えるようにする。

    message.map((items) => {

      // console.log(table);

      totalInvestmentResult = Number(items.principal);
      finalAssetResult = Number(items.principal);



      if (items.id === prevItems.id) {

        // console.log(totalInvestmentResult);
        // console.log(finalAssetResult);

        // 初期値
        tableDate.push({...table,
          // id: items.id,
          year: 0,
          totalInvestmentResult:totalInvestmentResult,
          finalAssetResult:finalAssetResult
        });



        for (let i = 1; i <= Number(items.investmentPeriod); i++){

          


          // 合計投資額
          totalInvestmentResult = (totalInvestmentResult + Number(items.monthlyMoney) * 12);


          // 増配率は翌年以降に適用する（一年複利計算）。
          finalAssetResult = (finalAssetResult + Number(items.monthlyMoney) * 12) * (1 + Number(items.annualInterest / 100) * (1 + Number(items.IncreaseDecreaseRate) * (i-1) / 100));

          tableDate.push({...table,
            // id: items.id,
            year: i,
            totalInvestmentResult:totalInvestmentResult,
            finalAssetResult:finalAssetResult
          });

        };
        // setTable((table) => tableDate);

        message2.push({...items, 
          table : tableDate,
          totalInvestment : totalInvestmentResult,
          finalAsset: finalAssetResult,
          bottomLine: (finalAssetResult - totalInvestmentResult),
          returnOnAssets: ((finalAssetResult - totalInvestmentResult) / finalAssetResult * 100),
        });

      } else {
        message2.push(items);
      }
    });
    console.log(message2);
    setState((state) => message2);
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
    // console.log(message);
    // console.log(state);
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
              {/* <h3>結果</h3> */}
              {items.totalInvestment !== 0 ? (
                <div>
                  <h3>合計投資額:{items.totalInvestment}</h3>
                  <p>最終資産額:{items.finalAsset}</p>
                  <p>最終利益:{items.bottomLine}</p>
                  <p>総資産利益率:{items.returnOnAssets}%</p>

                  {/* グラフ作成用 */}
                  <div>
                    <TableGenerate items={items} />
                  </div>
                  <div>
                    <Chart table={items.table} items={items} />
                  </div>
                </div>
              ) : (
                <div>入力してください</div>
              )}
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
