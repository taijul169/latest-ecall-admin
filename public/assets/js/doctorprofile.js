const singleDoctor = document.querySelectorAll('.singledoctor');
singleDoctor.forEach(function(btn){
    btn.addEventListener("click",function(event){
        var parent =document.querySelector('.doctor-profile-modal-body')
        parent.innerHTML = '';
        appendInModal(event.target.dataset)  
    })
})



function appendInModal(data){

   var div =  document.createElement("div");
   var parent =document.querySelector('.doctor-profile-modal-body')

   div.innerHTML = `
                    <div class="media d-flex align-items-center justify-content-between">
                    <div class="flex-shrink-0 d-flex align-items-center">
                        <img src="${data.photo}" alt="" class="doctor">
                        <div class="doc-info">
                            <div class="docs-id"> #${data.docnurid}</div>
                            <h3>Dr. ${data.doctorname}</h3>
                            <p>${data.department}</p>
                        </div>
                    </div>
                    <div class="media-body">
                        <div class="ratings">
                            <p><i class="fas fa-star filled mr-1"></i>${data.averagerating}</p>
                        </div>
                    </div>
                    </div>
                    <div class="member-wrapper">
                    <h5>Details</h5>
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="mem-info">
                                <h6>Member Since</h6>
                                <p>Nov 21, 2022</p>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="mem-info">
                                <h6>Speciality</h6>
                                <p>${data.department}</p>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="mem-info">
                                <h6>Consultation Fees</h6>
                                <p>Tk. ${data.feehome} / Home</p>
                                <p>Tk. ${data.feeonline} / Home</p>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div class="member-wrapper">
                    <h5>Personal Information</h5>
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="mem-info">
                                <h6>Gender</h6>
                                <p>${data.gender}</p>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="mem-info">
                                <h6>Date of Birth</h6>
                                <p>21, Dec 2022</p>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="mem-info">
                                <h6>Location</h6>
                                <p>${data.address}</p>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="mem-info">
                                <h6>Phone Number</h6>
                                <p>${data.phone}</p>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="mem-info">
                                <h6>Email ID</h6>
                                <p><a href="/cdn-cgi/l/email-protection" class="__cf_email__"
                                        data-cfemail="0f4b606c7b607d4f4b606c6c7a7d6a216c6062">[email&#160;protected]</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div class="lang-wrap">
                    <p>No of Consultation / Cancelled : <span>85/21</span></p>
                    <p>Total Income Earned : <span>$4,544,784</span></p>
                    </div>
                    <div class="submit-section">
                    <a data-bs-dismiss="modal" data-bs-toggle="modal" href="#editModal"
                        class="btn btn-primary me-2">Edit</a>
                    <a data-bs-dismiss="modal" data-bs-toggle="modal" href="#deleteModal"
                        class="btn btn-secondary">Delete Account</a>
                    </div>
   `

   parent.append(div)

}