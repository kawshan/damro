window.addEventListener('load', function () {

    refreshInvoiceDetailsForm();


    refreshInvoiceMasterHeaderForm();


    refreshInvoiceMasterHeaderTable();


})


const refreshInvoiceMasterHeaderForm = () => {

    invoiceHeader = new Object();

    selectCustomer.style.border = "2px solid #ced4da";
    textInvoiceHeaderKey.style.border = "2px solid #ced4da";
    textInvoiceNO.style.border = "2px solid #ced4da";
    textInvoiceDate.style.border = "2px solid #ced4da";
    textPoNumber.style.border = "2px solid #ced4da";
    textDispatchKey.style.border = "2px solid #ced4da";
    selectDiscount.style.border = "2px solid #ced4da";


    selectDiscount.value = "";
    selectCustomer.value = "";
    textInvoiceHeaderKey.value = "";
    textInvoiceNO.value = "";
    textInvoiceDate.value = "";
    textPoNumber.value = "";
    textDispatchKey.value = "";

    document.querySelectorAll('input[name=paymentType]').forEach(rb => rb.checked = false);


    customersList = ajaxGetRequest("/customer-master/findall")
    // fillDataIntoDataList(dataListCustomer,customersList,'customer_name','customer_mobile');
    fillDataIntoDataListWithTwoValues(dataListCustomer, customersList, 'customer_name', 'customer_mobile')
    getNextInvoiceNumber();

    buttonInvoiceDetailAdd.disabled = true;
    buttonInvoiceDetailAdd.style.cursor = 'not-allowed';
}


const getNextInvoiceNumber = () => {
    const nextInvoiceNumber = ajaxGetRequest("/invoice-header/getNextInvoiceNumber");

    textInvoiceNO.value = Number(nextInvoiceNumber);
    textInvoiceNO.style.border = "2px solid green";
    invoiceHeader.invoice_header_number = textInvoiceNO.value;
}


const changeColoursToDefault = () => {
    selectCustomer.style.border = "2px solid #ced4da";
    selectDiscount.style.border = "2px solid #ced4da";
    textInvoiceHeaderKey.style.border = "2px solid #ced4da";
    textInvoiceNO.style.border = "2px solid #ced4da";
    textInvoiceDate.style.border = "2px solid #ced4da";
    textPoNumber.style.border = "2px solid #ced4da";
    textDispatchKey.style.border = "2px solid #ced4da";



}


const refreshInvoiceMasterHeaderTable = () => {


    invoiceHeadersList = ajaxGetRequest("/invoice-header/findall");

    displayProperty = [
        {dataType: 'function', propertyName: getCustomerName},
        {dataType: 'text', propertyName: 'invoice_header_master_pay_type'},
        {dataType: 'text', propertyName: 'invoice_header_number'},
        {dataType: 'text', propertyName: 'invoice_header_date'},
        {dataType: 'text', propertyName: 'invoice_header_po_number'},
        {dataType: 'text', propertyName: 'invoice_header_dispatch_number'},
    ];


    // Check if DataTable is already initialized and destroy it
    if ($.fn.DataTable.isDataTable("#tableItemMaster")) {
        $("#tableInvoiceHeader").DataTable().destroy();
    }


    fillDataIntoTable2(tableInvoiceHeader, invoiceHeadersList, displayProperty, true, divModifyButton2);
    $("#tableInvoiceHeader").dataTable();

}


const handelResetInvoiceMaster = () => {


    refreshInvoiceMasterHeaderForm();
    refreshInvoiceMasterHeaderTable();
    divModifyButton2.classList.add('d-none');
    divModifyButton3.classList.add('d-none');
    divInvoiceDetail.classList.add('d-none');
    displayCustomerName.innerHTML = ""
    displayCustomerAddress.innerHTML = ""


    displayGrossValue.innerHTML = "";
    displayTotalDiscount.innerHTML = "";
    displayTotalNetValue.innerHTML = "";
    divGrossDiscountNet.classList.add('d-none')

}


