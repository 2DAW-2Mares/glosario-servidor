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
		Definicion.findOne({
			where: {id: req.definicion.id}
		}).then(function(definicion){
			Definicion.update({id: req.definicion.id}, {denunciado: true}).exec(function updatedCB(err, updated){
				if(err){
					next(new Error(err));
				}else{
					console.log(updated);
					res.json(updated);
				}
			})
		})
	}
	
};

