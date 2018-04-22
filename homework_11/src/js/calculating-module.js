import {output} from "./output-module";

const slice = content => {
    return content.slice(0,12);
};

export const calc = (a, b, sign, reset) => {
    switch(sign) {
        case '+':
            output(slice(String(Number(a) + Number(b))));
            reset();
            break;

        case '-':
            output(slice(String(Number(a) - Number(b))));
            reset();
            break;

        case '*':
            output(slice(String(Number(a) * Number(b))));
            reset();
            break;

        case '^':
            output(slice(String(Number(a) * Number(a))));
            reset();
            break;

        case 'sqrt':
            output(slice(String(Math.sqrt(Number(a)))));
            reset();
            break;

        case '1/x':
            output(slice(String(1 / Number(a))));
            reset();
            break;

        case '/':
            if(b === '0') {
                output("Infinity");
                reset();
                break;
            } else {
                output(slice(String(Number(a) / Number(b))));
                reset();
                break;
            }
    }
};