const getCustomerName = (ob) => {
    return ob.customer_master_id.customer_name;
}


const checkErrorsInvoiceMasterHeader = () => {
    let errors = ''

    if (invoiceHeader.customer_master_id == null) {
        errors = errors + "Customer Cannot Be Empty \n"
    }
    if (invoiceHeader.invoice_header_number == null) {
        errors = errors + "Invoice Number Cannot Be Empty \n"
    }
    if (invoiceHeader.invoice_header_date == null) {
        errors = errors + "Date Cannot Be Empty \n"
    }

    if (invoiceHeader.invoice_header_master_pay_type == null) {
        errors = errors + "Payment Type Cannot Be Empty"
    }

    return errors;
}


const saveInvoiceHeader = async () => {

    if (textInvoiceHeaderKey.value == "") {
        console.log(`save part`);

        let errors = checkErrorsInvoiceMasterHeader();
        if (errors == "") {
            const userConfirm = confirm(`Are You Sure To Add Following Invoice Details
            Customer Is ${invoiceHeader.customer_master_id.customer_name}
            Invoice Number Is ${invoiceHeader.invoice_header_number}
            Payment Type Is ${invoiceHeader.invoice_header_master_pay_type}
            Customer Mobile Is ${invoiceHeader.customer_master_id.customer_mobile}
            Invoice Date Is ${invoiceHeader.invoice_header_date}
            `);
            if (userConfirm) {
                const postServerResponse = ajaxPostRequest("/invoice-header", invoiceHeader);
                if (postServerResponse && postServerResponse.invoice_header_key) {
                    alert(`Save Successful`);
                    console.log(postServerResponse.responseText)
                    textInvoiceHeaderKey.value = postServerResponse.invoice_header_key;
                    changeColoursToDefault();
                    refreshInvoiceMasterHeaderTable();
                    refreshInvoiceDetailsForm();
                } else {
                    alert(`Save Unsuccessful \n ${postServerResponse.responseText}`)
                }
            }
        } else {
            alert(`You Have Some Errors \n ${errors}`)
        }
    } else {
        console.log(`update part`);

        const errors = checkErrorsInvoiceMasterHeader();

        if (errors == "") {

            //need to get id

            const getIdFromHeaderKey = await ajaxGetRequest(`/invoice-header/findIdByHeaderKey/${textInvoiceHeaderKey.value}`);
            invoiceHeader.id = Number(getIdFromHeaderKey);
            invoiceHeader.invoice_header_key = textInvoiceHeaderKey.value //key eka set karanne mokada upate ekedi key ekek set wenne na ne eka set venne save eke nisa methanath bind karanna one

            const userConfirm = confirm(`Are You Sure To Update Following Invoice \n
            Customer Is ${invoiceHeader.customer_master_id.customer_name}
            Customer Mobile Is ${invoiceHeader.customer_master_id.customer_mobile}
            Payment Type Is ${invoiceHeader.invoice_header_master_pay_type}
            Invoice Number Is ${invoiceHeader.invoice_header_number}
            Invoice Date Is ${invoiceHeader.invoice_header_date}
            `);
            if (userConfirm) {
                const putServerResponse = await ajaxPutRequest("/invoice-header", invoiceHeader);
                if (putServerResponse == "ok") {
                    alert(`Update Successful`);
                    changeColoursToDefault();
                    refreshInvoiceMasterHeaderTable();
                    divModifyButton2.classList.add('d-none');
                } else {
                    alert(`Update Unsuccessful ${putServerResponse}`);
                }
            }
        } else {
            alert(`You Have Following Errors \n ${errors}`)
        }
    }
}


