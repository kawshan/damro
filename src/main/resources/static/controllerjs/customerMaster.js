window.addEventListener('load',function (){

    refreshCustomerMasterForm();

    refreshCustomerMasterTable();


});

const refreshCustomerMasterForm = ()=>{

    customerMaster = new Object();

    textCustomerName.style.border="2px solid #ced4da";
    textMobile.style.border="2px solid #ced4da";
    textEmail.style.border="2px solid #ced4da";
    selectStatus.style.border="2px solid #ced4da";
    textCustomerAddress.style.border="2px solid #ced4da";
    selectSchool.style.border="2px solid #ced4da";
    textIndexNumber.style.border="2px solid #ced4da";

    textCustomerName.value="";
    textMobile.value="";
    textEmail.value="";
    selectStatus.value="";
    textCustomerAddress.value="";
    textIndexNumber.value="";

    schoolList= ajaxGetRequest("/school-master/findAll");
    fillDataIntoSelect(selectSchool,'Select School',schoolList,'school_master_name');

    buttonCustomerMasterUpdate.disabled=true;
    buttonCustomerMasterUpdate.style.cursor="not-allowed"


    buttonCustomerMasterSave.disabled=false
    buttonCustomerMasterSave.style.cursor="default";


}

const refreshCustomerMasterTable = ()=>{

    customersList = ajaxGetRequest("/customer-master/findall");

    displayProperty=[
        {dataType:'text',propertyName:'customer_name'},
        {dataType:'text',propertyName:'customer_mobile'},
        {dataType:'text',propertyName:'customer_master_address'},
        {dataType:'text',propertyName:'customer_email'},
        {dataType:'function',propertyName:getCustomerStatus},
    ];

    if ($.fn.DataTable.isDataTable("#tableInvoiceDetail")){
        $("#tableCustomerMaster").DataTable().destroy();
    }


    fillDataIntoTable2(tableCustomerMaster,customersList,displayProperty,true,divModifyButton)
    $("#tableCustomerMaster").dataTable();
}


const getCustomerStatus = (ob)=>{
    if (ob.customer_status==true){
        return "active";
    }else {
        return "Inactive";
    }
}


const checkErrorsCustomerMaster = ()=>{
    let errors = '';

    if (customerMaster.customer_name==null){
        errors=errors+"Name Cannot Be Empty \n"
    }

    if (customerMaster.customer_status == null){
        errors=errors+"Status Cannot Be Empty \n"
    }
    return errors;
}


const saveCustomerMaster = ()=>{
    let errors = checkErrorsCustomerMaster();

    if (errors==""){
        const userConfirm = confirm(`Are You Sure Add Following Customer \n
        Customer Name Is ${customerMaster.customer_name}
        Customer Status Is ${customerMaster.customer_status}
        `);
        if (userConfirm){
            const postServerResponse = ajaxPostRequest("/customer-master",customerMaster)
            if (postServerResponse=="ok"){
                alert("Save Successful");
                refreshCustomerMasterForm();
                refreshCustomerMasterTable();
            }else {
                alert(`Save Unsuccessful \n ${postServerResponse}`);
            }
        }
    }else {
        alert(`You Have Following Errors ${errors}`)
    }
}


const refillCustomerMaster = (ob)=>{

    customerMaster = JSON.parse(JSON.stringify(ob))
    oldcustomerMaster = JSON.parse(JSON.stringify(ob))


    textCustomerName.value=customerMaster.customer_name;
    textMobile.value=customerMaster.customer_mobile;
    textEmail.value=customerMaster.customer_email;
    selectStatus.value=customerMaster.customer_status;
    textCustomerAddress.value=customerMaster.customer_master_address;
    textIndexNumber.value=customerMaster.customer_master_school_index_no;

    fillDataIntoSelect(selectSchool,'Select School',schoolList,'school_master_name',customerMaster.school_master_id.school_master_name);





    buttonCustomerMasterUpdate.disabled=false;
    buttonCustomerMasterUpdate.style.cursor="default"


    buttonCustomerMasterSave.disabled=true
    buttonCustomerMasterSave.style.cursor="not-allowed";

}


