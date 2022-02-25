
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
        else if (e.target.innerText.search(/[+x/]+/g) > -1)
        {
            smallDisplay.innerText += (largeDisplay.innerText + e.target.innerText)
            largeDisplay.innerText = "";
        }

        //Subtract button configurations
        else if (e.target.innerText=="-")
        {
            smallDisplay.innerText += (largeDisplay.innerText + e.target.innerText)
            largeDisplay.innerText = "";
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
            console.log(smallDisplay.innerText);
            operate(smallDisplay.innerText);
        }

        else{
            console.log("Error: unknown click event occured");
        }

        
        

    })
    
});