const refillInvoiceMaster = (ob) => {

    invoiceHeader = JSON.parse(JSON.stringify(ob));
    oldinvoiceHeader = JSON.parse(JSON.stringify(ob));

    selectCustomer.value = invoiceHeader.customer_master_id.customer_name
    textInvoiceHeaderKey.value = invoiceHeader.invoice_header_key
    textInvoiceNO.value = invoiceHeader.invoice_header_number
    textInvoiceDate.value = invoiceHeader.invoice_header_date
    textPoNumber.value = invoiceHeader.invoice_header_po_number
    textDispatchKey.value = invoiceHeader.invoice_header_dispatch_number;
    selectDiscount.value = invoiceHeader.invoice_header_discount;


    if (invoiceHeader.invoice_header_master_pay_type == "cash") {
        radioPayTypeCash.checked = true;
    } else if (invoiceHeader.invoice_header_master_pay_type == "credit") {
        radioPayTypeCredit.checked = true;
    }


    refreshInvoiceDetailsForm();
    refreshInvoiceDetailsTable();

    showTotalNetDiscountAndGross();

}


const deleteInvoiceHeader = (ob) => {

    const userConfirm = confirm(`Are You Sure To Delete Following Invoice \n
            Customer Is ${ob.customer_master_id.customer_name}
            Customer Mobile Is ${ob.customer_master_id.customer_mobile}
            Payment Type Is ${ob.invoice_header_master_pay_type}
            Invoice Number Is ${ob.invoice_header_number}
            Invoice Date Is ${ob.invoice_header_date}
    `);
    if (userConfirm) {
        const deleteServerResponse = ajaxDeleteRequest("/invoice-header", ob);
        if (deleteServerResponse == "ok") {
            alert(`Delete Successful`)
        } else {
            alert(`Delete Unsuccessful \n ${deleteServerResponse}`);
        }
        refreshInvoiceMasterHeaderForm();
        refreshInvoiceMasterHeaderTable();
        divModifyButton2.classList.add('d-none');
    }
}


const showCustomerName = async (fieldId) => {


    const fieldValue = fieldId.value;
    const numberPart = fieldValue.split(" ").pop();
    console.log(`mobile number is ${numberPart}`);
    console.log(numberPart);


    console.log(fieldId.value);

    const customerFromServer = await ajaxGetRequest(`/customer-master/getCustomerByMobile/${numberPart}`)
    console.log(customerFromServer.customer_name);

    displayCustomerName.innerHTML = ""//issalama empty karala innawa
    displayCustomerName.innerHTML = customerFromServer.customer_name;


    displayCustomerAddress.innerHTML = ""//issalama empty karala innawa
    displayCustomerAddress.innerHTML = customerFromServer.customer_master_address;


}


// finished invoice header section


// start invoice details section

const refreshInvoiceDetailsForm = () => {


    invoiceDetail = new Object();

    selectItem.style.border = `2px solid #ced4da`;
    textQuantity.style.border = `2px solid #ced4da`;
    textRate.style.border = `2px solid #ced4da`;
    textValue.style.border = `2px solid #ced4da`;
    textDiscount.style.border = `2px solid #ced4da`;

    selectItem.value = "";
    textQuantity.value = "";
    textRate.value = "";
    textValue.value = "";
    textDiscount.value = "";


    itemList = ajaxGetRequest("/item-master/findall")
    fillDataIntoDataListWithThreeValues(dataListItem, itemList, 'item_short_name', 'item_code', 'item_barcode');


    buttonInvoiceDetailAdd.disabled = false;
    buttonInvoiceDetailAdd.style.cursor = 'default';

    buttonInvoiceDetailUpdate.disabled = true;
    buttonInvoiceDetailUpdate.style.cursor = "not-allowed";
}


const refreshInvoiceDetailsTable = () => {

    divInvoiceDetail.classList.remove('d-none');

    invoiceDetailsList = ajaxGetRequest(`/invoiceDetail/getFromHeaderKey/${textInvoiceHeaderKey.value}`)

    displayProperty = [
        {dataType: 'function', propertyName: getItemName},
        {dataType: 'function', propertyName: getItemQuantity},
        {dataType: 'function', propertyName: getItemRate},
        {dataType: 'function', propertyName: getItemDiscount},
        {dataType: 'function', propertyName: getItemValue},
    ];

    if ($.fn.DataTable.isDataTable("#tableInvoiceDetail")) {
        $("#tableInvoiceDetail").DataTable().destroy();
    }

    fillDataIntoTable2(tableInvoiceDetail, invoiceDetailsList, displayProperty, true, divModifyButton3)
    $("#tableInvoiceDetail").dataTable();
}


