function operate(string){
    let firstNum=0;
    let secondNum=0;
    let operator="";

    //clean string of commas first
    while (string.search(",") > -1)
    {
        let pos = string.search(",")
        string = string.slice(0,pos) + string.slice(pos+1)
        console.log("clean string: "+string)
    }

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

function formatDisplay(){
    let string = largeDisplay.innerText;
    let negStatus = false;

    //if number is a decimal, do not format
    if (string.search(/[.]+/g) > -1)
    {
        return;
    }

    //if number is a negative, convert number to positive before formatting (will convert back in line 119)
    if (string.slice(0,1) == "-" && string.length > 1)
    {
        negStatus = true;
        string = string.slice(1)
    }


    //remove any separators
    while (string.search(",") >= 0)
    {
        let sepPos = string.search(",");
        string = string.slice(0,sepPos) + string.slice(sepPos+1);  
    }

    let length = string.length;

    //separator for string of length 4-6
    if (string.length >= 4 && string.length <= 6)
    {
        string = string.slice(0,length - 3) + "," + string.slice(length - 3)
    }
    //separator for string of length 4-6
    else if (string.length >= 7)
    {
        string = string.slice(0,length - 6) + "," + string.slice(length - 6,length-3)+ "," + string.slice(length-3)
    }

    //convert number back to negative if number was originally negative
    if (negStatus == true)
    {
        string = "-" + string;
    }

    largeDisplay.innerText = string;
}

function integerCount(){
    let string = largeDisplay.innerText;

    while (string.search(/[^0123456789]+/g) > -1)
    {
        let pos = string.search(/[^0123456789]+/g);
        string = string.slice(0,pos) + string.slice(pos+1);
    }

    return string.length;
}

function numButton(num){
    let length = integerCount();

    document.querySelector("#clear").innerText = "C";
            
    //prevent integer overflow
    if (length >= 9 && lastClick.search(/[+x÷-]+/g) == -1)
    {
        return;
    } 

    if(largeDisplay.innerText == "0")
    {
        if (num == 0)
        {
            document.querySelector("#clear").innerText = "AC";
            return
        }
        else
        {
            largeDisplay.innerText = "";
        }
    }

    //if operator was last clicked
    if (lastClick.search(/[+x÷-]+/g) > -1)
    {
        let operatorBtns = document.querySelectorAll(".operatorButton")
        operatorBtns.forEach(operatorBtn => {
            operatorBtn.classList.remove("operatorButtonActive");
        });

        largeDisplay.innerText = "";
    }

    if (lastClick == "±"){
        largeDisplay.innerText = "-" + num;
    }
    else{
        largeDisplay.innerText += num;
    }

    lastClick = num;
}

function operatorBtn(button){
    let operator = button.innerText

    //ensure number is not repeated when operator is selected after equal is selected.
    if (lastClick == "="){
        equation = largeDisplay.innerText + operator;
        largeDisplay.innerText = "";
    }
    else if (lastClick == "±"){
        return;
    }
    else if (lastClick.search(/[+x÷-]+/g) > -1){
        equation = equation.slice(0,-1) + operator;
    }
    else if(lastClick.search(/[0123456789]+/g) > -1){
        button.classList.add("operatorButtonActive")
        equation += (largeDisplay.innerText + operator);
    }


    lastClick = operator;
}

function decimalBtn(){
    //animation for "clear" button
    document.querySelector("#clear").innerText = "C";

    //only allow for one decimal point
    if (largeDisplay.innerText.search(/[.]+/g) > -1)
    {
        return
    }

    largeDisplay.innerText += ".";
    lastClick = ".";
}

function clearBtn(){
    if (lastClick == "C"){
        let operatorBtns = document.querySelectorAll(".operatorButton")

        operatorBtns.forEach(operatorBtn => {
        operatorBtn.classList.remove("operatorButtonActive");
        });
    }

    equation = "";
    largeDisplay.innerText = "0";
    lastClick = "C";
    document.querySelector("#clear").innerText = "AC";
}

function plusMinusBtn(){
    if (lastClick.search(/[+x÷-]+/g) > -1){
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

    lastClick = "±";
}

function percentageBtn(){
    largeDisplay.innerText = sigFig(largeDisplay.innerText * 0.01);

    lastClick = "%";
}

function equalBtn(){
    if(lastClick == "±"){
        return;
    }
    else if (lastClick != "="){
        equation += largeDisplay.innerText
        operate(equation);
    }
    
    lastClick = "=";
}

const buttons = document.querySelectorAll(".button")
const largeDisplay = document.querySelector("#largeDisplay")
let equation = ""


//Track last button that was clicked.
let lastClick = "";

document.addEventListener("keypress",function(e){
    console.log(e.key)
})

buttons.forEach(button => {
    
    button.addEventListener("click",function(e){

        //let length = integerCount();

        //numerical button configurations
        if (e.target.innerText.search(/[0123456789]+/g) > -1)
        {
            numButton(e.target.innerText);
        }

        //Add, multiply, division button configurations
        else if (e.target.innerText.search(/[+x÷-]+/g) > -1)
        {
            operatorBtn(e.target);
        }

        //decimal point button configurations
        else if (e.target.innerText==".")
        {
            decimalBtn();
        }

        //clear button configurations
        else if (e.target.innerText=="C" || e.target.innerText=="AC")
        {
            clearBtn();
        }

        //plus-minus button configuration
        else if (e.target.innerText=="±")
        {   
            plusMinusBtn();
        }

        //percentage button configuration
        else if (e.target.innerText=="%")
        {   
            percentageBtn();
        }

        //equal button configuration
        else if (e.target.innerText=="=")
        {   
            equalBtn();
        }

        else{
            console.log("Error: unknown click event occurred");
        }

        formatDisplay()
    })
    
});