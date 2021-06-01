var db=require('../config/connection')
var ObjectId = require("mongodb").ObjectID;
module.exports={
    
    addmember:(data)=>{
        return new Promise(async(resolve,reject)=>{
            db.get().collection('members').insertOne(data).then(()=>{
                resolve(true)
            })
        })
    },
    viewmembers:()=>{
        return new Promise(async(resolve,reject)=>{
            let book=await db.get().collection('members').find().toArray()
            resolve(book);
        })  
    },
    viewmember:(id)=>{
        return new Promise(async(resolve,reject)=>{
            let member=await db.get().collection('members').findOne({_id: ObjectId(id)})
            resolve(member);
            console.log(member);
        })  
    }    

}