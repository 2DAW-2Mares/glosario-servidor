/**
 * AlumnoController
 *
 * @description :: Server-side logic for managing alumnoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	load: function(req, res, next) {
		Alumno.findOne({
			where: { id: Number(req.params.alumnoId)}
		}).populate('terminos').then(function(alumno){
			if(alumno) {
				req.alumno = alumno;
				next();
			} else { next(new Error('No existe el alumno con el id' + req.params.alumnoId));}
		}).catch(function(error){next(error);});
	},
	
	ultimos: function(req, res, next){
		var terminos = req.alumno.terminos;
		res.send(terminos.reverse());
	},

	materias: function(req, res, next){
		//console.log(req.materia);
		Termino.find({
			where: {materia: req.materia.id}
		}).then(function(terminos){
			res.send(terminos);
		})
	}
};

