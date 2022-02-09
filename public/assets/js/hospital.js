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

   div.innerHTML = `
                        <form action="/admin/labedit" method="post" enctype="application/x-www-form-urlencoded">
                        <div class="add-wrap">
                            <div class="form-group form-focus focused">
                                <input type="text" class="form-control floating" name="HospitalID" value="${data.hospitalid}">
                                <input type="text" class="form-control floating" name="Name" value="${data.name}">
                                <label class="focus-label">Lab Name<span class="text-danger">*</span></label>
                            </div>
                            <div class="form-group">
                                <select class="select select2-hidden-accessible" data-select2-id="4" tabindex="-1"
                                    aria-hidden="true">
                                    <option>Select Category*</option>
                                    <option selected="" data-select2-id="6">Lab</option>
                                    <option>Hospital</option>
                                </select>
                            </div>
                            <div class="form-group form-focus focused">
                                <input type="text" class="form-control floating" name="Address" value="${data.address}">
                                <label class="focus-label">Lab Address <span class="text-danger">*</span></label>
                            </div>
                            <div class="change-photo-btn">
                                <div><i class="feather-upload"></i>
                                    <img width="100px" class="img-fluid" src="${data.photo}" />
                                    <p>Upload File</p>
                                </div>
                                <input type="file" name="Photo" class="upload">
                                <span class="file-upload-text"></span>
                            </div>
                            <p class="file-name text-success">Product image.jpg <a href="#" class="text-danger"><i
                                        class="feather-x"></i></a></p>
                            <div class="form-group form-focus focused">
                                <textarea  name="About">
                                   ${data.about}
                                </textarea>
                            </div>
                            <div class="form-group form-focus focused">
                                <input type="text" class="form-control floating" name="Contact" value="${data.contact}">
                                <label class="focus-label">Phone Name <span class="text-danger">*</span></label>
                            </div>
                            <div class="submit-section">
                                <button type="submit" class="btn btn-primary btn-save">Save Changes</button>
                            </div>
                        </div>
                        </form>
   `

   parent.append(div)

}