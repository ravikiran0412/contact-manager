const bodyParser = require('body-parser');
const express= require('express')
const path= require ('path');
const port =8000

const db = require('./config/mongoose')
const Contact = require('./models/contact')
const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('assets'));

//middleware
// app.use(function(req,res,next){
//     console.log('middleware test');
//     next();
// })
// //middleware 2
// app.use(function(req,res,next){
//     console.log("middleware 2");
//     next();
// })

var contactlist =[
    {
        name: "Ravi",
        phone: "655575656"
    },
    {
        name:"kiran",
        phone:"223122222"
    },
    {
        name:"nnknknn",
        phone:"55121154"
    }
]

app.get('/',function(req,res){

    Contact.find({}).then(contacts=>{
        
            //console.log('error in fetching contacts from db');
            //return;
        
        return res.render('home',{tittle:"My contact List",
    contact_list:contacts
});
    })
    
})





app.get('/test',function(req,res){
    return res.render('test',{tittle:"playing around with ejs"});
});

// app.post('/create-contact',function(req,res){
//     // contactlist.push({
//     //     name:req.body.name,
//     //     phone:req.body.phone

//     // });
//     Contact.create({
//         name: req.body.name,
//         phone:req.body.phone
//     }, function(err,newContact){
//         if(err){
//             console.log('error in contact cration');
//             return;
//         }
//         console.log('********',newContact);
//         return res.redirect('back')
//     })
//     //return res.redirect('back')
// })
app.post('/create-contact', function (req, res) {
    Contact.create({
      name: req.body.name,
      phone: req.body.phone,
    })
      .then((newContact) => {
        console.log('********', newContact);
        return res.redirect('back');
      })
      .catch((err) => {
        console.log('error in contact creation:', err);
        return res.redirect('back');
      });
  });

// app.get('/delete-contact',function(req,res){

//     let id= req.query.id;

//     Contact.findByIdAndDelete(id).then(function(Contact){
//         console.log(Contact)
//         return res.redirect('back');
//     }).catch(function(err){
//         console.log('error while add',err)
//         return res.redirect('back')
//     })
        
    
    


    //})


app.get('/delete-contact',function(req,res){
    let id= req.query.id;

    Contact.findByIdAndDelete(id).then(function(contact){
        console.log(Contact);
        return res.redirect('back');
    }).catch(function(err){
        console.log('error while adding to delte tle con');
        return res.redirect('back')
    })
})

app.listen(port,function(err){
    if(err)
    {
        console.log('error',err);
        return
    }
    console.log('its running mannn on port',port)

})