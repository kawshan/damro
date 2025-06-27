window.addEventListener('load',function (){

    refreshItemMasterForm();

    refreshItemMasterTable();

})


const refreshItemMasterForm = ()=>{

    itemMaster = new Object();

    selectItemCategory.style.border="2px solid #ced4da";
    textItemName.style.border="2px solid #ced4da";
    textBarCode.style.border="2px solid #ced4da";
    selectItemSize.style.border="2px solid #ced4da";
    textItemBooksInPack.style.border="2px solid #ced4da";
    textPacksInBox.style.border="2px solid #ced4da";
    textItemCost.style.border="2px solid #ced4da";
    textItemPrice.style.border="2px solid #ced4da";
    textDescription.style.border="2px solid #ced4da";
    selectItemStatus.style.border="2px solid #ced4da";
    textNumberOfPages.style.border="2px solid #ced4da";
    textItemShortName.style.border="2px solid #ced4da";
    textItemCode.style.border="2px solid #ced4da";




    textItemName.value="";
    textBarCode.value="";
    textItemBooksInPack.value="";
    textPacksInBox.value="";
    textItemCost.value="";
    textItemPrice.value="";
    textDescription.value="";
    textNumberOfPages.value="";
    textItemShortName.value="";
    textItemCode.value="";



    itemCategoriesList = ajaxGetRequest("/item-category/findall");
    fillDataIntoSelect(selectItemCategory,'Select Item Category',itemCategoriesList,'item_category_name');

    itemSizeList = ajaxGetRequest("/item-size/findall");
    fillDataIntoSelect(selectItemSize,'Select Item Size',itemSizeList,'name')

    itemMasterStatusList = ajaxGetRequest("/item-master-status/findall")
    fillDataIntoSelect(selectItemStatus,'Select Item Master Status',itemMasterStatusList,'name')


    buttonUpdateItemMaster.disabled=true;
    buttonUpdateItemMaster.style.cursor="not-allowed";


    buttonSaveItemMaster.disabled=false;
    buttonSaveItemMaster.style.cursor="default";

}



const refreshItemMasterTable = ()=>{

    itemMasterList = ajaxGetRequest("/item-master/findall");

    displayProperty = [
        {dataType:'function',propertyName:getCategoryName},
        {dataType:'text',propertyName:'item_name'},
        {dataType:'text',propertyName:'item_short_name'},
        {dataType:'function',propertyName:getItemSize},
        {dataType:'function',propertyName:getNumberOfPages},
        {dataType:'function',propertyName:getItemPrice},
        {dataType:'function',propertyName:getItemStatus},
    ];

    // Check if DataTable is already initialized and destroy it
    if ($.fn.DataTable.isDataTable("#tableItemMaster")) {
        $("#tableItemMaster").DataTable().destroy();
    }


    fillDataIntoTable2(tableItemMaster,itemMasterList,displayProperty,true,divModifyButton);
    $("#tableItemMaster").dataTable();

    $("#tableItemMaster").dataTable();

}



const getCategoryName = (ob)=>{
   return ob.item_category_master_id.item_category_name;
}

const getNumberOfPages = (ob)=>{
    return ob.number_of_pages;
}

const getItemSize = (ob)=>{
    return ob.item_size_id.name;
}

const getItemPrice = (ob)=>{
    return `<p class="text-end" ">${Number(ob.item_price).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</p>`
}


const getItemStatus = (ob)=>{
    return `<p class="text-center">${ob.item_master_status_id.name}</p>`;
}


const checkErrorsItemMaster = ()=>{
    let errors = ''

    if (itemMaster.item_name == null){
        errors=errors+"Item Name Cannot Be Empty \n"
    }

    if (itemMaster.item_category_master_id==null){
        errors=errors+"Category Cannot Be Empty \n"
    }

    if (itemMaster.item_size_id == null){
        errors=errors+"Size Cannot Be Empty \n"
    }

    if (itemMaster.item_master_status_id == null){
        errors=errors+"Status Cannot Be Empty \n"
    }
    if (itemMaster.item_short_name==null){
        errors=errors+"Short name Cannot Be Empty \n"
    }


    return errors;
}



