var canvas=document.querySelector("canvas")
canvas.width=window.innerWidth
canvas.height=window.innerHeight
canvas.style.background="black"

let c=canvas.getContext("2d")

var maxradius=45

var mouse={
    x:undefined,
    y:undefined
}

canvas.addEventListener("mousemove",(e)=>{
    mouse.x=e.x
    mouse.y=e.y
})

window.addEventListener("resize",()=>{
    canvas.width=window.innerWidth
    canvas.height=window.innerHeight
    init()
})

function randcolor(){
    let r=Math.round(Math.random()*255)
    let g=Math.round(Math.random()*255)
    let b=Math.round(Math.random()*255)
    return `rgb(${r},${g},${b})`
}

class circle{
    constructor(x,y,dx,dy,radius,color){
        this.radius=radius
        this.tempradius=radius
        this.x=x
        this.y=y
        this.dx=dx
        this.dy=dy
        this.color=color
    }
    draw(){
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,Math.PI*2)
        c.fillStyle=this.color
        c.strokeStyle=this.color
        c.fill()
        c.stroke()
    }
    update(){
        if(this.x+this.radius>=window.innerWidth || this.x-this.radius<0) this.dx=-this.dx
        if(this.y+this.radius>=window.innerHeight || this.y-this.radius<0) this.dy=-this.dy
        this.y+=this.dy
        this.x+=this.dx
    }
    check(){
        if(mouse.x-this.x<50 && mouse.x-this.x>-50 && mouse.y-this.y<50 && mouse.y-this.y>-50) {
            if(this.radius<maxradius) this.radius+=0.5
        }
        else if(this.radius>this.tempradius) this.radius-=0.5
    }
}

var carr=[]
var arrsize=300
if(window.innerWidth>1000) arrsize=800
else if(window.innerWidth>700) arrsize=500

function init(){
    carr=[]
    for(let i=0;i<arrsize;i++){
    let radius=Math.random()*5+1
    let x=Math.random()*(window.innerWidth-radius)+radius
    let y=Math.random()*(window.innerHeight-radius)+radius
    let dx=Math.random()*0.5
    let dy=Math.random()*0.5
    let color=randcolor()
    carr.push(new circle(x,y,dx,dy,radius,color))
}
}

function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0,0,window.innerWidth,window.innerHeight)
    carr.forEach((val)=>{
        val.update()
        val.draw()
        val.check()
    })
}
init()
animate()