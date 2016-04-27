// config/fixtures/permissions.js

var Promise = require('bluebird');


exports.create = function () {

	  return Promise.all([
	    Role.findOrCreate({ name: 'profesor' }, { name: 'profesor' }),
	    Role.findOrCreate({ name: 'alumno' }, { name: 'alumno' })
	  ]).then(function(role){
	  		return Promise.all([
			    PermissionService.grant({ role: 'profesor', model: 'Termino', action: 'read'}), 
			    PermissionService.grant({ role: 'profesor', model: 'Termino', action: 'create'}), 
			    PermissionService.grant({ role: 'profesor', model: 'Termino', action: 'delete', relation: 'owner'}), 
			    PermissionService.grant({ role: 'profesor', model: 'Termino', action: 'update'}), 
			    PermissionService.grant({ role: 'profesor', model: 'Definicion', action: 'read'}), 
			    PermissionService.grant({ role: 'profesor', model: 'Definicion', action: 'create'}), 
			    PermissionService.grant({ role: 'profesor', model: 'Definicion', action: 'delete', relation: 'owner'}), 
			    PermissionService.grant({ role: 'profesor', model: 'Definicion', action: 'update'}), 
			    PermissionService.grant({ role: 'alumno', model: 'Termino', action: 'read'}), 
			    PermissionService.grant({ role: 'alumno', model: 'Termino', action: 'create'}), 
			    PermissionService.grant({ role: 'alumno', model: 'Termino', action: 'update'}), 
			    PermissionService.grant({ role: 'alumno', model: 'Definicion', action: 'read'}),
			    PermissionService.grant({ role: 'alumno', model: 'Definicion', action: 'create'}),
			    PermissionService.grant({ role: 'alumno', model: 'Definicion', action: 'update'})
		  ])
	  })
};
