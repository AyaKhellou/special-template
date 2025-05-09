
//select elements:
let landingPage = document.querySelector('.landing-page');
let icon = document.querySelector(".settings-box .icon")
let settingsbox = document.querySelector(".settings-box");
let colors = document.querySelectorAll('.colors-list li');
let buttons = document.querySelectorAll('.buttons div');
let bulletsOpt = document.querySelectorAll('.bullets-option div');


//global variables
let backgroundOption = true;
let backgroundInterval;
let ranInd;



//check local storage
let coloroption = localStorage.getItem('--main-color');
if (coloroption !== null) {
    
    document.body.style.setProperty('--main-color',coloroption);

    //check active class
    // remove active class
    colors.forEach(element => {
        element.classList.remove('active')

        if (element.dataset.color === coloroption) {
            element.classList.add('active')
        }
    });

}

//check backgrounds in local storage

let backgroundLocalOpt = localStorage.getItem('background_Option');
let backgroundLocalImg = localStorage.getItem('backgroundImage');

if(backgroundLocalOpt !== null){

    if (backgroundLocalOpt === 'true') {

        backgroundOption = true;
        
    }else{
        backgroundOption = false;

        landingPage.style.backgroundImage = backgroundLocalImg;

        
    }
    buttons.forEach(button=>{
        button.classList.remove('active')
    });
    if (backgroundLocalOpt === 'true') {
        document.querySelector('.yes').classList.add('active');
    }else{
        document.querySelector('.no').classList.add('active');
    }

}

//check nav bullets in local storage

let showBulletsOpt = localStorage.getItem('display');

if (showBulletsOpt !== null) {

    bulletsOpt.forEach((opt)=>{
        opt.classList.remove('active');
    })

    if (showBulletsOpt === 'block') {

        document.querySelector('.navigation-bullets').style.display = 'block';

        document.querySelector('.bullets-option .yes').classList.add('active');
        
    }else{
        
        document.querySelector('.navigation-bullets').style.display = 'none';

        document.querySelector('.bullets-option .no').classList.add('active');
    }
    
}





//show settings on click on gear 

icon.onclick = ()=>{
    settingsbox.classList.toggle("open");
    icon.classList.toggle("spin");
}



//change colors

colors.forEach(color => {
    color.addEventListener('click',(e)=>{
        let mainColor = color.getAttribute('data-color');
        document.body.style.setProperty('--main-color',mainColor);
        localStorage.setItem('--main-color',mainColor);

        handleActive(e)
    })
    
});


//array of pics
let imagesArr = [];
for (let i = 1; i <= 6; i++) {
    
    imagesArr.push(`0${i}.jpg`);
    
}


//change random backgrounds function



buttons.forEach(button => {

    button.addEventListener('click',(e)=>{

        handleActive(e);

        if (e.target.dataset.background === 'yes') {

            backgroundOption = true;

            randomBackground();

            localStorage.setItem('background_Option',true);

            
        }else{

            backgroundOption = false;

            clearInterval(backgroundInterval);

            landingPage.style.backgroundImage = `url('pics/${imagesArr[ranInd]}')`;

            localStorage.setItem('backgroundImage', `url('pics/${imagesArr[ranInd]}')`);

            localStorage.setItem('background_Option',false);
            
        }
    });
    
});


// change backgroundImage

function randomBackground() {
    
    if (backgroundOption === true) {
        
        backgroundInterval = setInterval(() => {
    
            ranInd = Math.floor(Math.random() * imagesArr.length);
            landingPage.style.backgroundImage = `url('pics/${imagesArr[ranInd]}')`;
        
        }, 10000);
    }

}
randomBackground();

//animation on scroll to our skills

let Skills = document.querySelector('.skills');
let skillProgressSpan = document.querySelectorAll('.skills .skill-progress span');

window.onscroll = ()=>{

    let ourSkillsLocation = Skills.offsetTop;
    
    let ourSkillsHeight = Skills.offsetHeight;
    let windowHeight = this.innerHeight;
    
    let windowScrollTop = this.scrollY;

    if (windowScrollTop > (ourSkillsLocation +  ourSkillsHeight - windowHeight)) {
        
        skillProgressSpan.forEach(span => {
            
            span.style.width = span.dataset.width;
            
        });
        
    }
    
    
}


//image popup on click

let images = document.querySelectorAll('.our-gallery img');
let ourGallery = document.querySelector('.our-gallery');

