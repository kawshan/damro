//just created for only div modify button id duplication problem to solve // same as the above table
const fillDataIntoTable2 = (tableId,dataList,columnList,buttonVisibility=true,divModifyElementName)=>{
    const tableBody = tableId.children[1];
    tableBody.innerHTML='';

    dataList.forEach((element,index)=>{
        const tr = document.createElement('tr');

        const tdIndex = document.createElement('td');
        tdIndex.innerText = parseInt(index)+1;
        tr.appendChild(tdIndex);


        columnList.forEach(column =>{
            const  td = document.createElement('td');
            if (column.dataType == 'text'){
                td.innerText=element[column.propertyName];
            }
            if (column.dataType == 'function'){
                td.innerHTML=column.propertyName(element);
            }
            tr.appendChild(td);
        });


        const tdButton = document.createElement('td');
        tdButton.className = 'text-center'

        const inputRadio = document.createElement('input');
        inputRadio.className = 'form-check-input mt-3';
        inputRadio.name='modify';
        inputRadio.type='radio';

        inputRadio.onchange = function (){
            window['editOb'] = element;
            window['editRow'] = index;

            divModifyElementName.classList.remove('d-none')
        }
        tdButton.appendChild(inputRadio);

        if (buttonVisibility){
            tr.appendChild(tdButton);
        }

        tableBody.appendChild(tr);

    });
}





const fillDataIntoTableForStockReportPrint = (tableId, dataList, columnList, buttonVisibility = true) => {
    const tableBody = tableId.children[1];
    tableBody.innerHTML = '';

    // **Add an empty row with specific content in the last two cells**
    const emptyRow = document.createElement('tr');

    // Add empty cells for all columns except the last two
    for (let i = 0; i < columnList.length - 1; i++) {
        const emptyCell = document.createElement('td');
        emptyCell.innerText = ''; // Leave these cells empty
        emptyRow.appendChild(emptyCell);
    }

    // Add the second-to-last cell with "Previous Value" and class 'text-end'
    const previousValueCell = document.createElement('td');
    previousValueCell.innerText = 'Pre Value'; // Add the text
    previousValueCell.className = 'text-end'; // Add the class 'text-end'
    previousValueCell.style.fontWeight = 'bold'; // Optional: Add styling
    previousValueCell.style.fontFamily='verdana';
    previousValueCell.style.fontSize="11px";
    emptyRow.appendChild(previousValueCell);

    // Add the last cell with "0"
    const zeroCell = document.createElement('td');
    zeroCell.innerText = '0'; // Add the value
    zeroCell.style.fontWeight = 'bold'; // Optional: Add styling
    zeroCell.className = 'text-end'; // Add the class 'text-end'
    zeroCell.id = 'zeroColumn'; // Add the id for easier access later
    zeroCell.innerHTML=getPreviousValues();
    emptyRow.appendChild(zeroCell);

    tableBody.appendChild(emptyRow); // Append the empty row to the table

    // Loop through the data list to populate rows
    dataList.forEach((element, index) => {
        const tr = document.createElement('tr');
        const tdIndex = document.createElement('td');
        tdIndex.style.lineHeight = 0.1;
        tdIndex.style.paddingTop = '2%';

        tdIndex.innerText = parseInt(index) + 1;
        tr.appendChild(tdIndex);

        columnList.forEach(column => {
            const td = document.createElement('td');
            td.style.lineHeight = 0.1; // Set reasonable line height
            td.style.paddingTop = '2%'; // Add padding for better vertical alignment

            if (column.dataType === 'text') {
                td.innerText = element[column.propertyName];
            }
            if (column.dataType === 'function') {
                td.innerHTML = column.propertyName(element);
            }
            tr.appendChild(td);
        });

        const tdButton = document.createElement('td');
        tdButton.className = 'text-center';

        const inputRadio = document.createElement('input');
        inputRadio.className = 'form-check-input mt-3';
        inputRadio.name = 'modify';
        inputRadio.type = 'radio';

        inputRadio.onchange = function () {
            window['editOb'] = element;
            window['editRow'] = index;

            divModifyButton.className = 'd-block';
        };
        tdButton.appendChild(inputRadio);

        if (buttonVisibility) {
            tr.appendChild(tdButton);
        }

        tableBody.appendChild(tr);
    });
};










