var db=require('../config/connection')
var ObjectId = require("mongodb").ObjectID;
module.exports={
    
    addmember:(data)=>{
        data.id=parseInt(data.id)
        data.rb_id=parseInt(data.rb_id)

        return new Promise(async(resolve,reject)=>{
            db.get().collection('members').insertOne(data).then(()=>{
                resolve(true)
            })
        })
    },
    viewmembers:()=>{
        return new Promise(async(resolve,reject)=>{
            let book=await db.get().collection('members').find().sort({id:1}).toArray()
            resolve(book);
        })  
    },
    viewmember:(id)=>{
        return new Promise(async(resolve,reject)=>{
            id=parseInt(id)
            let member=await db.get().collection('members').findOne({id:id})
            resolve(member);
            console.log(member);
        })  
    },
    getmembercount: () => {
        return new Promise(async (resolve, reject) => {
        let cart = 0;
        cart = await db.get().collection('members').countDocuments();
        console.log(cart);
        resolve(cart)
        });
  },    

}