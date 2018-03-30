const max = +process.argv[2];
let FizzBuzz = function* () {
    let current, iter = 1;
    while (iter <= max){
        if(iter % 15 === 0){
            current = 'FizzBuzz';
        } else if(iter % 3 === 0){
            current = 'Fizz';
        } else if(iter % 5 ===0){
            current = 'Buzz';
        } else {
            current = iter;
        }
        iter++;
        yield current;
    }
}();

for (let n of FizzBuzz) {
    console.log(n);
}