var myList = []
if (localStorage['myList']) {
    myList = JSON.parse(localStorage['myList']) 
} else {
    myList = [];
}

let container = document.getElementById('unratedItems');

const populateContainer = () => {
    container.innerHTML='';
    myList.forEach((imgLink) => {
        let imgDiv = document.createElement('div');
        imgDiv.className = 'tierItem';
        let img = document.createElement('img');
        img.className = 'image';
        img.src = imgLink;
        let deleteIco = document.createElement('input');
        deleteIco.className = 'deleteIcon';
        deleteIco.src = "./assets/remove.png";
        deleteIco.setAttribute("type", "image")

        imgDiv.appendChild(img);
        imgDiv.appendChild(deleteIco);
        container.appendChild(imgDiv);

        deleteIco.onclick = function(e) {
            imgSrc = e.target.parentElement.firstChild.src;
            e.target.parentNode.remove();
            myList = myList.filter(l => l != imgSrc);
            console.log(myList);
            localStorage['myList'] = JSON.stringify(myList);
        };
    });
}

populateContainer(myList);

document.getElementById("linkForm").addEventListener("submit", (e) => {
    e.preventDefault()
});

const checkURL = (url, callback) => {
  if (String(url)==='') {
    callback(false);
  }

  const img = new Image();
  img.src = url;
  
  if (img.complete) {
    callback(true);
  } else {
    img.onload = () => {
        callback(true);
    };
    
    img.onerror = (e) => {
        console.log(e);
        callback(false);
    };
  }
}
  
const isInList = (url) => {
    return myList.includes(url);
}

const addImage = () => {
    newLink = document.getElementById('linkInput').value;
    if (!myList.includes(newLink)) {
        checkURL(newLink, (exists) => {
            if (exists) {
              myList.push(newLink);
              localStorage['myList'] = JSON.stringify(myList);
              populateContainer();
              document.getElementById('linkInput').value = '';
            } else {
              alert("Image not found. pls check the link and try again.");
            }
          });
    } else {
        alert("Image is already in the list.");
    }
}