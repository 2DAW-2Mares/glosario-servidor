/**
 * DefinicionController
 *
 * @description :: Server-side logic for managing definicions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	load: function(req, res, next) {
		Definicion.findOne({
			where: { id: Number(req.params.definicionId)}
		}).then(function(definicion){
			if(definicion) {
				req.definicion = definicion;
				next();
			} else { next(new Error('No existe el definicion con el id' + req.params.definicionId));}
		}).catch(function(error){next(error);});
	},

	denunciar: function(req, res, next){
		var definicion = req.definicion;
		definicion.denunciado = true;
		definicion.save(function(err, s){
			if(!err){
				res.json('definicion denunciada correctamente');
			}
		});
	}
	
};

