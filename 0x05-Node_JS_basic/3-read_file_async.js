const fs = require('fs');

function countStudents(path) {
	return new Promise((resolve, reject) => {
		fs.readFile(path, 'utf-8', (err, data) => {
			if (err) {
				reject(new Error('Cannot load the database'));
			} else {
				const lines = data.trim().split('\n').filter((line) => line.trim() !== '');

				if (lines.length <= 1) {
					reject(new Error('No valid students found.'));
					return;
				}

				const students = lines.slice(1);

				console.log(`Number of students: ${students.length}`);

				const fields = {};

				students.forEach((student) => {
					const [firstName, lastName, age, field] = student.split(',');

					if (!fields[field]) {
						fields[field] = [];
					}

					fields[field].push(firstName);
				});

				for (const field in fields) {
					if (Object.hasOwnProperty.call(fields, field)) {
						console.log(`Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`);
					}
				}

				resolve();
			}
		});
	});
}

module.exports = countStudents;
