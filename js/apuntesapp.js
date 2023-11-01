
//primero esperaremos a que se cargen todos los elementos de la pagina web.
/*Tarea al final de desarrollar el proyecto, desarrollar un campo extra llamado CC; para añadir un destinatario extra
    Este campo no es obligatorio; pero en caso de tener informacion debes validar que sea un email valido

*/
document.addEventListener('DOMContentLoaded',function(){

    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    //Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type = "submit"]'); /*Aqui seleccionamos #formulario 
                                                                                        y la etiqueta button el cual tenga el atributo type = submit
                                                                                     */
    const btnReset = document.querySelector('#formulario button[type = "reset"]');
    const spinner = document.querySelector('#spinner');

    //Agregar eventos
    /*  El evento puede ser blur o input, blur llama al callback cuando se abandona el Campo, 
        e input llama al callback, a medida que vamos escribiendo el texto en el campo
        
        inputEmail.addEventListener('blur', fuction(evt){
            console.log(evt.target.value)
        });

        para no escribir el mismo callback en cada campo, haremos una funcion validar y la llamaremos en cada Campo

        obs: si llamo a la funcion de forma validar(), esta funcion de ejecutara de forma automatica, 
        sin haber abandonado el campo, si la llamo validar, se ejecutara despues de abandonar el campo
    */
    inputEmail.addEventListener('blur', validar);   

    inputAsunto.addEventListener('blur', validar);

    inputMensaje.addEventListener('blur', validar);

    formulario.addEventListener('submit',enviarEmail);

    btnReset.addEventListener('click', function(evt){
        evt.preventDefault();

        resetearFormulario();
    })
    
    /*Funcion que se activara cuando se presione el boton de enviar
        y mostrara el spinner
    */
    
    function enviarEmail(evt){
        evt.preventDefault();
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        //Aqui pasaran 3 seg y se ocultara el spinner
        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

             //reiniciar objeto
            resetearFormulario();

            //Crear Alerta
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500','text-white','p-2', 'text-center','rounded-lg','mt-10',
            'font-bold','text-sm','uppercase');
            alertaExito.textContent = 'Mensaje enviado correctamente';
            formulario.appendChild(alertaExito);
           
            setTimeout(() =>{
                alertaExito.remove();
            },3000);

        }, 3000);
    }

    function validar(evt){
        
        /*Verificacion de campo vacio.
            si el usuario ingresa espacios en el campo, el codigo reconocera que hay algo en el campo
            para corregir esto usamos trim()el cual elimina los espacios vacios y deja solo el texto
        */
        if(evt.target.value.trim()===''){   
            mostrarAlerta(`El campo ${evt.target.id} es obligatorio`, evt.target.parentElement);
            /*Debemos inicializar nuevamente el atributo del objeto email,
                ya que si habia algo anterior mente y posteriormente borramos lo que habia,
                quedara en memoria lo que se borro aunque nosotros no lo veamos en la pagina 
            */

            email[evt.target.name] = '';
            /*Volvemos a comprobar el email para las funciones del boton enviar
            */
            comprobarEmail();
            return;
        }

        /*Validar formato email.
            if(evt.target.id === 'email' && !validarEmail(evt.target.value))

            En este caso se lee si id es igual email y falla validar datos se ejecuta
        */

        if(evt.target.id === 'email' && !validarEmail(evt.target.value)){
            mostrarAlerta("El email no es valido", evt.target.parentElement);
            email[evt.target.name] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(evt.target.parentElement);

        /*Asignar valores al objeto email

            email[evt.target.name] = evt.target.value.trim().toLowerCase();

            Es una asignacion corta, si evt.target.name coincide con el nombre de algun atributo del objeto,
            este se almacenara automaticament, esto evita tener mas lineas de codigo, ya que deberiamos tener
            
            email.email = evt.target.value.trim().toLowerCase(); y asi con todos los otros atributos

        */
        email[evt.target.name] = evt.target.value.trim().toLowerCase();
        console.log(email);

        comprobarEmail();
    }

    function mostrarAlerta(mensaje, referencia){

        /*Comprueba si ya existe una alerta
            const alerta = document.querySelector('.bg-red-600') buscara la etiqueta que contenga la clase con nombre bg-red-600,
            al ejecutarse el if, buscara en todo el documento y borrara las alertas que existan,
            independiente del campo en donde ocurrio el evento 
            por lo que debemos limitarla solo a la referencia en donde ocurre el evento
            const alerta = referencia.querySelector('.bg-red-600')    
        
        const alerta = referencia.querySelector('.bg-red-600')
        if(alerta){
            alerta.remove();
        }

        Este codigo lo usaremos en otras partes por lo que podemos crear una funcion
        */

        limpiarAlerta(referencia);

        /*Generar Alerta en HTML
            El codigo HTML se podria crear con innerHTML, pero queda vulnerable a ataques
            Por lo que es mas seguro hacerlo de esta manera
        */
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600','text-white','p-2','text-center'); //Agregamos clases para que destaque

        /*Inyectar el error al formulario
            Podemos inyectar el error con innerHTML:

            formulario.innerHTML = error.innerHTML

            esto eliminara todo el formulario y mostrara nuestro mensaje

            appendChild, Agregara la etiqueta como un hijo de esta y la pondra al final, 
            sin eliminar nada, solo agregara etiquetas cada vez que entremos y salgamos del campo

            formulario.appendChild(error);

            Para que podamos ver la Alerta en debajo de cada alerta debemos considerar
            
            console.log(evt.target) => Muestra la etiqueta en donde esta ocurriendo el evento
            console.log(evt.target.parentElement) => Nos mostrara la etiqueta, donde ocurre el evento, 
                                                     mas el padre de esta omitiendo los otros contenidos

            console.log(evt.target.parentElement.nextElementSibling) => Esto mostrara la etiqueta que viene despues de donde ocurrio el evento

        */
        referencia.appendChild(error);

    }

    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.bg-red-600')
        if(alerta){
            alerta.remove();
        }
    }

    function validarEmail(email){
        //Expresion regular para email
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);        //Comprobara si es formato de email y devolvera true o false
        
        return resultado;
    }

    /*Comprobar email
    verificara si todos los datos del email estan completos
    
    Object.values(email) retornara un array, con los valores de los atributos ejemplo

    email[bla@blabla.com,'',''];
    
    por lo que podemos usar metodos de array 
    
    Object.values(email).includes('') enviara tue si uno de los valores de los atributos es vacio
    y false si no existe
    */
    function comprobarEmail(){
        if(Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        }
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }

    function resetearFormulario(){
         //reiniciar objeto
         email.email = '';
         email.asunto = '';
         email.mensaje = '';
 
         formulario.reset();
         comprobarEmail();
    }
});