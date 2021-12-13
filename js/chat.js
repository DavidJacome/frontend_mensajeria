var usuarioLogueado;
var contactos = [];
var conversaciones = [];
var usuariosContactos;

var imagenes = [
	'https://res.cloudinary.com/dalarapp2021/image/upload/v1639208957/Mensajeria/Usuarios/hg3zcmbd3eci74quyjlt.png',
	'https://res.cloudinary.com/dalarapp2021/image/upload/v1639208957/Mensajeria/Usuarios/pm9av5tpshjbjf79zk8v.png',
	'https://res.cloudinary.com/dalarapp2021/image/upload/v1639208957/Mensajeria/Usuarios/tcjenrwkfjvbrclx6ex4.png',
	'https://res.cloudinary.com/dalarapp2021/image/upload/v1639208859/Mensajeria/Usuarios/z0dnhzrsy59d910laifs.png',
	'https://res.cloudinary.com/dalarapp2021/image/upload/v1639208859/Mensajeria/Usuarios/p23ocjiivcvouo9lttil.png',
	'https://res.cloudinary.com/dalarapp2021/image/upload/v1639208859/Mensajeria/Usuarios/gtymx7rptogninh93x2m.png',
	'https://res.cloudinary.com/dalarapp2021/image/upload/v1639208859/Mensajeria/Usuarios/zdaqeo56d1axme3kbnkv.png',
	'https://res.cloudinary.com/dalarapp2021/image/upload/v1639208859/Mensajeria/Usuarios/c9qlcgle78sak1fi78js.png',
	'https://res.cloudinary.com/dalarapp2021/image/upload/v1639208859/Mensajeria/Usuarios/nlnx2lude1chhqrqx41w.png',
	'https://res.cloudinary.com/dalarapp2021/image/upload/v1639208859/Mensajeria/Usuarios/skflwtgumtk9suc6sup1.png',
	'https://res.cloudinary.com/dalarapp2021/image/upload/v1639208859/Mensajeria/Usuarios/rogpjnugbb1noulxce2g.png',
	'https://res.cloudinary.com/dalarapp2021/image/upload/v1639208859/Mensajeria/Usuarios/qg0pbfkzt47jmvkwgtss.png',
	'https://res.cloudinary.com/dalarapp2021/image/upload/v1639208859/Mensajeria/Usuarios/fkrzfq1lduisa9x0wtuo.png',
	'https://res.cloudinary.com/dalarapp2021/image/upload/v1639208859/Mensajeria/Usuarios/nlq1dzsn4bs0c6dtdoj0.png'
];

(() => {
	datos = JSON.parse(localStorage.getItem('usuario'));
	$.ajax({
		url: `http://localhost:8888/usuarios/${datos._id}`,
		method: "GET",
		dataType: "json",
		data: {},
		success: (res) => {
			usuarioLogueado = res
			generarInformacion();
		},
		error: (error) => {
			console.error(error);
		}
	});
})();

function generarInformacion() {
	contactos = usuarioLogueado.contactos;
	conversaciones = usuarioLogueado.conversaciones;
	document.getElementById('profile').innerHTML = '';
	$("#profile").append(
		`<div class="wrap">
	<img id="profile-img" src="${usuarioLogueado.foto}" class="online" alt="" />
	<p>${usuarioLogueado.nombre}</p>
    </div>`
	);
	document.getElementById('conversaciones').innerHTML = '';
	for (let i = 0; i < conversaciones.length; i++) {
		$("#conversaciones").append(
			`<li class="contact">
				<div onclick ="MostrarConversaciones('${conversaciones[i]._id}');" class="wrap">
					<img src="${conversaciones[i].imagenDestinatario}" alt="" />
					<div class="meta">
						<p class="name">${conversaciones[i].nombreDestinatario}</p>
						<p class="preview">${conversaciones[i].ultimoMensaje}</p>
						<small>${conversaciones[i].horaUltimoMensaje}</small>
					</div>
				</div>
			</li>`)
	}
	document.getElementById('ajusteUsuario').innerHTML = '';
	$("#ajusteUsuario").append(`
	<div   style="margin-bottom: 10px;">
		<img id="profile-img" src="${usuarioLogueado.foto}" class="mr-auto ml-auto" alt="" />
		<p style="display: block; text-align: center; margin-top: 5px;">${usuarioLogueado.nombre} <a href="#" class="fa fa-pencil fa-fw"></a></p>
	</div>
	<input  style="margin-bottom: 10px;" type="text" class="form-control" placeholder="Estado" value ="${usuarioLogueado.estado}">
	<button type="button" style="width: 100%; margin-bottom: 10px;" class="btn btn-primary" data-dismiss="modal" data-toggle="modal" data-target="#modal-change-password">Cambiar Contraseña</button>
	<a type="button" style="width: 100%; margin-bottom: 10px;" class="btn btn-danger" onclick="cerrarSesion()">Cerrar Sesión</a>
`)
	document.getElementById('nuevoMensaje').innerHTML = '';
	for (let j = 0; j < contactos.length; j++) {
		$.ajax({
			url: `http://localhost:8888/usuarios/${contactos[j]}`,
			method: "GET",
			dataType: "json",
			data: {},

			success: (res) => {
				$("#nuevoMensaje").append(
					`<li class="contact">
				<div onclick="CrearConversacion('${contactos[j]}');" class="wrap">
					<img src="${res.foto}" alt="" />
					<div class="meta">
						<p class="name">${res.nombre}</p>
					</div>
				</div>
			</li>`)

			},
			error: (error) => {
				console.error(error);
			}
		});
	}
};

