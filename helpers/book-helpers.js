var db=require('../config/connection')

module.exports={
    addbook:(book,callback)=>{
        db.get().collection("book").insertOne(book).then((data)=>{
            callback(true)
        })
    },
    viewbooks:()=>{
        return new Promise(async(resolve,reject)=>{
            let book=await db.get().collection('book').find().toArray()
            resolve(book);
        })
    }
}