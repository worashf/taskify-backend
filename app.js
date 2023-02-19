const  express =require("express")
const cors  = require("cors")
const auth  = require("./src/routes/authRoutes")
const app  = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// authentication routes 
app.use("/api/v1",auth )

module.exports= app
