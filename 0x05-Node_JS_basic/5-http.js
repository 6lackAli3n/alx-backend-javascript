const http = require('http');
const countStudents = require('./3-read_file_async');
const path = process.argv[2];

const app = http.createServer(async (req, res) => {
	if (req.url === '/') {
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end('Hello Holberton School!');
	} else if (req.url === '/students') {
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.write('This is the list of our students\n');
		try {
			const result = await countStudents(path);
			res.end(result);
		} catch (error) {
			res.end(error.message);
		}
	} else {
		res.writeHead(404, { 'Content-Type': 'text/plain' });
		res.end('Not Found');
	}
});

app.listen(1245, () => {
	console.log('Server is running on port 1245');
});

module.exports = app;
