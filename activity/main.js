let fs = require("fs");
let path = require("path");
let request = require("request");
let cheerio = require("cheerio");
let PDFDocument = require("pdfkit");

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
    let topicNameElem = selTool(".h1-mktg");
    console.log(topicNameElem.text());
    let topicName = topicNameElem.text().trim();
    dirCreater(topicName);
    let arr = selTool("a.text-bold");
    for(let i = 0 ; i < 8 ; i++){
        let repoPageLink = selTool(arr[i]).attr("href");
        let repoPageFullLink = "https://github.com" + repoPageLink;
        // console.log(repoPageFullLink);
        let repoName = repoPageLink.split("/").pop();
        repoName = repoName.trim();
        console.log(repoName);
        createFile(repoName, topicName);

        let issuePageLink = repoPageFullLink + "/issues";
        getIssuesName(topicName, repoName, issuePageLink);

    }
    console.log("``````````````````````````````````");
}

function dirCreater(topicName){
    let pathOfFolder = path.join(__dirname, topicName);
    if(fs.existsSync(pathOfFolder) == false){
        fs.mkdirSync(pathOfFolder);
    }
}

function createFile(repoName, topicName){
    let pathOfFile = path.join(__dirname, topicName, repoName + ".json");
    if(fs.existsSync(pathOfFile) == false){
        var createStream = fs.createWriteStream(pathOfFile);
        createStream.end();
    }
}

function getIssuesName(topicName, repoName, issuePageLink){
    request(issuePageLink,cb);
    function cb(err, response, html){
        if(err){
            if(response.statusCode == 404){
                console.log("No issues page found");
            } else {
                console.log(err);
            }
        } else {
            extractIssues(topicName, repoName, html);
        }
    }
}

function extractIssues(topicName, repoName, html){
    let selTool = cheerio.load(html);
    let issueElemArr = selTool(".markdown-title");
    let arr = [];
    for(let i = 0 ; i < issueElemArr.length ; i++){
        let issueName = selTool(issueElemArr[i]).text();
        let issueLink = selTool(issueElemArr[i]).attr("href");
        arr.push({
            Name : issueName,
            Link : issueLink
        })
    }
    // console.log(topicName, repoName);
    // console.table(arr);
    let filePathJson = path.join(__dirname, topicName, repoName + ".json");
    fs.writeFileSync(filePathJson, JSON.stringify(arr));

    let filePathPdf = path.join(__dirname, topicName, repoName + ".pdf");
    let pdfDoc = new PDFDocument;
    pdfDoc.pipe(fs.createWriteStream(filePathPdf));
    pdfDoc.text(JSON.stringify(arr));
    // for(let i = 0 ; i < arr.length ; i++){
    //     pdfDoc.text(JSON.stringify(arr[i]));
    // }
    pdfDoc.end();
}