let http = {
    get: (url) => {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onreadystatechange = () => {
                if (xhr.readyState !== 4) {
                    return;
                }
                if (xhr.status === 200) {
                    resolve(xhr.response);
                } else {
                    reject(xhr.statusText);
                }
            };
            xhr.send();
        });
    },

    post: (url, requestBody) => {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open("POST", url);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = () => {
                if(xhr.readyState === 4 && xhr.status === 200) {
                    try {
                        displaying('spinner', 'none');
                    } catch (e){};
                    alert(xhr.responseText);
                }
            };
            xhr.send(requestBody);
        });
    }
};