const getItemName = (ob) => {
    return ob.item_master_id.item_name
}

const getItemQuantity = (ob) => {
    return `<p style="padding-top: 2px; margin-bottom: -2px" class="text-end">${Number(ob.invoice_detail_quantity).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}</p>`;
}

const getItemRate = (ob) => {
    return `<p style="padding-top: 2px; margin-bottom: -2px" class="text-end">${Number(ob.invoice_detail_rate).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}</p>`;
}

const getItemDiscount = (ob) => {
    return `<p style="padding-top: 2px; margin-bottom: -2px" class="text-end">${ob.invoice_detail_discount == null ? " " : Number(ob.invoice_detail_discount).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}</p>`;
}

const getItemValue = (ob) => {
    return `<p style="padding-top: 2px; margin-bottom: -2px" class="text-end">${Number(ob.invoice_detail_value).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}</p>`;
}


const checkErrorsInvoiceDetails = () => {
    let errors = '';

    if (invoiceDetail.item_master_id == null) {
        errors = errors + "Item Cannot Be Empty \n"
    }

    if (invoiceDetail.invoice_detail_quantity == null) {
        errors = errors + "Quantity Cannot Be Empty"
    }
    if (invoiceDetail.invoice_detail_rate == null) {
        errors = errors + "Rate Cannot Be Empty \n"
    }
    if (invoiceDetail.invoice_detail_value == null) {
        errors = errors + "Value Cannot Be Empty \n"
    }
    return errors;
}


const submitInvoiceDetails = () => {

    invoiceDetail.invoice_detail_header_key = textInvoiceHeaderKey.value;

    let errors = checkErrorsInvoiceDetails();
    if (errors == '') {
        const userConfirm = confirm(`Are You Sure To Add Following Invoice Details
        Item Short Name Is ${invoiceDetail.item_master_id.item_short_name}
        Header Is ${invoiceDetail.invoice_detail_header_key}
        Quantity Is ${invoiceDetail.invoice_detail_quantity}
        Rate Is ${invoiceDetail.invoice_detail_rate}
        Value Is ${invoiceDetail.invoice_detail_value}
        `);

        if (userConfirm) {
            const postServerResponse = ajaxPostRequest("/invoiceDetail", invoiceDetail);
            if (postServerResponse == "ok") {
                alert(`Save Successful`);
                selectItem.focus();
                refreshInvoiceDetailsForm();
                refreshInvoiceDetailsTable();
                showTotalNetDiscountAndGross();
            } else {
                alert(`Save Unsuccessful ${postServerResponse}`);
            }
        }
    } else {
        alert(`You Have Some Errors \n`)
    }
}


const refillInvoiceDetails = (ob) => {

    invoiceDetail = JSON.parse(JSON.stringify(ob));
    oldinvoiceDetail = JSON.parse(JSON.stringify(ob));


    selectItem.value = invoiceDetail.item_master_id.item_name
    textQuantity.value = invoiceDetail.invoice_detail_quantity
    textRate.value = invoiceDetail.invoice_detail_rate
    textValue.value = invoiceDetail.invoice_detail_value


    buttonInvoiceDetailAdd.disabled = true;
    buttonInvoiceDetailAdd.style.cursor = 'not-allowed';

    buttonInvoiceDetailUpdate.disabled = false;
    buttonInvoiceDetailUpdate.style.cursor = "default";


}


