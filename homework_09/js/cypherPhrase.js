var charactersMap = {a: "o", c: "d", t: "g"};

function cypherPhrase(obj, str){
    return getTransformedArray(str.split(""), function(item){
        for(let iterator in obj){
            if(item === iterator){
                item = obj[iterator];
            }
        }
        return item;
    }).join("");
} 