window.addEventListener('load',function (){

    refreshSchoolMasterForm();



    refreshSchoolMasterTable();




});


const refreshSchoolMasterForm = ()=>{

    schoolMaster = new Object();

    textSchoolName.style.border="2px solid #ced4da";
    textContactPerson.style.border="2px solid #ced4da";
    textContactNumber.style.border="2px solid #ced4da";
    textEmail.style.border="2px solid #ced4da";
    textAddress.style.border="2px solid #ced4da";
    textArea.style.border="2px solid #ced4da";
    textDistrict.style.border="2px solid #ced4da";
    selectStatus.style.border="2px solid #ced4da";



    textSchoolName.value="";
    textContactPerson.value="";
    textContactNumber.value="";
    textEmail.value="";
    textAddress.value="";
    textArea.value="";
    textDistrict.value="";
    selectStatus.value="";


    buttonSchoolMasterUpdate.disabled=true
    buttonSchoolMasterUpdate.style.cursor="not-allowed"



    buttonSchoolMasterSubmit.disabled=false;
    buttonSchoolMasterSubmit.style.cursor="default";


}



const refreshSchoolMasterTable = ()=>{

    schoolList = ajaxGetRequest("/school-master/findAll");

    displayProperty = [
        {dataType:'text',propertyName:'school_master_name'},
        {dataType:'text',propertyName:'school_master_address'},
        {dataType:'text',propertyName:'school_master_contact_number'},
        {dataType:'text',propertyName:'school_master_contact_person'},
        {dataType:'text',propertyName:'school_master_email'},
        {dataType:'function',propertyName:getStatus},
    ];

    fillDataIntoTable2(tableSchoolMaster,schoolList,displayProperty,true,divModifyButton);
    $("#tableSchoolMaster").DataTable();

}

const getStatus = (ob)=>{
    if (ob.school_master_status==true){
        return "Active";
    }else if (ob.school_master_status==false){
        return "Inactive";
    }
}

const checkErrorsSchoolMaster = ()=>{
    let errors = '';

    if (schoolMaster.school_master_name == null){
        errors=errors+"School Name Cannot Be Empty \n"
    }

    if (schoolMaster.school_master_status == null){
        errors=errors+"Status Cannot Be Empty \n"
    }
    return errors;
}


const saveSchoolMaster = ()=>{
    let errors = checkErrorsSchoolMaster();

    if (errors==""){
        const userConfirm = confirm(`Are You Sure To Add Following School Master \n
        School Name Is ${schoolMaster.school_master_name}
        Status Is ${schoolMaster.school_master_status==true ? "Active" : "Inactive"}
        `);
        if (userConfirm){
            const postServerResponse = ajaxPostRequest("/school-master",schoolMaster);
            if (postServerResponse=="ok"){
                alert("Save Successful");
                refreshSchoolMasterTable();
                refreshSchoolMasterForm();
            }else {
                alert(`Save Unsuccessful \n ${postServerResponse}`);
            }
        }
    }else {
        alert(`You Have Following Errors ${errors}`);
    }
}




const refillSchoolMaster = (ob)=>{

    schoolMaster = JSON.parse(JSON.stringify(ob));
    oldschoolMaster = JSON.parse(JSON.stringify(ob));

    textSchoolName.value=schoolMaster.school_master_name
    textContactPerson.value=schoolMaster.school_master_contact_person
    textContactNumber.value=schoolMaster.school_master_contact_number
    textEmail.value=schoolMaster.school_master_email
    textAddress.value=schoolMaster.school_master_address
    textArea.value=schoolMaster.school_master_area
    textDistrict.value=schoolMaster.school_master_district
    selectStatus.value=schoolMaster.school_master_status


    buttonSchoolMasterUpdate.disabled=false
    buttonSchoolMasterUpdate.style.cursor="default"



    buttonSchoolMasterSubmit.disabled=true;
    buttonSchoolMasterSubmit.style.cursor="not-allowed";


}


const checkUpdateSchoolMaster = ()=>{
    let updates = ''

    if (oldschoolMaster.school_master_name != schoolMaster.school_master_name){
        updates=updates+"Name Is Updated \n"
    }

    if (oldschoolMaster.school_master_address != schoolMaster.school_master_address){
        updates=updates+"Address Is Updated \n"
    }

    if (oldschoolMaster.school_master_area != schoolMaster.school_master_area){
        updates=updates+"Area Is Updated \n"
    }

    if (oldschoolMaster.school_master_district != schoolMaster.school_master_district){
        updates=updates+"District Is Updated \n"
    }

    if (oldschoolMaster.school_master_contact_person != schoolMaster.school_master_contact_person){
        updates=updates+"Contact person Is Updated \n"
    }

    if (oldschoolMaster.school_master_contact_number != schoolMaster.school_master_contact_number){
        updates=updates+"Contact Number Is Updated \n"
    }

    if (oldschoolMaster.school_master_email != schoolMaster.school_master_email){
        updates=updates+"Email Is Updated \n"
    }

    if (oldschoolMaster.school_master_status != schoolMaster.school_master_status){
        updates=updates+"Status Is Updated \n"
    }
    return updates;
}


