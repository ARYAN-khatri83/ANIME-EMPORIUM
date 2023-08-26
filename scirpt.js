const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim(){
    var tl = gsap.timeline();

    tl.from('#nav',{
        y: '-10',
        opacity:0,
        duration: 1.5,
        ease:Expo.easeInout
    })

        .to(".boundingelem",{
            y: 0,
            ease:Expo.easeInout,
            duration:2,
            delay:-1,
            stagger:.2 // it will delay 
        })
        .from("#herofoter",{
            y: -10,
            opacity:0,
            duration: 1.5,
            delay:-1,
            ease:Expo.easeInout
        })
}
var timeout;
function circleChaptaKro(){
    // define default scale value
    var xscale = 1;
    var yscale = 1;
    var xprevious = 0;
    var yprevious = 0;
    window.addEventListener("mousemove",function(dets){
        
        xscale =  gsap.utils.clamp(.8,1.2,dets.clientX - xprevious);
        yscale = gsap.utils.clamp(.8,1.2,dets.clientY - xprevious);

        xprevious = dets.clientX;
        yprevious = dets.clientY;

        circleMouseFollower(xscale,yscale);
         
        timeout = setTimeout(function(){
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
        },100);
    });

}
circleChaptaKro();

function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
      document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    });
}

circleMouseFollower();
firstPageAnim();

// select all the three elem and then put a mousemove and when it starts moving then find where mosue is moving means find x and y pos and show the image in  pos  x y  and when we moce 
// we also had to rotate them and when mouse moves fast then rotation should  also be fast.




document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;
  
    elem.addEventListener("mouseleave", function (dets) {
      gsap.to(elem.querySelector("img"), {
        opacity: 0,
        ease: Power3,
        duration: 0.5,
      });
    });
  
    elem.addEventListener("mousemove", function (dets) {
      var diff = dets.clientY - elem.getBoundingClientRect().top;
      diffrot = dets.clientX - rotate;
      rotate = dets.clientX;
      gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
      });
    });
  });
