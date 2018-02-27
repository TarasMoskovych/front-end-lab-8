var root = document.getElementById("root");
var thumbnails = createElement("div", "thumbnails");

tree(tanks, thumbnails);

function tree(tanks, parent){
    var h1 = createElement("h1", "h1", "Most popular tanks");
    parent.appendChild(h1);
    
    var grid = createElement("div", "grid-container");
    parent.appendChild(grid);
    
    for(var i = 0; i < tanks.length; i++){
        var tankItem = createElement("div", "item");
        
        var tankImg = createElement("img");
        tankImg.setAttribute("src", tanks[i].preview);
        
        var tankName = createElement("div", "tank-name");
        
        var imgContainer = createElement("div");
        
        var country = createElement("img");
        country.setAttribute("src", tanks[i].country_image);
        
        var level = createElement("p");
        level.textContent = tanks[i].level;
        
        var model = createElement("p", "uppercase");
        model.textContent = tanks[i].model;
        
        imgContainer.appendChild(country);
        
        tankName.appendChild(imgContainer);  
        tankName.appendChild(level); 
        tankName.appendChild(model);    
        
        tankItem.appendChild(tankImg);
        tankItem.appendChild(tankName);
        
        
        grid.appendChild(tankItem);
    }
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


root.appendChild(thumbnails);








