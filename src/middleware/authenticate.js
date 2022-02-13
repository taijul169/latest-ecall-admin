
const { query, response } = require('express');
const dotenv =  require('dotenv');
const fetch  = require("node-fetch");

const root_url = 'http://192.168.0.121:9010'

const auth = async (req, res, next) =>{
    console.log('i am inside authenticate')
    try {
        // console.log("auth is working");
        const token = req.cookies.jwtokenadmin;
       
    fetch(`http://192.168.0.121:9010/api/admin/userauth/${token}`)
    .then(res => res.json())
    .then(singleDocData =>{
         console.log(singleDocData)
        if(singleDocData.userData.length<1){
            req.session.message={
                type:'alert-danger',
                intro:'Created!',
                message:'Login Please!!'
            }
            res.redirect("/admin/login") 
        }
        else{
            for(var i=0;i< singleDocData.userData.length;i++){
                singleDocData.userData[i].Photo = `${root_url}${singleDocData.userData[i].PhotoPath}`
            }
            req.userData = singleDocData.userData;
            return next()

        }
       
      
    });
    
    
 
    } catch (error){
        res.render('admin/login')
        console.log(error)
    }
}


module.exports =  auth;
