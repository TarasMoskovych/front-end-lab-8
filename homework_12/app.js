let root = document.getElementById("root");

tankPreview(tanks, root);
window.onhashchange = hashChange;

function tankPreview(arr, parent){    
    parent.innerHTML = "";
    
    let thumbnails = createElement("div", "thumbnails");
    let h1 = createElement("h1", "h1", "Most popular tanks");
    let div = createElement("div", "flex-container");
    
    thumbnails.appendChild(h1);
    thumbnails.appendChild(div);

    for(let i = 0; i < arr.length; i++){
        let item = createElement("a", "item");
        item.setAttribute("title", "Click to details");
        item.addEventListener("click", function(){
            window.location.hash = arr[i].model;
        });
            
        let img = createElement("img");
        img.setAttribute("src", arr[i].preview);
        
        let attributes = createElement("div", "tank-attributes");
        let container = createElement("div", "country");
        
        let country = createElement("img");
        country.setAttribute("src", arr[i].country_image);
        country.setAttribute("title", arr[i].country);
        
        let level = createElement("p");
        level.textContent = arr[i].level;
        
        let model = createElement("p", "tank-name");
        model.textContent = arr[i].model;
        model.setAttribute("title", arr[i].model);
        
        container.appendChild(country);
        attributes.appendChild(container);  
        attributes.appendChild(level); 
        attributes.appendChild(model);    
        item.appendChild(img);
        item.appendChild(attributes);
        div.appendChild(item);
    }
    parent.appendChild(thumbnails);   
}

function tankDetails2(tank, arr){
    root.innerHTML = "";
    
    let tankDetails = createElement("div", "tank-details");
    let div = createElement("div", "flex-container");
    let item1 = createElement("div", "item1");
    let item2 = createElement("div", "item2");
    let preview = createElement("h2", "h2", "Preview");
    let characteristics = createElement("h2", "h2", "Characteristics");
    
    let a = createElement("a", "back", "Back to list view");
    a.setAttribute("href", "#");
    a.addEventListener("click", function(){
        location.hash = "";
    });

    let attributes = createElement("div", "tank-attributes");
    let container = createElement("div");
    let country = createElement("img");
    let level = createElement("p");
    let model = createElement("p", "tank-name");
    let img = createElement("img");
    let table = createElement("table");
    
    for(let i = 0; i < arr.length; i++){
        if(tank === arr[i].model){
            country.setAttribute("src", arr[i].country_image);
            country.setAttribute("title", arr[i].country); 
            level.textContent = "(level " + arr[i].level + ")";
            model.textContent = arr[i].model;
            img.setAttribute("src", arr[i].preview);
            
            for(let key in arr[i].details){
                let tr = createElement("tr");
                let td1 = createElement("td", "td", key);
                let td2 = createElement("td", "td", arr[i].details[key]);
                
                tr.appendChild(td1);
                tr.appendChild(td2);
                table.appendChild(tr);
            }
            
            item1.appendChild(preview);
            item1.appendChild(img);
            item2.appendChild(characteristics);
            item2.appendChild(table);
            div.appendChild(item1);
            div.appendChild(item2);
            container.appendChild(country);
            attributes.appendChild(container);  
            attributes.appendChild(model); 
            attributes.appendChild(level); 
            tankDetails.appendChild(attributes);
            tankDetails.appendChild(div);
            tankDetails.appendChild(a);

            root.appendChild(tankDetails);
        }
    }
}

function hashChange(){
    if(location.hash === ""){
        tankPreview(tanks, root);
    } else{
        let name = location.hash;
        tankDetails2(name.slice(1), tanks);
    }
}

function createElement(element, className, textContent){
    let tmp = document.createElement(element);
    if(className !== undefined){
        tmp.className = className;
    }
    if(textContent !== undefined){
        tmp.textContent = textContent;
    }
    return tmp;
}