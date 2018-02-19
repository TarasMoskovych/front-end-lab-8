function getFilteredArray(arr, predicateFunction){
    let newArr = [];
    forEach(arr, function(item){
       if(predicateFunction(item)){
           newArr.push(item);
       }   
    });
    return newArr;
}