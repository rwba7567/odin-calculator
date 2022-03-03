function operate(string){
    //console.log("Operate: " + string)

    let firstNum=0;
    let secondNum=0;
    let operator="";

    while (string.slice(1).search(/[+x÷-]+/g) > -1 )
    {
        pos = string.search(/[+x÷-]+/g)

        //ensures negative first variable won't lead to loop
        if (pos == 0)
        {   
            pos = string.slice(1).search(/[+x÷-]+/g) + 1;
        }

        //calculate first variable and update string
        firstNum = Number(string.slice(0,pos));
        string = string.slice(pos);

        //calculate operator variable and update string
        operator = string.slice(0,1);
        string = string.slice(1);

        //calculate secondNum and update string
        //if there are more operators, simplify equation
        if (string.search(/[+x÷-]+/g) > 0){
            secondNum = Number(string.slice(0,string.search(/[+x÷-]+/g)));
            string = calculate(firstNum,secondNum,operator)+string.slice(string.search(/[+x÷-]+/g));
        }
        else{
            secondNum = Number(string);
            string = String(calculate(firstNum,secondNum,operator));
        }

        console.log("firstNum:" + firstNum)
        console.log("secondNum:" + secondNum)
        console.log("operator:" + operator)
        console.log("string:" + string)
        console.log("")
    }

    largeDisplay.innerText = sigFig(string);
}

function calculate(firstNum,secondNum,operator)
{
    if (operator == "+")
    {
        return firstNum+secondNum;
    }
    else if (operator == "-")
    {
        return firstNum-secondNum;
    }
    else if (operator == "x")
    {
        return firstNum*secondNum;
    }
    else if (operator == "÷")
    {
        return firstNum/secondNum;
    }
    else{
        return "Error: Unknown operator";
    }
}

function sigFig(x) {
    return Number(Number(x).toPrecision(9));
  }

const buttons = document.querySelectorAll(".button")
const largeDisplay = document.querySelector("#largeDisplay")
let equation = ""

//Track last button that was clicked.
let lastClick = "";

buttons.forEach(button => {
    
    button.addEventListener("click",function(e){

        //numerical button configurations
        if (e.target.innerText.search(/[0123456789]+/g) > -1)
        {
            if (lastClick.search(/[+x÷-]+/g) > -1)
            {
                let operatorBtns = document.querySelectorAll(".operatorButton")
                operatorBtns.forEach(operatorBtn => {
                    operatorBtn.classList.remove("operatorButtonActive");
                });

                largeDisplay.innerText = "";
            }
            else if (lastClick == "±"){
                largeDisplay.innerText = "-" + e.target.innerText;
            }
            else{
                largeDisplay.innerText += e.target.innerText;
            }
            
            lastClick = e.target.innerText;

        }

        //Add, multiply, division button configurations
        else if (e.target.innerText.search(/[+x÷-]+/g) > -1)
        {
            //ensure number is not repeated when operator is selected after equal is selected.
            if (lastClick == "="){
                equation = largeDisplay.innerText + e.target.innerText
                largeDisplay.innerText = ""
            }
            else if (lastClick == "±"){
                return;
            }
            else if (lastClick.search(/[+x÷-]+/g) > -1){
                equation = equation.slice(0,-1) + e.target.innerText;
            }
            else if(lastClick.search(/[0123456789]+/g) > -1){
                console.log("hi")
                e.target.classList.add("operatorButtonActive")
                equation += (largeDisplay.innerText + e.target.innerText);
            }


            lastClick = e.target.innerText;
        }

        //decimal point button configurations
        else if (e.target.innerText==".")
        {
            largeDisplay.innerText += e.target.innerText;
            lastClick = e.target.innerText;
        }

        //clear button configurations
        else if (e.target.innerText=="c")
        {

            let operatorBtns = document.querySelectorAll(".operatorButton")
            operatorBtns.forEach(operatorBtn => {
                operatorBtn.classList.remove("operatorButtonActive");
            });

            equation = "";
            largeDisplay.innerText = "";
            lastClick = e.target.innerText;
        }

        //plus-minus button configuration
        else if (e.target.innerText=="±")
        {   
            if (lastClick.search(/[+x÷-]+/g) > -1){
                console.log("test")
                largeDisplay.innerText = "0";
            }

            //check if value is negative
            if (largeDisplay.innerText.slice(0,1) == "-")
            {
                largeDisplay.innerText = largeDisplay.innerText.slice(1);
            }
            else{
                largeDisplay.innerText = "-" + largeDisplay.innerText;
            }

            lastClick = e.target.innerText;
        }

        //percentage button configuration
        else if (e.target.innerText=="%")
        {   
            largeDisplay.innerText = sigFig(largeDisplay.innerText * 0.01);

            lastClick = e.target.innerText;
        }

        //percentage button configuration
        else if (e.target.innerText=="=")
        {   
            if(lastClick == "±"){
                return;
            }
            else if (lastClick != "="){
                equation += largeDisplay.innerText
                operate(equation);
            }
            
            lastClick = e.target.innerText;
        }

        else{
            console.log("Error: unknown click event occurred");
        }
    })
    
});