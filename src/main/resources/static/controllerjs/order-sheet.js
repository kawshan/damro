window.addEventListener('load', function () {

    refreshOrderSheetHeaderTable();
    refreshOrderSheetHeader();



});


const refreshOrderSheetHeader = () => {

    orderSheetHeader = new Object();

    selectCustomer.style.border = "2px solid #ced4da";
    selectDiscount.style.border = "2px solid #ced4da";
    textOrderSheetHeaderKey.style.border = "2px solid #ced4da";
    textOrderSheetNO.style.border = "2px solid #ced4da";
    textOrderSheetDate.style.border = "2px solid #ced4da";


    selectDiscount.value = "";
    textOrderSheetHeaderKey.value = "";
    textOrderSheetNO.value = "";
    textOrderSheetDate.value = "";


    customersList = ajaxGetRequest("/customer-master/findall");
    fillDataIntoDataListWithTwoValues(dataListCustomer, customersList, 'customer_name', 'customer_mobile');


}

const refreshColorsToDefault = () => {
    selectCustomer.style.border = "2px solid #ced4da";
    selectDiscount.style.border = "2px solid #ced4da";
    textOrderSheetHeaderKey.style.border = "2px solid #ced4da";
    textOrderSheetNO.style.border = "2px solid #ced4da";
    textOrderSheetDate.style.border = "2px solid #ced4da";
}


const refreshOrderSheetHeaderTable = () => {

    const orderSheetList = ajaxGetRequest("/order-sheet/findall");

    const displayProperty = [
        {dataType: "function", propertyName: getCustomerName},
        {dataType: "text", propertyName: 'ordersheet_header_code'},
        {dataType: "text", propertyName: 'ordersheet_header_number'},
        {dataType: "text", propertyName: 'ordersheet_header_date'},
        {dataType: "text", propertyName: 'ordersheet_header_discount'},
        {dataType: "text", propertyName: 'ordersheet_header_payment_type'},
    ];

    fillDataIntoTable2(tableOrderSheetHeader, orderSheetList, displayProperty, true, divModifyButton2);
    $("#tableOrderSheetHeader").dataTable();


}


const getCustomerName = (ob) => {
    return ob.customer_master_id.customer_name;
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


const checkErrorsOrderSheetHeader = () => {

    let errors = "";

    if (orderSheetHeader.customer_master_id == null) {
        errors = errors + "Customer cannot be empty \n"
    }
    if (orderSheetHeader.ordersheet_header_date == null) {
        errors = errors + "Date Cannot Be Empty \n"
    }
    if (orderSheetHeader.ordersheet_header_payment_type == null) {
        errors = errors + "Payment Type Cannot be Empty \n"
    }

    return errors;
}


const saveOrUpdateOrderSheetHeader = () => {

    let errors = checkErrorsOrderSheetHeader();


    if (textOrderSheetHeaderKey.value == "") {
        console.log("save part");
        if (errors == "") {
            //     no errors
            const userConfirm = confirm(`Are you sure to add following Order sheet
            customer is ${orderSheetHeader.customer_master_id.customer_name}
            order date is ${orderSheetHeader.ordersheet_header_date};
            Payment type is ${orderSheetHeader.ordersheet_header_payment_type}
            `);
            if (userConfirm) {
                const postServerResponse = ajaxPostRequest("/order-sheet", orderSheetHeader);
                if (postServerResponse && postServerResponse.ordersheet_header_code) {
                    textOrderSheetHeaderKey.value = postServerResponse.ordersheet_header_code;
                    textOrderSheetNO.value = postServerResponse.ordersheet_header_number;
                    alert(`Save Successful`);
                    refreshOrderSheetHeaderTable();
                    refreshColorsToDefault();
                }
            }
        } else {
            //     have errors
            alert(`you have following errors \n ${errors}`)
        }


    } else {
        console.log("update part");
        //need to get id from server
        getIDFromServer = ajaxGetRequest(`/order-sheet/getIdFromHeaderKey/${textOrderSheetHeaderKey.value}`)
        orderSheetHeader.id = Number(getIDFromServer);
        orderSheetHeader.ordersheet_header_code = textOrderSheetHeaderKey.value;
        orderSheetHeader.ordersheet_header_number = textOrderSheetNO.value;

        const userConfirm = confirm(`Are you sure to update following information
            id is ${invoiceHeader.id}
            Header code is ${orderSheetHeader.ordersheet_header_code}
            Header Number Is ${orderSheetHeader.ordersheet_header_number}
            customer is ${orderSheetHeader.customer_master_id.customer_name}
            order date is ${orderSheetHeader.ordersheet_header_date};
            Payment type is ${orderSheetHeader.ordersheet_header_payment_type}
        `);

        if (userConfirm) {
            const putServerResponse = ajaxPutRequest("/order-sheet", orderSheetHeader);
            if (putServerResponse == "ok") {
                alert("update successful");
                refreshColorsToDefault();
                refreshOrderSheetHeaderTable();
            } else {
                alert(`update unsuccessful \n ${putServerResponse}`)
            }
        }
    }
}


const refillOrderSheetHeader = (ob) => {

    orderSheetHeader = JSON.parse(JSON.stringify(ob));
    oldorderSheetHeader = JSON.parse(JSON.stringify(ob));

    selectCustomer.value = orderSheetHeader.customer_master_id.customer_name;
    selectDiscount.value = orderSheetHeader.ordersheet_header_discount;
    textOrderSheetHeaderKey.value = orderSheetHeader.ordersheet_header_code;
    textOrderSheetNO.value = orderSheetHeader.ordersheet_header_number;
    textOrderSheetDate.value = orderSheetHeader.ordersheet_header_date;


}


const deleteOrderSheetHeader = (ob) => {

    const userConfirm = confirm(`Are you sure to delete following order sheet 
            Header Number Is ${ob.ordersheet_header_number}
            customer is ${ob.customer_master_id.customer_name}
            order date is ${ob.ordersheet_header_date};
            Payment type is ${ob.ordersheet_header_payment_type}
    `);
    if (userConfirm){
        const deleteServerResponse = ajaxDeleteRequest("/order-sheet",ob);
        if (deleteServerResponse=="ok"){
            alert("delete successful")
            divModifyButton2.classList.add('d-none');
            refreshOrderSheetHeaderTable();
            refreshProductionHeaderForm();
        }else {
            alert(`delete unsuccessful \n ${deleteServerResponse}`)
        }
    }


}



















































