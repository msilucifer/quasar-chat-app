const SseChannel = require('sse-channel');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

const cnn = new SseChannel({
	jsonEncode: true,
	cors: {
		origins: ['*']
	}
});

let m = {
	data: 'oi',
	id: 0,
	event: 'event',
	retry: () => {
		retry(10000000);
	}
}

let id = 0;
let clients = []

app.get('/', (req, res) => {
	cnn.addClient(req, res);
	console.log('oi');
	cnn.send(m);
	console.log(req.query);
});

app.listen(3000, () => {
	console.log('listening on localhost:3000');
});
