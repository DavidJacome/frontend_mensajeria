var usuarioLogiado;

//Inicio de Sesión
function IniciarSesion(){
    var telefono = document.getElementById('telefono').value;
    var contrasena = document.getElementById('contrasena').value;
    console.log("me estas presioando")
    $.ajax({
        url:'http://localhost:8888/usuarios/login',
        method:"POST",
        dataType:"json",
        data:
        {
         telefono:telefono,
         contrasena: contrasena
        },
            
        success:(res)=>{
            usuarioLogiado= res,
            console.log("esta es mi data ", usuarioLogiado);
            window.location.href = '../chat2.html';
        },
        error:(error)=>{
            console.error("este esun error", error);
        }
    })
}


//registrar

function RegistrarUsuario(){
    var nombre = document.getElementById('nombre').value;
    var telefono = document.getElementById('telefono').value;
    var contrasena = document.getElementById('contrasena').value;
    var confirmarContrasena = document.getElementById('confirmarContrasena').value;
    var terminos=document.getElementById("terminos").value;
     
    if(contrasena==confirmarContrasena){
        $.ajax({
            url:'http://localhost:8888/usuarios/registro',
            method:"POST",
            dataType:"json",
            data:
            {
                nombre:nombre,
                foto:'https://jarroba.com/foro/?qa=image&qa_blobid=11099619010778415938&qa_size=200',
                estado:"disponible",
                telefono: telefono,
                contrasena:contrasena,
                contactos: [],
                conversaciones: []
       
            },
              
            success:(res)=>{
                
              
                console.log("esta es mi data ", res);
                alert("Se registro Exitosamente, puedes iniciar sesion YA!  Bienvenido")
                window.location.href = '../login.html';
            },
            error:(error)=>{
                console.error("este esun error", error);
            }
        })
    }else{
        console.log("contrasena no coinciden, vuelva intentarlo")
    }
    
}

