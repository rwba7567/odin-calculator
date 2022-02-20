function buttons(){
    const buttons = document.querySelectorAll(".row > div")

    buttons.forEach(button => {
        button.addEventListener("click",function(e){
            console.log(e.target.innerText);
        })
    });
}

buttons();