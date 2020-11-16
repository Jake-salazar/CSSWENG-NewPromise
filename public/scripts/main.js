// animation for the navbar

const navSlide = ()=>{
    const big = document.querySelector('.big');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    big.addEventListener('click',()=>{
        nav.classList.toggle('nav-active');


        navLinks.forEach( (link,index)=>{

            if(link.style.animation){
                link.style.animation = ``
            }
            else{
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 +0.5}s`
            }
        });
        // Big animation
        big.classList.toggle('toggle');

    });

}

navSlide();