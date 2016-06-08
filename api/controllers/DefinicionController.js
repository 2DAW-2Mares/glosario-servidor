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
		}).populate('valoraciones').then(function(definicion){
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
	},

	valorar: function(req, res, next){
		var valoracion = req.body.valoracion;
		console.log(valoracion);
		//Alumno.findOne({
			//where: {user: req.session.passport.user}
		//}).then(function(alumno){
			//if(alumno){
				console.log(valoracion+" -- "+ 'alumno');
				Valoracion.create({usuario: 'pepe', valoracion: valoracion, definicion: req.definicion.id})
				.exec(function createdCB(err, created){
					if(!err){
						res.json(created);
					}else{
						next(new Error('Ocurrio un error!!'));
					}
				})
			//}
		//})
	},

	mediaValoraciones: function(req, res, next){
		total = 0;
/*
		Valoracion.find({
			where: {definicion: req.definicion.id}
		}).average('valoracio').then(function(mediaValoraciones){
			res.json(mediaValoraciones);
		})
*/

		Valoracion.find({
			where: {definicion: req.definicion.id}
		}).then(function(valoraciones){
			rango = valoraciones.length;
			valoraciones.forEach(function(valoracion){
				total += parseInt(valoracion.valoracion);
				console.log(total);
			})
			res.json('Media Valoraciones: ' + parseInt(total/rango));
		})
	}
	
};

