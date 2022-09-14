/*
Next, we’ll create a utility function for parsing data from the file system. With this utility function, we’d like to:

Parse each markdown file and get title, date, and file name (which will be used as id for the post URL).
List the data on the index page, sorted by date.
 */
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postDirectory = path.join(process.cwd(), 'posts')
console.log(postDirectory);

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