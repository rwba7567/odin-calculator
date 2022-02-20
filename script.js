function add(num1,num2){
    return num1 + num2;
}

function subtract(num1,num2){
    return num1 - num2;
}

function multiply(num1,num2){
    return num1 * num2;
}

function divide(num1,num2){
    return num1 / num2;
}
function buttons(){
    const buttons = document.querySelectorAll(".row > div")

    buttons.forEach(button => {
        button.addEventListener("click",function(e){
            console.log(e.target.innerText);
        })
    });
}

buttons();