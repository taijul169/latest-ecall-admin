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

   div.innerHTML = ` <form  action="/admin/updatemedicine" method="post">
                        <div class="add-wrap">
                            <div class="form-group" form-focus focused>
                            <label class="focus-label">Medicine ID<span class="text-danger">*</span></label>
                              <input type="text" class="form-control floating"  name="MedicineID" readonly value="${data.medicineid}">
                              
                            </div>  
                            <div class="form-group form-focus focused">
                                <input type="text" class="form-control floating" name="Name" value="${data.name}">
                                <label class="focus-label">Name<span class="text-danger">*</span></label>
                            </div>
                            <div class="form-group">
                                <label class="focus-label">Category<span class="text-danger">*</span></label>
                              
                                <input type="text" class="form-control floating"  name="GenericName" value="${data.genericname}">
                            </div>
                            <div class="form-group form-focus focused">
                                <input type="text" class="form-control floating"  name="ManufacName" value="${data.manufacname}">
                                <label class="focus-label">Lab Address <span class="text-danger">*</span></label>
                            </div>
                            <div class="form-group form-focus focused">
                                <input type="text" class="form-control floating"  name="Unit" value="${data.unit}">
                                <label class="focus-label">Lab Address <span class="text-danger">*</span></label>
                            </div>
                            <div class="submit-section">
                             <input type="submit" value="Save Changes"
                            class=" btn-primary submit-btn">
                           
                              
                            </div>
                        </div>
                        </form>
   `

   parent.append(div)


}



