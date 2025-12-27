

setTimeout(()=>{
    const toast = document.getElementById('toast');
    if(toast){
        toast.style.display = 'none';
    }
},3000)

setTimeout(()=>{
    const toast = document.getElementById('error-toast');
    if(toast){
        toast.style.display = 'none';
    }
},3000)