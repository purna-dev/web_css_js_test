gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
    smoothMobile: true

});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight
        };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.defaults({
    scroller: "#main"
});
// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

window.addEventListener('mousemove', (dets) => {
    // console.log(dets.clientX)

    document.querySelector('.mousecir').style.transform = `translate(${dets.clientX}px,${dets.clientY}px)`
})

let menu = document.querySelector('.menu');
menu.addEventListener('mouseover', (dets) => {
    // console.log(dets)
    gsap.to('.menu_s', {

        duration: 2,
        display: 'flex',
        opacity: 0.6,
        x: -3


    })
    // document.querySelector('.menu_s').style.display=`flex`;
})
menu.addEventListener('mouseleave', (dets) => {
    // console.log(dets)
    gsap.to('.menu_s', {

        duration: 2,
        display: 'flex',
        opacity: 0,
        x: 3


    })
})

document.querySelector('.menu').addEventListener('mouseenter',()=>{
    // document.querySelector('.mousecir').style.display ='none';
    document.querySelector('.mousecir').style.width ='20px';
    document.querySelector('.mousecir').style.height ='20px';
    document.querySelector('.mousecir').style.margin ='0.1rem 0.1rem';

    document.body.style.cursor = 'default'
    // document.querySelector('.mousecir').style.transform =`translate(-50%,50%)`;



})
document.querySelector('.menu').addEventListener('mouseleave',()=>{
    document.querySelector('.mousecir').style.width ='10px';
    document.querySelector('.mousecir').style.height ='10px';
    // document.body.style.cursor ='url(cir1.svg),auto'


})

document.querySelector('.icon').addEventListener('mouseenter',()=>{
    // document.querySelector('.mousecir').style.display ='none';
    document.querySelector('.mousecir').style.width ='20px';
    document.querySelector('.mousecir').style.height ='20px';
    document.body.style.cursor = 'default';

    // document.querySelector('.mousecir').style.transform =`translate(-50%,50%)`;



})
document.querySelector('.icon').addEventListener('mouseleave',()=>{
    document.querySelector('.mousecir').style.width ='10px';
    document.querySelector('.mousecir').style.height ='10px';
    // document.body.style.cursor ='url(cir1.svg),auto'

})

//bars animations 
let bar1 = document.querySelector('.bar1')
let bar2 = document.querySelector('.bar2')
let bar3 = document.querySelector('.bar3')
let nav = false;

const openNav = () => {


    bar2.style.transform = `rotate(-45deg)`
    bar1.style.transform = `rotate(45deg) translate(3px,-1px)`
    bar1.style.backgroundColor = `#E23E57`
    // bar2.style.backgroundColor = `#1B262C`

    // bar3.style.backgroundColor = `#1B262C`

    // bar1.style.transform=``
    // document.getElementById('bars').style.zIndex=`9999`;
    bar3.style.transform = `rotate(45deg) translate(1px,-3px)`
    const ttl = gsap.timeline();
    ttl.to('.sidebar', {

        bottom: '0%',
        opacity: 1,
        display: 'block',
        duration: 0.5,
        ease: Expo.easeOut,
        

    }).to('.cir_s',{
        opacity:1,
x:35,
y:25,
duration:0.8
    })
    .to('.home',{
        opacity:1,
        // y:10,
        duration: 0.5,
        ease: Expo.easeOut,
        stagger:0.5
    })


    nav = true;


}

const closeNav = () => {


    bar2.style.transform = `rotate(0deg)`
    bar1.style.transform = `rotate(0deg) translate(0px,0px)`
    bar1.style.backgroundColor = `#F0F5F9`

    // bar1.style.transform=``

    bar3.style.transform = `rotate(0deg) translate(0px,0px)`
    gsap.to('.sidebar', {

        bottom: '-100%',
        duration: 0.5,
        ease: Expo.easeOut,

    })


    nav = false;


}

// const toggleNav = ()=>{
//     console.log('click')
//     nav ? closeNav() : openNav();
// }

document.getElementById('bars').onclick = () => {
    nav ? closeNav() : openNav();

};

let x = document.querySelector('.navbar').offsetTop;

function fixed(){
    if(window.scrollY >= x ){
        document.querySelector('.navbar').classList.add('sticky')
    }
    else{
        document.querySelector('.navbar').classList.remove('sticky')

    }
}
document.body.addEventListener('scroll',fixed())


//web devloper
document.querySelector('.text_2').addEventListener('mouseenter',()=>{
    window.addEventListener('mousemove', (dets) => {
        // console.log(dets.clientX)
        document.querySelector('.web_cir').style.display =`block`;
        document.querySelector('.web_cir').style.transform = `translate(${dets.clientX}px,${dets.clientY}px)`
    })
})
document.querySelector('.text_2').addEventListener('mouseleave',()=>{
    window.addEventListener('mousemove', (dets) => {
        // console.log(dets.clientX)
        document.querySelector('.web_cir').style.display =`none`;
        document.querySelector('.mousecir').style.transform = `translate(${dets.clientX}px,${dets.clientY}px)`
    })
})

const ttl2 = gsap.timeline()

ttl2.to('.sec_1 .text_1 h1',{
    transform:'translateY(0%)',
    opacity:0.7,
    duration:1,
}).to('.sec_1 .text_1 .line_u',{
    width:'150px',
    opacity:0.7,
    ease:Expo.easeOut,
    duration:0.9
    
})
.to('.page1 .sec_1 .text_1 .lin .lin_box',{
    opacity:1,
duration:0.5
})
.to('.sec_1 .text_2 h1',{
    transform:'translateY(0%)',
    opacity:1,
    duration:1,
}).to('.page1 .sec_1 .text_3 .box_u',{
width:'220px',
duration:1
})

//dots{}

gsap.to('.art3',{
    opacity:1,
    duration:0.5
})

//myprojects cursor

document.getElementById('myprojects_c').addEventListener('click',(ev)=>{
    ev.preventDefault();
    alert('hello')
})

document.getElementById('myprojects_c').addEventListener('mouseenter',()=>{

    window.addEventListener('mousemove', (dets) => {
    document.body.style.cursor ='pointer'
    document.querySelector('.clickme').style.display =`block`;
    document.querySelector('.clickme').style.transform = `translate(${dets.clientX}px,${dets.clientY}px)`
        

})
})




document.getElementById('myprojects_c').addEventListener('mouseleave',()=>{
    window.addEventListener('mousemove', (dets) => {
    document.body.style.cursor ='none';
    document.querySelector('.clickme').style.display =`none`;
    })

})


// brain

// gsap.set(".brain svg path", { visibility: "visible" })
// const ttl3 = gsap.timeline();
// ttl3.fromTo(".brain svg path", { drawSVG: 0 }, { drawSVG: '100%', ease: Power1.easeInOut, duration: 3, stagger: 0.005 })
// .fromTo('#_Path_',{opacity:0},{opacity:1,duration:1,ease:Power1.easeInOut})

const paths = document.querySelectorAll('.brain svg path')
// console.log(paths[0].getTotalLength())
paths.forEach((val)=>{
    // console.log(val)
    // val.style.strokeDasharray = '0';
})

// gsap.fromTo(".brain svg path", { drawSVG: 0 }, { drawSVG: '100%', ease: Power1.easeInOut, duration: 3, stagger: 0.005 });



// fixed();

//art3
gsap.fromTo('.page1 .art3',{
 opacity:0
},{
    opacity:0.5,
    duration:1
})