images.forEach(image => {
    image.onclick = ()=>{

        //create overlay

        let overlay = document.createElement('div');

        overlay.className = 'overlay';

        document.body.appendChild(overlay);

        //create popup
        let popup = document.createElement('div');

        popup.className = 'popup';

        
        //add image title
        let imageTitle = document.createElement('h3');

        imageTitle.className = 'image-title';

        let imageTitleText = document.createTextNode(image.alt);

        imageTitle.appendChild(imageTitleText);

        popup.appendChild(imageTitle)

        //add image

        let img = document.createElement('img');

        img.src = image.src;

        popup.appendChild(img);

        ourGallery.appendChild(popup);
        
        //create x remove button

        let removeButton = document.createElement('div');

        removeButton.className = 'remove';

        let buttonContent = document.createTextNode('X');

        removeButton.appendChild(buttonContent);

        popup.appendChild(removeButton);


        //remove button on click

        removeButton.addEventListener('click',()=>{
            popup.remove();
            overlay.remove();
        })

        
        
    }
});

// get click left \ click right \ boxes array \ bullets

let prevButton = document.querySelector('.testimonials .left');
let nextButton = document.querySelector('.testimonials .right');
let testimonialContentArr = document.querySelectorAll('.testimonial-content');
let bullets = document.querySelectorAll('.bullets span');

//set counter

let counter = 0;

check(counter);

//left on click

prevButton.onclick = ()=>{
    if (counter > 0) {
        counter--;
        check(counter);
    }
}

//right on click

nextButton.onclick = ()=>{
    if (counter < testimonialContentArr.length - 1) {
        counter++;
        check(counter);
    }
}

//bullets on click

bullets.forEach((span,i) => {
    span.onclick = ()=>{
        counter = i;
        check(i);
    }
});


function check(currentInd) {

    for (let i = 0; i < testimonialContentArr.length; i++) {
        
        if (i === currentInd) {
            testimonialContentArr[currentInd].style.display = 'flex';
            bullets[currentInd].classList.add('active');
        }
        if(i !== currentInd){
            bullets[i].classList.remove('active');
            testimonialContentArr[i].style.display = 'none';
        }
        
    }
}

//scroll to the section when click on item

function scrollToSection(items) {

    items.forEach(item => {
    
        item.addEventListener('click',(e)=>{
            
            e.preventDefault();
    
            let dataName = e.target.dataset.section;
    
            document.querySelector(`.${dataName}`).scrollIntoView({behavior: "smooth"})
    
        })
    });
    
}

// create navigation bullets

let sections = document.querySelectorAll('.section')

let navigationBullets = document.querySelector('.navigation-bullets');

sections.forEach(section => {

    let classVal = section.classList[0]

    let bullet = document.createElement('div');

    bullet.className = 'bullet';

    bullet.setAttribute('data-section', classVal);

    navigationBullets.appendChild(bullet);

    let span = document.createElement('span');
    
    span.innerHTML = classVal.split('-').join(' ');

    bullet.appendChild(span);
    
});

let navBullets = document.querySelectorAll('.navigation-bullets .bullet');

scrollToSection(navBullets);

let links = document.querySelectorAll('.links li a');

scrollToSection(links);

links.forEach(link => {
    
    link.onclick = ()=>{
        for (let i = 0; i < links.length; i++) {
            
            links[i].classList.remove('active');
            
        }
        link.className = 'active';
    }

});

//hancle active classes

function handleActive(ev){

    ev.target.parentElement.querySelectorAll('.active').forEach(element => {
        element.classList.remove('active')
    });
    ev.target.classList.add('active');

}

// show or hide navigation bullets settings option


bulletsOpt.forEach(opt => {
    
    opt.addEventListener('click',(e)=>{

        if (e.target.dataset.display === 'show') {
            
            navigationBullets.style.display = 'block';
        
            localStorage.setItem('display', 'block');


        }else{

            navigationBullets.style.display = 'none';

            localStorage.setItem('display', 'none');


        }

        handleActive(e);


    })

});

//reset options

let reset = document.querySelector('.option-box.reset');

reset.onclick = ()=>{
    
    localStorage.clear();
    location.reload()
}


let theLinks = document.querySelector('.landing-page .links');
let toggleMenu = document.querySelector('.toggle-menu');

toggleMenu.onclick = function (e){

    e.stopPropagation();

    console.log(this);
    
    this.classList.toggle('menu-active');
    theLinks.classList.toggle('open');

}

document.body.addEventListener('click',(e)=>{

    if (e.target !== theLinks && e.target !== toggleMenu) {
        
        toggleMenu.classList.remove('menu-active');
        theLinks.classList.remove('open');
    }
})

theLinks.onclick = function (e) {
    e.stopPropagation();
}

// document.body.onscroll = ()=>{
//     console.log('js');
//     document.querySelector('.header').classList.add('scroll')
// }

// grab an element
var myElement = document.querySelector(".header");
// construct an instance of Headroom, passing the element
var headroom  = new Headroom(myElement);
// initialise
headroom.init();
