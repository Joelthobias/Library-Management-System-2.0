var db = require('../config/connection')
var ObjectId = require("mongodb").ObjectID;
module.exports = {
    addbook: (book, callback) => {
        book.bk_id = parseInt(book.bk_id)
        book.price = parseInt(book.price)
        db.get().collection("book").insertOne(book).then((data) => {
            callback(true)
        })
    },
    viewbooks: () => {
        return new Promise(async (resolve, reject) => {
            let book = await db.get().collection('book').find().toArray()
            resolve(book);
        })
    },
    viewbook: (id) => {
        return new Promise(async (resolve, reject) => {
            id = parseInt(id)
            let book = await db.get().collection('book').findOne({bk_id: id})
            resolve(book)
            console.log(id);
        })
    },
    deletebook: (id) => {
        return new Promise(async (resolve, reject) => {
            id = parseInt(id)
            db.get().collection('book').deleteOne({id: id}).then(() => {
                resolve(true)
            })
        })
    },
    updatebook: (id, book) => {
        // let price=parseInt(pro.price)
        book.price = parseInt(book.price)
        book.bk_id = parseInt(book.bk_id)
        console.log(book);
        return new Promise((resolve, reject) => {
            db.get().collection('book').updateOne({
                bk_id: book.bk_id
            }, {
                $set: {
                    bk_id: book.bk_id,
                    title: book.title,
                    author: book.author,
                    yop: book.yop,
                    price: book.price,
                    pub: book.pub
                }
            }).then((response) => {
                resolve(response);
                // console.log(product);
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
    rendbook: (body) => {
        body.status = false
        body.mem_id=parseInt(body.mem_id)
        body.bk_id=parseInt(body.bk_id)
        console.log(body);
        return new Promise((resolve, reject) => {
            db.get().collection('rendbook').insertOne(body).then(() => {
                console.log("DONE");
                resolve(true)
            })

        })
    },
    findrend: (id) => {
        id=parseInt(id)
        return new Promise(async (resolve, reject) => {
            let rend = await db.get().collection('rendbook').find({mem_id: id}).toArray()
            resolve(rend)

        })
    }
}
