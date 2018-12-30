const cheerio = require('cheerio');
const request = require('request');

function getBio(id) {
    request("http://bioguide.congress.gov/scripts/biodisplay.pl?index="+id, (err, resp, html) => {
        let $ = cheerio.load(html);
        let p =  $('p').text();
        console.log("getBio: " + p);
        return String(p);
    })
}

module.exports.getBio = getBio;