
var db=require('../config/connection')
var ObjectId = require("mongodb").ObjectID;
module.exports={
    addbook:(book,callback)=>{
        book.id=parseInt(book.id)
        book.price=parseInt(book.price)
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
            id=parseInt(id)
            let book=await db.get().collection('book').findOne({id:id})
            resolve(book)
        })
    },
    deletebook:(id)=>{
        return new Promise(async(resolve,reject)=>{
            id=parseInt(id)
            db.get().collection('book').deleteOne({id:id}).then(()=>{
                resolve(true)
            })
        })        
    },
    updatebook: (id, book) => {
    // let price=parseInt(pro.price)
    book.price=parseInt(book.price)
    return new Promise((resolve, reject) => {
      db.get()
        .collection('book').updateOne({ _id:ObjectId(id) },
          {
            $set: {
              bk_name: book.bk_name,
              au_name: book.au_name,
              price: book.price,
              lg: book.lg,
              dop:book.dop,
              cat:book.cat,
              pub:book.pub,
              img:book.img,
              nop:book.nop
            },
          }
        )
        .then((response) => {
          resolve(response);
          //   console.log(product);
        });
    });
  },
    getbookcount: () => {
        return new Promise(async (resolve, reject) => {
        let cart = 0;
        cart = await db.get().collection('book').countDocuments();
        console.log(cart);
        resolve(cart)
        });
  },
  rendbook:(body)=>{
    return new Promise ((resolve,reject)=>{
      db.get().collection('rendbook').insertOne(body).then(()=>{
      console.log(body);
      resolve(true)
      })

    })
  },
  findrend:(id)=>{
    return new Promise (async(resolve,reject)=>{
      let rend=await db.get().collection('rendbook').find({mem_id:id}).toArray()
      resolve(rend)
      
    })
  }      
}