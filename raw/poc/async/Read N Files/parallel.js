let fs = require("fs");
let arr = ["../f1.txt","../f2.txt","../f3.txt","../f4.txt"];
console.log("Before");
// parallel read
for(let i = 0 ; i < arr.length ; i++){
    fs.readFile(arr[i], function(err,data){
        if (err) {
            console.log(err);
        } else{
            console.log("data ->" + data);
        }
    })
}
console.log("After");