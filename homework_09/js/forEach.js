function forEach(arr, callbackFunction){
    for(let i = 0; i < arr.length; i++){
        callbackFunction(arr[i], i);
    }
}