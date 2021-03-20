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
        processRepoPage(fullLink);
        
    }
}

function processRepoPage(link){
    request(link, cb);
    function cb(err, response, html){
        if(err){
            console.log(err);
        } else {
            getRepoLinks(html);
        }
    }
}

function getRepoLinks(html){
    let selTool = cheerio.load(html);
    let topicName = selTool(".h1-mktg");
    console.log(topicName.text());
    let arr = selTool("a.text-bold");
    for(let i = 0 ; i < 8 ; i++){
        let link = selTool(arr[i]).attr("href");
        let fullLink = "https://github.com" + link;
        console.log(fullLink);
    }
    console.log("``````````````````````````````````");
}
