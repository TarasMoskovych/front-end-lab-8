const waitFewSec = (msec, triggerFail) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (triggerFail) {
                reject(false);
                return;
            }
            resolve(true);
        }, msec);
    });
};

const asyncFn = async () => await waitFewSec(1000);

const doAsyncMagic = async () => {
    let arr = [];
    for (let i = 0; i < 4; i++){
        try {
            arr.push(await asyncFn());
        } catch (e){
            arr.push(e);
        }
    }
    console.log(arr);
};

doAsyncMagic(); // [true, true, true, true]

async function* rangeGen() {
    for (let i = 1; i <= 15; i++) {
        yield i;
    }
}

const iterateRange = async () => {
    let sum = 0;
    for await (let item of rangeGen()){
        sum += item;
    }
    return sum;
};

iterateRange(); // Promise {<resolved>: 120}