let inputs = process.argv.slice(2);
let result = inputs.map(item => item[0]).reduce((result, item) => result + item);
console.log(result);