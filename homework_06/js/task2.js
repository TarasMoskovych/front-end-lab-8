let displaying = (className, arg) => document.querySelector(`.${className}`).style.display = arg;
let content = document.querySelector(".content");
let reIpPattern = /^(?:(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])(\.(?!$)|$)){4}$/;
let ipUrl;
let validateURl = 'https://shrouded-garden-94580.herokuapp.com';
let ip, globalData;

let trackingIp = () => {
    displaying('spinner' , 'block');

    ip = document.getElementById('inputIP').value;

    if(ip.match(reIpPattern)){
        ipUrl = `https://ipapi.co/${ip}/json`;
    } else {
        ipUrl = 'https://ipapi.co/json';
        document.getElementById('inputIP').value = '';
    }

    http.get(ipUrl)
        .then(data => {
            globalData = data;
            appendData(JSON.parse(globalData));
            displaying('spinner', 'none');
            displaying('validate', 'block');
        })
        .catch(e => {
            console.log(e);
        });
};

let validateResponse = () => {
    displaying('spinner', 'block');
    http.post(validateURl, globalData)
        .catch(e => {
            console.log(e);
        });
};

let appendData = (data) => {
    while(content.hasChildNodes()) {
        content.removeChild(content.lastChild);
    }
    let table = createDomElement('table');
    table.setAttribute('class', 'table');

    for(let key in data){
        let tr = createDomElement('tr');
        tr.appendChild(createDomElement('td', key));
        tr.appendChild(createDomElement('td', data[key]));
        table.appendChild(tr);
    }
    content.appendChild(table);
};

let createDomElement = (element, textContent) => {
    let tmp = document.createElement(element);
    if(textContent !== undefined){
        tmp.textContent = textContent;
    }
    return tmp;
};

window.addEventListener("load", () => {
    displaying('spinner', 'none');
});

document.querySelector(".track").addEventListener('click', trackingIp);
document.querySelector(".validate").addEventListener('click', validateResponse);