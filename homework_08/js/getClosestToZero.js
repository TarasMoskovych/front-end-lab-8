function getClosestToZero(){
    var min = Math.abs(arguments[0]);
    var index = 0;
    
    for(var i = 0; i < arguments.length; i++){
        if(min > Math.abs(arguments[i])){
            min = Math.abs(arguments[i]);
            index = i;
        }
    }
    
    return arguments[index];
}