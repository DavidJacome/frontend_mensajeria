var usuarioLogeado;
function IniciarSesion() {
    console.log("me estas presioando")
    $.ajax({
        url:'http://localhost:8888/usuarios/login',
        method:"POST",
        dataType:"json",
        data:
        {
         telefono:$("#telefono").val(), 
         contrasena: $("#contrasena").val()
        },
            
        success:(res)=>{
            
            console.log("esta es mi data ", res);
        },
        error:(error)=>{
            console.error("este esun error", error);
        }
    })

}