//table ekaka row ekak uda mouse eka sroll karahama ee adala row eke diga palala wadi venna one
const changeRowWidth = (fieldID) =>{
    console.log(`on mouse wheel called`);
    console.log(event.deltaY)

    if (event.deltaY>0){
        console.log(`mouse wheel to down`)
        fieldID.style.width = (parseInt(fieldID.style.width) - 1) + 'px';
    }else {
        console.log(`mouse wheel to up`);
        fieldID.style.width = (parseInt(fieldID.style.width) + 1) + 'px';
    }

}