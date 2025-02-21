const express = require("express")
const app = express()
const port = 3000
const config = {
	host:'db',
	user: 'root',
	password: 'root',
	database: 'nodedb'
};
const mysql = require('mysql')
const connection= mysql.createConnection(config)


app.get('/', (req, res) => {
	const sqlInsert = `INSERT INTO people(name) VALUES('Vinc')`;
	connection.query(sqlInsert, (err, insertResults) => {
		if (err) {
			console.error("Insert error: ", err);
			return res.status(500).send(err);
		}
		console.log("Insert results:", insertResults);
		const sqlSelect = `SELECT * FROM people`;
		connection.query(sqlSelect, (err, selectResults) => {
			if (err) {
				console.error("Select error: ", err);
				return res.status(500).send(err);
			}
			console.log("Select results:", selectResults);
			res.send(`
        <h1>Full Cycle Rocks!</h1>
        <h2>Lista de nomes cadastrada no banco de dados</h2>
        <pre>${JSON.stringify(selectResults, null, 2)}</pre>
      `);
		});
	});
});

app.listen(port, () => 
	console.log("Escutando na porta " + port)
)
