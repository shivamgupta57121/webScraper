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
    // let batsmanHtmlStr = "";
    // for (let i = 0; i < batsmanTableArr.length; i++) {
    //     batsmanHtmlStr += selTool(batsmanTableArr[i]).html();
    // }
    // console.log(batsmanHtmlStr);

    for(let i = 0 ; i < batsmanTableArr.length ; i++){
        let singleTeamAllRows = selTool(batsmanTableArr[i]).find("tbody tr");
        for (let j = 0; j < singleTeamAllRows.length - 1; j++) {

            // let allcols = selTool(singleTeamAllRows[j]).find("td");

            // Method 1
            // if (allcols.length == 8) {
            //     let playername = selTool(allcols[0]).text();
            //     console.log(playername);
            // }

            // Method 2 ---- make j as j+2 instead of j++
            // let playername = selTool(allcols[0]).text();
            // console.log(playername)

        }

        let batsmanNameAnchor = selTool(batsmanTableArr[i]).find("tbody tr .batsman-cell a");
        for(let j = 0; j < batsmanNameAnchor.length ; j++){
            let name = selTool(batsmanNameAnchor[j]).text();
            let teamName = teamNameArr[i];
            console.log(name + " of " + teamName);
        }
        console.log("`````````````````````````````````````````");
    }
}
