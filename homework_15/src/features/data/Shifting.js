const shifting = input => {
    if(input.length <= 5){
        return input;
    }
    let tmp = [], i = input.length - 1;
    while (i !== input.length - 6){
        tmp.unshift(input[i]);
        i--;
    }
    return tmp;
};

export default shifting;