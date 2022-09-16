// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//API Routes let you create an API endpoint inside a Next.js app. 
//You can do so by creating a function inside the pages/api directory 
//that has the following format:
//They can be deployed as Serverless Functions (also known as Lambdas).

//This can be a GET, POST, PUT PATCH or DELETE request. (Any http request)
export default function handler(req, res) {
  res.status(200).json({ name: 'Collins ihezie' })
}

/*
Do Not Fetch an API Route from getStaticProps or getStaticPaths
You should not fetch an API Route from getStaticProps or getStaticPaths. 
Instead, write your server-side code directly in getStaticProps or 
getStaticPaths (or call a helper function).

Here’s why: getStaticProps and getStaticPaths run only on the server-side 
and will never run on the client-side. Moreover, these functions will not 
be included in the JS bundle for the browser. That means you can write 
code such as direct database queries without sending them to browsers. 
Read the Writing Server-Side code documentation to learn more.
*/
/*
A Good Use Case: Handling Form Input
A good use case for API Routes is handling form input. 
For example, you can create a form on your page and have 
it send a POST request to your API Route. You can then write 
code to directly save it to your database. The API Route code 
will not be part of your client bundle, so you can safely 
write server-side code.
*/


//access at http://localhost:3000/api/api