function cerrarSesion() {
	window.location = 'login.html';
	localStorage.clear();
}


function MostrarConversaciones(id) {
	let usuarioActivo;
	$('#conversacion').empty();
	console.log("si entro ala funcion")
	$.ajax({
		url: `http://localhost:8888/chats/${id}`,
		method: "GET",
		dataType: "json",
		data: {},
		success: (res) => {

			generarMensajes(id);
			console.log(res);
			if (usuarioLogueado._id == res.emisor._id) {
				usuarioActivo = true;
				document.getElementById('perfilContacto').innerHTML = '';
				document.getElementById('perfilContacto').innerHTML = `
				<img src="${res.receptor.imagen}" alt="" />
				<p>${res.receptor.nombre}</p>
				`;
				document.getElementById('botonEnviar').innerHTML = '';
				document.getElementById('botonEnviar').innerHTML = `
				<div class="wrap">
				<input type="text" placeholder="Write your message..." />
				<i class="fa fa-paperclip attachment" aria-hidden="true"></i>
				<button class="submit" onclick="enviarMensaje('${id}','${res.receptor._id}','${res.receptor.nombre}','${res.receptor.imagen}');"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
				</div>
				`;
				console.log(res.receptor);
			} else if (usuarioLogueado._id == res.receptor._id) {
				console.log(res.emisor);
				usuarioActivo = false;
				document.getElementById('perfilContacto').innerHTML = '';
				document.getElementById('perfilContacto').innerHTML = `
				<img src="${res.emisor.imagen}" alt="" />
				<p>${res.emisor.nombre}</p>`;
				document.getElementById('botonEnviar').innerHTML = '';
				document.getElementById('botonEnviar').innerHTML = `
				<div class="wrap">
				<input type="text" placeholder="Write your message..." />
				<i class="fa fa-paperclip attachment" aria-hidden="true"></i>
				<button class="submit" onclick="enviarMensaje('${id}','${res.emisor._id}','${res.emisor.nombre}','${res.emisor.imagen}');"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
				</div>
				`;
			} else {
				return "BQTP";
			};

		},
		error: (error) => {
			console.error(error);
		}
	});
};

function CrearConversacion(id) {
	let horaS = new Date();
	var usuarioConversacion;
	let crear = true;
	$.ajax({
		url: `http://localhost:8888/usuarios/${id}`,
		method: "GET",
		dataType: "json",
		data: {},
		success: (res) => {
			usuarioConversacion = res;
			if(conversaciones.length == 0){
				$.ajax({
					url: 'http://localhost:8888/chats',
					method: "POST",
					dataType: "json",
					data:
					{
						idUsuario: usuarioLogueado._id,
						nombreEmisor: usuarioLogueado.nombre,
						imagenEmisor: usuarioLogueado.foto,
						idUsuarioReceptor: id,
						nombreDestinatario: usuarioConversacion.nombre,
						imagenDestinatario: usuarioConversacion.foto,
						fechaConversacion: horaS.toLocaleTimeString()
					},
					success: (res) => {
						data = {
							horaUltimoMensaje: horaS.toLocaleTimeString(),
							imagenDestinatario: usuarioConversacion.foto,
							nombreDestinatario: usuarioConversacion.nombre,
							ultimoMensaje: "",
							_id: res.chat._id
						}
						/*usuarios.ordenes.push(addProd);
						localStorage.setItem('usuarios', JSON.stringify(usuarios)); */
						usuarioLogueado.conversaciones.push(data);
						localStorage.setItem('usuario', JSON.stringify(usuarioLogueado));
						generarInformacion();
						$(function () {
							$('#modal-newmessage').modal('toggle');
						});
						console.log("esta es mi data ", res);
					},
					error: (error) => {
						console.error("este es un error", error);
					}
				});
			}else{
				$.ajax({
					url: `http://localhost:8888/chats/`,
					method: "GET",
					dataType: "json",
					data: {},
					success: (res) => {
						for (let i = 0; i < res.length; i++){
							if(id == res[i].receptor._id || id == res[i].emisor._id){
								if(usuarioLogueado._id == res[i].receptor._id || usuarioLogueado._id == res[i].emisor._id){
									MostrarConversaciones(res[i]._id);
									$(function () {
										$('#modal-newmessage').modal('toggle');
									});
									crear = false;
									break;
								}
							}
						}
						if(crear){
							$.ajax({
								url: 'http://localhost:8888/chats',
								method: "POST",
								dataType: "json",
								data:
								{
									idUsuario: usuarioLogueado._id,
									nombreEmisor: usuarioLogueado.nombre,
									imagenEmisor: usuarioLogueado.foto,
									idUsuarioReceptor: id,
									nombreDestinatario: usuarioConversacion.nombre,
									imagenDestinatario: usuarioConversacion.foto,
									fechaConversacion: horaS.toLocaleTimeString()
								},
								success: (res) => {
									data = {
										horaUltimoMensaje: horaS.toLocaleTimeString(),
										imagenDestinatario: usuarioConversacion.foto,
										nombreDestinatario: usuarioConversacion.nombre,
										ultimoMensaje: "",
										_id: res.chat._id
									}
									/*usuarios.ordenes.push(addProd);
									localStorage.setItem('usuarios', JSON.stringify(usuarios)); */
									usuarioLogueado.conversaciones.push(data);
									localStorage.setItem('usuario', JSON.stringify(usuarioLogueado));
									generarInformacion();
									$(function () {
										$('#modal-newmessage').modal('toggle');
									});
									console.log("esta es mi data ", res);
								},
								error: (error) => {
									console.error("este es un error", error);
								}
							});
						}
					},
					error: (error) => {
						console.error(error);
					}
				});
			}
			
		},
		error: (error) => {
			console.error(error);
		}
	});

}

