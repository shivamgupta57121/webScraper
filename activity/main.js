let request = require("request");
let cheerio = require("cheerio");

let url = "https://github.com/topics";
request(url, cb);  
function cb(err, response, html){
    if(err) {
        console.log(err);
    } else {
        extractLink(html);
    }
}

function extractLink(html){
    let selTool = cheerio.load(html);
    let topicsArr = selTool(".topic-box");
    // console.log(topicsArr.length);
    for(let i = 0 ; i < topicsArr.length ; i++){

        let linkElem = selTool(topicsArr[i]).find("a");
        let link = selTool(linkElem).attr("href");
        let fullLink = "https://github.com" + link;
        console.log(fullLink);
        
    }
}