const checkUpdatesInvoiceDetails = () => {
    let updates = ''

    if (invoiceDetail.item_master_id.item_short_name != oldinvoiceDetail.item_master_id.item_short_name) {
        updates = updates + "Item Short Name Is Updated \n"
    }
    if (invoiceDetail.invoice_detail_quantity != oldinvoiceDetail.invoice_detail_quantity) {
        updates = updates + "Quantity Is Updated \n"
    }
    if (invoiceDetail.invoice_detail_rate != oldinvoiceDetail.invoice_detail_rate) {
        updates = updates + "Rate Is Updated \n"
    }
    if (invoiceDetail.invoice_detail_value != oldinvoiceDetail.invoice_detail_value) {
        updates = updates + "Value Is Updated \n"
    }
    return updates;
}


const updateInvoiceDetails = () => {

    const updates = checkUpdatesInvoiceDetails();

    if (updates != '') {
        const userConfirm = confirm(`Are You Sure To Update Following Changes \n ${updates}`);
        if (userConfirm) {
            const putServerResponse = ajaxPutRequest("/invoiceDetail", invoiceDetail);
            if (putServerResponse == "ok") {
                alert(`Update Successful`);
                refreshInvoiceDetailsForm();
                refreshInvoiceDetailsTable();
                divModifyButton3.classList.add('d-none');
                showTotalNetDiscountAndGross();
            } else {
                alert(`Update Unsuccessful \n ${putServerResponse}`);
            }
        }
    } else {
        alert(`Nothing To Update`)
    }
}


const deleteInvoiceDetail = (ob) => {
    const userConfirm = confirm(`Are You Sure To Delete Following Invoice Detail \n 
        Item Short Name Is ${ob.item_master_id.item_short_name}
        Header Is ${ob.invoice_detail_header_key}
        Quantity Is ${ob.invoice_detail_quantity}
        Rate Is ${ob.invoice_detail_rate}
        Value Is ${ob.invoice_detail_value}
    `);
    if (userConfirm) {
        const deleteServerResponse = ajaxDeleteRequest("/invoiceDetail", ob);
        if (deleteServerResponse == "ok") {
            alert(`Delete Successful`);
            refreshInvoiceDetailsForm();
            refreshInvoiceDetailsTable();
            divModifyButton3.classList.add('d-none');
            showTotalNetDiscountAndGross();
        } else {
            alert(`Delete Unsuccessful \n ${deleteServerResponse}`);
        }
    }
}


const calculateValue = (fieldId) => {


    if (selectDiscount.value != "") {
        let headerDiscount = selectDiscount.value;
        let quantity = Number(textQuantity.value);
        let rate = Number(fieldId.value);

        let valueBeforeDiscount = quantity * rate;

        let discountAmount = (valueBeforeDiscount / 100) * headerDiscount;
        let finalValue = valueBeforeDiscount - discountAmount;
        console.log(`discounted amount ${discountAmount} from quantity ${quantity} and Rate ${rate} and total value before discount is ${valueBeforeDiscount} after discount is ${finalValue}`);


        textDiscount.value = discountAmount;
        textValue.value = finalValue;

        textDiscount.style.border = "2px solid green";
        textValue.style.border = "2px solid green";


        invoiceDetail.invoice_detail_discount = textDiscount.value;
        invoiceDetail.invoice_detail_value = textValue.value;
    } else {
        console.log(`discount is empty`);
        let rate = Number(fieldId.value);
        let quantity = Number(textQuantity.value);

        const finalValue = rate * quantity;

        textValue.value = finalValue;
        textValue.style.border = '2px solid green';
        invoiceDetail.invoice_detail_value = textValue.value
    }
}


const showTotalNetDiscountAndGross = () => {

    const getGrossFromServer = ajaxGetRequest(`/invoiceDetail/getGrossValue/${textInvoiceHeaderKey.value}`);
    const getDiscountFromServer = ajaxGetRequest(`/invoiceDetail/getTotalDiscount/${textInvoiceHeaderKey.value}`);
    const getTotalFromServer = ajaxGetRequest(`/invoiceDetail/getNetValue/${textInvoiceHeaderKey.value}`);

    divGrossDiscountNet.classList.remove('d-none')

    displayGrossValue.innerHTML = "";
    displayTotalDiscount.innerHTML = "";
    displayTotalNetValue.innerHTML = "";

    displayGrossValue.innerHTML = `${Number(getGrossFromServer).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`
    displayTotalDiscount.innerHTML = `${Number(getDiscountFromServer).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`
    displayTotalNetValue.innerHTML = `${Number(getTotalFromServer).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`


}

