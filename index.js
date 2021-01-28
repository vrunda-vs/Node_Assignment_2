const express=require("express")
const bodyParser=require("body-parser")
const db=require("./crudopration")

const app=express()
const port=3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/',(req,res)=>{
    res.json({json:'welcome'})
})

app.get('/getDetails',db.getDetails)
app.get('/getDetailsByID/:id',db.getDetailsByID)
app.post('/createdata',db.createdata)
app.put('/updatedata/:id',db.updatedata)
app.delete('/deletedata/:id',db.deletedata)


app.listen(port,()=>{
    console.log("server is running on port number :3000")
})

