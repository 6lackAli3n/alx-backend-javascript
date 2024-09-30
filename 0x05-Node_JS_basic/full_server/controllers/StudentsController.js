import { readDatabase } from '../utils.js';

class StudentsController {
	static async getAllStudents(req, res) {
		const filePath = process.argv[2];
		try {
			const students = await readDatabase(filePath);
			const response = ['This is the list of our students'];
			for (const field of Object.keys(students).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))) {
				response.push(`Number of students in ${field}: ${students[field].length}. List: ${students[field].join(', ')}`);
			}
			res.status(200).send(response.join('\n'));
		} catch (error) {
			res.status(500).send('Cannot load the database');
		}
	}

	static async getAllStudentsByMajor(req, res) {
		const filePath = process.argv[2];
		const { major } = req.params;
		if (!['CS', 'SWE'].includes(major)) {
			return res.status(500).send('Major parameter must be CS or SWE');
		}
		try {
			const students = await readDatabase(filePath);
			res.status(200).send(`List: ${students[major]?.join(', ') || ''}`);
		} catch (error) {
			res.status(500).send('Cannot load the database');
		}
	}
}

export default StudentsController;
