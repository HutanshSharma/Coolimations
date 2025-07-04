let bar=document.querySelector(".bar")
let button=document.createElement("button")
let hidden_bar=document.querySelector("#hidden-bar")
let hide=document.getElementsByClassName("hide")
let arr=Array.from(hide)
button.innerHTML='<i class="fa-solid fa-bars text-2xl bbar"></i>'
button.classList.add('text-[#64ffda]')
button.classList.add('bbar')

if(window.innerWidth<650){
    bar.replaceWith(button)
}

window.addEventListener("resize",()=>{
    if(window.innerWidth<650){
    bar.replaceWith(button)
    }
    else{
        button.replaceWith(bar)
    }
})

button.onclick=()=>{
    hidden_bar.style.right='0'
}

window.onclick=(e)=>{
    console.log
    if(!e.target.classList.contains('bbar') && !e.target.classList.contains('hbar')){
        hidden_bar.style.right='-250px'
    }
}

if(window.innerWidth<640){
    arr.forEach(element=>{
        element.remove()
    })
}