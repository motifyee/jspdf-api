import express from 'express';
import multer from 'multer';

const app = express();
const upload = multer({ dest: 'uploads/' });
const type = upload.single('fl');

app.post('/file', type, function (req, res, next) {
	// console.log(`receiving ${req.body}`);
	console.log('body: %j', req.body);
	console.log(`receiving ${req.file}`);
	// res.send(`received ${req}`);
	res.send('received file thanks');
});

app.get('/', (req, res) => res.send('welcome home'));

const port = 3030;
app.listen(port, () => {
	console.log(`server started @port ${port}`);
});
