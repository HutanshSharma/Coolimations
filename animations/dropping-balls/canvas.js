var canvas=document.querySelector("canvas")
canvas.width=window.innerWidth
canvas.height=window.innerHeight
canvas.style.background='black'

let c=canvas.getContext("2d")

window.addEventListener("resize",()=>{
    canvas.width=window.innerWidth
    canvas.height=window.innerHeight
    init()
})

window.onclick=()=>{
    init()
}

function randcolor(){
    let r=Math.round(Math.random()*255)
    let g=Math.round(Math.random()*255)
    let b=Math.round(Math.random()*255)
    return `rgb(${r},${g},${b})`
}

function randomnumber(max,min){
    return Math.round(Math.random()*(max-min+1))+min
}

var dissipate=0.8
var gravity=0.012

class circle{
    constructor(x,y,dy,radius,color){
        this.radius=radius
        this.tempradius=radius
        this.x=x
        this.y=y
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
        if(this.y+this.radius+this.dy>canvas.height) this.dy=-this.dy*dissipate
        else this.dy+=gravity
        this.y+=this.dy
    }
}

let carr=[]
function init(){
    carr=[]
    for(let i=0;i<100;i++){
        let y=randomnumber(100,window.innerHeight-200)
        let x=randomnumber(10,window.innerWidth-10)
        let radius=randomnumber(3,30)
        let color=randcolor()
        ball=new circle(x,y,0.01,radius,color)
        carr.push(ball)
    }
}

function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0,0,window.innerWidth,window.innerHeight)
    carr.forEach((ball)=>{
        ball.draw()
        ball.update()
    })
}

init()
animate()