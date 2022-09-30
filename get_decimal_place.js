var testNum = 12376543.0345345445345; //5.54489;//12376543.0045345//12376543.345345345345; //134.9567654;
var decPl = 7;
var testRes = getdecimalplace(testNum, decPl);
// alert(testNum + ' rounded to ' + decPl + ' decimal places is ' + testRes);
console.log(testNum + ' rounded to ' + decPl + ' decimal places is ' + testRes);

function getdecimalplace(n, r = 2) {
    let valueToReturn;
    const numToSeparate = n; //12345;
    // const arrayOfDigits = Array.from(String(numToSeparate), Number);
    // console.log(arrayOfDigits);   //[1,2,3,4,5]
    const arrayOfDigits02 = numToSeparate.toString().split("");
    // console.log(arrayOfDigits02);
    let indexOfDecimalPoint = arrayOfDigits02.indexOf(".");
    console.log(indexOfDecimalPoint);
    console.log(arrayOfDigits02[indexOfDecimalPoint + r + 2]);
    console.log(arrayOfDigits02[indexOfDecimalPoint + r + 3]);
    if (arrayOfDigits02[indexOfDecimalPoint + r + 1] == 4 && arrayOfDigits02[indexOfDecimalPoint + r + 2] >= 4 && arrayOfDigits02[indexOfDecimalPoint + r + 3] >= 5) {
        console.log("The value of the first next digit is", n.toString()[indexOfDecimalPoint + r + 1]);
        console.log("The value of the next digit is", n.toString()[indexOfDecimalPoint + r + 2]);
        console.log("The value of the next digit after the one above is", n.toString()[indexOfDecimalPoint + r + 3]);
        let valueToAdd = 1 * 10 ** (-(r)); // eg 0.0001;
        console.log(valueToAdd);
        valueToReturn = (Math.round(Math.round(n * 10 ** (r + 1)) / 10) / 10 ** r);
        console.log("valueToReturn line 25 ================");
        console.log(valueToReturn);
        if(valueToAdd < 0.01){
            valueToReturn = valueToReturn + valueToAdd;
            console.log("valueToReturn line 29 ================");
            console.log(valueToReturn);
        } 
    } else {
        valueToReturn = (Math.round(Math.round(n * 10 ** (r + 1)) / 10) / 10 ** r)
    }
    return valueToReturn
}