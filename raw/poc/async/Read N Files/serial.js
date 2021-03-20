let fs = require("fs");
let arr = ["../f1.txt","../f2.txt","../f3.txt","../f4.txt"];
console.log("Before");

// // Deadlock - call back function waiting for 'for' loop to complete and 
// // 'for' loop is unable to get completed since increment is in call back
// for(let i = 0 ; i < arr.length ; ){
//     console.log(i);
//     fs.readFile(arr[i], function(err,data){
//         if (err) {
//             console.log(err);
//         } else{
//             console.log("data ->" + data);
//             i++;
//         }
//     })
// }


function reader(arr, n){
    if (arr.length == n) {
        return ;
    }
    fs.readFile(arr[n], function (err, data){
        if (err) {
            console.log(err);
        } else {
            console.log("data -> " + data);
            reader(arr, n + 1 );
        }
    })
}

reader(arr, 0);
console.log("After");
