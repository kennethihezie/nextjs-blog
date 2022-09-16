// Also, remove first-post.js inside the pages/posts directory — we’ll no longer use this.

import Head from "next/head";
import { Component } from "react";
import DateComponent from "../../components/Date/DateComponent";
import Layout from "../../components/Layout/layout";
import { getAllPostIds, getPostData } from "../../lib/post_helper";
import utilsStyle from '../../styles/utils.module.css'

export default class Post extends Component {
    constructor(props){
        super(props)

        this.state = {
            post: props.postData
        }
    }


    render(){
        return (
            <Layout>
                <Head>
                    <title>{this.state.post.title}</title>
                </Head>
                <article>
                    <h1 className={ utilsStyle.headingXl }>{ this.state.post.title }</h1>
                    <div className={ utilsStyle.lightText }>
                        <DateComponent dateString={ this.state.post.date } />
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: this.state.post.contentHtml }}/>
                </article>
            </Layout>
        )
    }
}

//Now, here’s what’s new: We’ll export an async function called 
//getStaticPaths from this page. In this function, we need to 
//return a list of possible values for id

export async function getStaticPaths(){
   const paths = getAllPostIds()

   /*
   paths contains the array of known paths returned by getAllPostIds(), 
   which include the params defined by pages/posts/[id].js. 
   Learn more in the paths key documentation
   Ignore fallback: false for now — we’ll explain that later.
   */
   return {
    paths,
    fallback: false
   }
   /*
   Fallback
Recall that we returned fallback: false from getStaticPaths. What does this mean?

If fallback is false, then any paths not returned by getStaticPaths will result in a 404 page.

If fallback is true, then the behavior of getStaticProps changes:

The paths returned from getStaticPaths will be rendered to HTML at build time.
The paths that have not been generated at build time will not result in a 404 page. Instead, Next.js will serve a “fallback” version of the page on the first request to such a path.
In the background, Next.js will statically generate the requested path. Subsequent requests to the same path will serve the generated page, just like other pages pre-rendered at build time.
If fallback is blocking, then new paths will be server-side rendered with getStaticProps, and cached for future requests so it only happens once per path.

This is beyond the scope of our lessons, but you can learn more about fallback: true and fallback: 'blocking' in the fallback documentation.
   */
}
//use getStaticProps to fill in data to our component.
export async function getStaticProps({ params }){
   //getPostData using id.
   const postData = await getPostData(params.id)
   /*
   // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch('..');
  const posts = await res.json();
  return posts.map((post) => {
    return {
      params: {
        id: post.id,
      },
    };
  });
   */

   return {
    props: {
        postData
    }
   }
}

/*
Fetch External API or Query Database
Like getStaticProps, getStaticPaths can fetch data from any data source. 
In our example, getAllPostIds (which is used by getStaticPaths) may 
fetch from an external API endpoint:
*/