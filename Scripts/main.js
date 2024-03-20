/**@type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas1"); // variable canvas points to our canvas1 element 
const ctx = canvas.getContext('2d'); // custom context variable. Allows us to call on every 2d method for Canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let my_gradient = ctx.createLinearGradient(0, 0, 1200, 0); // creating a linear gradient. But I could color each root individually instead
let drawing = false;
let continueAnimation = true; // if continue animation is false, then we stop the animation
let root_arr = []; // array which will contain all of our roots
let growthVelocity = 0.1; // how fast our roots grow. The larger the number, the faster the growth 
let density = 1;
let maxSize = 7;


class Root {
    constructor(x,y,growthVelocity, maxSize){
        this.x = x;
        this.y = y;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2
        this.maxSize = (Math.random() * maxSize + maxSize / 2) + 1; // adding one so that the min will always be greater than zero
        this.size = Math.random() * 1 + 2;
        this.vs = Math.random() * growthVelocity - growthVelocity/2; // velocity of size (how fast they grow). A higher number results in faster growth rate
        this.vaX = Math.random() * 0.6 - 0.3;
        this.angleX = Math.random () * 6.2;
        this.vaY = Math.random() * 0.6 - 0.3;
        this.angleY = Math.random () * 6.2;
        continueAnimation = true;
    }
    update(){ 
        if (!continueAnimation) return; // if continue animation is false, stop updating
        this.x += this.speedX + Math.sin(this.angleX) // the x position will be mapped along a sin wave curve
        this.y += this.speedY + Math.sin(this.angleY); // y position will also be mapped along a sin wave
        this.size += this.vs;
        this.angleX += this.vaX;
        this.angleY += this.vaY;
        if (this.size < this.maxSize && this.size > 0){ // as long as the size is greater than zero and smaller than max size. It's possible this.size becomes less than zero
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI*2); // possible to create a rectangle here instead, but I haven't been able to make it look good
            ctx.fillStyle = my_gradient; // will color each root depending on where its at on the screen
            ctx.fill();
            ctx.stroke(); 
            requestAnimationFrame(this.update.bind(this)); 
        }

    }
    setAnimationStatus(){
        continueAnimation = false; // sets continue animation to false. In this case, we no longer want to draw the roots
    }
}

function updateMaxSize() {
    var slider = document.getElementById("size-range");
    output = slider.value; // Display the default slider value
  
    maxSize = output
    console.log(growthVelocity)
  }


function updateDensity() {
    var slider = document.getElementById("density-range");
    output = slider.value; // Display the default slider value
  
    density = output
    console.log(growthVelocity)
  }

function updateColorCount(){
    restart(); //clear screen and restart stop every animation
    delete my_gradient.ctx;
    stopCount = document.getElementById("color-range"); // Number of color stops between 0 and 1
    output = stopCount.value;
    console.log(output)
    my_gradient = ctx.createLinearGradient(0, 0, 1200, 0);
    for (let i = 1; i <= output; i++) {
        my_gradient.addColorStop(i / output, randomColor(colorArray));
        console.log("stop added at " + i / output)
    }

}

function updateMaxSize() {
    var slider = document.getElementById("size-range");
    output = slider.value; // Display the default slider value
  
    maxSize = output
    console.log(growthVelocity)
  }


function updateVelocity() {
    var slider = document.getElementById("velocity-range");
    output = slider.value; // Display the default slider value
  
    growthVelocity = output
    console.log(growthVelocity)
  }


function saveImage() { 
    var canvas1 = document.getElementById("canvas1");        
    if (canvas1.getContext) {
       var image = canvas1.toDataURL("image/png");  
       var link = document.createElement('a');
       link.href = image;
       link.download = 'canvas_image.png';
       link.click();      
    }                          
  }

function restart() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < root_arr.length; i++) {
        root_arr[i].setAnimationStatus(); // Stop ongoing animation for each root
    }
    root_arr = []; // Clear the array
}

function randomColor(colorArray){

    return colorArray[(Math.floor(Math.random() * colorArray.length))] // generate a random index 
}

let colorArray =  ['aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque', 'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood', 
'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan', 'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgrey', 'darkgreen', 
'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue', 'darkslategray', 'darkslategrey', 'darkturquoise',
 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 'dimgrey', 'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro', 'ghostwhite', 'gold', 'goldenrod',
  'gray', 'grey', 'green', 'greenyellow', 'honeydew', 'hotpink', 'indianred', 'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 
  'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgrey', 'lightgreen', 'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 
  'lightslategrey', 'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen', 'magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple', 
  'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite', 'navy', 
  'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid', 'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink', 
  'plum', 'powderblue', 'purple', 'red', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver', 'skyblue', 'slateblue', 
  'slategray', 'slategrey', 'snow', 'springgreen', 'steelblue', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'wheat', 'white', 'whitesmoke', 'yellow', 'yellowgreen']; // we will randomly select from colorArray 




window.addEventListener('mousemove',function(e){
    if (drawing){
        for (let i =0; i < density; i++){  // create X amount of roots where X is our density
            const root = new Root(e.x, e.y, growthVelocity, maxSize);
            root_arr.push(root)  // possible to manipulate eaach Root in root_arr
            root.update(); 
        }
    }
});

window.addEventListener('mousedown',function(){
    drawing = true; // if drawing is false, then we do not create any new roots
});

window.addEventListener('mouseup',function(){
    drawing = false;
});

document.addEventListener('DOMContentLoaded', function() { // make sure our HTML doc is loading before trying to query

    let stopCount = 5; // initial amount of colors
    for (let i = 0; i <= stopCount; i++) {
        my_gradient.addColorStop(i / stopCount, randomColor(colorArray)); //add a color stop equal to 1/5 = .2, then at 2/5 = .4, and so on. The larger stopCount is, the more color stops.
    }
    
    const sidebarButton = document.querySelector('#sidebarButton');
    const sidebar = document.querySelector('#sidebar');

    function openMenu() {
        sidebarButton.classList.toggle('open');
        sidebar.classList.toggle('open');
    }

    sidebarButton.addEventListener('click', openMenu); // toggle sidbar.open
    sidebar.classList.toggle('open');
    sidebarButton.classList.toggle('open'); // make sure menu is closed upon starting application

    

});


