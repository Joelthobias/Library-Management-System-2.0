var express = require('express');
var router = express.Router();
var base64=require('image-to-base64');
var fs=require('fs')
const bookHelpers = require('../helpers/book-helpers');
var bookhelper=require('../helpers/book-helpers')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/add-book',(req,res)=>{
  res.render('add-book')
})
router.post('/add-book',(req,res) => {
    let image=req.files.img
    let name = req.files.img.name

  image.mv('./public/img/'+name,(err,done)=>{
    if(!err){
      base64("./public/img/"+name).then((response) => {
            let data =req.body
            data.img=response
            bookHelpers.addbook(data,(result)=>{
              fs.unlink("./public/img/" + name, (err) => {
                if (err) throw err;
                console.log("file deleted");
                });
              res.redirect('/add-book')
            })
        }
    )
    .catch(
        (error) => {
            console.log(error); // Logs an error if there was one
        }
    )
    
    }else{
      console.log(err);
    }
  })

  
})

router.get('/view-books',(req,res)=>{
  bookHelpers.viewbooks().then((book)=>{
        res.render('view-books',{book})    
  })

})
module.exports = router;
