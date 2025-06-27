window.addEventListener("load", function () {

    refreshStockAdjustmentDetailsForm();

    refreshStockAdjustmentHeaderForm();


    refreshStockAdjustmentHeaderTable();

})


const refreshStockAdjustmentHeaderForm = () => {

    stockAdjustmentHeader = new Object();

    textStockAdjustmentNumber.style.color = "2px solid #ced4da";
    textStockAdjustmentKey.style.color = "2px solid #ced4da";
    textStockAdjustmentDate.style.color = "2px solid #ced4da";


    textStockAdjustmentNumber.value = "";
    textStockAdjustmentKey.value = "";
    textStockAdjustmentDate.value = "";

    buttonStockAdjustmentDetailAdd.style.cursor="not-allowed"
    buttonStockAdjustmentDetailAdd.disabled=true

    buttonStockAdjustmentDetailUpdate.style.cursor="not-allowed";
    buttonStockAdjustmentDetailUpdate.disabled=true;


}

const stockAdjustmentHeaderResetColorsToDefault = () => {
    textStockAdjustmentNumber.style.color = "2px solid #ced4da";
    textStockAdjustmentKey.style.color = "2px solid #ced4da";
    textStockAdjustmentDate.style.color = "2px solid #ced4da";
}


const refreshStockAdjustmentHeaderTable = () => {

    stockAdjustmentHeadersList = ajaxGetRequest("/stockAdjustmentHeader/recent1000StockAdjustments")

    displayProperty = [
        {dataType: 'text', propertyName: 'stock_adjustment_header_no'},
        {dataType: 'text', propertyName: 'stock_adjustment_header_key'},
        {dataType: 'text', propertyName: 'stock_adjustment_header_date'},
    ];

    // Check if DataTable is already initialized and destroy it
    if ($.fn.DataTable.isDataTable("#tableStockAdjustmentHeader")) {
        $("#tableStockAdjustmentHeader").DataTable().destroy();
    }

    fillDataIntoTable2(tableStockAdjustmentHeader, stockAdjustmentHeadersList, displayProperty, true, divModifyButton2)
    $("#tableStockAdjustmentHeader").dataTable();


}


const checkErrorsInStockAdjustmentHeaderForm = () => {
    let errors = "";

    if (stockAdjustmentHeader.stock_adjustment_header_date == null) {
        errors = errors + "Date Cannot Be Empty \n"
    }

    return errors;
}

const saveOrUpdateStockAdjustmentHeader = async () => {

    if (textStockAdjustmentKey.value == "") {
        console.log("save part");
        let errors = checkErrorsInStockAdjustmentHeaderForm();
        if (errors == "") {
            const userConfirm = confirm(`Are You sure to Add Following Stock Adjustment Details 
             Date Is ${stockAdjustmentHeader.stock_adjustment_header_date}
             `);
            if (userConfirm) {
                const postServerResponse = ajaxPostRequest("/stockAdjustmentHeader", stockAdjustmentHeader);
                if (postServerResponse) {
                    alert("save successful")
                    textStockAdjustmentNumber.value = postServerResponse.stock_adjustment_header_no;
                    textStockAdjustmentKey.value = postServerResponse.stock_adjustment_header_key;
                    stockAdjustmentHeaderResetColorsToDefault();
                    refreshStockAdjustmentHeaderTable();
                    refreshStockAdjustmentDetailsForm();
                }
            }
        } else {
            alert(`You Have Following Errors \n ${errors}`)
        }


    } else {
        console.log("update part");
        // need to get id from server
        const getIdFromHeaderKey = await ajaxGetRequest(`/stockAdjustmentHeader/getIdFromHeaderKey/${textStockAdjustmentKey.value}`);
        stockAdjustmentHeader.id = Number(getIdFromHeaderKey);
        stockAdjustmentHeader.stock_adjustment_header_key = textStockAdjustmentKey.value;
        stockAdjustmentHeader.stock_adjustment_header_no = Number(textStockAdjustmentNumber.value);

        const userConfirm = confirm(`Are You Sure To Update Following Stock Adjustment Header 
        ID is ${stockAdjustmentHeader.id}
        Code is ${stockAdjustmentHeader.stock_adjustment_header_key}
        Number is ${stockAdjustmentHeader.stock_adjustment_header_no}
        Date is ${stockAdjustmentHeader.stock_adjustment_header_date}
        `);
        if (userConfirm) {
            const putServerResponse = ajaxPutRequest("/stockAdjustmentHeader", stockAdjustmentHeader);
            if (putServerResponse == "ok") {
                alert("update successful");
                refreshStockAdjustmentHeaderTable();
                stockAdjustmentHeaderResetColorsToDefault();
                refreshStockAdjustmentDetailsForm();
            } else {
                alert(`Update unsuccessful \n ${putServerResponse}`);
            }
        }


    }


}


