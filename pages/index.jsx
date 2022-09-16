import react, { Component } from 'react'
import Head from 'next/head'
import utilsStyle from '../styles/utils.module.css'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/Layout/layout'


export default class Home extends Component {
  //we use es6 destructuring to destructure the allPostData
  constructor(props){
    super(props)
  }

  render() {
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
          <p>
            <Link href='/posts/second-post'>click to see my sever side rendering post </Link>
          </p>
        </section>
      </Layout>
    )
  }
}

//To create a custom 404 page, create pages/404.js. This file is statically generated at build time.

