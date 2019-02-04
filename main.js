document.addEventListener("DOMContentLoaded", start);

var body;
var images = ["images/1.jpg", "images/2.jpg", "images/3.jpg", "images/4.jpg", "images/5.jpeg", "images/6.jpg", "images/7.jpg", "images/8.jpg"];
var galleryWidth = 700;
var galleryHeight = 500;
var imagesObjects = [];
var galleryDiv;
var imagesContainer;
var leftnumber=1;
var rightnumber=1;

function start() {
    body = document.body;

    createGalleryStructure();
    loadImage();

}

function createGalleryStructure() {
    galleryDiv = document.createElement("div");
    galleryDiv.className = "gallery";
    galleryDiv.style.width = galleryWidth + "px";
    galleryDiv.style.height = `${galleryHeight}px`; //template literals
    galleryDiv.style.position = "relative";
    galleryDiv.style.overflow = "hidden";
    body.appendChild(galleryDiv);

    createImagesConstainer();
    createButtons();
    createLRButtons();
}

function createLRButtons() {
    var lrButtons = document.createElement("div");
    var lrButton;
    lrButtons.style.position = "absolute";
    lrButtons.style.bottom = "50%";
    lrButtons.style.marginLeft = "5%";
    galleryDiv.appendChild(lrButtons);
    for (var b = 0; b < 2; b++) {

        lrButton = document.createElement("div");
        lrButton.style.display = "inline-block";
        lrButton.style.width = "40px";
        lrButton.style.height = "40px";
        lrButton.style.background = "black";
        lrButton.style.borderRadius = "50%";
        lrButton.className = "lrButton" + b;
        if (b == 0) {
            lrButton.style.marginRight = "550px";
            lrButton.addEventListener("click", buttonLeftClick);
        }
        else {
            lrButton.addEventListener("click", buttonRightClick);
        }
        lrButtons.appendChild(lrButton);


    }
}

function createButtons() {
    var buttons = document.createElement("div");
    var button;
    buttons.style.position = "absolute";
    buttons.style.bottom = "10px";
    buttons.style.marginLeft = "50%"; /// utilizate pentru centrare 
    buttons.style.transform = "translateX(-50%)"; /// utilizate pentru centrare
    galleryDiv.appendChild(buttons);
    for (var b = 0; b < images.length; b++) {

        button = document.createElement("div");
        button.style.display = "inline-block";
        button.style.width = "20px";
        button.style.height = "20px";
        button.style.marginRight = "5px";
        button.style.background = "black";
        button.style.borderRadius = "50%";
        button.className = "button" + b;
        button.addEventListener("click", buttonClick);
        buttons.appendChild(button);
        button.style.marginRight = "5px";
    }
    button.style.marginRight = "0";
}

function buttonLeftClick() {
    
    if (leftnumber > (images.length-1)) {
        leftnumber = 0;
    }
    imagesContainer.style.left = `${-1 * leftnumber * galleryWidth}px`;
    leftnumber += 1;
}
function buttonRightClick() { 
    
    if (rightnumber > 1) {
        rightnumber = images.length;
    }
    
    imagesContainer.style.left = `${-1 * rightnumber* galleryWidth}px`;
    rightnumber -= 1;
}

function buttonClick() {
    var n = parseInt(this.className.substr(6));
    leftnumber = (n+1);
    rightnumber = (n+1);
    imagesContainer.style.left = `${-1 * n * galleryWidth}px`;
}

function createImagesConstainer() {
    imagesContainer = document.createElement("div");
    var imageContainer;
    imagesContainer.style.height = `${galleryHeight}px`;
    imagesContainer.style.width = `${galleryWidth * images.length}px`;
    imagesContainer.style.position = "absolute";
    imagesContainer.style.fontSize = "0";
    imagesContainer.style.left = "0"; // trebuie de stiut de unde pleci
    imagesContainer.style.transition = "left .2s"; // tranzitie de .2s 
    galleryDiv.appendChild(imagesContainer);

    for (var i = 0; i < images.length; i++) {

        imageContainer = document.createElement("div");
        imageContainer.style.display = "inline-block";
        imageContainer.style.position = "relative";
        imageContainer.style.width = galleryWidth + "px";
        imageContainer.style.overflow = "hidden";
        imageContainer.style.height = `${galleryHeight}px`; //template literals
        // imageContainer.style.background = `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
        imagesContainer.appendChild(imageContainer);
    }
}

function loadImage() {
    var image = new Image(700, 500);
    for (var i = 0; i < images.length; i++) {
        image = new Image();
        imagesObjects.push(image);
        image.addEventListener("load", imageLoaded);
        image.src = images[i];
        image.style.display = "inline-block";
        image.style.position = "absolute";
        imagesContainer.childNodes[i].appendChild(image);
    }
}

function imageLoaded(e) {
    // var prevVal;
    // if (this.width > galleryWidth || this.height > galleryHeight) {
    //     if (this.width > this.height) {
    //         var prevVal = this.width;
    //         this.width *= galleryWidth / prevVal;
    //         this.height *=  galleryWidth / prevVal;
    //     } else {

    //     }
    // }

    var height = this.height;
    var width = this.width;
    if (width > galleryWidth || height > galleryWidth) {
        var widthRatio = galleryWidth / width;
        var heightRatio = galleryHeight / height;
        var ratio = Math.min(widthRatio, heightRatio);
        this.width = width * ratio;
        this.height = height * ratio;
    }

    this.style.left = `${galleryWidth / 2 - this.width / 2}px`; // aliniere imagine din stanga pe mijloc
    this.style.top = `${galleryHeight / 2 - this.height / 2}px`;
}

//ca sa faci redimensionare la imagini, faci raportul dintre dimensiunea galeriei si dimensiunea imaginii(width si height) ca mai apoi sa faci minimul dintre ele pentru inmultirea celor doua dimenisuni
//butoane left si right - T
//derulare imagini automat - T