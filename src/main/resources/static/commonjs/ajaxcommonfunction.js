//define function for ajax get request
const ajaxGetRequest = (url)=>{
    let serverResponse;

    $.ajax(url,{
        async:false,
        type:"GET",
        contentType:"json",
        success:function (data){
            console.log("success"+data);
            serverResponse=data;
        },
        error:function (restOb){
            console.log("error"+restOb);
            serverResponse=restOb;
        }
    });
    return serverResponse;
}

//define function for post ajax request
const ajaxPostRequest = (url,object)=>{

    let postServerResponse;
    $.ajax(url,{
        async: false,
        type: "POST",
        contentType: "application/json",
        data:JSON.stringify(object),
        success:function (data){
            console.log("success "+data);
            postServerResponse=data;
        },
        error:function (restOb){
            console.log(restOb);
            postServerResponse=restOb;
        }
    });
    return postServerResponse
}
//define function for ajax delete request
const ajaxDeleteRequest = (url,ob)=>{
    let deleteServerResponse = 'ok';
    $.ajax(url,{
        async:false,
        type:"DELETE",
        contentType:"application/json",
        data: JSON.stringify(ob),
        success:function (data){
            console.log("success"+data);
            deleteServerResponse=data;

        },
        error:function (restOb){
            console.log("failed"+restOb);
            deleteServerResponse=restOb;
        }
    })
    return deleteServerResponse;
}

//define function for ajax put request
const ajaxPutRequest = (url,object)=>{
    let putServiceResponse;
    $.ajax(url,{
        async:false,
        contentType:"application/json",
        type:"PUT",
        data:JSON.stringify(object),
        success:function (data){
            console.log("success "+data);
            putServiceResponse=data
        },
        error:function (restOb){
            console.log("fail "+restOb);
            putServiceResponse=restOb;
        }
    });
    return putServiceResponse;
}


















