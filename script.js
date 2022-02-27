function operate(string){
    //console.log("Operate: " + string)

    let firstNum=0;
    let secondNum=0;
    let operator="";

    while (string.search(/[+x÷-]+/g) > -1)
    {
        pos = string.search(/[+x÷-]+/g)
        //calculate first variable and update string
        firstNum = Number(string.slice(0,pos));
        string = string.slice(pos);

        //calculate operator variable and update string
        operator = string.slice(0,1);
        string = string.slice(1);

        //calculate secondNum and update string
        //if there are more operators, simplify equation
        if (string.search(/[+x÷-]+/g) > -1){
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


const buttons = document.querySelectorAll(".row > div")
const largeDisplay = document.querySelector("#largeDisplay")
const smallDisplay = document.querySelector("#smallDisplay")

buttons.forEach(button => {
    
    button.addEventListener("click",function(e){
        //numerical button configurations
        if (e.target.innerText.search(/[0123456789]+/g) > -1)
        {
            largeDisplay.innerText += e.target.innerText;
        }

        //Add, multiply, division button configurations
        else if (e.target.innerText.search(/[+x÷]+/g) > -1)
        {
            //ensure that operators are consecutively repeated
            if (largeDisplay.innerText !== "")
            {
                smallDisplay.innerText += (largeDisplay.innerText + e.target.innerText);
                largeDisplay.innerText = "";
            }
            //if operator are consecutively repeated last operator will be used.
            else if (smallDisplay.innerText != "")
            {
                smallDisplay.innerText = smallDisplay.innerText.slice(0,-1) + e.target.innerText;

            }
        }

        //Subtract button configurations
        else if (e.target.innerText=="-")
        {
            if (largeDisplay.innerText !== "")
            {
                smallDisplay.innerText += (largeDisplay.innerText + e.target.innerText)
                largeDisplay.innerText = "";
            }
            else if (smallDisplay.innerText != "")
            {
                smallDisplay.innerText = smallDisplay.innerText.slice(0,-1) + e.target.innerText;

            }
        }

        //decimal point button configurations
        else if (e.target.innerText=="-")
        {
            smallDisplay.innerText += (largeDisplay.innerText + e.target.innerText)
            largeDisplay.innerText = "";
        }

        //clear button configurations
        else if (e.target.innerText=="c")
        {
            smallDisplay.innerText = "";
            largeDisplay.innerText = "";
        }

        //plus-minus button configuration
        else if (e.target.innerText=="±")
        {   

            //todo:check for potential bugs for when adding negative numbers to the equation
            //check if value is negative
            if (largeDisplay.innerText.slice(0,1) == "-")
            {
                largeDisplay.innerText = largeDisplay.innerText.slice(1);
            }
            else{
                largeDisplay.innerText = "-" + largeDisplay.innerText;
            }
        }

        //percentage button configuration
        else if (e.target.innerText=="%")
        {   
            largeDisplay.innerText = Number(largeDisplay.innerText) * 0.01;
        }

        //percentage button configuration
        else if (e.target.innerText=="=")
        {   
            smallDisplay.innerText += largeDisplay.innerText
            operate(smallDisplay.innerText);
        }

        else{
            console.log("Error: unknown click event occured");
        }

        
        

    })
    
});