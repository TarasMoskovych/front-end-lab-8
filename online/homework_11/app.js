var rootNode = document.getElementById("root");
var treeNode = createElement("div", "container");
var level = 1;

appendElement(treeNode, structure, level);

function appendElement(parent, arr, level) {
    for(var i = 0; i < arr.length; i++) {
        var divParent = createElement("div"); 
        
        if(level === 1){
            divParent.className = "shown";
        } else{
           divParent.className = "hidden"; 
        }
        
        var pElement = createElement("p", "paragraph bg-color level"+level, arr[i].title);
        var iElement;
        
        if(arr[i].folder){
            iElement = createElement("i", "image folder material-icons", "folder"); 
            pElement.addEventListener("click", display);
        } else {
            iElement = createElement("i", "image file material-icons", "insert_drive_file"); 
        }
        
        pElement.appendChild(iElement);
        divParent.appendChild(pElement);
        
        if(arr[i].children) {
            appendElement(divParent, arr[i].children, level+1);
        }
        
        if(arr[i].children === null || !arr[i].children) {
            var div = createElement("div", "hidden"); 
            var pElement = createElement("p", "paragraph text level"+level, "Folder is empty");
            div.appendChild(pElement);
            divParent.appendChild(div); 
        }
        parent.appendChild(divParent);
    }
}

function createElement(name, className, text){
    var element = document.createElement(name);
    if(text !== undefined){
       element.textContent = text; 
    }
    if(className !== undefined){
       element.className = className; 
    }
    return element;
}

function display(event){
    var clicked = event.target || event.srcElement;
    var children = clicked.parentElement.childNodes;
    var folderIcon = clicked.getElementsByTagName("i")[0];
    
    for(var i = 1; i < children.length; i++){
        if(children[i].classList.contains("shown")) {
            folderIcon.textContent = "folder";
        } else {
            folderIcon.textContent = "folder_open";
        }
        children[i].classList.toggle("shown");
        children[i].classList.toggle("hidden");
    }
}

rootNode.appendChild(treeNode);