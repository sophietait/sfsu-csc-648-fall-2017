var mysql = require('mysql');

// Provide database connection details
var connection = mysql.createConnection({
	host: '127.0.0.1',
	user: 'fa17g05',
	password: 'csc648fa17g05',
	database: 'fa17g05'
});

// Execute sql query on database
exports.runquery = function(sql, cb) {
	connection.query(sql, function(err, rows, fields) {
		cb(err, rows); // return rows returned from sql query, any err if any
	});
}
