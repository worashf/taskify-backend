 const  {MongoClient} = require("mongodb")

 let db_uri = "mongodb://127.0.0.1:27017/truetaskerdb"
 let db_name ="truetaskerdb"
 let client = new MongoClient(db_uri)
exports.dbConnect =async() =>{
    try{
        await  client.connect()
         let db  = client.db(db_name)
         return  {client,db}
    }
    catch(err){
    throw  new Error(err)
    }
}