var charactersMap = {a: "o", c: "d", t: "g"};

function cypherPhrase(obj, str){
    return getTransformedArray(str.split(""), function(item){
        for(let key in obj){
            if(item === key){
                item = obj[key];
            }
        }
        return item;
    }).join("");
} 