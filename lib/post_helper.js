/*
Next, we’ll create a utility function for parsing data from the file system. With this utility function, we’d like to:

Parse each markdown file and get title, date, and file name (which will be used as id for the post URL).
List the data on the index page, sorted by date.
 */
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postDirectory = path.join(process.cwd(), 'posts')

export function getSortedData(){
    // get files names under /posts
    const fileNames = fs.readdirSync(postDirectory)

    const allPostsData = fileNames.map((fileName) => {
        //remove ".md" from the file to get id
        const id = fileName.replace(/\.md$/, '')
        
        //read markdown file as string
        const fullPath = path.join(postDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf-8')

        //use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents)

        //combine the data with id
        return {
            id,
            ...matterResult.data
        }
    })

    //sorts posts by date
    return allPostsData.sort(({ date: a }, { date: b }) => {
        if(a < b){
            return 1
        } else if(a > b){
            return -1
        } else {
            return 0
        }

    })
}

export function getAllPostIds(){
    const fileNames = fs.readdirSync(postDirectory)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]

    /*
    Important: The returned list is not just an array of strings — 
    it must be an array of objects that look like the comment above. 
    Each object must have the params key and contain an object with 
    the id key (because we’re using [id] in the file name). Otherwise, 
    getStaticPaths will fail
    */

     return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
     })

}

export function getPostData(id){
    //here we using the name of the file as id
    const fullPath = path.join(postDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
        id,
        ...matterResult.data
    }
}