const printInvoice = async (ob) => {

    await fillDataIntoInvoicePrint(ob.invoice_header_key);

    await getGrossDiscountNetValuesForTablePrint(ob.invoice_header_key);


    const newWindow = window.open();
    newWindow.document.write(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Invoice Print</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
    
    <style>
        #tableInvoiceDetailPrint th {
            height: 10px !important;
            padding: 10px !important;
            vertical-align: middle !important;
            border-top: 1px solid black;
        }
        
        
#tableInvoiceDetailPrint tbody td {
    height: 10px !important;
    padding: 10px !important;
    vertical-align: middle !important;
    border-top: 1px solid lightgray;
}
        
        
        #labelGross{
        border: 2px solid white; border-right: 1px solid black; border-top: 1px solid black; text-align: right; !important;
        }
        #labelTotal{
        border: 2px solid white; border-right: 1px solid black; text-align: right; !important;
        }
        #labelNet{
        border: 2px solid white; border-right: 1px solid black; text-align: right; !important;
        }
        
        
        #tdGrossValue{
        text-align: right;
        }
        #tdDiscountValue{
        text-align: right;
        }
        #tdNetValue{
        text-align: right;
        }
        
        
        
        
        
        
        
        
        
        
        
    </style>
</head>
<body style="font-family: Verdana">


<div style=" margin-top: 1cm">

    <div class="row" style="margin-bottom: 0; padding-bottom: 0">
        <div class="col-6"></div>
        <div class="col-4 text-end">
            <p style="font-size: 14px; font-weight: bold;">Invoice</p>
        </div>
    </div>


    <div class="row">
        <div class="col-6">
            <div class="card" style="border: 1px solid black">
                <p style="font-size: 11px; padding-left: 5px; padding-top: 3px">${ob.customer_master_id.customer_name}</p>
                <p style="font-size: 11px; padding-left: 5px">${ob.customer_master_id.customer_master_address == null ? " " : ob.customer_master_id.customer_master_address}</p>
            </div>
        </div>
        <div class="col-4">
            <table class="table table-bordered" style="font-size: 11px; border: 1px solid black; line-height: 6px">
                <tr>
                    <td>Invoice No</td>
                    <td class="text-end">${ob.invoice_header_key}</td>
                </tr>

                <tr>
                    <td>Date</td>
                    <td class="text-end">${new Date(ob.invoice_header_date).toLocaleString('en-GB', {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    })}</td>
                </tr>


                <tr>
                    <td>PO No</td>
                    <td class="text-end">${ob.invoice_header_po_number == null ? " " : ob.invoice_header_po_number}</td>
                </tr>

                <tr>
                    <td>Dispatch No</td>
                    <td class="text-end">${ob.invoice_header_dispatch_number == null ? " " : ob.invoice_header_dispatch_number}</td>
                </tr>
            </table>
        </div>
        <div class="col-2"></div>
    </div>
</div>

<div style="margin-top: -10px; margin-left: 3px; margin-right: 5px">
${tableInvoiceDetailPrint.outerHTML}
</div>

<div style="position: absolute; width: 100%; bottom: 1cm; font-size: 11px;">
<div class="row">
    <div class="col-2 text-start">
        <p style="margin: 0 0 0 0">___________</p>
        <p class="text-start">Prepared by</p>
    </div>
    <div class="col-2 text-start">
        <p style="margin: 0 0 0 0">___________</p>
        <p class="text-start">Checked By</p>
    </div>
    <div class="col-3 text-start">
        <p style="margin: 0 0 0 0">___________</p>
        <p class="text-start">Customer Signature</p>
    </div>
    <div class="col-5"></div>
</div>
</div>



