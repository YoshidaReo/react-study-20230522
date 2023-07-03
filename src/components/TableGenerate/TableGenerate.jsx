import { Inter } from 'next/font/google'
import classes from '@/components/TableGenerate/TableGenerate.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export function TableGenerate(props) {
  return (
    <>
      <table className={classes.table}>
        <thead>
          <tr>
            <th className={classes.th}>経過年数</th>
            <th className={classes.th}>投資額</th>
            <th className={classes.th}>資産額</th>
            <th className={classes.th}>利益額</th>
            <th className={classes.th}>利益率</th>
          </tr>
        </thead>
        <tbody>

          {props.items.table.map((items) => {
            return (
              <tr key={items.year}>
                <td className={classes.td}>{items.year}年目</td>
                <td className={classes.td}>{Math.round(items.totalInvestmentResult).toLocaleString()}円</td>
                <td className={classes.td}>{Math.round(items.finalAssetResult).toLocaleString()}円</td>
                <td className={classes.td}>{items.bottomLine > 0 ? (<>+</>):(<></>)}{Math.round(items.bottomLine).toLocaleString()}円</td>
                <td className={classes.td}>{Math.round(items.returnOnAssets*10)/10}%</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>

  )
}
