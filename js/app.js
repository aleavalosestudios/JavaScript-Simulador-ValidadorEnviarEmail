//primero esperaremos a que se cargen todos los elementos de la pagina web.
/*Tarea al final de desarrollar el proyecto, desarrollar un campo extra llamado CC; para añadir un destinatario extra
    Este campo no es obligatorio; pero en caso de tener informacion debes validar que sea un email valido

*/
//tarea.CrearCampo

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
    const btnSubmit = document.querySelector('#formulario button[type = "submit"]');
    const btnReset = document.querySelector('#formulario button[type = "reset"]');
    const spinner = document.querySelector('#spinner');    

    //Primera Parte de tarea Crear div, crear label y crear el Campo y posicionarlo como segundo hijo del formulario
    
    const divCC = document.createElement('DIV')
    divCC.classList.add('flex','flex-col','space-y-2');

    const labelCC = document.createElement('Label');
    labelCC.setAttribute('for','cc');
    labelCC.classList.add('font-regular','font-medium');
    labelCC.textContent = 'CC:'

    const inputCC = document.createElement('input');
    inputCC.classList.add('border','border-gray-300','px-3','py-2','rounded-lg');
    inputCC.setAttribute('id','cc');
    inputCC.setAttribute('type','email');
    inputCC.setAttribute('name','cc');
    inputCC.setAttribute('placeholder','Ingrese correo Copia');

    formulario.insertBefore(divCC,formulario.children[1]);

    divCC.appendChild(labelCC);
    divCC.appendChild(inputCC);
    
    const copiaemail = document.querySelector('#cc');

    copiaemail.addEventListener('blur',validar);
    
    
    
    
    //fin Primera parte Tarea
    
    inputEmail.addEventListener('blur', validar);   

    inputAsunto.addEventListener('blur', validar);

    inputMensaje.addEventListener('blur', validar);

    formulario.addEventListener('submit',enviarEmail);
    

    btnReset.addEventListener('click', function(evt){
        evt.preventDefault();

        resetearFormulario();
    })
        
    function enviarEmail(evt){
        evt.preventDefault();
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

    
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
        
        //segunda parte de tarea
        if(evt.target.id ==='cc' && evt.target.value.trim() !=='' ){
            if(!validarEmail(evt.target.value)){
                mostrarAlerta('Formato de correo no valido',evt.target.parentElement);
                return;
            }
        }

        //Fin segunda parte de tarea

        //Tercera parte de tarea, solo se agreg && evt.target.id !== 'cc' en el if

        if(evt.target.value.trim()==='' && evt.target.id !== 'cc'){   
            mostrarAlerta(`El campo ${evt.target.id} es obligatorio`, evt.target.parentElement);
        
            email[evt.target.name] = '';
            comprobarEmail();
            return;
        }
        //fin tercera parte tarea
        
        if(evt.target.id === 'email' && !validarEmail(evt.target.value)){
            mostrarAlerta("El email no es valido", evt.target.parentElement);
            email[evt.target.name] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(evt.target.parentElement);

        email[evt.target.name] = evt.target.value.trim().toLowerCase();
        comprobarEmail();
    }

    function mostrarAlerta(mensaje, referencia){

        limpiarAlerta(referencia);

        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600','text-white','p-2','text-center');

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
        const resultado = regex.test(email);
        
        return resultado;
    }
    
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