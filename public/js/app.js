const form = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelectorAll('p')[0];
const message2 = document.querySelectorAll('p')[1];

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    const search1 = search.value;
    message1.textContent = 'Loading...';
    message2.textContent = '';
    fetch('http://localhost:3000/weather?address='+search1).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
            message1.textContent = data.error;
        else
        {
            message1.textContent = data.location;
            message2.textContent = data.forecast; 
        }
        })
    })
})