const refillStockAdjustmentMaster = (ob) => {

    stockAdjustmentHeader = JSON.parse(JSON.stringify(ob));
    oldstockAdjustmentHeader = JSON.parse(JSON.stringify(ob));

    textStockAdjustmentNumber.value = stockAdjustmentHeader.stock_adjustment_header_no;
    textStockAdjustmentKey.value = stockAdjustmentHeader.stock_adjustment_header_key;
    textStockAdjustmentDate.value = stockAdjustmentHeader.stock_adjustment_header_date;

    refreshStockAdjustmentDetailTable();
    refreshStockAdjustmentDetailsForm();


}


const deleteStockAdjustmentHeader = (ob) => {
    const userConfirm = confirm(`Are You Sure To Delete Following Stock Adjustment
        Code is ${ob.stock_adjustment_header_key}
        Number is ${ob.stock_adjustment_header_no}
        Date is ${ob.stock_adjustment_header_date}
    `);
    if (userConfirm){
        const deleteServerResponse = ajaxDeleteRequest("/stockAdjustmentHeader",ob);
        if(deleteServerResponse=="ok"){
            alert("Delete Successful");
            refreshStockAdjustmentHeaderTable();
            divModifyButton2.classList.add('d-none');
        }else {
            alert(`Delete Unsuccessful \n ${deleteServerResponse}`);
        }
    }
}

//we need to take care of details delete part also

// finished stock adjustment header section, from here we have stock adjustment details section



const refreshStockAdjustmentDetailsForm = ()=>{

    stockAdjustmentDetails = new Object();

    selectItem.style.border="2px solid #ced4da";
    textQuantity.style.border="2px solid #ced4da";
    textRate.style.border="2px solid #ced4da";
    textDescription.style.border="2px solid #ced4da";


    selectItem.value="";
    textQuantity.value="";
    textRate.value="";
    textDescription.value="";

    itemList = ajaxGetRequest("/item-master/findall")
    fillDataIntoDataListWithThreeValues(dataListItem,itemList,'item_short_name','item_code','item_barcode');




    buttonStockAdjustmentDetailAdd.style.cursor="default"
    buttonStockAdjustmentDetailAdd.disabled=false



    buttonStockAdjustmentDetailUpdate.style.cursor="not-allowed";
    buttonStockAdjustmentDetailUpdate.disabled=true;


}


const refreshStockAdjustmentDetailTable = ()=>{

    divStockAdjustmentDetail.classList.remove('d-none');

    stockAdjustmentDetailsList = ajaxGetRequest(`/stockAdjustmentDetails/findByHeaderKey/${textStockAdjustmentKey.value}`);

    const displayProperty = [
        {dataType:'function',propertyName:getItemName},
        {dataType:'function',propertyName:getItemQuantity},
        {dataType:'text',propertyName:'stock_adjustment_details_description'},
        {dataType:'function',propertyName:getItemRate},
    ];


    fillDataIntoTable2(tableStockAdjustmentDetail,stockAdjustmentDetailsList,displayProperty,true,divModifyButton3)
    $("#tableStockAdjustmentDetail").dataTable();



}


const getItemName = (ob)=>{
    return ob.item_master_id.item_name
}

const getItemQuantity = (ob)=>{
    return `<p class="text-end">${Number(ob.stock_adjustment_details_quantity).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</p>`;
}

