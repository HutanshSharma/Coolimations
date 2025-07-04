let canvas=document.querySelector("canvas")
canvas.width=window.innerWidth
canvas.height=window.innerHeight
let c=canvas.getContext('2d')

let frequency=0.009
let amplitude=50
let increment=frequency
let wavelength=50

//eventlisteners
window.addEventListener("resize",()=>{
    canvas.width=window.innerWidth
    canvas.height=window.innerHeight
    c.clearRect(0,0,canvas.width,canvas.height)
    increment=frequency
    console.log(increment)
})

let dy=1
let num=0
//functions
function init(){
    c.beginPath()
    c.moveTo(0,window.innerHeight/2)
    if(num==0 || num==255) dy=-dy
    num+=dy
    for(let i=0;i<window.innerWidth;i++){
        c.lineTo(i,(window.innerHeight/2)-Math.sin(i/wavelength+increment)*(amplitude*(Math.sin(increment))))
    }
    c.strokeStyle=`hsl(${num}, 50%, 50%)`
    increment+=frequency
    c.stroke()
}

function animate(){
    requestAnimationFrame(animate)
    c.fillStyle="rgba(0,0,0,0.01)"
    c.fillRect(0,0,canvas.width,canvas.height)
    init()
}

animate()