</body>
</html>
    `);

    newWindow.stop();
    newWindow.print();
    newWindow.close();
    divModifyButton2.classList.add('d-none');

}


const printInvoiceForA5Size = async (ob) => {

    await fillDataIntoInvoicePrintForA5(ob.invoice_header_key);

    await getGrossDiscountNetValuesForTablePrintA5(ob.invoice_header_key);


    const newWindow = window.open();
    newWindow.document.write(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Invoice Print</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
    
    <style>
        #tableInvoiceDetailPrintA5 th {
            height: 10px !important;
            padding: 10px !important;
            vertical-align: middle !important;
            border-top: 1px solid black;
            border-bottom: 1px solid black !important;
        }
        
        
#tableInvoiceDetailPrintA5 tbody td {
    height: 10px !important;
    padding: 10px !important;
    vertical-align: middle !important;
    border-top: 1px solid lightgray;
}
        
        
        #A5labelGross{
        border: 2px solid white; border-right: 1px solid black; border-top: 1px solid black; text-align: right; !important;
        }
        #A5labelTotal{
        border: 2px solid white; border-right: 1px solid black; text-align: right; !important;
        }
        #A5labelNet{
        border: 2px solid white; border-right: 1px solid black; text-align: right; !important;
        }
        
        
        #A5tdGrossValue{
        text-align: right;
        }
        #A5tdDiscountValue{
        text-align: right;
        }
        #A5tdNetValue{
        text-align: right;
        }
        
        
        
        
        
        
        
        
        
        
        
    </style>
</head>
<body style="font-family: Verdana">

<div>
<img src="/images/Viru_Logo.jpg" height="32" width="80">
</div>

    <div class="row" style="margin-bottom: 0; padding-bottom: 0">
        <div class="col-6"></div>
        <div class="col-4 text-end">
            <p style="font-size: 14px; font-weight: bold;">Invoice</p>
        </div>
    </div>


    <div class="row">
        <div class="col-6">
            <div class="card" style="border: 1px solid black">
                <p style="font-size: 11px; padding-left: 5px; padding-top: 3px">${ob.customer_master_id.customer_name}</p>
                <p style="font-size: 11px; padding-left: 5px">${ob.customer_master_id.customer_master_address == null ? " " : ob.customer_master_id.customer_master_address}</p>
            </div>
        </div>
        <div class="col-6">
            <table class="table table-bordered" style="font-size: 11px; border: 1px solid black; line-height: 6px">
                <tr>
                    <td style="font-size: 10px">Invoice No</td>
                    <td class="text-end">${ob.invoice_header_key}</td>
                </tr>

                <tr>
                    <td style="font-size: 10px;">Date</td>
                    <td class="text-end">${new Date(ob.invoice_header_date).toLocaleString('en-GB', {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    })}</td>
                </tr>


                <tr>
                    <td style="font-size: 10px;">PO No</td>
                    <td class="text-end">${ob.invoice_header_po_number == null ? " " : ob.invoice_header_po_number}</td>
                </tr>

                <tr>
                    <td style="font-size: 10px;">Dispatch No</td>
                    <td class="text-end">${ob.invoice_header_dispatch_number == null ? " " : ob.invoice_header_dispatch_number}</td>
                </tr>
            </table>
        </div>
        
    </div>
</div>

<div>
${tableInvoiceDetailPrintA5.outerHTML}
</div>

<div style="position: absolute; width: 100%; bottom: 0.1cm; font-size: 11px;">
<div class="row">
    <div class="col-4 text-start">
        <p style="margin: 0 0 0 0">___________</p>
        <p class="text-start" style="font-size: 10px">Prepared by</p>
    </div>
    <div class="col-4 text-start">
        <p style="margin: 0 0 0 0">___________</p>
        <p class="text-start" style="font-size: 10px;">Checked By</p>
    </div>
    <div class="col-4 text-start">
        <p style="margin: 0 0 0 0">_______________</p>
        <p class="text-start" style="font-size: 10px;">Customer Signature</p>
    </div>
</div>
<p style="margin: 0 0 0 0">___________________________________________________________________________</p>
<p style="font-size: 10px">No 619/1/2, Waragoda Rd, Kelaniya.</p>
</div>



</body>
</html>
    `);

    setTimeout(function () {
        newWindow.stop();
        newWindow.print();
        newWindow.close();
        divModifyButton2.classList.add('d-none');
    }, 3000)

}

