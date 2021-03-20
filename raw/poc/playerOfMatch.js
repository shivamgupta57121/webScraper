let request = require("request");
let cheerio = require("cheerio");

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";
request(url, cb);  
function cb(err, response, html){
    if(err) {
        console.log(err);
    } else {
        // console.log(html);
        getPageLink(html);
    }
}
function getPageLink(html){
    let selTool = cheerio.load(html);
    let allMatch = selTool(".match-cta-container");
    for(let i = 0; i < allMatch.length ; i++){
        let linkElem = selTool(allMatch[i]).find("a");
        let link = selTool(linkElem[2]).attr("href");
        let fullLink = "https://www.espncricinfo.com/"+link;
        let matchNumber = 60 - i;
        // console.log("match ",matchNumber ,fullLink);
        getPlayer(matchNumber, fullLink);
    }
}
function getPlayer(matchNumber , link){
    request(link,cb);
    function cb(err, response, html){
        if(err) {
            console.log(err);
        } else {
            extractPlayerName(matchNumber, html);
        }
    }
}
function extractPlayerName(matchNumber, html){
    let selTool = cheerio.load(html);
    let teamName = selTool(".name-link");
    let teamName1 = selTool(teamName[0]).text();
    let teamName2 = selTool(teamName[1]).text();
    let player = selTool(".best-player-name").text();
    let bestPlayerTeamName = selTool(".best-player-team-name").text();
    console.log("Match Number",matchNumber,":",teamName1,"vs",teamName2,"-----",player,"of",bestPlayerTeamName);
}