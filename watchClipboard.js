const clipboardy = require('clipboardy');
const axios = require('axios');
const fs = require('fs')

let old_cb = clipboardy.readSync();
let new_cb;

fs.writeFile('index.html', "", 'utf8', () => {});

setInterval(async () => {
	try {
		new_cb = clipboardy.readSync()
		if (old_cb != new_cb) {
			old_cb = new_cb
			const response = await axios.get(`https://jisho.org/search/${encodeURIComponent(new_cb)}`);
			fs.writeFile('index.html', response.data, 'utf8', () => {});
		}    
	} catch (error) {
		console.error(error);
	}
}, 3000);