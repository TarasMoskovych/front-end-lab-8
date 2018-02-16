function getTransformedArray(arr, func){
    let newArr = [];
    forEach(arr, function(item) {
        newArr.push(increment(item));
    });
    return newArr;
}

function increment(num){
    return num+1;
}