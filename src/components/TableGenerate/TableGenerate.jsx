import { Inter } from 'next/font/google'
import classes from '@/components/TableGenerate/TableGenerate.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export function TableGenerate(props) {
  return (
    <table>
      <thead>
        <tr>
          <th>年数</th>
          <th>投資額</th>
          <th>資産額</th>
        </tr>
      </thead>
      <tbody>

        {props.items.table.map((items) => {
          return (
            <tr key={items.year}>
              <td>{items.year}年目</td>
              <td>{Math.round(items.totalInvestmentResult)}円</td>
              <td>{Math.round(items.finalAssetResult)}円</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
