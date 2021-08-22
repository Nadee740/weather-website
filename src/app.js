const express = require("express");
const app = express();
const port=process.env.PORT || 3000
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const pubdire = path.join(__dirname, "../public");
const viewspath = path.join(__dirname, "../templates/views");
const partialpath = path.join(__dirname, "../templates/partials");

hbs.registerPartials(partialpath);
app.use(express.static(pubdire));
app.set("view engine", "hbs");
app.set("views", viewspath);
app.get("", (req, res) => {
  res.render("index", {
    title: "weather",
    name: "Nadeem",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404page", {
    title: "404",
    error: "Help not found",
  });
});
app.get("/weather", (req, res) => {
  if(!req.query.address)
  return res.send({"Error":"Address needed"})
 geocode(req.query.address,(error,data)=>{
   if(error)
   return res.send({"error":error})
   forecast(data.latitude,data.longtitude,(err,forecastdata)=>{
     if(err)
     returnres.send({"error":err})
    res.send({
      place:data.location,
      temperature:forecastdata
    }) 
   })
 })
 
});
app.get('/products',(req,res)=>{
  if(!req.query.search){
    return res.send(
      "error"
    )
  }
  console.log(req.query.search)
  res.send({
    products:[]
  })
})
app.get("*", (req, res) => {
  res.render("404page", {
    title: "404",
    error: "page not found",
  });
});

app.listen(port, () => {
  console.log("server running on port 3000");
});