const submitItemMaster = ()=>{
    const errors = checkErrorsItemMaster();
    if (errors==''){
        const userConfirm =confirm(`Are You Sure To Add Following Item
        Item Name Is ${itemMaster.item_name}
        Item Short Name Is ${itemMaster.item_short_name}
        Category Is ${itemMaster.item_category_master_id.item_category_name}
        Size Is ${itemMaster.item_size_id.name}
        Status Is ${itemMaster.item_master_status_id.name}
        `);
        if (userConfirm){
            const postServerResponse =ajaxPostRequest("/item-master",itemMaster);
            if (postServerResponse=="ok"){
                alert("Save Successful");
                refreshItemMasterForm();
                refreshItemMasterTable();
            }else {
                alert(`Save Unsuccessful ${postServerResponse}`)
            }
        }
    }else {
        alert(`You Have Some Errors \n ${errors}`)
    }
}


const refillItemMaster = (ob)=>{

    itemMaster = JSON.parse(JSON.stringify(ob))
    olditemMaster = JSON.parse(JSON.stringify(ob))


    textItemName.value=itemMaster.item_name
    textBarCode.value=itemMaster.item_barcode
    textItemBooksInPack.value=itemMaster.item_books_in_pack
    textPacksInBox.value=itemMaster.item_packs_in_box
    textItemCost.value=itemMaster.item_cost
    textItemPrice.value=itemMaster.item_price
    textDescription.value=itemMaster.item_description
    textNumberOfPages.value=itemMaster.number_of_pages
    textItemShortName.value=itemMaster.item_short_name
    textItemCode.value=itemMaster.item_code



    itemCategoriesList = ajaxGetRequest("/item-category/findall");
    fillDataIntoSelect(selectItemCategory,'Select Item Category',itemCategoriesList,'item_category_name',itemMaster.item_category_master_id.item_category_name);

    itemSizeList = ajaxGetRequest("/item-size/findall");
    fillDataIntoSelect(selectItemSize,'Select Item Size',itemSizeList,'name',itemMaster.item_size_id.name)

    itemMasterStatusList = ajaxGetRequest("/item-master-status/findall")
    fillDataIntoSelect(selectItemStatus,'Select Item Master Status',itemMasterStatusList,'name',itemMaster.item_master_status_id.name)


    buttonUpdateItemMaster.disabled=false;
    buttonUpdateItemMaster.style.cursor="default";


    buttonSaveItemMaster.disabled=true;
    buttonSaveItemMaster.style.cursor="not-allowed";

}



const checkUpdateItemMaster = ()=>{

    let updates = ''

    if (itemMaster.item_category_master_id.item_category_name != olditemMaster.item_category_master_id.item_category_name){
        updates=updates+"Category Is Updated \n"
    }

    if (itemMaster.item_name != olditemMaster.item_name){
        updates=updates+"Name Is Updated \n"
    }

    if (itemMaster.item_description != olditemMaster.item_description){
        updates=updates+"Description Is Updated \n"
    }

    if (itemMaster.item_barcode != olditemMaster.item_barcode){
        updates=updates+"Barcode Is Updated \n"
    }
    if (itemMaster.item_size_id.name != olditemMaster.item_size_id.name){
        updates=updates+"Size Is Updated \n"
    }
    if (itemMaster.item_books_in_pack != olditemMaster.item_books_in_pack){
        updates=updates+"Books In Pack Is Updated \n"
    }
    if (itemMaster.item_packs_in_box != olditemMaster.item_packs_in_box){
        updates=updates+"Packs In Box Is Updated \n"
    }
    if (itemMaster.item_cost != olditemMaster.item_cost){
        updates=updates+"Cost Is Updated \n"
    }
    if (itemMaster.item_price != olditemMaster.item_price){
        updates=updates+"Price Is Updated \n"
    }
    if (itemMaster.item_master_status_id.name != olditemMaster.item_master_status_id.name){
        updates=updates+"Status Is Changed \n"
    }
    if (itemMaster.number_of_pages != olditemMaster.number_of_pages){
        updates=updates+"Number Of Pages Are Changed \n"
    }
    if (itemMaster.item_short_name != olditemMaster.item_short_name){
        updates=updates+"Short Name Is Changed \n"
    }
    if (itemMaster.item_code != olditemMaster.item_code){
        updates=updates+"Code Is Changed \n"
    }

    return updates;
}


const updateItemMaster = ()=>{
    const errors = checkErrorsItemMaster();

    if (errors==''){
        const updates = checkUpdateItemMaster();
        if (updates!=""){
            const userConfirm = confirm(`Are You Sure To Update Following Changes \n ${updates}`);
            if (userConfirm){
                const putServerResponse = ajaxPutRequest("/item-master",itemMaster);
                if (putServerResponse=="ok"){
                    alert(`Update Successful`);
                    refreshItemMasterForm();
                    refreshItemMasterTable();
                    divModifyButton.classList.add('d-none');
                }else {
                    alert(`Update Unsuccessful`);
                }
            }
        }else {
            alert("Nothing To Update")
        }
    }else {
        alert(`You Have Following Errors ${errors}`)
    }
}



