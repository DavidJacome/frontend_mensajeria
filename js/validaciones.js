function validarLogin(){
    var contrasena,telefono;
    contrasena  = document.getElementById("contrasena").value;
    telefono  = document.getElementById("telefono").value;
    
    
    if(contrasena===""||telefono===""){
    alert("Todos los campos son obligatorios");
    return false;
    }
    
    else if(contrasena.length>20 || contrasena.length<2){
        alert("Contraseña debe tener entre 4-8 caracteres");
        return false
    }
    
    else if(telefono.length>10){
        alert("El Telefono es muy Largo");
        return false
    }
    else if(isNaN(telefono)){
        alert("El Telefono ingresado no es un numero");
        return false
    }
    else {
        IniciarSesion();
        return true
    }
    
    }



    function validarRegistro(){
        var nombre,telefono,contrasena; 
        nombre = document.getElementById("nombre").value;
        telefono  = document.getElementById("telefono").value;
        contrasena  = document.getElementById("contrasena").value;
     
        
        
        if(nombre===""||telefono===""|| contrasena===""){
        alert("Todos los campos son obligatorios");
        return false;
        }
        else if(nombre.length>30){
            alert("El nombre es muy Largo");
            return false
        }
        
       else if(telefono.length>10){
            alert("El Telefono es muy Largo");
            return false
        }
        else if(isNaN(telefono)){
            alert("El Telefono ingresado no es un numero");
            return false
        }

        else if(contrasena.length>20 || contrasena.length<2){
            alert("Contraseña debe tener entre 4-8 caracteres");
            return false
        }
        else {
            RegistrarUsuario();
            return true
        }
        
        }