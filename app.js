const path = require('path')
const request = require('request')
const express = require('express')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000
const dir = path.join(__dirname,'/public')
const partials = path.join(__dirname,'/views/partials')
hbs.registerPartials(partials)
app.set('view engine','hbs')
app.use(express.static(dir))
app.get('',(req, res)=>{
    const d = new Date();
    const weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    const n = weekday[d.getDay()];
        res.render('index',{
            title:'Weather App',
            author:'Prakash Kumar Choubey',
            date: n
        })
    })
app.get('/news',(req, res)=>{
    res.render('news',{
        title:'Weather App',
        author:'Prakash Kumar Choubey'
    })
})
app.get('/live-cameras',(req, res)=>{
    res.render('live-cameras',{
        title:'Weather App',
        author:'Prakash Kumar Choubey'
    })
})
app.get('/photos',(req, res)=>{
    res.render('photos',{
        title:'Weather App',
        author:'Prakash Kumar Choubey'
    })
})
app.get('/contact',(req, res)=>{
    res.render('contact',{
        title:'Weather App',
        author:'Prakash Kumar Choubey'
    })
})
app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({error: 'Your Must provide an address'})
    }
    const place = req.query.address
    const url = "http://api.weatherstack.com/current?access_key=4cdaed501026688f14ba0002bae29569&query="+place+""
    request({url : url,json : true},(error, response)=>{
        if(error){
            return res.send({error: 'Unable to connect'})
        }else if(response.body.error){
            const info=response.body.error
            return res.send({error: info.info})
    
        }else{
            const data = response.body
             return res.send(data)
        }
         
        
    })
})
app.get('*',(req, res)=>{
    res.send("Page Not Found")
})
app.listen(port,() => {
    console.log("server is running in port "+port+"")
})