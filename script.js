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
    console.log("checksum: "+String(string).search(/[+x÷-]+/g))
    while (String(string).search(/[+x÷-]+/g) > -1)
    {   
        console.log("hi")

        string = String(string);

        if (string.search(/[+x÷-]+/g) == 0)
        {
            pos = string.slice(1).search(/[+x÷-]+/g) + 1;

            if (pos==0)
            {
                break;
            }
            console.log("New string: "+ string.slice(1))
            console.log("New pos: "+ pos)
        }
        else{
            pos = string.search(/[+x÷-]+/g);
        }
        

        if (pos != -1)
        {   
            if(pos==0)
            {
                string = string.slice(1)
                num1 = "-"+string.slice(0,string.search(/[+x÷-]+/g))
                string = string.slice(string.search(/[+x÷-]+/g));
                
            }
            else{
                num1 = string.slice(0,pos);
                string = string.slice(pos);
            }
            

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

    console.log("final result "+string + " " + typeof string)
    string = Number(Number(string).toPrecision(9));
    largeDisplay.innerText = string;
    repeat2 = true;
    resultPrint = true;
    
}

function buttons(){
    const buttons = document.querySelectorAll(".row > div");
    const smallDisplay = document.querySelector("#smallDisplay");
    const largeDisplay = document.querySelector("#largeDisplay");
    let repeat = true;
    resultPrint = false;


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
                if (repeat == false)
                {
                    smallDisplay.innerText += largeDisplay.innerText;
                    repeat = true;
                    operate(smallDisplay.innerText);
                }
                else
                {
                    smallDisplay.innerText = largeDisplay.innerText
                }

    

            })
        }

        else if (button.innerText == "±")
        {   
            button.addEventListener("click",function(e){
                if (largeDisplay != "")
                {   
                    if (largeDisplay.innerText.slice(0,1) == "-")
                    {
                        largeDisplay.innerText = largeDisplay.innerText.slice(1);
                    }
                    else
                    {
                        largeDisplay.innerText = "-"+largeDisplay.innerText;
                    }

                    
                }
            })
        }

        else if (button.innerText.search(/[+x÷-]+/g) > -1)
        {   
            button.addEventListener("click",function(e){
                if (smallDisplay.innerText.slice(-1).search(/[+x÷-]+/g) > -1)
                {
                    return;
                }

                if (e.target.innerText=="-" && smallDisplay.innerText=="" && largeDisplay.innerText=="")
                {
                    return;
                }

                

                if (resultPrint == true)
                {
                    smallDisplay.innerText += e.target.innerText;
                }
                else{
                    
                    smallDisplay.innerText += largeDisplay.innerText + e.target.innerText
                }

                repeat = false;
                largeDisplay.innerText = "";
            })
        }

        else{
            button.addEventListener("click",function(e){
                resultPrint = false;
                largeDisplay.innerText += e.target.innerText;
            })
        }
    });
}

buttons();