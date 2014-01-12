var client = require('../');
var ui = require('../lib/ui');
var parse = require('../lib/parse-env');

module.exports = function(id, opts) {
	if (!id) return ui.error('Service name required');

	var c = client(opts.remote);
	var unspin = ui.spin('Distributing', id);
	c.distribute(id, function(err) {
		unspin(err);
		if (!opts.restart) return;
		unspin = ui.spin('Restarting', id);
		c.restart(id, unspin);
	});
};