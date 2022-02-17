var singlehospital = document.querySelectorAll('.singlehospital');
singlehospital.forEach(function(btn){
    btn.addEventListener("click",function(event){
        var parent =document.querySelector('.lab-modal-body')
        parent.innerHTML = '';
        console.log("dataset:",event.target.dataset)
        appendInModal(event.target.dataset)  
    })
})



function appendInModal(data){
     console.log("data",data.length)
   var div =  document.createElement("div");
   var parent =document.querySelector('.lab-modal-body')

   div.innerHTML = ` <form id="myForm">
                        <div class="add-wrap">
                            <div class="form-group" form-focus focused>
                            <label class="focus-label">Lab ID<span class="text-danger">*</span></label>
                              <input type="text" class="form-control floating" id="HospitalID" name="HospitalID" readonly value="${data.hospitalid}">
                              
                            </div>  
                            <div class="form-group form-focus focused">
                                <input type="text" class="form-control floating" id="HosName" name="Name" value="${data.name}">
                                <label class="focus-label">Name<span class="text-danger">*</span></label>
                            </div>
                            <div class="form-group">
                                <label class="focus-label">Category<span class="text-danger">*</span></label>
                                <select class="form-control" id="Category"  tabindex="-1"
                                    aria-hidden="true">
                                    <option value="${data.category}">${data.category}</option>
                                    <option value="Lab">Lab</option>
                                    <option value="Hospital">Hospital</option>
                                </select>
                            </div>
                            <div class="form-group form-focus focused">
                                <input type="text" class="form-control floating" id="Address" name="Address" value="${data.address}">
                                <label class="focus-label">Lab Address <span class="text-danger">*</span></label>
                            </div>
                            <div class="change-photo-btn">
                                <div><i class="feather-upload"></i>
                                    <img width="100px" class="img-fluid" id="output" src="${data.photo}" />
                                    <p>Upload File</p>
                                </div>
                                <input type="file" name="Photo" id="userPhoto" onchange="loadFile(event)"
                                class="form-control" accept="image/*"  class="upload">
                                <span class="file-upload-text"></span>
                            </div>
                            <p class="file-name text-success">Product image.jpg <a href="#" class="text-danger"><i
                                        class="feather-x"></i></a></p>
                            <div class="form-group form-focus focused">
                                <textarea class="form-control floating" id="About">
                                   ${data.about}
                                </textarea>
                            </div>
                            <div class="form-group form-focus focused">
                                <input type="text" class="form-control floating" id="PhoneNumber" value="${data.contact}">
                                <label class="focus-label">Contact <span class="text-danger">*</span></label>
                            </div>
                                <div class="form-group form-focus focused">
                                <input type="text" class="form-control floating" id="BIN" value="${data.bin}">
                                <label class="focus-label">BIN <span class="text-danger">*</span></label>
                            </div>
                            <div class="form-group form-focus focused">
                                <input type="text" class="form-control floating" id="TIN" value="${data.tin}">
                                <label class="focus-label">TIN <span class="text-danger">*</span></label>
                            </div>
                            <div class="form-group form-focus focused">
                                <input type="text" class="form-control floating" id="RegistrationNumber" value="${data.registrationnumber}">
                                <label class="focus-label">Registration Number <span class="text-danger">*</span></label>
                            </div>
                            <div class="form-group form-focus focused">
                                <input type="text" class="form-control floating" id="Latitude" value="${data.latitude}">
                                <label class="focus-label">Latitude <span class="text-danger">*</span></label>
                            </div>
                            <div class="form-group form-focus focused">
                                <input type="text" class="form-control floating" id="Longitude" value="${data.longitude}">
                                <label class="focus-label">Longitude <span class="text-danger">*</span></label>
                            </div>
                            <div class="submit-section">
                             <input type="submit" value="Save Changes"
                            class=" btn-primary submit-btn">
                           
                              
                            </div>
                        </div>
                        </form>
   `

   parent.append(div)

       
	const myForm = document.getElementById("myForm")
	const HospitalID = document.getElementById("HospitalID")
	const userPhoto = document.getElementById("userPhoto")
	const HosName = document.getElementById("HosName")
	const PhoneNumber = document.getElementById("PhoneNumber")
	const Address = document.getElementById("Address")
	const About = document.getElementById("About");
	const BIN = document.getElementById("BIN");
	const TIN = document.getElementById("TIN");
	const RegistrationNumber = document.getElementById("RegistrationNumber");
	const Latitude = document.getElementById("Latitude");
	const Longitude = document.getElementById("Longitude");
	const Category = document.getElementById("Category");
	//const successmessage = document.getElementById("successmessage")

	myForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("HospitalID", HospitalID.value);
		formData.append("Name", HosName.value);
		formData.append("Category", Category.value);
		formData.append("Address", Address.value);
        formData.append("About", About.value);
		formData.append("Contact", PhoneNumber.value);
		formData.append("BIN", BIN.value);
		formData.append("TIN", TIN.value);
		formData.append("RegistrationNumber", RegistrationNumber.value);
		formData.append("Latitude", Latitude.value);
		formData.append("Longitude", Longitude.value);
        formData.append("Photo", userPhoto.files[0]);
        //console.log("length of about:", PhoneNumber.value.length)
        
		// Display the values
		for (var value of formData.values()) {
			console.log("value:",value);
		}
		//let href = window.location.href;
		// let href = "https://www.facebook.com/david"; // Current window url; 
		// Creating URL object
		// let url = new URL(href);
		// let str = url.pathname.substring(1)
		// var n = str.lastIndexOf('/');
		// var result = str.substring(n + 1);
		// console.log(result);
		fetch(`http://192.168.0.121:9010/api/hospitalupdate`, {
			method: 'PUT',
			body: formData
		}).catch(console.error)
		// successmessage.innerText = 'Updated Successfully';
		// successmessage.classList.add("alert-success")
		 location.reload();

	});


    

}
var loadFile = function (event) {
    var reader = new FileReader();
    reader.onload = function () {
        var output = document.getElementById('output');
        output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
};


// hospital insert

function HospitalInsert(){
    const myForm = document.getElementById("myFormInsert")

	const Name = document.getElementById("addName")
	const addPhoto = document.getElementById("addPhoto")
	const addCategory = document.getElementById("addCategory")
	const PhoneNumber = document.getElementById("addPhoneNumber")
	const Address = document.getElementById("addAddress")
	const About = document.getElementById("addAbout");
	const BIN = document.getElementById("addBIN");
	const TIN = document.getElementById("addTIN");
    const addRegistrationNumber = document.getElementById("addRegistrationNumber");
	const addLatitude = document.getElementById("addLatitude");
	const addLongitude = document.getElementById("addLongitude");
	
	//const successmessage = document.getElementById("successmessage")

	myForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("Name", Name.value);
		formData.append("Category", addCategory.value);
        formData.append("Address", Address.value);
		formData.append("Contact", PhoneNumber.value);
        formData.append("About", About.value);
        formData.append("BIN", BIN.value);
        formData.append("TIN", TIN.value);
        formData.append("RegistrationNumber", addRegistrationNumber.value);
        formData.append("LATITUDE", addLatitude.value);
        formData.append("LONGITUDE", addLongitude.value);
        formData.append("Photo", addPhoto.files[0]);
        //console.log("length of about:", PhoneNumber.value.length)
       
		// Display the values
		for (var value of formData.values()) {
			console.log("value:",value);
		}
		//let href = window.location.href;
		// let href = "https://www.facebook.com/david"; // Current window url; 
		// Creating URL object
		// let url = new URL(href);
		// let str = url.pathname.substring(1)
		// var n = str.lastIndexOf('/');
		// var result = str.substring(n + 1);
		// console.log(result);
		fetch(`http://192.168.0.121:9010/api/hospitalinsert`, {
			method: 'POST',
			body: formData
		}).catch(console.error)
		// successmessage.innerText = 'Updated Successfully';
		// successmessage.classList.add("alert-success")
		 location.reload();

	});
}
