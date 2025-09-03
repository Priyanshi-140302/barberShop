const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://priyanshiworkholics:Priyanshi123@cluster1.eyohx.mongodb.net/mens_salon_db?retryWrites=true&w=majority&appName=Cluster1').then(()=>{
    console.log('connected')
})
