import screen from "./interface-module";
import {output} from "./output-module";

export const calc = (a, b, sign, reset) => {
    switch(sign) {
        case '+':
            output(String(Number(a) + Number(b)));
            reset();
            break;

        case '-':
            output(String(Number(a) - Number(b)));
            reset();
            break;

        case '*':
            output(String(Number(a) * Number(b)));
            reset();
            break;

        case '^':
            output(String(Number(a) * Number(a)));
            reset();
            break;

        case 'sqrt':
            output(String(Math.sqrt(Number(a))));
            reset();
            break;

        case '1/x':
            output(String(1 / Number(a)));
            reset();
            break;

        case '/':
            if(b === '0') {
                output("Infinity");
                reset();
                break;
            } else {
                output(String(Number(a) / Number(b)));
                reset();
                break;
            }
    }
};