const fillDataIntoSelect = (fieldId,message,dataList,property,selectedValue)=>{
    fieldId.innerHTML='';
    const optionMsj = document.createElement('option');
    optionMsj.innerText =message;
    optionMsj.selected='selected';
    optionMsj.disabled='disabled';
    fieldId.appendChild(optionMsj);


    dataList.forEach(element=>{
        const option = document.createElement('option');
        option.innerText=element[property];
        option.value=JSON.stringify(element); // json string ekak set kararanna one nisa meka dynamic dropdown mewa data base eken gannn one
        if (selectedValue == element[property]){
            option.selected='selected';
            console.log("ok")
        }
        fieldId.appendChild(option);
    })
}

//we're using this because we need to appear All keyword in select element we're only using this in stock report module-- client requirements...
const fillDataIntoSelectWithValueAll = (fieldId,message,dataList,property,selectedValue)=>{
    fieldId.innerHTML='';
    const optionMsj = document.createElement('option');
    optionMsj.innerText =message;
    optionMsj.selected='selected';
    optionMsj.disabled='disabled';


    const allValue = document.createElement('option');
    allValue.innerText = "All";
    allValue.value="All"



    fieldId.appendChild(optionMsj);
    fieldId.appendChild(allValue);


    dataList.forEach(element=>{
        const option = document.createElement('option');
        option.innerText=element[property];
        option.value=JSON.stringify(element); // json string ekak set kararanna one nisa meka dynamic dropdown mewa data base eken gannn one
        if (selectedValue == element[property]){
            option.selected='selected';
            console.log("ok")
        }
        fieldId.appendChild(option);
    })
}







const fillDataIntoDataList = (fieldId,dataList,property,selectedValue) =>{
    console.log("fill into data list")
    fieldId.innerHTML='';
    for (const ob of dataList){
        let option = document.createElement('option');
        option.value=ob[property];
        fieldId.appendChild(option);
    }
}

//define function into fill data into data list
const fillDataIntoDataListWithTwoValues = (fieldId,dataList,property,propertyTwo,selectedValue)=>{
    console.log("filll")
    fieldId.innerHTML='';//empting all inner htmls

    for (const ob of dataList){
        let option = document.createElement('option');
        option.value=ob[property]+" "+ob[propertyTwo];
        fieldId.appendChild(option);
    }
}



const fillDataIntoDataListWithThreeValues = (fieldId, dataList, propertyOne, propertyTwo, propertyThree)=>{
    console.log(`fill`);
    fieldId.innerHTML='';

    for (const ob of dataList){
        let option = document.createElement('option');
        option.value = ob[propertyOne]+ " "+ob[propertyTwo]+" "+ob[propertyThree];
        fieldId.appendChild(option);
    }




}




























