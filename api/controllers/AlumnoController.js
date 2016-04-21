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
		}).then(function(alumno){
			if(alumno) {
				req.alumno = alumno;
				next();
			} else { next(new Error('No existe el alumno con el id' + req.params.alumnoId));}
		}).catch(function(error){next(error);});
	},
	
	ultimos: function(req, res, next){
		Termino.find({
			where: {alumnos: req.alumno}
		}).then(function(terminos){
			console.log(terminos)
			terminos.forEach(function(termino){
				res.send(termino);
			})
		})
	}
};

