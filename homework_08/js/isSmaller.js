function isSmaller(a, b){
    if(a == b){
        return false;
    }
    
    return !isBigger(a, b);
}

function isBigger(a, b){
    return a > b;
}