const img_container=document.getElementById("img-container");
const loader_container=document.getElementById("loader-container");
const count=30;
const access_key='9J0FY5BuGBFVtmvseICTDOeEcSB024SAyLt1YTlEIxI';
const url = `https://api.unsplash.com/photos/random?client_id=${access_key}&count= ${count}`;
 let arrays=[];
 


let  getPhotos= async () => {
     try{
        loader_container.hidden = false;
        const response =await fetch(url);
        arrays= await response.json();
       
        photos();

     }
     catch(error)
     {
        console.log(error);
     }
}
let photos = () => {
    
    arrays.forEach((photo) => {

        const anchor = document.createElement('a');
        const img = document.createElement('img');
        setAttributes(anchor, {
            title: photo.alt_description,
            target: "_blank",
            href: photo.links.html
        });
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,

        });
        anchor.appendChild(img)
        img_container.appendChild(anchor);
        loader_container.hidden = true;

    });
}


function setAttributes(element, attributes) {

    for (const key in attributes) {
        console.log('Key', key)
        console.log(attributes[key])
        element.setAttribute(key, attributes[key]);
    }

}



window.addEventListener('scroll', () => {
    console.log('Inner Height', window.innerHeight)
    console.log('Offset Height', document.body.offsetHeight);
    console.log('ScrollY', window.scrollY);
    console.log('window.innerHeight + window.scrollY', window.innerHeight + window.scrollY)

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        getPhotos();
    }
});


getPhotos();