const fillDataIntoInvoicePrintForA5 = (headerKey) => {

    invoiceDetailsList = ajaxGetRequest(`/invoiceDetail/getFromHeaderKey/${headerKey}`)

    const displayProperty = [
        {dataType: 'function', propertyName: getItemNameForPrint},
        {dataType: 'function', propertyName: getItemQuantity},
        {dataType: 'function', propertyName: getItemRate},
        {dataType: 'function', propertyName: getItemDiscount},
        {dataType: 'function', propertyName: getItemValue},
    ];

    fillDataIntoTable2(tableInvoiceDetailPrintA5, invoiceDetailsList, displayProperty, false)
}


const getGrossDiscountNetValuesForTablePrintA5 = (headerKey) => {
    const getGrossFromServer = ajaxGetRequest(`/invoiceDetail/getGrossValue/${headerKey}`);
    const getDiscountFromServer = ajaxGetRequest(`/invoiceDetail/getTotalDiscount/${headerKey}`);
    const getTotalFromServer = ajaxGetRequest(`/invoiceDetail/getNetValue/${headerKey}`);


    A5tdGrossValue.innerHTML = ""
    A5tdDiscountValue.innerHTML = ""
    A5tdNetValue.innerHTML = ""

    A5tdGrossValue.innerHTML = Number(getGrossFromServer).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
    A5tdDiscountValue.innerHTML = Number(getDiscountFromServer).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
    A5tdNetValue.innerHTML = Number(getTotalFromServer).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })


}


const fillDataIntoInvoicePrint = (headerKey) => {

    invoiceDetailsList = ajaxGetRequest(`/invoiceDetail/getFromHeaderKey/${headerKey}`)

    const displayProperty = [
        {dataType: 'function', propertyName: getItemNameForPrint},
        {dataType: 'function', propertyName: getItemQuantity},
        {dataType: 'function', propertyName: getItemRate},
        {dataType: 'function', propertyName: getItemDiscount},
        {dataType: 'function', propertyName: getItemValue},
    ];

    fillDataIntoTable2(tableInvoiceDetailPrint, invoiceDetailsList, displayProperty, false)


}


const getItemNameForPrint = (ob) => {
    return `<p class="text-start" style=" padding-top: 2px; margin-bottom: -2px">${ob.item_master_id.item_name}</p>`
}


const getGrossDiscountNetValuesForTablePrint = (headerKey) => {
    const getGrossFromServer = ajaxGetRequest(`/invoiceDetail/getGrossValue/${headerKey}`);
    const getDiscountFromServer = ajaxGetRequest(`/invoiceDetail/getTotalDiscount/${headerKey}`);
    const getTotalFromServer = ajaxGetRequest(`/invoiceDetail/getNetValue/${headerKey}`);


    tdGrossValue.innerHTML = ""
    tdDiscountValue.innerHTML = ""
    tdNetValue.innerHTML = ""

    tdGrossValue.innerHTML = Number(getGrossFromServer).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
    tdDiscountValue.innerHTML = Number(getDiscountFromServer).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
    tdNetValue.innerHTML = Number(getTotalFromServer).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })


}


const readBarcode = (fieldId) => {
    if (RegExp('^[0-9]{13}$').test(fieldId.value)) {

        const serverResponse = ajaxGetRequest(`/item-master/getFromBarCode/${fieldId.value}`);

        //showing on front end
        textRate.value = serverResponse.item_price


        //binding on js object
        invoiceDetail.item_master_id = serverResponse;
        invoiceDetail.invoice_detail_rate = serverResponse.item_price;

        //style the border
        selectItem.style.border = "2px solid purple"


    } else {
        //no logic here
    }
}
































