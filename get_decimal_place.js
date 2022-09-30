var testNum = 123.1234445; //134.9567654;
var decPl = 4;
var testRes = getdecimalplace(testNum, decPl);
// alert(testNum + ' rounded to ' + decPl + ' decimal places is ' + testRes);
console.log(testNum + ' rounded to ' + decPl + ' decimal places is ' + testRes);

function getdecimalplace(n, r = 2) { 
    let valueToReturn;
    const numToSeparate = n; //12345;
    // const arrayOfDigits = Array.from(String(numToSeparate), Number);
    // console.log(arrayOfDigits);   //[1,2,3,4,5]
    const arrayOfDigits02 = numToSeparate.toString().split("");
    console.log(arrayOfDigits02);
    // console.log(arrayOfDigits02[r + 2]);
    // console.log(arrayOfDigits02[r + 3]);
    let indexOfDecimalPoint = arrayOfDigits02.indexOf(".");
    console.log(arrayOfDigits02.indexOf("."));
    console.log(indexOfDecimalPoint);
    if (arrayOfDigits02[r + 2] < 5 && arrayOfDigits02[r + 3] > 5){
        console.log("The value of the next digit is", n.toString()[r+2]);
        let valueToAdd = 1 * 10 ** (-(r)); // eg 0.0001;
        console.log(valueToAdd); 
        valueToReturn = (Math.round(Math.round(n * 10 ** (r + 1)) / 10) / 10 ** r) + valueToAdd;
    } else {
        valueToReturn = (Math.round(Math.round(n * 10 ** (r + 1)) / 10) / 10 ** r)
    }
    return valueToReturn 
 }