/**
 * MateriaController
 *
 * @description :: Server-side logic for managing materias
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	load: function(req, res, next) {
		Materia.findOne({
			where: { id: Number(req.params.materiaId)}
		}).then(function(materia){
			if(materia) {
				req.materia = materia;
				next();
			} else { next(new Error('No existe la materia con el id' + req.params.materiaId));}
		}).catch(function(error){next(error);});
	},
};

