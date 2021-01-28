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

const createdata=(req,res)=>{
    let cardata=req.body;
    pool.query("select * from car where car_name=$1",[cardata.car_name],(err,result)=>{

        if(err)
        {
            throw err
        }
        else{
            if(result.rowCount<=0)
            {
                pool.query("select make_id from make where make_name=$1",[cardata.make_name],(err1,result1)=>{

                    if(err1)
                    {
                        throw err1
                    }
                    else{
                        if(result1.rowCount<=0)
                        {
                           pool.query("insert into make values($1)",[cardata.make_name],(err2,result2)=>{
                               if(err2)
                               {
                                   throw err2
                               }
                               
                           })
                        }
                    }
                })
                 pool.query("select * from model where model_name=$1",[cardata.model_name],(err3,result3)=>{
                    if(err3)
                     {
                       throw err3
                     }
                    else
                       {
                            if(result3.rowCount<=0)
                                {
                                    pool.query("insert into model values($1)",[cardata.model_name],(err4,result4)=>{
                                        if(err4)
                                        {
                                            throw err4
                                         }                                      
                                    })
                                }
                                
                        }
                   })
                  

                pool.query("select make_id from make where make_name=$1",[cardata.make_name],(err5,result5)=>{
   
                   pool.query("select model_id from model where model_name=$1",[cardata.model_name],(err6,result6)=>{
                   
                     
                                   // res.status(200).json({val:result5.rows[0].model_id,val2:result6.rows[0].make_id})
                        

                            pool.query("insert into car values($1,$2,$3)",[cardata.car_name,result5.rows[0].make_id,result6.rows[0].model_id],(err5,result5)=>{
                                if(err5)
                                {
                                    throw err5
                                }
                                else{
                                    res.status(200).json("Added Succesfully")
                                }
                            })
                        
                        })
                   
                   })      
                                       
                //res.json("No data Found")
            }
            else{
            res.status(200).json("this name is already exits please try another")
            }
        }
    })

    // pool.query("insert into car values($1,$2,$3,$4)",[parseInt(cardata.car_id),cardata.car_name,cardata.make_id,cardata.model_id],(err,result)=>{
    //     if(err)
    //     {
    //         throw err
    //     }
    //     res.status(200).json("record submited succesfully")
    // })

}

const updatedata=(req,res)=>{
    const id=parseInt(req.params.id)
    let cardata=req.body;

    pool.query("select * from car where car_id=$1",[id],(err,result)=>{
        if(err)
        {
            throw err
        }
        else
        {
            if(result.rowCount<=0)
            {
                res.status(200).json("No record found")
            }
            else{
                //check for make_id
                pool.query("select make_id from make where make_name=$1",[cardata.make_name],(err1,result1)=>{

                    if(err1)
                    {
                        throw err1
                    }
                    else{
                        if(result1.rowCount<=0)
                        {
                           pool.query("insert into make values($1)",[cardata.make_name],(err2,result2)=>{
                               if(err2)
                               {
                                   throw err2
                               }
                               
                           })
                        }
                    }
                })
                
                //check for model_id
                pool.query("select * from model where model_name=$1",[cardata.model_name],(err3,result3)=>{
                    if(err3)
                     {
                       throw err3
                     }
                    else
                       {
                            if(result3.rowCount<=0)
                                {
                                    pool.query("insert into model values($1)",[cardata.model_name],(err4,result4)=>{
                                        if(err4)
                                        {
                                            throw err4
                                         }                                      
                                    })
                                }
                                
                        }
                   })

                //update data
                pool.query("select make_id from make where make_name=$1",[cardata.make_name],(err5,result5)=>{
   
                    pool.query("select model_id from model where model_name=$1",[cardata.model_name],(err6,result6)=>{
                    
                      
                         //          res.status(200).json({val:result5.rows[0].make_id,val2:result6.rows[0].model_id})
                         
        
                             pool.query("update car set car_name=$1,make_id=$2,model_id=$3 where car_id=$4",[cardata.car_name,result5.rows[0].make_id,result6.rows[0].model_id,id],(err5,result5)=>{
                                 if(err5)
                                 {
                                     throw err5
                                 }
                                 else{
                                     res.status(200).json("Updated  Succesfully")
                                 }
                             })
                         
                         })
                    
                    })      
        
        
            }
        }
        

    })

       
          
    // pool.query("update car set car_name=$1,make_id=$2,model_id=$3 where car_id=$4",[cardata.car_name,cardata.make_id,cardata.model_id,id],(err,result)=>{
    //     if(err)
    //     {
    //         throw err
    //     }
    //     res.status(200).json("Updated Succesfully")
    // })
}
const deletedata=(req,res)=>{
    const id=parseInt(req.params.id)
    pool.query("delete from car where car_id=$1",[id],(err,result)=>{
        if(err)
        {
            throw err
        }
        
        res.status(200).json("record deleted succesfully")
    })
}


module.exports={
    getDetails,
    getDetailsByID,
    createdata,
    updatedata,
    deletedata
}