const getItemRate = (ob)=>{
    return `<p class="text-end">${Number(ob.stock_adjustment_details_rate).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</p>`;
}


const stockAdjustmentDetailsCheckErrors = ()=>{
    let errors="";

    if (stockAdjustmentDetails.item_master_id==null){
        errors = errors+"Item Cannot Be Empty \n";
    }

    if (stockAdjustmentDetails.stock_adjustment_details_quantity == null){
        errors = errors+"Quantity Cannot Be Empty \n"
    }
    // if (stockAdjustmentDetails.stock_adjustment_details_rate == null){
    //     errors=errors+"Rate Cannot Be Empty \n"
    // }
    if (stockAdjustmentDetails.stock_adjustment_details_header_key == null){
        errors=errors+"Header Cannot Be Empty \n"
    }
    return errors;
}




const saveStockAdjustmentDetail = ()=>{

    stockAdjustmentDetails.stock_adjustment_details_header_key = textStockAdjustmentKey.value;
    const errors = stockAdjustmentDetailsCheckErrors();

    if (errors==""){
        const userConfirm = confirm(`Are You Sure To Add Following Details 
        Item Name Is ${stockAdjustmentDetails.item_master_id.item_name}
        Quantity Is ${stockAdjustmentDetails.stock_adjustment_details_quantity}
        Code Is ${stockAdjustmentDetails.stock_adjustment_details_header_key}
        `);

        if (userConfirm){
            const postServerResponse = ajaxPostRequest("/stockAdjustmentDetails",stockAdjustmentDetails);
            if (postServerResponse=="ok"){
                alert("Save Successful");
                refreshStockAdjustmentDetailTable();
                refreshStockAdjustmentDetailsForm();
            }else {
                alert(`Save Unsuccessful \n ${postServerResponse}`)
            }
        }
    }else {
        alert(`You Have Following Errors \n ${errors}`)
    }
}


const refillStockAdjustmentDetails = (ob)=>{

    stockAdjustmentDetails = JSON.parse(JSON.stringify(ob))
    oldstockAdjustmentDetails = JSON.parse(JSON.stringify(ob))

    selectItem.value =stockAdjustmentDetails.item_master_id.item_name
    textQuantity.value =stockAdjustmentDetails.stock_adjustment_details_quantity
    textRate.value =stockAdjustmentDetails.stock_adjustment_details_rate
    textDescription.value =stockAdjustmentDetails.stock_adjustment_details_description



    buttonStockAdjustmentDetailAdd.style.cursor="not-allowed";
    buttonStockAdjustmentDetailAdd.disabled=true;



    buttonStockAdjustmentDetailUpdate.style.cursor="default";
    buttonStockAdjustmentDetailUpdate.disabled=false;

}





const checkUpdatesStockAdjustmentDetails = ()=>{

    let updates= ""


    if (stockAdjustmentDetails.item_master_id.item_name != oldstockAdjustmentDetails.item_master_id.item_name){
        updates=updates+"Item Is Changed \n"
    }

    if (stockAdjustmentDetails.stock_adjustment_details_quantity != oldstockAdjustmentDetails.stock_adjustment_details_quantity){
        updates=updates+"Quantity Is Changed \n"
    }
    if (stockAdjustmentDetails.stock_adjustment_details_rate != oldstockAdjustmentDetails.stock_adjustment_details_rate){
        updates=updates+"Rate Is Changed \n"
    }
    if (stockAdjustmentDetails.stock_adjustment_details_description != oldstockAdjustmentDetails.stock_adjustment_details_description){
        updates=updates+"Description Is Changed \n"
    }
    return updates;
}


const updateStockAdjustmentDetails = ()=>{
    const updates = checkUpdatesStockAdjustmentDetails();
    if (updates!=""){
        const userConfirm = confirm(`Are You Sure To Update Following Stock Adjustment Details \n ${updates}`);
        if (userConfirm){
            const putServerResponse = ajaxPutRequest("/stockAdjustmentDetails",stockAdjustmentDetails);
            if (putServerResponse=="ok"){
                alert("Update Successful");
                refreshStockAdjustmentDetailsForm();
                refreshStockAdjustmentDetailTable();
                divModifyButton3.classList.add('d-none');
            }else {
                alert(`Update Unsuccessful \n ${putServerResponse}`);
            }
        }
    }else {
        alert("Nothing To Update")
    }
}


