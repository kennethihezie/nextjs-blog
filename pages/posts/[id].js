// Also, remove first-post.js inside the pages/posts directory — we’ll no longer use this.

import { Component } from "react";
import Layout from "../../components/Layout/layout";
import { getAllPostIds, getPostData } from "../../lib/post_helper";

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
               { this.state.post.title }
               <br/>
               { this.state.post.id }
               <br/>
               { this.state.post.date }
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
}
//use getStaticProps to fill in data to our component.
export async function getStaticProps({ params }){
   //getPostData using id.
   const postData = getPostData(params.id)

   return {
    props: {
        postData
    }
   }
}