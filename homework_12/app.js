let root = document.getElementById("root");

createTanksPreview(tanks, root);

window.addEventListener("hashchange", function() {
  if(location.hash === ""){
      createTanksPreview(tanks, root);
  } else{
      createTankDetails(tanks, location.hash.substring(1));
    }
});

function createTanksPreview(arr, parentContainer){    
    removeAllChildren(root);
    
    let thumbnails = createElement("div", "thumbnails");
    let h1Element = createElement("h1", "h1", "Most popular tanks");
    let divContainer = createElement("div", "flex-container");
    
    thumbnails.appendChild(h1Element);
    thumbnails.appendChild(divContainer);

    for(let i = 0; i < arr.length; i++){
        let item = createElement("a", "item");
        item.setAttribute("title", "Click to details");
        item.addEventListener("click", function(){
            location.hash = arr[i].model;
        });
            
        let tankImg = createElement("img");
        tankImg.setAttribute("src", arr[i].preview);
        tankImg.setAttribute("alt", arr[i].model);
        
        let attributes = createElement("div", "tank-attributes");
        let imgContainer = createElement("div", "country");
        
        let country = createElement("img");
        country.setAttribute("src", arr[i].country_image);
        country.setAttribute("alt", arr[i].country);
        country.setAttribute("title", arr[i].country.toUpperCase());
        
        let level = createElement("p");
        level.textContent = arr[i].level;
        
        let model = createElement("p", "tank-name");
        model.textContent = arr[i].model;
        model.setAttribute("title", arr[i].model.toUpperCase());
        
        imgContainer.appendChild(country);
        attributes.appendChild(imgContainer);  
        attributes.appendChild(level); 
        attributes.appendChild(model);    
        item.appendChild(tankImg);
        item.appendChild(attributes);
        divContainer.appendChild(item);
    }
    parentContainer.appendChild(thumbnails);   
}

function createTankDetails(arr, tank){
    removeAllChildren(root);
    
    let tankDetails = createElement("div", "tank-details");
    let divContainer = createElement("div", "flex-container");
    let item1 = createElement("div", "item1");
    let item2 = createElement("div", "item2");
    let preview = createElement("h2", "h2", "Preview");
    let characteristics = createElement("h2", "h2", "Characteristics");
    let backLink = createElement("a", "back", "Back to list view");
    backLink.setAttribute("href", "#");
    backLink.addEventListener("click", function(){
        location.hash = "";
    });
    let attributes = createElement("div", "tank-attributes");
    let container = createElement("div", "country");
    let country = createElement("img");
    let level = createElement("p");
    let model = createElement("p", "tank-name");
    let tankImg = createElement("img");
    let tableElement = createElement("table");
    
    for(let i = 0; i < arr.length; i++){
        if(tank === arr[i].model){
            country.setAttribute("src", arr[i].country_image);
            country.setAttribute("title", arr[i].country); 
            country.setAttribute("alt", arr[i].country);
            level.textContent = "(level " + arr[i].level + ")";
            model.textContent = arr[i].model;
            tankImg.setAttribute("src", arr[i].preview);
            tankImg.setAttribute("alt", arr[i].model);
            
            for(let key in arr[i].details){
                let trElement = createElement("tr");
                let tdElement1 = createElement("td", "td", key);
                let tdElement2 = createElement("td", "td", arr[i].details[key]);
                
                trElement.appendChild(tdElement1);
                trElement.appendChild(tdElement2);
                tableElement.appendChild(trElement);
            }
            
            item1.appendChild(preview);
            item1.appendChild(tankImg);
            item2.appendChild(characteristics);
            item2.appendChild(tableElement);
            divContainer.appendChild(item1);
            divContainer.appendChild(item2);
            container.appendChild(country);
            attributes.appendChild(container);  
            attributes.appendChild(model); 
            attributes.appendChild(level); 
            tankDetails.appendChild(attributes);
            tankDetails.appendChild(divContainer);
            tankDetails.appendChild(backLink);

            root.appendChild(tankDetails);
        }
    }
}

function removeAllChildren(parentContainer){
    while(parentContainer.hasChildNodes()) {
        parentContainer.removeChild(parentContainer.lastChild);
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