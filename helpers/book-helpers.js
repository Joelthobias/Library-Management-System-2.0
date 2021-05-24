var db=require('../config/connection')

module.exports={
    addbook:(book,callback)=>{
        db.get().collection("book").insertOne(book).then((data)=>{
            callback(true)
        })
    }
}