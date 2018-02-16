function getFilteredArray(arr, func){
    let newArr = [];
    forEach(arr, function(item){
       if(predicateFunction(item)){
           newArr.push(item);
       } 
    });
    return newArr;
}

function predicateFunction(num) { 
    return num > 3;
} 