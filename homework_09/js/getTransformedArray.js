function getTransformedArray(arr, transformFunction){
    let newArr = [];
    forEach(arr, function(item, index) {
        newArr[index] = transformFunction(item);
    });
    return newArr;
}

function transformFunction(num){
    return num+1;
}