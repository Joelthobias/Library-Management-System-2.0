var express = require('express');
var router = express.Router();
var base64=require('image-to-base64');
var fs=require('fs')
const bookHelpers = require('../helpers/book-helpers');
const memberHelpers=require('../helpers/member-helpers')


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

router.get('/view-books',(req,res,next)=>{
  bookHelpers.viewbooks().then((book)=>{
        res.render('view-books',{book})  
  })  
}),

router.get('/view-book/:id',(req,res)=>{
  let id=req.params.id
  bookHelpers.viewbook(id).then((result)=>{
    res.render('view-book',{result})
  })
  
}),

router.get('/del-book/:id',(req,res)=>{
    let id=req.params.id
    console.log(id);
    bookHelpers.deletebook(id).then(()=>{
      res.redirect('/view-books')
    })
}),


router.get('/edit-book/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id);
    let result=await bookHelpers.viewbook(id)
      res.render('edit-book',{result})
    
}),


router.post('/edt-book/:id',(req,res)=>{
    let id=req.params.id
    let image=req.files.img
    let name = req.files.img.name
    image.mv('./public/img/'+name,(err,done)=>{
        if(!err){
          base64("./public/img/"+name).then((response) => {
                let data =req.body
                data.img=response
                  bookHelpers.updatebook(id,data).then(()=>{
                    fs.unlink("./public/img/" + name, (err) => {
                      if (err) throw err;
                        console.log("file deleted");
                    });
                    res.redirect('/view-books')
                  })
          }).catch((error) => {
                console.log(error); // Logs an error if there was one
            })
        }else{
          console.log(err);
        }
    })
}),

router.get('/view-membs',(req,res)=>{

      memberHelpers.viewmembers().then((members)=>{
        res.render('member/view-members',{members})
        // console.log(members);
        // res.send('hi')
      })
  

}),

router.get('/add-membs',(req,res)=>{
memberHelpers.getmembercount().then((count) => {
    let counts = count + 101
    res.render('member/add-member',{counts})

})
}),

router.post('/add-membs',(req,res)=>{
  let data=req.body
  console.log(data);
  memberHelpers.addmember(data).then(()=>{
    res.redirect('/add-membs')
  })
}),
router.get('/view-member/:id',(req,res)=>{
  let id=req.params.id
  memberHelpers
  memberHelpers.viewmember(id).then((member)=>{
    console.log(member);
    res.render('member/view-member',{member})
  })
  
})

module.exports = router;
