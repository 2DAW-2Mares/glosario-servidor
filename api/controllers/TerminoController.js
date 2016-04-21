/**
 * TerminoController
 *
 * @description :: Server-side logic for managing terminoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	load: function(req, res, next) {
		Termino.findOne({
			where: { id: Number(req.params.terminoId)}
		}).then(function(termino){
			if(termino) {
				req.termino = termino;
				next();
			} else { next(new Error('No existe el termino con el id' + req.params.terminoId));}
		}).catch(function(error){next(error);});
	},

};

