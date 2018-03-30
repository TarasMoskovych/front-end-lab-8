const max = +process.argv[2];
let FizzBuzz = {
    [Symbol.iterator]() {
        let current, iter = 0;
        return {
            next() {
                iter++;
                if(iter % 15 === 0){
                    current = 'FizzBuzz';
                } else if(iter % 3 === 0){
                    current = 'Fizz';
                } else if(iter % 5 ===0){
                    current = 'Buzz';
                } else {
                    current = iter;
                }
                if (iter <= max){
                    return {done: false, value: current};
                }
                return {done: true};
            }
        }
    }
};

for (let n of FizzBuzz) {
    console.log(n);
}