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
ScrollTrigger.defaults({ scroller: "#main" });
// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

window.addEventListener('mousemove',(dets)=>{
// console.log(dets.clientX)

document.querySelector('.mousecir').style.transform=`translate(${dets.clientX}px,${dets.clientY}px)`
})

let menu = document.querySelector('.menu');
menu.addEventListener('mouseover',(dets)=>{
// console.log(dets)
gsap.to('.menu_s',{
   
    duration:2,
    display:'flex',
    opacity:0.6,
    x:-3


})
// document.querySelector('.menu_s').style.display=`flex`;
})
menu.addEventListener('mouseleave',(dets)=>{
    // console.log(dets)
    gsap.to('.menu_s',{
   
        duration:2,
        display:'flex',
        opacity:0,
    x:3
        
    
    })
    })

    //bars animations 
let bar1 = document.querySelector('.bar1')
let bar2 = document.querySelector('.bar2')
let bar3 = document.querySelector('.bar3')
let nav = false;

const openNav =()=>{

    
        bar2.style.transform=`rotate(-45deg)`
        bar1.style.transform=`rotate(45deg) translate(3px,-1px)`
        bar1.style.backgroundColor=`#E23E57`
        // bar1.style.transform=``
    
        bar3.style.transform=`rotate(45deg) translate(1px,-3px)`
    gsap.to('.sidebar',{
       
       bottom:'0%',
        display:'block',
    })
    
    
    nav= true;


}

const closeNav = ()=>{

    
        bar2.style.transform=`rotate(0deg)`
        bar1.style.transform=`rotate(0deg) translate(0px,0px)`
        bar1.style.backgroundColor=`#F0F5F9`
      
        // bar1.style.transform=``
    
        bar3.style.transform=`rotate(0deg) translate(0px,0px)`
        gsap.to('.sidebar',{
       
            bottom:'-100%',
             duration:0.5,
         })
   

    nav=false;


}

// const toggleNav = ()=>{
//     console.log('click')
//     nav ? closeNav() : openNav();
// }

document.getElementById('bars').onclick = ()=>{
    nav ? closeNav() : openNav();

};


