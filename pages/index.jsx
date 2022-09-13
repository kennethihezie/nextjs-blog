import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import utilsStyle from '../styles/utils.module.css'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/Layout/layout'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{ siteTitle }</title>
      </Head>

      <section className={ utilsStyle.headingMd }>
        <p>Am a software developer driven by curiosity</p>
        <p>
        (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
        <p>
          <Link href='/posts/first-post'>click to see my post </Link>
        </p>
      </section>
    </Layout>
  )
}
