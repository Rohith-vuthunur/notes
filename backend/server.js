const express = require('express')
const useroutes = require('./routes/useroutes')
const app = express()
app.use(express.json());
const cors = require("cors")
app.use(cors())
// app.use(cors({ origin: "http://localhost:3000" }));

const dotenv = require('dotenv')
dotenv.config()

const mongoose = require('mongoose')

app.use(express.json())
mongoose.connect(process.env.mongourl)
.then(()=>{
    console.log('connected')
    app.listen(process.env.PORT||8000,(err)=>{
        if (err){
            console.log(err)
        }
        console.log(`app running at ${process.env.PORT}`)
    })
})
.catch((err)=>
    {console.log("error occured",err)
        
    })
app.use("/api",useroutes)
app.get("/",(req,res)=>{
    res.json("welcome to notes")
})