import Image from 'next/image'
import { Inter } from 'next/font/google'
import classes from '@/components/Footer/Footer.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export function Footer() {
  return (
    <>
      <div className={classes.footer}>
        <p className={classes.inner}>初心者投資家のための複利計算</p>
      </div>
    </>
  )
}
