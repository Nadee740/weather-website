



const weatherform= document.querySelector('form')
const search=document.querySelector('input')
const msg1=document.querySelector('#msg-1')
const msg2=document.querySelector('#msg-2')

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.Error)
        msg1.textContent=data.Error
        else{

        msg1.textContent= data.place
        msg2.textContent= data.temperature
    }
    })
})
})