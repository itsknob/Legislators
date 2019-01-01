const fetch = require('node-fetch');
const jsdom = require('jsdom');
const express = require('express');
const routes = require('./routes');	// index.js
const JSDOM = require('jsdom');
const mongoose = require('mongoose');
const
const app = express();
const port = 3001;

mongoose.connect(`mongodb://${dbuser}:${dbpassword}@ds147354.mlab.com:47354/government`);

app.use('/', routes);

app.get('/senator/:id', async (req, res) => {
	const para = await getBio(req.params.id);
	// console.log(typeof para);

	// console.log(`Para: ${para}`);

	res.send(para);

});


async function getBio(id) {

	const data = await fetch("http://bioguide.congress.gov/scripts/biodisplay.pl?index="+id);
	const html = await data.text();
	const dom = new JSDOM(html);
	const p = dom.window.document.querySelector('p').textContent;
	// console.log(p);

	return new Promise((res, rej) => {
		res(String(p));
		rej("Failed to getBio");
	});
}

app.listen(port, () => console.log(`Listening on ${port}`));