let fs = require("fs");
console.log("Before");
// async function fs.readFile

function fileReader(fileName){
    console.log("Before File Read");
    fs.readFile(fileName,cb);
    console.log("After File Read");
}
function cb(err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log("content -> " + data);
    }
}
fileReader("f1.txt");
console.log("After");