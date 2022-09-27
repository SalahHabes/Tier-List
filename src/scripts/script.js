let mayonnaise = [
    "https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-07/best-mayonnaise-KRAFT-REAL-mc-220708-9cb27b.jpg",
    "https://cdn.apartmenttherapy.info/image/upload/v1565842227/k/archive/17cef5c85fb4e5fbd5062742687f7a7da632bd74.jpg"
];

let container = document.getElementById('unratedItems');

const populateContainer = (imgLinks) => {
    container.innerHTML='';
    imgLinks.forEach((imgLink) => {
    let img = document.createElement('img');
    img.src = imgLink;
    img.className = 'tierItem';
    container.appendChild(img);
});
}

populateContainer(mayonnaise);

document.getElementById("linkForm").addEventListener("submit", (e) => {
    e.preventDefault()
});

const checkIfImageExists = (url) => {
  if (url==='') {
    return false;
  }

  const img = new Image();
  img.src = url;
  
  if (img.complete) {
    return true;
  } else {
    img.onload = () => {
      return true;
    };
    
    img.onerror = () => {
      return false;
    };
  }
}
  
const addImage = (imgLinks) => {
    newLink = document.getElementById('linkInput').value;
    if (checkIfImageExists(newLink)) {
        imgLinks.push(newLink);
        populateContainer(imgLinks);
        document.getElementById('linkInput').value = '';
    } else {
        alert("Image not found. pls check the link and try again.");
    }
        

    checkIfImageExists('http://website/images/img.png', (exists) => {
      if (exists) {
        console.log('Image exists. ')
      } else {
        console.error('Image does not exists.')
      }
    });
    
}