const express=require("express")
const bodyParser=require("body-parser")
const db=require("./crudopration")
var multer  = require('multer');
const app=express()
const port=4000
const Pool=require("pg").Pool
const pool=new Pool({
    host:"localhost",
    user:"postgres",
    database:"demo",
    password:"123456",
    port:5432
})

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// file uploading
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/images');
  },
  filename: (req, file, cb) => {
    //console.log(file);
    var filetype = '';
    if(file.mimetype === 'image/gif') {
      filetype = 'gif';
    }
    if(file.mimetype === 'image/png') {
      filetype = 'png';
    }
    if(file.mimetype === 'image/jpeg') {
      filetype = 'jpg';
    }
    cb(null, 'image-' + Date.now() + '.' + filetype);
  }
});
var upload = multer({ storage: storage });

//file uploading
app.post('/upload/:id', upload.single('profilepicture'), function (req, res, next) {
  const id = parseInt(req.params.id);
  if (!req.file) {
    res.status(500);
    return next(err);
  } 
  //let filename = req.file.filename
  //db.callback(id, filename);
  res.json({ fileUrl: 'http://localhost:3000/images/' + req.file.filename});
  let date_ob = new Date();
  //add image in imagetable
  pool.query("insert into carimage values($1,$2,$3)",[req.file.filename,id,date_ob.getDate()+'/'+date_ob.getMonth()+1+'/'+date_ob.getFullYear()],(err,res)=>{
    if(err)
    {
      throw err
    }
  })
  
  
})



app.get('/',(req,res)=>{
    res.json({json:'welcome'})
})

app.get('/getDetails',db.getDetails)
app.get('/getDetailsByID/:id',db.getDetailsByID)
app.get('/getcarImage/:id',db.getcarImage)
app.post('/createdata',db.createdata)
app.put('/updatedata/:id',db.updatedata)
app.delete('/deletedata/:id',db.deletedata)



app.listen(port,()=>{
    console.log("server is running on port number :3000")
})

