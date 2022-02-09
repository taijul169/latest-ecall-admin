
const express =  require('express');
const crypto = require("crypto");
const bodyParser =  require("body-parser");
const flash =  require('connect-flash')
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const dotenv =  require('dotenv');
dotenv.config({path:'../config.env'});
const fetch  = require("node-fetch");
var FormData = require('form-data');
var fs = require('fs');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

// middleware
//const auth = require('../middleware/authenticate')



// localStorage
// var LocalStorage = require('node-localstorage').LocalStorage,
// localStorage = new LocalStorage('./scratch');

// const { rawListeners, schema } = require("../models/model");
const { handlebars } = require("hbs");
const router = express.Router();
const { query } = require('express');
const { json } = require('body-parser');
const { METHODS } = require('http');
const { Console } = require('console');
const async = require('hbs/lib/async');
const auth = require("../middleware/authenticate");
const { isObject } = require('util');
const { stringify } = require('nodemon/lib/utils');




//============================ admin panel start=========================================================
// admin home dashboard


router.get('/admin',(req,res)=>{
    fetch(`${process.env.ROOT_URL}/api/getappointment`)
    .then(res => res.json())
    .then(appointment =>{
        var todayAppoinment =[];
        const created_at = new Date().toLocaleDateString();
        for(var i=0;i<appointment.length;i++){
            if(created_at == appointment[i].BookingDate){
                todayAppoinment.push(appointment[i])
                
            }
           
        }
        //console.log(todayAppoinment)
      
        fetch(`${process.env.ROOT_URL}/api/getPatient`)
        .then(res => res.json())
        .then(patientData =>{

            fetch(`${process.env.ROOT_URL}/api/getDoctor`)
            .then(res => res.json())
            .then(doctorData =>{

                fetch(`${process.env.ROOT_URL}/api/gethospitallist`)
                .then(res => res.json())
                .then(labData =>{
                     const appointmentPareseData = JSON.stringify(appointment)
                    res.render("admin/home",{patientData,appointment,labData,doctorData,appointmentPareseData,todayAppoinment})
        
                });
    
            });

        });
        
        
    });
});

// upcomming appointments
router.get('/admin/upcoming-appointments',(req,res)=>{
    res.render("admin/upcoming-appointments")
});
// SPECIALITIES
router.get('/admin/specialities',(req,res)=>{
    fetch(`${process.env.ROOT_URL}/api/getdepartment`)
    .then(res => res.json())
    .then(Departmentlist =>{
        // const appointmentPareseData = JSON.stringify(appointment)
        console.log(Departmentlist)
        res.render("admin/specialities",{Departmentlist})
    });

});
// doctorlist
router.get('/admin/doctor-list',(req,res)=>{
    fetch(`${process.env.ROOT_URL}/api/getdocnurserlist`)
    .then(res => res.json())
    .then(Doctorlist =>{
        fetch(`${process.env.ROOT_URL}/api/getdepartment`)
        .then(res => res.json())
        .then(Departmentlist =>{
            // const appointmentPareseData = JSON.stringify(appointment)
            console.log(Doctorlist)
            res.render("admin/doctor-list",{Doctorlist,Departmentlist})
        });
       
    });

});



// patient list
router.get('/admin/patient-list',(req,res)=>{
    fetch(`${process.env.ROOT_URL}/api/getpatientlist`)
        .then(res => res.json())
        .then(Patientlist =>{
            // const appointmentPareseData = JSON.stringify(appointment)
            res.render("admin/patient-list",{Patientlist})
        });
});
// ratings
router.get('/admin/ratings',(req,res)=>{
    res.render("admin/ratings")
});
// transaction
router.get('/admin/transaction',(req,res)=>{
    res.render("admin/transaction")
});
// profile-admin
router.get('/admin/admin-profile',(req,res)=>{
    res.render("admin/profile")
});


//================================= Hospital Start====================================================
// hospital list
router.get('/admin/hospital-list',(req,res)=>{
    
    fetch(`${process.env.ROOT_URL}/api/gethospitallist`)
        .then(res => res.json())
        .then(Lablist =>{
            // const appointmentPareseData = JSON.stringify(appointment)
            res.render("admin/hospital-list",{Lablist})
        });
});

router.post("/admin/labedit",async(req,res)=>{
    var Photo ='';
    if(req.files){
         Photo =  req.files.Photo.name;
    }
     var {HospitalID,Name,Address,Contact,About} = req.body;
     const response =  await (fetch(`${process.env.ROOT_URL}/api/hospitalupdate`, 
    { 
        method: 'PUT', 
        body: JSON.stringify({HospitalID,Name,Address,Contact,About,Photo}),
        headers: { 'Content-Type': 'application/json' }
    }));

    console.log(response.status)
    if(response.status === 200){
        req.session.message={
            type:'alert-success',
            intro:'Created!',
            message:'updated successfully.'
        }
        res.redirect(`/admin/hospital-list`)
    }
})

// ================================Blog Start=========================================================
// Blog-list
router.get('/admin/blog-list',(req,res)=>{
    res.render("admin/blog/blog-list")
});

// Blog-list-pending
router.get('/admin/pending-blog',(req,res)=>{
    res.render("admin/blog/pending-blog")
});
// Blog-details
router.get('/admin/blog-details/:id',(req,res)=>{
    res.render("admin/blog/blog-details")
});
// Blog-add
router.get('/admin/add-blog',(req,res)=>{
    res.render("admin/blog/add-blog")
});
// Edit blog
router.get('/admin/edit-blog/:id',(req,res)=>{
    res.render("admin/blog/edit-blog")
});
module.exports =  router;