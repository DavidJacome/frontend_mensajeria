var usuarioLogueado;

//Inicio de Sesión
function IniciarSesion(){
    var telefono = document.getElementById('telefono').value;
    var contrasena = document.getElementById('contrasena').value;
    $.ajax({
        url:'https://vast-everglades-01207.herokuapp.com/usuarios/login',
        method:"POST",
        dataType:"json",
        data:
        {
         telefono:telefono,
         contrasena: contrasena
        },
            
        success:(res)=>{
            usuarioLogueado= res,
            console.log("esta es mi data ", usuarioLogueado);
            window.location = 'chat2.html';
            if (localStorage.getItem('usuario')!=null) {
                usuarioLogueado = JSON.parse(localStorage.getItem('usuario'));
                //usuarioLogueado.push(agregarProducto);
                localStorage.setItem('usuario', JSON.stringify(usuarioLogueado));
            } else {
                
                localStorage.setItem('usuario', JSON.stringify(usuarioLogueado));
            }
        },
        
        error:(error)=>{
            console.error("este es un error", error);
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
    var data = {
        nombre:nombre,
        telefono:telefono,
        contrasena:contrasena
    }
    if(contrasena==confirmarContrasena){
        $.ajax({
            url:'http://localhost:8888/usuarios/registro',
            method:"POST",
            dataType:"json",
            data: data,
            success:(res)=>{
                console.log("esta es mi data ", res);
                alert("Se registro Exitosamente, puedes iniciar sesion YA!  Bienvenido")
                window.location = 'login.html';
            },
            error:(error)=>{
                console.error("este esun error", error);
            }
        })
    }else{
        console.log("contrasena no coinciden, vuelva intentarlo")
    }
    
}
