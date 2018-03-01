let root = document.getElementById("root");
createTanksPreview(tanks, root);

window.addEventListener("hashchange", function() {
  if(location.hash === ""){
      createTanksPreview(tanks, root);
  } else{
      createTankDetails(tanks, root, location.hash.substring(1));
  }
});

function createTanksPreview(arr, parentContainer){    
    removeAllChildren(parentContainer);
    
    let thumbnails = createElement("div", "thumbnails");
    let divContainer = createElement("div", "flex-container");
    
    thumbnails.appendChild(createElement("h1", "h1", "Most popular tanks"));
    thumbnails.appendChild(divContainer);

    for(let i = 0; i < arr.length; i++){
        let item = createElement("div", "item");
        let tankImg = createElement("img");
        let attributes = createElement("div", "tank-attributes");
        let imgContainer = createElement("div", "country");
        let country = createElement("img");
        let level = createElement("p", "level", arr[i].level);
        let model = createElement("p", "tank-name", arr[i].model);
        
        item.addEventListener("click", function(){
            location.hash = arr[i].model.replace(/ /g, "-").toLowerCase();
        });
        item.setAttribute("title", "Click to details");
        tankImg.setAttribute("src", arr[i].preview);
        tankImg.setAttribute("alt", arr[i].model);
        country.setAttribute("src", arr[i].country_image);
        country.setAttribute("alt", arr[i].country);
        country.setAttribute("title", arr[i].country.toUpperCase());
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

function createTankDetails(arr, parentContainer, tank){
    for(let i = 0; i < arr.length; i++){
        if(tank === arr[i].model.replace(/ /g, "-").toLowerCase()){
            removeAllChildren(parentContainer);
            
            let tankDetails = createElement("div", "tank-details");
            let divContainer = createElement("div", "flex-container");
            let item1 = createElement("div", "item");
            let item2 = createElement("div", "item");
            let backLink = createElement("a", "back", "Back to list view");
            let attributes = createElement("div", "tank-attributes");
            let container = createElement("div", "country");
            let country = createElement("img");
            let level = createElement("p", "level", "(level " + arr[i].level + ")");
            let model = createElement("p", "tank-name", arr[i].model);
            let tankImg = createElement("img");
            let tableElement = createElement("table");
    
            backLink.addEventListener("click", function(){
                location.hash = "";
            });
            backLink.setAttribute("href", "#");
            country.setAttribute("src", arr[i].country_image);
            country.setAttribute("title", arr[i].country); 
            country.setAttribute("alt", arr[i].country);
            tankImg.setAttribute("src", arr[i].preview);
            tankImg.setAttribute("alt", arr[i].model);
            
            for(let key in arr[i].details){
                let trElement = createElement("tr");
                trElement.appendChild(createElement("td", "cell", key));
                trElement.appendChild(createElement("td", "cell", arr[i].details[key]));
                tableElement.appendChild(trElement);
            }
            item1.appendChild(createElement("h2", "h2", "Preview"));
            item1.appendChild(tankImg);
            item2.appendChild(createElement("h2", "h2", "Characteristic"));
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

            parentContainer.appendChild(tankDetails);
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