function calculate(num1,num2,operator){
    if (operator == "+")
    {
        return num1+num2;
    }
    else if (operator == "-")
    {
        return num1-num2;
    }
    else if (operator == "x")
    {
        return num1*num2;
    }
    else if (operator == "÷")
    {
        return num1/num2;
    }
    else{
        return "error 1";
    }
}

function operate(string){
    console.log(string);
    let pos = 0;
    num1=false;
    num2=false;
    operator=false;


    //search for addition
    console.log("debug:"+ string)
    while (String(string).search(/[+x÷-]+/g) != -1)
    {   
        pos = string.search(/[+x÷-]+/g);
        if (pos != -1)
        {
            num1 = string.slice(0,pos);
            string = string.slice(pos);

            operator = string.slice(0,1);
            string = string.slice(1);
            
            if (string.search(/[+x÷-]+/g) == -1)
            {
                num2 = string;
                string = calculate(Number(num1),Number(num2),operator)
            }
            else{
                num2=string.slice(0,string.search(/[+x÷-]+/g));
                string=calculate(Number(num1),Number(num2),operator)+string.slice(string.search(/[+x÷-]+/g));
            }


        }
        console.log("pos: " + pos);
        console.log("Num1: " + num1);
        console.log("Num2: " + num2);
        console.log("Operator: " + operator);
        console.log("New String: " + string);
        console.log("");
    }   

    string = Number(string.toPrecision(9));
    largeDisplay.innerText = string;
    
}

function buttons(){
    const buttons = document.querySelectorAll(".row > div");
    const smallDisplay = document.querySelector("#smallDisplay");
    const largeDisplay = document.querySelector("#largeDisplay");


    buttons.forEach(button => {
        if (button.innerText == "c")
        {   
            button.addEventListener("click",function(e){
                smallDisplay.innerText = "";
                largeDisplay.innerText = "";
            })
        }

        else if (button.innerText == "=")
        {   
            button.addEventListener("click",function(e){
                smallDisplay.innerText += largeDisplay.innerText
                operate(smallDisplay.innerText);
            })
        }

        else if (button.innerText.search(/[+x÷-]+/g) > -1)
        {   
            button.addEventListener("click",function(e){
                smallDisplay.innerText += largeDisplay.innerText + e.target.innerText
                largeDisplay.innerText = "";
            })
        }

        else{
            button.addEventListener("click",function(e){
                largeDisplay.innerText += e.target.innerText;
            })
        }
    });
}

buttons();