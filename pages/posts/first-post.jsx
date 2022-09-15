import { Component } from "react";
import Link from "next/link";
import Head from "next/head";
import Script from "next/script";
import Layout from "../../components/Layout/layout";
import { getSortedData } from "../../lib/post_helper";
import utilsStyle from '../../styles/utils.module.css'

//The component can have any name, but you must export it as a default export.
export default class FirstPost extends Component{
    constructor(props){
        super(props)
    
        this.state = {
          posts: props.posts
        }
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
       <section className={`${utilsStyle.headingMd} ${utilsStyle.padding1px}`}>
          <h2 className={ utilsStyle.headingLg }>Blog</h2>
          <ul className={ utilsStyle.list }>
             { this.state.posts.map(({ id, date, title }) => (
              <li className={ utilsStyle.listItem } key={ id }>
                { title }
                <br />
                { id }
                <br />
                { date }
              </li>
             ))}
          </ul>
        </section>            <h2>
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
/*
Two Forms of Pre-rendering
Next.js has two forms of pre-rendering: Static Generation and Server-side Rendering. The difference is in when it generates the HTML for a page.

Static Generation is the pre-rendering method that generates the HTML at build time. The pre-rendered HTML is then reused on each request.
Server-side Rendering is the pre-rendering method that generates the HTML on each request.
Hydration is the process of pre-rendering html pages and making it interactive when the javasacript loads.
Per-page Basis
Importantly, Next.js lets you choose which pre-rendering form to use for each page. You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.
*/

/*
When to Use Static Generation v.s. Server-side Rendering
We recommend using Static Generation (with and without data) whenever possible because your page can be built once and served by CDN, which makes it much faster than having a server render the page on every request.

You can use Static Generation for many types of pages, including:

Marketing pages
Blog posts
E-commerce product listings
Help and documentation
You should ask yourself: "Can I pre-render this page ahead of a user's request?" If the answer is yes, then you should choose Static Generation.

On the other hand, Static Generation is not a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.

In that case, you can use Server-side Rendering. It will be slower, but the pre-rendered page will always be up-to-date. Or you can skip pre-rendering and use client-side JavaScript to populate frequently updated data.
 */
/*
How does it work? Well, in Next.js, when you export a page component, you can also export an async function called getStaticProps. If you do this, then:

getStaticProps runs at build time in production, and…
Inside the function, you can fetch external data and send it as props to the page.
 */ 

export async function getStaticProps(){
    // Get external data from the file system, API, DB, etc.
    const allPostData = getSortedData()
    console.log(allPostData);

    // The value of the `props` key will be
    //  passed to the `Home` component
    //  By returning allPostsData inside the props object in 
    //  getStaticProps, the blog posts will be passed to the Home 
    //  component as a prop.
    return {
      props: {
        "posts": allPostData,
      }
    }
}

//Note: In development mode, getStaticProps runs on each request instead.
// Note: Next.js polyfills fetch() on both the client and server. You don't need to import it.
/*
You can also query the database directly: 
  This is possible because getStaticProps only runs on the server-side. 
  It will never run on the client-side. It won’t even be included 
  in the JS bundle for the browser. That means you can write code 
  such as direct database queries without them being sent to browsers.
*/
/* Note : Only Allowed in a Page
getStaticProps can only be exported from a page. You can’t export it from non-page files.
One of the reasons for this restriction is that React needs to have all the required data before the page is rendered.
*/