///////////////////////////////////////////////////////////////////////////////////////////////////////

$(".messages").animate({ scrollTop: $(document).height() }, "fast");

$("#profile-img").click(function () {
	$("#status-options").toggleClass("active");
});

$(".expand-button").click(function () {
	$("#profile").toggleClass("expanded");
	$("#contacts").toggleClass("expanded");
});

$("#status-options ul li").click(function () {
	$("#profile-img").removeClass();
	$("#status-online").removeClass("active");
	$("#status-away").removeClass("active");
	$("#status-busy").removeClass("active");
	$("#status-offline").removeClass("active");
	$(this).addClass("active");

	if ($("#status-online").hasClass("active")) {
		$("#profile-img").addClass("online");
	} else if ($("#status-away").hasClass("active")) {
		$("#profile-img").addClass("away");
	} else if ($("#status-busy").hasClass("active")) {
		$("#profile-img").addClass("busy");
	} else if ($("#status-offline").hasClass("active")) {
		$("#profile-img").addClass("offline");
	} else {
		$("#profile-img").removeClass();
	};

	$("#status-options").removeClass("active");
});

let mensajes = [];
function enviarMensaje(id, idReceptor, nombreReceptor, fotoReceptor) {
	message = $(".message-input input").val();
	if ($.trim(message) == '') {
		return false;
	}
	let horaS = new Date();
	console.log(fotoReceptor);
	$.ajax({
		url: `http://localhost:8888/chats/${id}/mensajes`,
		method: "POST",
		dataType: "json",
		data:
		{
			emisor: {
				_id: usuarioLogueado._id,
				nombre: usuarioLogueado.nombre,
				imagen: usuarioLogueado.foto
			},
			receptor: {
				_id: idReceptor,
				nombre: nombreReceptor,
				imagen: fotoReceptor
			},
			ultimoMensaje: message,
			fechaConversacion: horaS.toLocaleTimeString(),
			mensajes: [{
				contenido: message,
				hora: horaS.toLocaleTimeString()
			}]
		},
		success: (res) => {
			console.log("esta es mi data ", res);
			$('<li class="replies"><img src = ' + usuarioLogueado.foto + ' alt="" /><p>' + message + '</p></li>').appendTo($('.messages ul'));
			$('.message-input input').val(null);
			$('.contact.active .preview').html('<span>You: </span>' + message);
			$(".messages").animate({ scrollTop: $(document).height() }, "fast");
		},
		error: (error) => {
			console.error("este es un error", error);
		}
	});
};

/*$('.submit').click(function() {
  enviarMensaje();
});*/

$(window).on('keydown', function (e) {
	if (e.which == 13) {
		enviarMensaje();
		return false;
	}
});

function generarMensajes(id){
	let clase;
	$.ajax({
		url:`http://localhost:8888/chats/${id}`,
		method:"GET",
		dataType:"json",
		data:{},
		success:(res)=>{
			console.log(res);
			for (let i = 0; i < res.mensajes.length; i++) {
				if(res.mensajes[i].hora && res.mensajes[i].receptor.nombre && res.ultimoMensaje){
					if(res.mensajes[i].emisor._id == usuarioLogueado._id){
						clase = 'replies';
					}else{
						clase = 'sent';
					}
					$('#conversacion').append(`
						<li class="${clase}">
							<img src="${res.mensajes[i].emisor.imagen}" alt="" />
							<p>${res.mensajes[i].contenido}&nbsp<small>${res.mensajes[i].hora}</small></p>
						</li>
					`);
				}else{

				}	
			}
			//$("#mensajePrincipal").load("chat2.html");
		},
		error:(error)=>{
			console.error(error);
		}
	});
}
