function collectIds(arr) {
    return getTransformedArray(getFilteredArray(arr, function(item){
        return item.rating > 3;
    }), function(item){
        return item.id;
    });
}