const deleteStockAdjustmentDetails = (ob)=>{

    const userConfirm  = confirm(`Are You Sure To Delete Following Details 
        Item Name Is ${ob.item_master_id.item_name}
        Quantity Is ${ob.stock_adjustment_details_quantity}
        Code Is ${ob.stock_adjustment_details_header_key}
    `);

    if (userConfirm){
        const deleteServerResponse = ajaxDeleteRequest("/stockAdjustmentHeader",ob);
        if (deleteServerResponse=="ok"){
            alert("Delete Successful");
            refreshStockAdjustmentDetailsForm();
            refreshStockAdjustmentDetailTable();
            divModifyButton3.classList.add('d-none');
        }
    }else {
        alert(`User Cancelled the Operation`);
    }
}





const printStockAdjustmentHeader = async (ob)=>{

    await refreshStockAdjustmentDetailTablePrint(ob.stock_adjustment_header_key);


    const newWindow = window.open();
    newWindow.document.write(`
    
    <!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Stock Adjustment Print</title>


    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>

</head>
<body>
<div class="container-fluid" style="position: relative">

    <div class="row">
        <div class="col-12 text-center"><h4>Stock Adjustment</h4></div>
    </div>

    <div class="row mt-2">
        <div class="col-4">

        </div>
        
        <div class="col-4"></div>
        <div class="col-4">
            <table class="table table-bordered" style="border: 1px solid black; height: 50%">
                <tbody>
                <tr>
                    <td style="font-size: 11px; width: 50%">Adj No</td>
                    <td class="text-end" style="font-size: 12px; width: 50%">${ob.stock_adjustment_header_no}</td>
                </tr>
                
                <tr>
                    <td style="font-size: 11px; width: 50%">Adj Code</td>
                    <td class="text-end" style="font-size: 12px; width: 50%">${ob.stock_adjustment_header_key}</td>
                </tr>

                <tr>
                    <td style="font-size: 11px; width: 50%">Adjustment Date</td>
                    <td class="text-end" style="font-size: 12px; width: 50%">${new Date(ob.stock_adjustment_header_date).toLocaleString('en-GB', { day: "2-digit", month: "short", year: "2-digit" })}</td>
                </tr>

                </tbody>
            </table>

        </div>
    </div>
    
    <div class="row" style="margin-left: 3px; margin-right: 1px">
    ${tableStockAdjustmentDetailPrint.outerHTML}
    </div>



</div>

<div style="position: absolute; bottom: 1%; width: 100%" >
    <!--  prepared by, checked by, recieved by area start   -->
    <div class="row">
        <div class="col-4 text-start">
            _____________
            <p style="font-size: 11px">Prepared By</p>
        </div>
        <div class="col-4 text-center">
            _____________
            <p style="font-size: 11px">Received By</p>
        </div>
        <div class="col-4 text-end">
            _____________
            <p style="font-size: 11px; margin-right: 3px">Checked By</p>
        </div>
    </div>
    <!--  prepared by, checked by, recieved by area end   -->
</div>



</body>
</html>
    `);
    newWindow.stop();
    newWindow.print();
    newWindow.close();


    divModifyButton2.classList.add('d-none');
}


const refreshStockAdjustmentDetailTablePrint = (headerKey)=>{


    stockAdjustmentDetailsList = ajaxGetRequest(`/stockAdjustmentDetails/findByHeaderKey/${headerKey}`);

    const displayProperty = [
        {dataType:'function',propertyName:getItemName},
        {dataType:'function',propertyName:getItemQuantity},
        {dataType:'text',propertyName:'stock_adjustment_details_description'},
        {dataType:'function',propertyName:getItemRate},
    ];

    fillDataIntoTable2(tableStockAdjustmentDetailPrint,stockAdjustmentDetailsList,displayProperty,false);

}





























