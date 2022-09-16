import { Component } from "react";
import Head from "next/head";
import Script from "next/script";
import Layout from "../../components/Layout/layout";
import utilsStyle from '../../styles/utils.module.css'

//The component can have any name, but you must export it as a default export.
export default class SecondPost extends Component{
    constructor(props){
        super(props)
    
        this.state = {
          img: props.img
        }
      }

    render(){
        return (
            <Layout>
            <Head>
                <title>Second Post</title>
            </Head>
            <Script
               src="https://connect.facebook.net/en_US/sdk.js"
               strategy="lazyOnload"
               onLoad={() => console.log('script loaded correctly, window.FB has been populated')}
            />
       <section className={`${utilsStyle.headingMd} ${utilsStyle.padding1px}`}>
          <p>This image link is diplayed for the server <a href={ this.state.img }>Click to see Image</a></p>
        </section>           

        </Layout>
        )
    }
}

//Using getServerSideProps to fetch an image.
export async function getServerSideProps(context){
   const img = await fetch("https://dog.ceo/api/breeds/image/random")
   .then(res => res.json())

   return {
    props: { 'img': img.message }
   }
}

/*
Client-side Rendering
If you do not need to pre-render the data, you can also use the following strategy (called Client-side Rendering):

Statically generate (pre-render) parts of the page that do not require external data.
When the page loads, fetch external data from the client using JavaScript and populate the remaining parts.

SWR
The team behind Next.js has created a React hook for data fetching called SWR. We highly recommend it if you’re fetching data on the client side. It handles caching, revalidation, focus tracking, refetching on interval, and more. We won’t cover the details here, but here’s an example usage:

import useSWR from 'swr';

function Profile() {
  const { data, error } = useSWR('/api/user', fetch);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {data.name}!</div>;
}
*/

