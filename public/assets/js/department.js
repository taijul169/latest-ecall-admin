var singlehospital = document.querySelectorAll('.singlehospital');
singlehospital.forEach(function(btn){
    btn.addEventListener("click",function(event){
        var parent =document.querySelector('.lab-modal-body')
        parent.innerHTML = '';
    // console.log("dataset:",event.target.dataset)
        appendInModal(event.target.dataset)  
    })
})



    function appendInModal(data){
    var div =  document.createElement("div");
    var parent =document.querySelector('.lab-modal-body')

    div.innerHTML = `<form id="editdepartment">
                <div class="add-wrap">
                    <div class="form-group" form-focus focused>
                    <label class="focus-label">Dept. ID<span class="text-danger">*</span></label>
                      <input type="text" class="form-control floating" id="DepartmentID" name="DepartmentID" readonly value="${data.id}">
                      
                    </div>  
                    <div class="form-group form-focus focused">
                        <input type="text" class="form-control floating" id="editName" name="Name" value="${data.name}">
                        <label class="focus-label">Name<span class="text-danger">*</span></label>
                    </div>
                  
                    <div class="form-group form-focus focused">
                        <textarea class="form-control" id="editDetails" rows="3">${data.details}</textarea>
                       
                    </div>
                    <div class="change-photo-btn">
                        <div><i class="feather-upload"></i>
                            <img width="100px" class="img-fluid" id="output" src="${data.photo}" />
                            <p>Upload File</p>
                        </div>
                        <input type="file" name="Photo" id="editPhoto" onchange="loadFile(event)"
                        class="form-control" accept="image/*"  class="upload">
                        <span class="file-upload-text"></span>
                    </div>
                    <p class="file-name text-success">Product image.jpg <a href="#" class="text-danger"><i
                                class="feather-x"></i></a></p>
                   
                    
                    <div class="submit-section">
                     <input type="submit" value="Save Changes"
                    class=" btn-primary submit-btn">
                   
                      
                    </div>
                </div>
                </form>
    `

    parent.append(div)
    



const editmyForm = document.getElementById("editdepartment")
const DepartmentID = document.getElementById("DepartmentID")
const editName = document.getElementById("editName");
const editDetails = document.getElementById("editDetails");
const editPhoto = document.getElementById("editPhoto");

editmyForm.addEventListener("submit", (e) => {
 e.preventDefault();
 const formData = new FormData();
 formData.append("name", editName.value);
formData.append("Details", editDetails.value);
 formData.append("Photo", editPhoto.files[0]);
 // Display the values
 for (var value of formData.values()) {
     console.log("value:",value);
 }
 fetch(`http://192.168.0.121:9010/api/singledepartmentupdate/${DepartmentID.value}`, {
     method: 'PUT',
     body: formData
 }).catch(console.error)
  location.reload();

});




}



// hospital insert

function SpecialityInsert(){
const myForm = document.getElementById("myFormInsert")
const Name = document.getElementById("addName");
const Details = document.getElementById("addDetails");
const Photo = document.getElementById("addPhoto");

//const successmessage = document.getElementById("successmessage")

myForm.addEventListener("submit", (e) => {
e.preventDefault();
const formData = new FormData();
formData.append("name", Name.value);
formData.append("Details", Details.value);
formData.append("Photo", Photo.files[0]);
// Display the values
for (var value of formData.values()) {
    console.log("value:",value);
}

fetch(`http://192.168.0.121:9010/api/departmentinsert`, {
    method: 'POST',
    body: formData
}).catch(console.error)
// successmessage.innerText = 'Updated Successfully';
// successmessage.classList.add("alert-success")
 location.reload();

});
}