const updateSchoolMaster = ()=>{
    const updates = checkUpdateSchoolMaster();

    let errors = checkErrorsSchoolMaster();
    if (errors==""){
        if (updates!= ""){
            const userConfirm = confirm(`Are You Sure To Update Following Changes \n ${updates}`)
            if (userConfirm){
                const putServerResponse = ajaxPutRequest("/school-master",schoolMaster);
                if (putServerResponse=="ok"){
                    alert(`update successful`);
                    refreshSchoolMasterTable();
                    refreshSchoolMasterForm();
                    divModifyButton.classList.add('d-none');
                }else {
                    alert(`update unsuccessful ${putServerResponse}`);
                }
            }
        }else {
            alert(`nothing to update`)
        }
    }else {
        alert(`you have some errors`)
    }
}


const deleteSchoolMaster = (ob)=>{
    const userConfirm = confirm(`Are You Sure To Delete Following School Master 
        School Name Is ${ob.school_master_name}
        Status Is ${ob.school_master_status==true ? "Active" : "Inactive"}
    `);
    if (userConfirm){
        const deleteServerResponse = ajaxDeleteRequest("/school-master",ob);
        if (deleteServerResponse=="ok"){
            alert("Delete Successful");
            refreshSchoolMasterTable();
            refreshSchoolMasterForm();
            divModifyButton.classList.add('d-none');
        }else {
            alert(`Delete Unsuccessful`);
        }
    }
}


const handelReset = ()=>{
    refreshSchoolMasterTable();
    refreshSchoolMasterForm();
    divModifyButton.classList.add('d-none');
}


const printOneSchool = (ob)=>{
    const newWindow = window.open();
    newWindow.document.write(`
    <!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>School Master print</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body style="font-family: Verdana">
<div class="container-fluid">

    <div class="row text-center">
        <p style="font-size: 14px; font-weight: bolder">School Details</p>
    </div>

    <table class="table table-bordered" style="font-size: 12px">
        <thead>
        <th style="width: 30%">Properties</th>
        <th>Description</th>
        </thead>

        <tbody>

        <tr>
            <td>School Name</td>
            <td>${ob.school_master_name}</td>
        </tr>

        <tr>
            <td>Contact Person</td>
            <td>${ob.school_master_contact_person}</td>
        </tr>


        <tr>
            <td>Contact Number</td>
            <td>${ob.school_master_contact_number}</td>
        </tr>
        
        
        <tr>
            <td>Email</td>
            <td>${ob.school_master_email}</td>
        </tr>

        <tr>
            <td>Address</td>
            <td>${ob.school_master_address}</td>
        </tr>


        <tr>
            <td>Area</td>
            <td>${ob.school_master_area}</td>
        </tr>
        
        <tr>
            <td>District</td>
            <td>${ob.school_master_district}</td>
        </tr>
        
        <tr>
            <td>Status</td>
            <td>${ob.school_master_status}</td>
        </tr>

        </tbody>

    </table>
</div>
</body>
</html>
    `);
    newWindow.stop();
    newWindow.print();
    newWindow.close();
    divModifyButton.classList.add('d-none');
}



const printAllSchoolInfo =async ()=>{
    await fillDataIntoPrintTable();
    const newWindow = window.open();
    await newWindow.document.write(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>School Master Print</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body style="font-family: Verdana,serif">

<div class="container-fluid" style="position: relative">

    <div class="row mb-2 text-center" style="margin-top: 1cm">
        <p style="font-size: 14px; font-weight: bold;">Schools</p>
    </div>

    <div class="row" style="padding: 5px">
        ${tableSchoolMasterPrint.outerHTML}
    </div>



</div>
</body>
</html>
    
    `);
    newWindow.stop();
    newWindow.print();
    newWindow.close();
}













const fillDataIntoPrintTable = ()=>{

    schoolList = ajaxGetRequest("/school-master/findAll");

    displayProperty = [
        {dataType:'text',propertyName:'school_master_name'},
        {dataType:'text',propertyName:'school_master_address'},
        {dataType:'text',propertyName:'school_master_contact_number'},
        {dataType:'text',propertyName:'school_master_contact_person'},
        {dataType:'text',propertyName:'school_master_email'},
        {dataType:'function',propertyName:getStatus},
    ];

    fillDataIntoTable2(tableSchoolMasterPrint,schoolList,displayProperty,false);


}

















































































