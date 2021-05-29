const axios = require('axios');
const cheerio = require('cheerio');

const url = "https://architecturephoto.net/";
fetchData(url).then( (res) => {
    const html = res.data;
    const $ = cheerio.load(html);
    const statsTable = $('.PostList.PostList--jobboard > li');
    statsTable.each(function() {
		console.log('sdfasfa');
//        let title = $(this).find('a').find('figure').find('img').attr("src");
//        console.log(title);
    });
})

async function fetchData(url){
    console.log("Crawling data...")

    // make http call to url
    let response = await axios(url).catch((err) => console.log(err));
    
    if(response.status !== 200){
        console.log("Error occurred while fetching data");
        return;
    }
    return response;

}