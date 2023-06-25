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
            <th className={classes.th}>年数</th>
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
                <td className={classes.td}>{Math.round(items.totalInvestmentResult)}円</td>
                <td className={classes.td}>{Math.round(items.finalAssetResult)}円</td>
                <td className={classes.td}>+{Math.round(items.bottomLine)}円</td>
                <td className={classes.td}>{Math.round(items.returnOnAssets)}%</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>

  )
}
