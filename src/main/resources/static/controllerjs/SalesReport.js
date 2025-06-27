window.addEventListener('load',function (){

    refreshSalesReportForm();




})

const refreshSalesReportForm = ()=>{

    salesReport = new Object();

    selectFromDate.style.border="2px solid #ced4da";
    selectToDate.style.border="2px solid #ced4da";

    selectFromDate.value="";
    selectToDate.value="";


}

const refreshSalesReportTable = ()=>{

    const salesReportList = ajaxGetRequest(`/sales-report/${salesReport.fromdate}/${salesReport.todate}`);

    const displayColumns = [
        {dataType:'function',propertyName:getDate},
        {dataType:'text',propertyName:'invoice_number'},
        {dataType:'text',propertyName:'customer_name'},
        {dataType:'function',propertyName:getCash},
        {dataType:'function',propertyName:getCredit},
    ]


    fillDataIntoTable2(tableSalesReportPrint,salesReportList,displayColumns,false);


}

let totalCashAmount = 0;
let totalCreditAmount = 0;


const getDate = (ob)=>{
    return ob.invoice_date
}


const getCash = (ob)=>{
    if (ob.payment_type==="cash"){
        totalCashAmount=totalCashAmount+Number(ob.total_invoice_value);
        return `<div class="text-end">${Number(ob.total_invoice_value).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</div>`
    }else if (ob.payment_type==="credit"){
        return " "
    }
}


const getCredit = (ob)=>{
    if (ob.payment_type==="credit"){
        totalCreditAmount=totalCreditAmount+Number(ob.total_invoice_value);
        return `<div class="text-end">${Number(ob.total_invoice_value).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</div>`
    }else if (ob.payment_type==="cash"){
        return " "
    }
}


const printSalesReport = async ()=>{

    await refreshSalesReportTable();

    tfootCash.innerText=totalCashAmount.toLocaleString('en-us',{minimumFractionDigits:2,maximumFractionDigits:2});
    tfootCredit.innerText=totalCreditAmount.toLocaleString('en-us',{minimumFractionDigits:2,maximumFractionDigits:2});

    const newWindow = window.open();
    newWindow.document.write(`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sales Report</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
    
    <style>
    #tableStockReportPrint{
    line-height: 5px !important;
    height: 5px !important;
    }
</style>
    
</head>
<body style="font-family: Verdana">


<div style=" top: 1cm">

    <div class="row" style="margin-bottom: 0; padding-bottom: 0">
            <p class="text-center" style="font-size: 14px; font-weight: bold;">Sales report</p>
    </div>
</div>

<div class="row" style="margin: 5px">
${tableSalesReportPrint.outerHTML}
</div>

</body>
</html>
    `);


    setTimeout(()=>{
        newWindow.stop();
        newWindow.print();
        newWindow.close();
    },3000)



}


































