window.addEventListener('load',function (){

    refreshItemCategoryMasterForm();


    refreshItemCategoryMasterTable();


})

const refreshItemCategoryMasterForm = ()=>{
    itemCategoryMaster = new Object();

    textItemCategoryName.style.border="2px solid #ced4da";
    selectItemCategoryStatus.style.border="2px solid #ced4da";

    textItemCategoryName.value="";
    selectItemCategoryStatus.value="";

    buttonItemCategoryUpdate.style.cursor="not-allowed";
    buttonItemCategoryUpdate.disabled=true;


    buttonItemCategorySave.style.cursor="default"
    buttonItemCategorySave.disabled=false;


}


const refreshItemCategoryMasterTable = ()=>{

    const itemCategoriesList = ajaxGetRequest("/item-category/findall")


    const displayProperty = [
        {dataType:'text',propertyName:'item_category_name'},
        {dataType:'function',propertyName:getItemCategoryStatus }
    ];

    if ($.fn.DataTable.isDataTable("#tableItemCategory")){
        $("#tableItemCategory").DataTable.destroy();
    }


    fillDataIntoTable2(tableItemCategory,itemCategoriesList,displayProperty,true,divModifyButton);
    $("#tableItemCategory").dataTable();

}


const getItemCategoryStatus = (ob)=>{
    return ob.item_category_status;
}


const checkErrorsItemCategory = ()=>{
    let errors = '';

    if (itemCategoryMaster.item_category_name == null){
        errors=errors+"Category Name Cannot Be Empty \n"
    }

    if (itemCategoryMaster.item_category_status == null){
        errors=errors+"Status Cannot Be Empty"
    }
    return errors;
}



const submitItemCategory = ()=>{
    let errors = checkErrorsItemCategory();

    if (errors==""){

        const userConfirm = confirm(`Are You Sure To Add Following Item Category \n
        Item Name Is ${itemCategoryMaster.item_category_name}
        Status is ${itemCategoryMaster.item_category_status}
        `);
        if (userConfirm){
            const postServerResponse = ajaxPostRequest("/item-category",itemCategoryMaster);
            if (postServerResponse=="ok"){
                alert("Save Successful");
                refreshItemCategoryMasterForm();
                refreshItemCategoryMasterTable();
            }else {
                alert(`Save Unsuccessful ${postServerResponse}`);
            }
        }
    }else {
        alert(`You Have Following Errors \n ${errors}`);
    }
}


const refillItemCategory = (ob)=>{
    itemCategoryMaster=JSON.parse(JSON.stringify(ob))
    olditemCategoryMaster=JSON.parse(JSON.stringify(ob))

    textItemCategoryName.value=itemCategoryMaster.item_category_name;
    selectItemCategoryStatus.value=itemCategoryMaster.item_category_status;


    buttonItemCategoryUpdate.style.cursor="default";
    buttonItemCategoryUpdate.disabled=false;


    buttonItemCategorySave.style.cursor="not-allowed"
    buttonItemCategorySave.disabled=true;


}


const checkUpdatesItemCategory = ()=>{

    let updates= ''

    if (itemCategoryMaster.item_category_name!=olditemCategoryMaster.item_category_name){
        updates=updates+"Category Name Is Updated \n"
    }

    if (itemCategoryMaster.item_category_status != olditemCategoryMaster.item_category_status){
        updates=updates+"Category Status Is Updated \n"
    }



    return updates;
}



const updateItemCategory = ()=>{

let errors = checkErrorsItemCategory();
if (errors==""){

    let updates = checkUpdatesItemCategory();
    if (updates!=""){
        const userConfirm = confirm(`Are You Sure To Update Following Changes \n ${updates}`)
        if (userConfirm){
            const putServerResponse = ajaxPutRequest("/item-category",itemCategoryMaster);
            if (putServerResponse=="ok"){
                alert(`Update Successful`);
                refreshItemCategoryMasterForm();
                refreshItemCategoryMasterTable();
                divModifyButton.classList.add('d-none')
            }else {
                alert(`Update Unsuccessful ${putServerResponse}`);
            }
        }else {
            alert(`user cancelled the operation`)
        }
    }else {
        alert("nothing to Update")
    }


}else {
    alert(`You Have Following Errors ${errors}`)
}
}


const deleteItemCategory = (ob)=>{

    const userConfirm = confirm(`Are You Sure To Confirm Following Item Category \n
        Item Name Is ${ob.item_category_name}
        Status is ${ob.item_category_status}
    `);
    if (userConfirm){
        const deleteServerResponse = ajaxDeleteRequest("/item-category",ob);
        if (deleteServerResponse=="ok"){
            alert("Delete Successful");
            refreshItemCategoryMasterForm();
            refreshItemCategoryMasterTable();
            divModifyButton.classList.add('d-none')
        }else {
            alert(`Delete Unsuccessful \n ${deleteServerResponse}`);
        }
    }
}



const printItemCategoryFullTable = async ()=>{
    await fillDataIntoTablePrint();
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

    <div class="row mb-2 text-center" style="margin-top: 1cm">
        <p style="font-size: 14px; font-weight: bold;">All Item Categories</p>
    </div>

    <div class="row" style="padding: 3px">
       ${tableItemCategoryPrint.outerHTML} 
    </div>
</div>
</body>
</html>
    
    `)
    newWindow.stop();
    newWindow.print();
    newWindow.close();
}


const fillDataIntoTablePrint = ()=>{
    const itemCategoriesList = ajaxGetRequest("/item-category/findall")


    const displayProperty = [
        {dataType:'text',propertyName:'item_category_name'},
        {dataType:'function',propertyName:getItemCategoryStatus }
    ];


    fillDataIntoTable2(tableItemCategoryPrint,itemCategoriesList,displayProperty,false);
}

const printOneItemCategory =async (ob)=>{
    const newWindow = window.open();
    newWindow.document.write(`
    <!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>item category print</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body style="font-family: Verdana">
<div class="container-fluid">

    <div class="row text-center">
        <p style="font-size: 14px; font-weight: bolder">Item Category Details</p>
    </div>

    <table class="table table-bordered" style="font-size: 12px">
        <thead>
        <th style="width: 30%">Properties</th>
        <th>Description</th>
        </thead>

        <tbody>

        <tr>
            <td>Item Name</td>
            <td>${ob.item_category_name}</td>
        </tr>

        <tr>
            <td>Code</td>
            <td>${ob.item_category_code}</td>
        </tr>


        <tr>
            <td>status</td>
            <td>${ob.item_category_status}</td>
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
}





































