const request=require('request');

const forecast=(latitude,longtitude,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=115ea591ea630ee3b90ef2d2aa7483dd&query="+latitude+","+longtitude
    request({url:url,json:true},(error,response)=>{
        if(error)
        callback("cannot connect to weather",undefined)
        else if(response.body.error)
        callback("cannot find weather of location",undefined)
        else
        callback(undefined,response.body.current.temperature)

    })
}
module.exports=forecast;