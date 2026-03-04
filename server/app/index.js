// This area is for importing necessary modules and setting up the server. You can add more code here as needed.

const express = require("express");




// Create an instance of the Express application
const app = express();

// Use middleware to parse JSON request bodies. This allows the server to understand and process incoming JSON data.
app.use(express.json());
// 
app.use(express.urlencoded({extended:true}));









// API end points and routes will be defined here. You can add more routes as needed.
// / Define a route for the root URL ("/") that sends a JSON response with a message

// <--  body parser-->
app.get("/",(request,response)=>{
    console.log("Hello World");
    return(
        response.json({
            message:"Hello World"
        })
    )
})

app.post("/api/users",(request,response)=>{
    console.log("Hello World");
    console.log(request.body);
    return(
        response.json({
            message:"body parser received"
        })
    )
})
// Define a route for the URL "/api/user/:userid" that captures a URL parameter "userid" and sends a JSON response with a message
app.get("/api/user/:userid",(req,res)=>{
    console.log(req.params);
    return(
        res.json({
            message:"url params received"
        })
    )
})

// Define a route for the URL "/api/user" that captures query parameters and sends a JSON response with a message 
app.get("/api/user",(req,res)=>{
    console.log(req.query);
    return(
        res.json({
            message:"query params received"
        })
    )
})

app.post("/api/abcd",(req,res)=>{
    console.log(req.body);
    return(
        res.json({
            message:"query params received"
        })
    )
})
// Define a port number for the server to listen on
const PORT = 4000;
// Start the server and listen on the specified port
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

console.log("Hello ..!!");

