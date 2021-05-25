const { ObjectId } = require('bson')
var db=require('../config/connection')

module.exports={
    addbook:(book,callback)=>{
        let price=parseInt(book.price)
        db.get().collection("book").insertOne(book).then((data)=>{
            callback(true)
        })
    },
    viewbooks:()=>{
        return new Promise(async(resolve,reject)=>{
            let book=await db.get().collection('book').find().toArray()
            resolve(book);
        })
    },
    viewbook:(id)=>{
        return new Promise(async(resolve,reject)=>{
            let book=await db.get().collection('book').findOne({_id:ObjectId(id)})
            resolve(book)
        })
    },
    deletebook:(id)=>{
        return new Promise(async(resolve,reject)=>{
            db.get().collection('book').deleteOne({_id:ObjectId(id)}).then(()=>{
                resolve(true)
            })
        })        
    },
    updatebook: (id, book) => {
    // let price=parseInt(pro.price)
    let price=parseInt(book.price)
    return new Promise((resolve, reject) => {
      db.get()
        .collection('book').updateOne({ _id:ObjectId(id) },
          {
            $set: {
              bk_name: book.bk_name,
              au_name: book.au_name,
              price: price,
              lg: book.lg,
              dop:book.dop,
              cat:book.cat,
              pub:book.pub,
            },
          }
        )
        .then((response) => {
          resolve(response);
          //   console.log(product);
        });
    });
  },
}