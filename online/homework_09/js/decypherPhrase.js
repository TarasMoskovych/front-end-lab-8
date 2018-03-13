function decypherPhrase(obj, str){
    let decypherObj = {};
    let value;
    for(let key in obj){
        value = obj[key];
        decypherObj[value] = key;
    }
    return cypherPhrase(decypherObj, str);
}