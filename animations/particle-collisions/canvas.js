var canvas=document.querySelector("canvas")
canvas.width=window.innerWidth
canvas.height=window.innerHeight
canvas.style.background='black'

let c=canvas.getContext("2d")
let hoverradius=200

//functions
function randcolor(){
    let r=Math.round(Math.random()*255)
    let g=Math.round(Math.random()*255)
    let b=Math.round(Math.random()*255)
    return `rgb(${r},${g},${b})`
}

function randomnumber(max,min){
    return Math.round(Math.random()*(max-min+1))+min
}

function finddistance(x1,x2,y1,y2){
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)
}

function findcompresultant(theta,particle){
    let comp={
        x:particle.dx*Math.cos(theta)-particle.dy*Math.sin(theta),
        y:particle.dx*Math.sin(theta)+particle.dy*Math.cos(theta)
    }
    return comp
}

function repulsion(particle1,particle2){
    let vdiffx=particle1.dx-particle2.dx
    let vdiffy=particle1.dy-particle2.dy
    let diffx=particle2.x-particle1.x
    let diffy=particle2.y-particle1.y

    if(vdiffx*diffx+vdiffy*diffy>=0){
        let theta=-Math.atan(diffy/diffx)
        let u1=findcompresultant(theta,particle1)
        let u2=findcompresultant(theta,particle2)

        let m1=particle1.mass
        let m2=particle2.mass

        let v1={dx:(m1-m2)/(m1+m2)*u1.x+(2*m2*u2.x)/(m1+m2),dy:u1.y}
        let v2={dx:(m2-m1)/(m1+m2)*u2.x+(2*m1*u1.x)/(m1+m2),dy:u2.y}

        let vfinal1=findcompresultant(-theta,v1)
        let vfinal2=findcompresultant(-theta,v2)

        particle1.dx=vfinal1.x
        particle1.dy=vfinal1.y

        particle2.dx=vfinal2.x
        particle2.dy=vfinal2.y
    }   
}

//eventlisteners
var mouse={
    x:undefined,
    y:undefined
}

canvas.addEventListener("mousemove",(e)=>{
    mouse.x=e.x
    mouse.y=e.y
})

let resizeTimer
window.addEventListener("resize", () => {
    clearTimeout(resizeTimer)
    resizeTimer=setTimeout(() => {
        canvas.width=window.innerWidth
        canvas.height=window.innerHeight
        init()
    },200)
})

//circle class
class circle{
    constructor(x,y,dx,dy,radius,mass,color){
        this.opacity=0
        this.radius=radius
        this.tempradius=radius
        this.x=x
        this.y=y
        this.dx=dx
        this.dy=dy
        this.color=color
        this.mass=mass
    }
    draw(){
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,Math.PI*2)
        c.save()
        c.globalAlpha=this.opacity
        c.fillStyle=this.color
        c.fill()
        c.restore()
        c.strokeStyle=this.color
        c.stroke()
        if (finddistance(this.x, mouse.x, this.y, mouse.y)<hoverradius && this.opacity<0.5) {
            this.opacity+=0.01;
            if (this.opacity>0.5) this.opacity=0.5;
        } else {
            this.opacity-=0.01;
            if (this.opacity<0) this.opacity=0;
        }
    }
    update(carr){
        for(let i=0;i<carr.length;i++){
            if(carr[i]==this) continue
            if(finddistance(this.x,carr[i].x,this.y,carr[i].y)-this.radius*2<0){
                repulsion(this,carr[i])
            }
        }

        if(this.x+this.radius>window.innerWidth || this.x-this.radius<0) this.dx=-this.dx
        if(this.y+this.radius>window.innerHeight || this.y-this.radius<0) this.dy=-this.dy
        this.x+=this.dx
        this.y+=this.dy
    }
}

//functionality
let total=60

if(window.innerWidth>900){
    total=200
}
else if(window.innerWidth>500){
    total=100
    hoverradius=100
}

let carr=[]
function init(){
    carr=[]
    for(let i=0;i<total;i++){
        let radius=randomnumber(4,20)
        let x=randomnumber(radius,window.innerWidth-radius)
        let y=randomnumber(radius,window.innerHeight-radius)
        let dx=randomnumber(0.1,0.5)
        let dy=randomnumber(0.1,0.5)
        let mass=randomnumber(1,5)
        let color=randcolor()
        if(i!=0){
            for(let j=0;j<carr.length;j++){
                if(finddistance(x,carr[j].x,y,carr[j].y)-radius*2<0){
                    x=randomnumber(radius,window.innerWidth-radius)
                    y=randomnumber(radius,window.innerHeight-radius)
                    j=-1
                }
            }
        }
        carr.push(new circle(x,y,dx,dy,radius,mass,color))
    }
}

function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0,0,window.innerWidth,window.innerHeight)
    carr.forEach(val=>{
        val.draw()
        val.update(carr)
    })
}

init()
animate()
console.log(total)