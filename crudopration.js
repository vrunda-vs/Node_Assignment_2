const Pool=require("pg").Pool
const pool=new Pool({
    host:"localhost",
    user:"postgres",
    database:"demo",
    password:"123456",
    port:5432
})

const getDetails=(req,res)=>{
    pool.query("select car_id,car_name,model_name,make_name from car left join make on car.make_id=make.make_id left join model on car.model_id=model.model_id",(err,result)=>{
        if(err)
        {
            throw err
        }
        if(result.rowCount<=0)
        {
            res.json("No data Found")
        }
        else{
        res.status(200).json(result.rows)
        }

    })
}

const getDetailsByID=(req,res)=>{
    const id=parseInt(req.params.id)
    pool.query("select car_id,car_name,model_name,make_name from car left join make on car.make_id=make.make_id left join model on car.model_id=model.model_id where car.car_id=$1",[id],(err,result)=>{
        if(err)
        {
            throw err
        }    
       
        if(result.rowCount<=0)
        {
            res.json("No data Found")
        }
        else{
        res.status(200).json(result.rows)
        }

    })
}


module.exports={
    getDetails,
    getDetailsByID
}