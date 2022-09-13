import { Component } from "react";
import Link from "next/link";
import Head from "next/head";
import Script from "next/script";
import Layout from "../../components/Layout/layout";

//The component can have any name, but you must export it as a default export.
export default class FirstPost extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <Layout>
            <Head>
                <title>First Post</title>
            </Head>
            {/* Adding JavaScript thirdparty files in a nextjs page */}
            {/* strategy controls when the third-party script should load. 
            A value of lazyOnload tells Next.js to load this particular 
            script lazily during browser idle time
            onLoad is used to run any JavaScript code immediately after 
            the script has finished loading. In this example, we log a 
            message to the console that mentions that the 
            script has loaded correctly */}
            <Script
               src="https://connect.facebook.net/en_US/sdk.js"
               strategy="lazyOnload"
               onLoad={() => console.log('script loaded correctly, window.FB has been populated')}
            />
            <h1>First Post</h1>
            <h2>
                {/* the / means index page */}
                {/* The Link component enables client-side navigation 
                between two pages in the same Next.js app.
                Client-side navigation means that the page 
                transition happens using JavaScript, which is 
                faster than the default navigation done by the browser. */}
                <Link href="/">Back to home</Link>
            </h2>
            </Layout>
        )
    }
}

//Simply create a JS file under the pages directory, and the path to the file becomes the URL path.
//If you need to link to an external page outside the Next.js app, just use an <a> tag without Link.