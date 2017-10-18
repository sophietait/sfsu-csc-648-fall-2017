var mysql = require('mysql');

var connection = mysql.createConnection({
	host: '',
	user: '',
	password: '',
	database: ''
});

exports.runquery = function(sql, cb) {
	/*
	connection.connect();
	connection.query(sql, function(err, rows, fields) {
		cd(err, rows); // return rows returned from sql query, any err if any
	});
	connection.end();
	*/
	
	// Return test data
	var data = [{ id: 1, name: 'alice' },
				{ id: 2, name: 'bob' },
				{ id: 3, name: 'carl' },
				{ id: 4, name: 'dale' }];
	cb(null, data);
}
