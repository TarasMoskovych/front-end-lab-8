function getMin(){
    var min = arguments[0];
    
    for(var i = 0; i < arguments.length; i++){
       if(min > arguments[i]){
           min = arguments[i];
       }    
    }
    
    return min;
}