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
    const buttons = document.querySelectorAll(".row > div");
    const display = document.querySelector("#display");

    buttons.forEach(button => {
        if (button.innerText == "c")
        {   
            button.addEventListener("click",function(e){
                display.innerText === "";
                console.log("clear")
            })
        }

        else{
            button.addEventListener("click",function(e){
                display.innerText += e.target.innerText;
            })
        }
    });
}

buttons();