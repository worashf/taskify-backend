const  express =require("express")

app  = express()

app.use(express.json())
 app.use("/",(req,res)=>{
    res.send({
      success: true,
      message:"Hello EasyTasker"
    })
 })

module.exports= app
