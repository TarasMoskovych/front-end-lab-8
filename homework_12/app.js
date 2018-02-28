var root = document.getElementById("root");
var thumbnails = createElement("div", "thumbnails");

tankPreview(tanks, thumbnails);

function tankPreview(arr, parent){
    var h1 = createElement("h1", "h1", "Most popular tanks");
    var div = createElement("div", "flex-container");
    
    parent.appendChild(h1);
    parent.appendChild(div);
    
    for(var i = 0; i < arr.length; i++){
        var item = createElement("a", "item");
        item.setAttribute("title", "Click to details");
        item.addEventListener("click", openTankDetails);
        
        var img = createElement("img");
        img.setAttribute("src", arr[i].preview);
        
        var attributes = createElement("div", "tank-attributes");
        
        var container = createElement("div", "country");
        
        var country = createElement("img");
        country.setAttribute("src", arr[i].country_image);
        country.setAttribute("title", arr[i].country);
        
        var level = createElement("p");
        level.textContent = arr[i].level;
        
        var model = createElement("p", "tank-name");
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
    root.appendChild(thumbnails);
}


function tankDetails(tank, arr){
    var tankDetails = createElement("div", "tank-details");
    
    var div = createElement("div", "flex-container");
    
    var item1 = createElement("div", "item1");
    var item2 = createElement("div", "item2");
    
    var preview = createElement("h2", "h2", "Preview");
    var characteristics = createElement("h2", "h2", "Characteristics");
    
    var a = createElement("a", "back", "Back to list view");
    a.setAttribute("href", "#");

    var attributes = createElement("div", "tank-attributes");
    var container = createElement("div");
    var country = createElement("img");
    var level = createElement("p");
    var model = createElement("p", "tank-name");
    var img = createElement("img");
    var table = createElement("table");
    
    for(var i = 0; i < arr.length; i++){
        if(tank === arr[i].model){
            country.setAttribute("src", arr[i].country_image);
            country.setAttribute("title", arr[i].country); 
            level.textContent = "(level " + arr[i].level + ")";
            model.textContent = arr[i].model;
            img.setAttribute("src", arr[i].preview);
            
            for(var key in arr[i].details){
                var tr = createElement("tr");
                var td1 = createElement("td", "td", key);
                var td2 = createElement("td", "td", arr[i].details[key]);
                
                tr.appendChild(td1);
                tr.appendChild(td2);
                
                table.appendChild(tr);
            } 
        }
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
 
    root.removeChild(thumbnails);
    root.appendChild(tankDetails);
}


function createElement(element, className, textContent){
    var tmp = document.createElement(element);
    if(className !== undefined){
        tmp.className = className;
    }
    if(textContent !== undefined){
        tmp.textContent = textContent;
    }
    return tmp;
}

function openTankDetails(){
    var name = this.getElementsByClassName("tank-name")[0];

    location.assign(location + "#" + name.innerHTML);
    tankDetails(name.innerHTML, tanks);
   
    
}