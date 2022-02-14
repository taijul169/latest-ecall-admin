
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


router.get('/admin', auth, async(req,res,next)=>{

    try {
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
                        
                        res.render("admin/home",{patientData,appointment,labData,doctorData,appointmentPareseData,todayAppoinment,userData:req.userData})
            
                    });
        
                });
    
            });
            
            
        });
    } catch (error) {
        console.log(error)
    }


});


// upcomming appointments
router.get('/admin/upcoming-appointments', auth,(req,res,next)=>{
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

// doctor profile edit
// router.get('/admin/doctorprofileedit',(req,res)=>{
//     res.render("admin/doctor-profile-edit")
// });
//  profile settings edit
router.get("/admin/profile-settings-doctor/:id",auth,(req,res)=>{
        const id =  req.params.id;
        fetch(`http://192.168.0.121:9010/api/singledoctor/${id}`)
        .then(res => res.json())
        .then(singleDocData =>{
            console.log(singleDocData)
            res.render("admin/doctor-profile-edit",{singleDocData,userData:req.userData})
        });


  
})
// doctor profile update----------------
router.post("/admin/doctor-profile-settings/:id",  async(req, res)=>{

    try {
        const id =  req.params.id;
        var Photo ='';
        if(req.files){
             Photo =  req.files.photo.name;
        }
       var {
           RegistrationNo,
           FirstName,	
           LastName,	
           userName,	
           PhoneNumber,
           Gender,
           DateOfBirth,
           BloodGroup,	
           NID,
           Address,	
           Password } = req.body;
   
       
       const response =  await (fetch(`http://192.168.0.121:9010/api/docinfoupdate/${id}`, 
       { 
           method: 'PUT', 
           body:JSON.stringify({
               RegistrationNo,
               FirstName,	
               LastName,	
               userName,	
               PhoneNumber	,
               Gender,
               DateOfBirth,
               BloodGroup,	
               NID,
               Photo,
               Address,	
               Password}),
               headers: { 'Content-Type': 'application/json' } 
       }));
   
       console.log(response.body)
       if(response.status === 200){
           req.session.message={
               type:'alert-success',
               intro:'Created!',
               message:'Profile Updated!.'
           }
           res.redirect(`/profile-settings/${id}`)
       }
       if(response.status === 401){
           req.session.message={
               type:'alert-danger',
               intro:'Created!',
               message:'Invalid Data.'
           }
           res.redirect(`/profile-settings/${id}`)
       }
       else if( response.status === 409){
           req.session.message={
               type:'alert-danger',
               intro:'Created!',
               message:'Invalid Data.'
           }
           res.redirect("/profile-settings")
       }
       const data = await  response.json()
       console.log(data)
    } catch (error) {
        console.log(error)
    }
   
})

// education info update----------------
router.post("/educationupdate/:id", async(req, res)=>{
    const id =  req.params.id;

    var {
         data_id,
         institutionName,
         degree,
         start_date,
         end_date,
         } = req.body;  
      console.log(req.body);
     if(req.body.institutionName.length>0){
         for(var i=0;i<req.body.institutionName.length; i++){
            var institutionName = req.body.institutionName[i],
                degree = req.body.degree[i],
                start_date = req.body.start_date[i],
                end_date = req.body.end_date[i],
                data_id =  req.body.data_id[i]
             response =  await (fetch(`http://192.168.0.121:9010/api/educationupdate/${id}`, 
            { 
                method: 'PUT', 
                body: JSON.stringify({
                    data_id,
                    institutionName,
                    degree,
                    start_date,
                    end_date}),
                    headers: { 'Content-Type': 'application/json' }
                
            }));

         }
         
     }

     req.session.message={
        type:'alert-success',
        intro:'Created!',
        message:'Data Updated Successfully.'
    }
    res.redirect(`/admin/profile-settings-doctor/${id}`)
   
})

// single education delete
router.get('/deleteEducation/:id/:docid',(req,res)=>{
    const id =  req.params.id;
    const docid =  req.params.docid;
    fetch(`http://192.168.0.121:9010/api/deleteeducation/${id}`,{
        method:'delete',
    })
    req.session.message={
        type:'alert-danger',
        intro:'Created!',
        message:'Education Deleted.'
    }
    res.redirect(`/admin/profile-settings-doctor/${docid}`)
})

// expericen insert

router.post('/experienceinsert/:id',async(req,res)=>{
    var {institutionName,designation,start_date,end_date} = req.body;
    console.log(req.body)
    const response =  await (fetch(`http://192.168.0.121:9010/api/experienceinsert/${req.params.id}`, 
    { 
        method: 'POST', 
        body: JSON.stringify({institutionName,designation,start_date,end_date}),
        headers: { 'Content-Type': 'application/json' }
    }));
    req.session.message={
        type:'alert-success',
        intro:'Created!',
        message:'Data Updated Successfully.'
    }
    res.redirect(`/admin/profile-settings-doctor//${req.params.id}`)
})

// Experience info update----------------
router.post("/experienceupdate/:id", async(req, res)=>{
    const id =  req.params.id;

    var {
         data_id,
         institutionName,
         designation,
         start_date,
         end_date,
         } = req.body;  
      console.log(req.body);
     if(req.body.institutionName.length>0){
         for(var i=0;i<req.body.institutionName.length; i++){
            var institutionName = req.body.institutionName[i],
                designation = req.body.designation[i],
                start_date = req.body.start_date[i],
                end_date = req.body.end_date[i],
                data_id =  req.body.data_id[i]
             response =  await (fetch(`http://192.168.0.121:9010/api/experienceupdate/${id}`, 
            { 
                method: 'PUT', 
                body: JSON.stringify({
                    data_id,
                    institutionName,
                    designation,
                    start_date,
                    end_date}),
                    headers: { 'Content-Type': 'application/json' }
                
            }));

         }
         
     }
     req.session.message={
        type:'alert-success',
        intro:'Created!',
        message:'Data Updated Successfully.'
    }
    res.redirect(`/admin/profile-settings-doctor/${id}`)

   
})

// chamber insert
router.post('/chamberinsert/:id',async(req,res)=>{
    var {institutionName,location,day,start_time,end_time} = req.body;
    console.log(req.body)
    const response =  await (fetch(`http://192.168.0.121:9010/api/chamberinsert/${req.params.id}`, 
    { 
        method: 'POST', 
        body: JSON.stringify({institutionName,location,day,start_time,end_time}),
        headers: { 'Content-Type': 'application/json' }
    }));
    req.session.message={
        type:'alert-success',
        intro:'Created!',
        message:'Data inserted Successfully.'
    }
    res.redirect(`/admin/profile-settings-doctor/${req.params.id}`)
})

// chamber info update----------------
router.post("/chamberupdate/:id", async(req, res)=>{
    const id =  req.params.id;

    var {
         data_id,
         institutionName,
         location,
         day,
         start_time,
         end_time,
         } = req.body;  
      console.log(req.body);
     if(req.body.institutionName.length>0){
         for(var i=0;i<req.body.institutionName.length; i++){
            var institutionName = req.body.institutionName[i],
                location = req.body.location[i],
                day = req.body.day[i],
                start_time = req.body.start_time[i],
                end_time = req.body.end_time[i],
                data_id =  req.body.data_id[i]
             response =  await (fetch(`http://192.168.0.121:9010/api/chamberupdate/${id}`, 
            { 
                method: 'PUT', 
                body: JSON.stringify({
                    data_id,
                    institutionName,
                    location,
                    day,
                    start_time,
                    end_time}),
                    headers: { 'Content-Type': 'application/json' }
                
            }));

         }
         
     }

     req.session.message={
        type:'alert-success',
        intro:'Created!',
        message:'Data Updated Successfully.'
    }
    res.redirect(`/admin/profile-settings-doctor/${id}`)
   
});

router.post("/updatefees/:id",async(req,res)=>{
    const id =  req.params.id;
    const {homeFees,onlineFees} =  req.body;
    const response =  await (fetch(`http://192.168.0.121:9010/api/feesupdate/${id}`, 
    { 
        method: 'PUT', 
        body: JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' }
    }));

    console.log(response.status)
    if(response.status === 200){
        req.session.message={
            type:'alert-success',
            intro:'Created!',
            message:'Data Updated'
        }
        res.redirect(`/admin/profile-settings-doctor/${id}`)
    }

});


router.get("/admin/verifystatusupdate/:docnurid/:status",async(req,res)=>{
    const response =  await (fetch(`http://192.168.0.121:9010/api/admin/doctorverifystatusupdate/${req.params.docnurid}/${req.params.status}`, 
    { 
        method: 'PUT', 
        body: JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' }
    }));
    if(response.status === 200){
        req.session.message={
            type:'alert-success',
            intro:'Created!',
            message:'Data Updated'
        }
        res.redirect(`/admin/profile-settings-doctor/${req.params.docnurid}`)
    }
})



// login
router.get("/admin/login",(req,res)=>{
    res.render("admin/login")
})
// login-page
router.post("/admin/login",async(req,res)=>{

    var {phone, password,role} = req.body;
    const response =  await (fetch('http://192.168.0.121:9010/api/admin/login', 
    { 
        method: 'POST', 
        body: JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' }
    }));

    console.log('response-status:',response.status)
    if(response.status === 200){
        req.session.message={
            type:'alert-success',
            intro:'Created!',
            message:'Welcome to Dashboard.'
        }
        const data = await  response.json()
        console.log("data:",data)
        res.cookie("jwtokenadmin",data[0].Jwtoken,{
            expires:new Date(Date.now()+259000000),
            httpOnly:true
        });
        res.redirect("/admin")
    }
    if(response.status === 401){
        req.session.message={
            type:'alert-danger',
            intro:'Created!',
            message:'Invalid Login.'
        }
        res.redirect("/admin/login")
    }
    else if( response.status === 409){
        req.session.message={
            type:'alert-danger',
            intro:'Created!',
            message:'Invalid Login.'
        }
        res.redirect("/admin/login")
    }
    

})


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

// addtest(list also according to id)
router.get('/admin/addtest/:id',(req,res)=>{
    const id =  req.params.id;
    fetch(`${process.env.ROOT_URL}/api/getallservicelistbyhospitalid/${id}`)
    .then(res => res.json())
    .then(testlist =>{
        // const appointmentPareseData = JSON.stringify(appointment)
        res.render("admin/testlist",{testlist})
    
    });
  
});

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