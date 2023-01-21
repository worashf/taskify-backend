const dotenv =  require("dotenv")
const app = require("./app")


dotenv.config({path:"src/configs/config.env"})




const server = app.listen(process.env.SERVER_PORT, ()=>{
console.log(`Server is started at ${process.env.SERVER_PORT}`);
})