const checkUpdatesCustomerMaster = ()=>{

    let updates = ''

    if (customerMaster.customer_name != oldcustomerMaster.customer_name){
        updates=updates+"Customer Name Is Updated \n"
    }
    if (customerMaster.customer_mobile != oldcustomerMaster.customer_mobile){
        updates=updates+"Mobile Is Updated \n"
    }
    if (customerMaster.customer_email != oldcustomerMaster.customer_email){
        updates=updates+"Email Is Updated \n"
    }
    if (customerMaster.customer_status !=  oldcustomerMaster.customer_status){
        updates=updates+"Status Is Updated \n"
    }
    if (customerMaster.customer_master_address !=  oldcustomerMaster.customer_master_address){
        updates=updates+"Address Is Updated \n"
    }

    if (customerMaster.school_master_id.school_master_name != oldcustomerMaster.school_master_id.school_master_name){
        updates=updates+"School Is Updated \n"
    }

    if (customerMaster.customer_master_school_index_no != oldcustomerMaster.customer_master_school_index_no){
        updates=updates+"Index number is Updated \n"
    }

    return updates;
}


const updateCustomerMaster = ()=>{

    let updates = checkUpdatesCustomerMaster();

    if (updates!=""){
        const userConfirm = confirm(`Are You Sure To Update Following Changes \n ${updates}`)
        if (userConfirm){
            const putServerResponse = ajaxPutRequest("/customer-master",customerMaster);
            if (putServerResponse=="ok"){
                alert(`Update Successful`);
                refreshCustomerMasterForm();
                refreshCustomerMasterTable();
                divModifyButton.classList.add('d-none');
            }else {
                alert(`Update Unsuccessful \n ${putServerResponse}`)
            }
        }
    }else {
        alert(`Nothing To Update`)
    }
}


const deleteCustomerMaster = (ob)=>{
    const userConfirm = confirm(`Are You Sure To Delete Following Customer \n
        Customer Name Is ${ob.customer_name}
        Customer Status Is ${ob.customer_status}
    `);
    if (userConfirm){
        const deleteServerResponse = ajaxDeleteRequest("/customer-master",ob);
        if (deleteServerResponse=="ok"){
            alert("Delete Successful")
            refreshCustomerMasterForm();
            refreshCustomerMasterTable();
            divModifyButton.classList.add('d-none');
        }else {
            alert(`Delete Unsuccessful \n ${deleteServerResponse}`);
            refreshCustomerMasterForm();
            refreshCustomerMasterTable();
        }
    }
}



const printCustomerMasterAll = async ()=>{
    await loadDataIntoCustomerPrint();
    const newWindow = window.open();
    await newWindow.document.write(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Job Master Print</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body style="font-family: Verdana,serif">

<div class="container-fluid" style="position: relative">

    <div class="row mb-2 text-center" style="margin-top: 2cm">
        <p style="font-size: 14px; font-weight: bold;">All Item Categories</p>
    </div>

    <div class="row" style="padding: 3px">
        ${tableCustomerMasterPrint.outerHTML}
    </div>
</div>
</body>
</html>
    `)
    newWindow.stop();
    newWindow.print();
    newWindow.close();
}



const loadDataIntoCustomerPrint = ()=>{
    customersList = ajaxGetRequest("/customer-master/findall");

    displayProperty=[
        {dataType:'text',propertyName:'customer_name'},
        {dataType:'text',propertyName:'customer_mobile'},
        {dataType:'text',propertyName:'customer_email'},
        {dataType:'function',propertyName:getCustomerStatus},
    ];

    fillDataIntoTable2(tableCustomerMasterPrint,customersList,displayProperty,false);
}











