const deleteItemMaster = (ob)=>{
    const userConfirm = confirm(`Are You Sure To Delete Following Item
        Item Name Is ${ob.item_name}
        Short Name Is ${ob.item_name}
        Category Is ${ob.item_category_master_id.item_category_name}
        Size Is ${ob.item_size_id.name}
        Status Is ${ob.item_master_status_id.name}
    `);
    if (userConfirm){
        const deleteServerResponse = ajaxDeleteRequest("/item-master",ob);
        if (deleteServerResponse=="ok"){
            alert("Delete Successful");
            refreshItemMasterForm();
            refreshItemMasterTable();
            divModifyButton.classList.add('d-none');
        }else {
            alert(`Delete Unsuccessful ${deleteServerResponse}`);
        }
    }
}


const printOneItem = (ob)=>{
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
            <td>Category Name</td>
            <td>${ob.item_category_master_id.item_category_name}</td>
        </tr>

        <tr>
            <td>Item Name</td>
            <td>${ob.item_name==null?" ":ob.item_name}</td>
        </tr>

        <tr>
            <td>Short Name</td>
            <td>${ob.item_short_name==null?" ":ob.item_short_name}</td>
        </tr>
        
        
        <tr>
            <td>Item Code</td>
            <td>${ob.item_code==null?" ":ob.item_code}</td>
        </tr>


        <tr>
            <td>Barcode</td>
            <td>${ob.item_barcode==null?" ":ob.item_barcode}</td>
        </tr>


        <tr>
            <td>Size</td>
            <td>${ob.item_size_id.name==null?" ":ob.item_size_id.name}</td>
        </tr>
        
        <tr>
            <td>Number Of Pages</td>
            <td>${ob.number_of_pages==null? " ":ob.number_of_pages}</td>
        </tr>
        
        
        <tr>
            <td>Books In Pack</td>
            <td>${ob.item_books_in_pack==null?" ":ob.item_books_in_pack}</td>
        </tr>
        
        <tr>
            <td>Packs In Box</td>
            <td>${ob.item_packs_in_box==null?" ":ob.item_packs_in_box}</td>
        </tr>
        
        
        <tr>
            <td>Cost</td>
            <td>${ob.item_cost==null?" ":ob.item_cost}</td>
        </tr>
        
        <tr>
            <td>Cost</td>
            <td>${ob.item_price==null?" ":ob.item_price}</td>
        </tr>
        
        <tr>
            <td>Status</td>
            <td>${ob.item_master_status_id.name==null?" ":ob.item_master_status_id.name}</td>
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


const printAllItem = async ()=>{
    await loadDataIntoTablePrint();
    const newWindow =window.open();
    newWindow.document.write(`
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
        <p style="font-size: 14px; font-weight: bold;">Price List</p>
    </div>

    <div class="row">
       ${tableItemMasterPrint.outerHTML} 
    </div>
</div>
</body>
</html>
    `);
    newWindow.stop();
    newWindow.print();
    newWindow.close();

}



const loadDataIntoTablePrint = ()=>{

    itemMasterList = ajaxGetRequest("/item-master/item-list-for-print");

    displayProperty = [
        {dataType:'function',propertyName:getCategoryNameForPrint},
        {dataType:'text',propertyName:'item_name'},
        {dataType:'text',propertyName:'item_short_name'},
        {dataType:'function',propertyName:getItemSize},
        {dataType:'function',propertyName:getNumberOfPages},
        {dataType:'function',propertyName:getItemCost},
        {dataType:'function',propertyName:getItemPrice},
        {dataType:'function',propertyName:getItemStatus},
    ];

    fillDataIntoTable2(tableItemMasterPrint,itemMasterList,displayProperty,false)

}


//we declare this because we need to devide that for names
let categoryNameForPrint = ' '

const getCategoryNameForPrint = (ob)=>{
    if (ob.item_category_master_id.item_category_name != categoryNameForPrint){
        categoryNameForPrint=ob.item_category_master_id.item_category_name
        return ob.item_category_master_id.item_category_name;
    }else {
        return " "
    }
}

const getItemCost = (ob)=>{
    return `<p class="text-end" ">${Number(ob.item_cost).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</p>`
}



const handelResetItemMaster = ()=>{
    divModifyButton.classList.add('d-none');

    refreshItemMasterTable();
    refreshItemMasterForm();


}



















