function getTransformedArray(arr, transformFunction){
    let newArr = [];
    forEach(arr, function(item) {
        newArr.push(transformFunction(item));
    });
    return newArr;
}