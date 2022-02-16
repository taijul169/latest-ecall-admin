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

   div.innerHTML = ` <form  method="POST" action="/admin/edittest/${data.serviceid}">
                        <div class="add-wrap">
                            <div class="form-group" form-focus focused>
                            <label class="focus-label">Test ID<span class="text-danger">*</span></label>
                              <input type="text" class="form-control floating" id="TestID"   readonly value="${data.serviceid}">
                              
                            </div>  
                            <div class="form-group form-focus focused">
                                <input type="text" class="form-control floating" id="editServiceName" name="TestName"  value="${data.name}">
                                <label class="focus-label">Name<span class="text-danger">*</span></label>
                            </div>
                            <div class="form-group form-focus focused">
                                <input type="text" class="form-control floating" id="EditPrice" name="Price" value="${data.price}">
                                <label class="focus-label">Price<span class="text-danger">*</span></label>
                            </div>
                            <div class="form-group">
                                <label class="focus-label">Category<span class="text-danger">*</span></label>
                                <select class="form-control" id="editCategory" name="Category"  tabindex="-1"
                                    aria-hidden="true">
                                    <option value="${data.category}">${data.category}</option>
                                    <option value="Pathology">Pathology</option>
                                    <option value="Cardiology">Pathology</option>
                                </select>
                            </div>
                            <div class="submit-section">
                             <input type="submit" value="Save Changes"
                            class=" btn-primary submit-btn">
                            </div>
                        </div>
                        </form>
   `

   parent.append(div)
   



	// const editmyForm = document.getElementById("myForm")
	// const TestID = document.getElementById("editTestID")
	// const EditServiceName = document.getElementById("editServiceName");
	// const EDitPrice = document.getElementById("editPrice");
	// const EditCategory = document.getElementById("editCategory");
	// //const successmessage = document.getElementById("successmessage")

	// editmyForm.addEventListener("submit", (e) => {

	// 	e.preventDefault();
	// 	const formData = new FormData();
	// 	formData.append("TestName", EditServiceName.value);
    //     formData.append("Category", EditCategory.value);
	// 	formData.append("Price", EDitPrice.value);
	// 	// Display the values
	// 	for (var value of formData.values()) {
	// 		console.log("value:",value);
	// 	}
	// 	fetch(`http://192.168.0.121:9010/api/singletestupdate/${TestID.value}`, {
	// 		method: 'PUT',
	// 		body: formData
	// 	}).catch(console.error)
	// 	// successmessage.innerText = 'Updated Successfully';
	// 	// successmessage.classList.add("alert-success")
	// 	 //location.reload();

	// });


    

}



// hospital insert

function TestInsert(){
    const myForm = document.getElementById("myFormInsert")
	const ServiceName = document.getElementById("addName");
	const Price = document.getElementById("addPrice");
	const Category = document.getElementById("addCategory");
	
	//const successmessage = document.getElementById("successmessage")

	myForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("Name", ServiceName.value);
		formData.append("Price", Price.value);
		formData.append("Category", Category.value);
        //console.log("length of about:", PhoneNumber.value.length)
        let href = window.location.href;
		//  let href = "https://www.facebook.com/david"; // Current window url; 
		// Creating URL object
		 let url = new URL(href);
		 let str = url.pathname.substring(1)
		 var n = str.lastIndexOf('/');
		 var result = str.substring(n + 1);
		 console.log(result);
		// Display the values
		for (var value of formData.values()) {
			console.log("value:",value);
		}

		fetch(`http://192.168.0.121:9010/api/investigationserviceinsert/${result}`, {
			method: 'POST',
			body: formData
		}).catch(console.error)
		// successmessage.innerText = 'Updated Successfully';
		// successmessage.classList.add("alert-success")
		 location.reload();

	});
}
