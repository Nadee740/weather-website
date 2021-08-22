const request=require('request')

const geocode=(address,callback)=>{
    const urlgeocoding="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address) +".json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoibmFkZWVtMTgiLCJhIjoiY2tzNXlwZmt2MDVxbzJxcXllaWN5bnJsbCJ9.SL0Va1ZW4vD3jBxP5n_9ug&limit=1"
    request({url:urlgeocoding,json:true},(error,response)=>{
if(error)
{
    callback("Unable to connect to location",undefined)
}
else if(response.body.features.length===0)
{
    callback("Unable to find location",undefined)
}
else{
    callback(undefined,{
        latitude:response.body.features[0].center[1],
        longtitude:response.body.features[0].center[0],
        location:response.body.features[0].place_name
    })
}
    })
    
}

module.exports=geocode;