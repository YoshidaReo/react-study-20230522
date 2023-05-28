import Image from 'next/image'
import { Inter } from 'next/font/google'
import classes from '@/components/Header/Header.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export function Header() {
  return (
    <>
      <div className={classes.header}>
        <h2>計算一覧</h2>
        <Link href="#" className={classes.inner}>
          設定
        </Link>
      </div>
    </>
  )
}
