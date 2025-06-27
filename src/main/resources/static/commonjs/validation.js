const textValidator = (fieldId,pattern,object,property)=>{
    const regPattern = new RegExp(pattern);
    if (fieldId.value != ""){
        if (regPattern.test(fieldId.value)){
            window[object][property] = fieldId.value;
            fieldId.style.border='2px solid green'
            console.log('ok');

        }else {
            window[object][property] = null;
            fieldId.style.border='2px solid red';
            console.log('error');
        }
    }else {
        if (fieldId.required){
            fieldId.style.border='2px solid red';
        }else {
            fieldId.style.border='1px solid #ced4da';
            window[object][property] = null;
        }
    }
}

const selectDBValidator = (fieldId,pattern,object,property)=>{
    if (fieldId.value != ''){
        fieldId.style.border='2px solid green';
        window[object][property] = JSON.parse(fieldId.value);
    }else {
        fieldId.style.border='2px solid red';
        window[object][property] = null

    }
}

const selectValidator = (fieldId,pattern,object,property)=>{
    if (fieldId.value != ''){
        fieldId.style.border='2px solid green';
        window[object][property] = fieldId.value;
    }else {
        fieldId.style.border='2px solid red';
        window[object][property] = null

    }
}

const dataListValidator2 = (fieldId,dataListName,object,property,displayPropertyOne)=>{

    const fieldValue = fieldId.value;
    if (fieldId !== ""){
        let dataList = window[dataListName];
        let extIndex = -1;

        for (const index in dataList){
            if (fieldValue == dataList[index][displayPropertyOne]){
                extIndex=index;
                break;
            }
        }
        if (extIndex != -1){
            window[object][property] = dataList[extIndex];
            fieldId.style.border = '2px solid green';
        }else {
            window[object][property]=null;
            fieldId.style.border="2px solid red";
        }
    }else {
        window[object][property] = null;
        fieldId.style.border = fieldId.required ? '2px solid red' : '2px solid #ced4da';
    }
};



const dataListValidatorWithTwoValues = (fieldId,dataListName,object,property,displayPropertyOne,displayPropertyTwo)=>{
    const fieldValue = fieldId.value;
    if (fieldId !==""){
        let dataList = window[dataListName];
        let extIndex = -1;


        for (const index in dataList){
            if (fieldValue == dataList[index][displayPropertyOne]+" "+dataList[index][displayPropertyTwo]){
                extIndex=index;
                break;
            }
        }
        if (extIndex != -1){
            window[object][property] = dataList[extIndex];
            fieldId.style.border='2px solid green';
        }else {
            window[object][property]=null;
            fieldId.style.border='2px solid red';
        }
    }else {
     window[object][property] = null;
     fieldId.style.border = fieldId.required ? '2px solid red' : '2px solid #ced4da';
    }

}


const dataListValidatorWithThreeValues = (fieldId, dataListName,object,property,displayPropertyOne,displayPropertyTwo,displayPropertyThree)=>{

    const fieldValue = fieldId.value;
    if (fieldId !==""){
        let dataList = window[dataListName];
        let extIndex = -1;

        for (const index in dataList){
            if (fieldValue == dataList[index][displayPropertyOne]+ " "+ dataList[index][displayPropertyTwo]+" "+dataList[index][displayPropertyThree]){
                extIndex=index;
                break;
            }
        }
        if (extIndex!=-1){
            window[object][property] = dataList[extIndex];
            fieldId.style.border=`2px solid green`;
        }else {
            window[object][property] = null;
            fieldId.style.border=`2px solid red`
        }
    }else {
        window[object][property] = null;
        fieldId.style.border = fieldId.required ? `2px solid red` : `2px solid ced4da`;
    }
}






























