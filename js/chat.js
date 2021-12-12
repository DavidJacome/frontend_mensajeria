var usuarioLogueado;
var contactos=[];
var conversaciones=[];
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

(()=>{
	usuarioLogueado = JSON.parse(localStorage.getItem('usuario'));
	//console.log(usuarioLogueado);
	contactos=usuarioLogueado.contactos;
	conversaciones=usuarioLogueado.conversaciones;
	$("#profile").append(
		`<div class="wrap">
	<img id="profile-img" src="http://emilcarlsson.se/assets/mikeross.png" class="online" alt="" />
	<p>${usuarioLogueado.nombre}</p>
    </div>`
	);
    for (let i = 0; i < conversaciones.length; i++) {
	console.log(conversaciones[i]);
	$("#conversaciones").append(
			`<li class="contact">
				<div onclick ="MostrarConversaciones('${conversaciones[i]._id}');" class="wrap">
					<img src="http://emilcarlsson.se/assets/louislitt.png" alt="" />
					<div class="meta">
						<p class="name">${conversaciones[i].nombreDestinatario}</p>
						<p class="preview">${conversaciones[i].ultimoMensaje}</p>
						<small>${conversaciones[i].horaUltimoMensaje}</small>
					</div>
				</div>
			</li>`)
		}

	$("#ajusteUsuario").append(`
	<div   style="margin-bottom: 10px;">
		<img id="profile-img" src="http://emilcarlsson.se/assets/mikeross.png" class="mr-auto ml-auto" alt="" />
		<p style="display: block; text-align: center; margin-top: 5px;">${usuarioLogueado.nombre} <a href="#" class="fa fa-pencil fa-fw"></a></p>
	</div>
	<input  style="margin-bottom: 10px;" type="text" class="form-control" placeholder="Estado" value ="${usuarioLogueado.estado}">
	<button type="button" style="width: 100%; margin-bottom: 10px;" class="btn btn-primary" data-dismiss="modal" data-toggle="modal" data-target="#modal-change-password">Cambiar Contraseña</button>
	<a type="button" style="width: 100%; margin-bottom: 10px;" class="btn btn-danger" onclick="cerrarSesion()">Cerrar Sesión</a>
`)

for (let j = 0; j < contactos.length; j++) {
	//console.log("este es inidce", contactos[j])
	$.ajax({
        url:`http://localhost:8888/usuarios/${contactos[j]}`,
        method:"GET",
        dataType:"json",
        data:{},
            
        success:(res)=>{
			//console.log(res);
			$("#nuevoMensaje").append(
				`<li class="contact">
				<div onclick="CrearConversacion('${contactos[j]}');" class="wrap">
					<img src="http://emilcarlsson.se/assets/louislitt.png" alt="" />
					<div class="meta">
						<p class="name">${res.nombre}</p>
					</div>
				</div>
			</li>`)
         
        },
        error:(error)=>{
            console.error(error);
        }
    });
	
}

})();

function cerrarSesion(){
	window.location.href = '../login.html';
	localStorage.clear();
}

var usuarioReceptor;
function MostrarConversaciones(id) {
	usuarioReceptor = id;
	let clase;

	$('#conversacion').empty();
    console.log("si entro ala funcion")
	$.ajax({
        url:`http://localhost:8888/usuarios/${id}/conversaciones`,
        method:"GET",
        dataType:"json",
        data:{},
        success:(res)=>{
			console.log(res);
			for (let i = 0; i < res.length; i++) {
				if(res[i].horaUltimoMensaje && res[i].nombreDestinatario && res[i].ultimoMensaje){
					if(res[i]._id == usuarioLogueado._id){
						clase = 'replies'			
					}else{
						clase = 'sent'
					}
					$('#conversacion').append(`
						<li class="${clase}">
							<img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
							<p>${res[i].ultimoMensaje}<small>${res[i].horaUltimoMensaje}</small></p>
						</li>
					`);
				}else{

				}	
			}
        },
        error:(error)=>{
            console.error(error);
        }
    });
	
};

function CrearConversacion(id) {
	console.log(id)
	console.log("holaaa ", usuarioLogueado._id);
	$.ajax({
		
		url:'http://localhost:8888/chats',
		method:"POST",
		dataType:"json",
		data:
		{
			idUsuario:usuarioLogueado._id,
			idUsuarioReceptor:id,
			nombreDestinatario: "Jacome",
    		imagenDestinatario: ""
		},
		success:(res)=>{
			
			console.log("esta es mi data ", res);
		
		},
		error:(error)=>{
			console.error("este esun error", error);
		}
	});
}

///////////////////////////////////////////////////////////////////////////////////////////////////////

$(".messages").animate({ scrollTop: $(document).height() }, "fast");

$("#profile-img").click(function() {
	$("#status-options").toggleClass("active");
});

$(".expand-button").click(function() {
  $("#profile").toggleClass("expanded");
	$("#contacts").toggleClass("expanded");
});

$("#status-options ul li").click(function() {
	$("#profile-img").removeClass();
	$("#status-online").removeClass("active");
	$("#status-away").removeClass("active");
	$("#status-busy").removeClass("active");
	$("#status-offline").removeClass("active");
	$(this).addClass("active");
	
	if($("#status-online").hasClass("active")) {
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
function newMessage() {
	message = $(".message-input input").val();
	if($.trim(message) == '') {
		return false;
	}
	$('<li class="sent"><img src="http://emilcarlsson.se/assets/mikeross.png" alt="" /><p>' + message + '</p></li>').appendTo($('.messages ul'));
	$('.message-input input').val(null);
	$('.contact.active .preview').html('<span>You: </span>' + message);
	$(".messages").animate({ scrollTop: $(document).height() }, "fast");

	let horaS = new Date();
	console.log("se esta enviando el mensaje");
	//console.log(usuarioReceptor);
	$.ajax({
		url:`http://localhost:8888/chats/'${id}'/mensajes`,
		method:"POST",
		dataType:"json",
		data:
		{
			emisor: {
				_id: usuarioLogueado._id,
				nombre:usuarioLogueado.nombre,
				imagen: usuarioLogueado.imagen
			},
			receptor: {
				_id: usuarioReceptor,
				nombre: "",
				imagen: ""
			},
			ultimoMensaje: "",
			fechaConversacion: horaS.toLocaleTimeString(),
			mensajes: mensajes.push({
				contenido: message,
				hora: horaS.toLocaleTimeString()
			})
		},
		success:(res)=>{
			console.log("esta es mi data ", res);
		},
		error:(error)=>{
			console.error("este es un error", error);
		}
	});
};

$('.submit').click(function() {
  newMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    newMessage();
    return false;
  }
});