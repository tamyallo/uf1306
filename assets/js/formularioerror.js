/*
 * Gestión de eventos y formularios en JavaScript
*/

/*
    Ejemplo de función anónima (sin nombre)
    1.- Ejecuta el código cuando la página se haya cargado completamente
    2.- al evento de click en el botón de id = 'enviar'
        ejecuta la función validarFormulario()
*/

window.onload = function() {

    // Se crea un objeto

    var enviar = document.getElementById("enviar");

    /*
        addEventListener()

        Sintáxis:
        addEventListener( evento-a-escuchar, función-a-lanzar, booleano )

        Permanece a la escucha de un evento y cuando se activa ejecuta la función
    */

    // El método addEventListener asigna las funciones a los tipos de evento
    // Evento onclick, tipo click, sobre el objeto element HTML
    // con id 'enviar'
    // Llama a la función validarFormulario()
    // que se encarga de validar el formulario
    // Se programa en la fase de burbuja (false),
    // es decir, del elemento más específico hacia afuera

    enviar.addEventListener('click', validarFormulario, false);

}


/*
    Función validarFormulario()

    Parámetro: objectHTMLImputElement

    Realiza las validaciones de los campos de formulario
    Según los requisitos del Enunciado

    Si todos los campos son válidos se envía el formulario
    si no, no se envía el formulario y se deshabilita el botón de enviar

    @return: booleano
*/

function validarFormulario( enviar ) {

    console.log('Hola');

    // Objetos document HTML del formulario
    var formulario = document.getElementById("form")
    var nombre = document.getElementById("name");
    var edad = document.getElementById("edad");
    var email = document.getElementById("email");
    var mensaje = document.getElementById("mensaje");

    // Resultado de la validación: por defecto, FALSE
    var validacion = false;

    // Validamos cada uno de los apartados con llamadas a sus funciones correspondientes.
    if (
        validarSoloTexto( nombre )
        //&& validarNumero( edad, 0, 120 )
        && validarEmail( email )
        //&& validarTextarea( mensaje, 3, 255 )
        && confirm("¿Deseas enviar el formulario con estos datos?")
    ){
        // El código de error 0 Devuelve TRUE ( @return = true )
        validacion = mensajeError(0);
        // return true; // validacion ahora vale TRUE
    }

    // Si no se supera la validación de ALGUNO de los apartados del enunciado
    else {
        // Se impide el evento asignado por defecto al input type="submit"
        // es decir, se impide el envío del formulario

        enviar.preventDefault();

        // return false; // validacion sigue siendo FALSE
    }

    // Booleano final de la validación (true | false )

    console.log('Radiola');
    return validacion;
}


/*
    Función mensajeError()

    Parámetros:
        error: Number. El nº de error a mostrar en el texto de info al usuario
        name: String. El name del input que no supera la validación
        id: String. El ID del elemento que muestra el mensaje de error

    Agrupa todos los errores por numeros en una sóla función.

    Cada número de error tiene asignado un texto informativo al usuario

    Se obtiene un elemennto del DOM por ID donde mostrar un mensaje al usuario
        El ID de ese elemento, por defecto, es 'errores'
        Se inserta en el DOM un texto informativo sobre el fallo de validación
        Se cambia la clase de ese elemento
            para aplicar estilos CSS según el nº de error

    @return: Booleano
*/

function mensajeError ( error, elemento="", min=0, max=300, id="errores" ) {

    // Nombre del campo de formulario con errores de validación
    // Pasado a mayúsculas
    var campo = elemento.name.toUpperCase();

    // Valor de retorno, por defecto, FALSE.
    var validacion = false;

    // Información del error de validación a mostrar al usuario
    var texto = "[ERROR " + error + "] ";
    texto += "en el campo '" + campo + "': ";

    // Elemento del DOM donde insertar el texto y aplicar estilos CSS
    var etiquetaInfo = document.getElementById( id );
    etiquetaInfo.className = "danger";

    if ( error != 0 ) {
        // Se pone el foco en el elemento no válido
        elemento.focus();
    }

    switch ( error ) {
        case 0:
            texto = "Formulario válido!";
            etiquetaInfo.className = "success";
            etiquetaInfo.innerHTML = texto;

            // Excepción a @return FALSE. El formulario es válido!
            validacion = true;
        break;

        case 1:

            texto += "No puede estar vacío!";
            etiquetaInfo.innerHTML = texto;
        break;

        case 2:
            texto += "Sólo acepta letras del alfabeto español y espacios en blanco";
            etiquetaInfo.innerHTML = texto;
        break;

        case 3:
            texto += "El correo electrónico no parece un email válido";
            etiquetaInfo.innerHTML = texto;
        break;

        // default:
    }

    // Después de haber informado al usuario de dato a corregir
    // Retorna un booleado según el nº de error recibido
    return validacion;
}


/*
    Función validarObligatorio()

    Parámetro: objectHTMLImputElement

        Comprueba si el campo es obligatorio por su atributo 'required'
        y, de serlo, también debe cumplir que contenga algo.

        Si no supera la condición, ejecuta el mensajeError(1) que retorna FALSE

        El resto de casos retorna el valor inicial TRUE

    @return: Booleano
*/

function validarObligatorio( elemento ) {

    // Valor de retorno por defecto: TRUE
    var validacion = true;

    if (
        ( elemento.attributes["required"] == "true"
            || elemento.required == true )
        && !( elemento.value.trim().length > 0 )
    ){
        // El mensajeError(1) inserta un mensaje con la info del error en el DOM
        // y retorna FALSE
        validacion = mensajeError( 1, elemento );
        // return false;
    }

    // else { return true; }

    return validacion;
}


/*
    Función validarSoloTexto()

    Parámetro: objectHTMLImputElement

    Comprueba si la validación supera validarObligatorio()
        De ser así, ejecuta la validación por expresión regular

    Si la supera retorna TRUE

    Si no, ejecuta el mensajeError(2) y retorna FALSE

    @return: Booleano
*/

function validarEmail( elemento ) {

    var expresionRegular =/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ ;

    var validacion = validarObligatorio( elemento );
    console.log('Validación en validarEmail(): ' + validacion + '\n');

    switch ( validacion ) {

        case true:
           
            var resultadoExpRegular = expresionRegular.exec( elemento.value );

            if ( !resultadoExpRegular ) {

                validacion = mensajeError( 3, elemento );
               
            }
        break;

    }

    console.log('Error: ' + error + '\n');
    console.log('Validación: ' + validacion + '\n');
    console.log('--------------------------------');

    return validacion;
}
