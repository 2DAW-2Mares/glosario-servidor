/**
 * ProfesorController
 *
 * @description :: Server-side logic for managing profesors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	load: function(req, res, next) {
		Profesor.findOne({
			where: { id: Number(req.params.profesorId)}
		}).then(function(profesor){
			if(profesor) {
				req.profesor = profesor;
				next();
			} else { next(new Error('No existe el profesor con el id' + req.params.profesorId));}
		}).catch(function(error){next(error);});
	},

	listarAlumnos: function(req, res, next){
		var promesas = [];
        var Dfinal = [];
        req.grupo.alumnos.forEach(function(alumno){
            
            promesas.push(Definicion.count({alumno: alumno.id}))
        });

        Promise.all(promesas).then(function(countDefiniciones){
                if(countDefiniciones){
                        countDefiniciones.forEach(function(countDefinicion){
                        alumno = req.grupo.alumnos.pop();
                        ob = alumno.toJSON();
                        ob['TotalDefiniciones'] = countDefinicion;
                        Dfinal.push(ob);
                        //console.log(ob);
                    });
                    res.json(Dfinal);
                }
            })
		/*
		var ob = {}
		for(var i = 0; i < req.grupo.alumnos.length; i++){
			
			Definicion.count({alumno: req.grupo.alumnos[i].id}).exec(function cbfound(err, found){
				if(!err){
					ob += req.grupo.alumnos[i];
					ob['TotalDefiniciones'] = found;
				}
				
			})
			Dfinal[i] = ob;
		}
		res.json(Dfinal);
		*/
	}
	
};

