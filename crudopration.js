const Pool=require("pg").Pool
const pool=new Pool({
    host:"localhost",
    user:"postgres",
    database:"demo",
    password:"123456",
    port:5432
})

const getDetails=(req,res)=>{
    pool.query("select car_id,car_name,model_name,make_name from car,make,model where car.make_id=make.make_id and car.model_id=model.model_id",(err,result)=>{
        if(err)
        {
            throw err
        }
        res.status(200).json(result.rows)
    })
}

const getDetailsByID=(req,res)=>{
    const id=parseInt(req.params.id)
    pool.query("select car_id,car_name,model_name,make_name from car,make,model where  car.make_id=make.make_id and car.model_id=model.model_id and car.car_id=$1",[id],(err,result)=>{
        if(err)
        {
            throw err
        }    
        res.status(200).json(result.rows)
    

    })
}


module.exports={
    getDetails,
    getDetailsByID
}