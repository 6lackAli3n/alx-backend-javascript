import fs from 'fs';
import path from 'path';

export const readDatabase = (filePath) => {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, 'utf8', (err, data) => {
			if (err) {
				return reject(err);
			}
			const lines = data.trim().split('\n').filter(line => line);
			const students = {};
			for (const line of lines) {
				const [firstName, field] = line.split(',');
				if (!students[field]) {
					students[field] = [];
				}
				students[field].push(firstName);
			}
			resolve(students);
		});
	});
};
