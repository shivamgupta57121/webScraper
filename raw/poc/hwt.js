let request = require("request");
let cheerio = require("cheerio");

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
request(url, cb);  
function cb(err, response, html){
    if(err) {
        console.log(err);
    } else {
        // console.log(html);
        extractData(html);
    }
}
function extractData(html){
    let selTool = cheerio.load(html);

    // get the bowling table for both the innings
    let bothBowlerTable = selTool(".table.bowler");
    // console.log(bothBowlerTable.length);
    // let tableHtml = "";
    // for(let i = 0 ; i < bothBowlerTable.length ; i++){
    //     tableHtml += selTool(bothBowlerTable[i]);
    // }
    // console.log(tableHtml);

    // get name and wickets of every player
    for(let i = 0 ; i < bothBowlerTable.length ; i++){
        let playersRow = selTool(bothBowlerTable[i]).find("tbody tr");
        for(let j = 0 ; j < playersRow.length ; j++){
            let allColOfPlayer = selTool(playersRow[j]).find("td");
            let playerName = selTool(allColOfPlayer[0]).text();
            let wickets = selTool(allColOfPlayer[4]).text();
            console.log(playerName,wickets);  
            
        }
        console.log('```````````````````````````````````````````');
    }
        
    // compare wickets

}
