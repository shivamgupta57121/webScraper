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

    let teamNameElemArr = selTool(".Collapsible h5");
    let teamNameArr = [];
    for(let i = 0 ; i < teamNameElemArr.length ; i++){
        let teamName = selTool(teamNameElemArr[i]).text();
        //console.log(teamName.split("INNINGS"));
        teamName = teamName.split("INNINGS")[0];
        teamName = teamName.trim(); // to remove whitespaces in start and end
        teamNameArr.push(teamName);
    }
    // console.log(teamNameArr);


    let batsmanTableArr = selTool(".table.batsman");
    for(let i = 0 ; i < batsmanTableArr.length ; i++){
        let batsmanNameAnchor = selTool(batsmanTableArr[i]).find("tbody tr .batsman-cell a");
        for(let j = 0; j < batsmanNameAnchor.length ; j++){
            let name = selTool(batsmanNameAnchor[j]).text();
            let teamName = teamNameArr[i];
            let link = selTool(batsmanNameAnchor[j]).attr("href");
            //console.log(name + " of " + teamName + " " +link);
            printBirthday(link, name, teamName);
        }
        // console.log("`````````````````````````````````````````");
    }

}
function printBirthday(link, name, teamName){
    request(link, cb);
    function cb(err, response, html){
        if (err) {
            console.log(err);
        } else {
            // console.log(html);
            extractBirthday(html, name, teamName);
            console.log("````````````````````````````");
        }
    }
}
function extractBirthday(html, name, teamName){
    let selTool = cheerio.load(html);
    let birthdayElem = selTool(".ciPlayerinformationtxt span");
    let birthday = selTool(birthdayElem[1]).text();
    console.log(name + "Plays for " + teamName + " was born on " + birthday);
}

