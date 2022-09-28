var myList = []
if (localStorage['myKey']) myList = JSON.parse(stored);
else myList = [
    "https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-07/best-mayonnaise-KRAFT-REAL-mc-220708-9cb27b.jpg",
    "https://cdn.apartmenttherapy.info/image/upload/v1565842227/k/archive/17cef5c85fb4e5fbd5062742687f7a7da632bd74.jpg"
];

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
        };
    });
}

populateContainer(myList);

document.getElementById("linkForm").addEventListener("submit", (e) => {
    e.preventDefault()
});

const checkIfImageExists = (url, callback) => {
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
  
const addImage = () => {
    newLink = document.getElementById('linkInput').value;

    checkIfImageExists(newLink, (exists) => {
      if (exists) {
        myList.push(newLink);
        populateContainer();
        document.getElementById('linkInput').value = '';
      } else {
        alert("Image not found. pls check the link and try again.");
      }
    });
    
}