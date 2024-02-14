
'use strict'
const url='https://api-agenda-mgys.onrender.com'
// Verifica que el documento esté completamente cargado antes de ejecutar código jQuery

    // Tu código jQuery aquí
     // Agrega un evento 'click' al botón
  const botonRegoistro=document.querySelector('#boton-registrarse')
  const inputName=document.querySelector('#name')
  const inputApellido=document.querySelector('#apellido')
  const inputEmail=document.querySelector('#email')
  const inputPassword=document.querySelector('#password')
  const inputRepetirPassword=document.querySelector('#repetirPassword')
  const emailSpan=document.querySelector('#emailSpan')
  const passwordSpan=document.querySelector('#passwordSpan')
  const repetirPasswordSpan=document.querySelector('#repetirPasswordSpan')

  botonRegoistro.addEventListener('click',function(e) {
    e.preventDefault()
    registrarse() 
  }) 

  inputRepetirPassword.addEventListener('change',function() {
    compararPassword()
  }) 



  const registrarse=async ()=>{
  
    let name=inputName.value
    let apellido=inputApellido.value
    let email=inputEmail.value
    let password=inputPassword.value
    let repetirPassword=inputRepetirPassword.value

    repetirPasswordSpan.textContent=''
    passwordSpan.textContent=''
    emailSpan.textContent=''
    inputEmail.classList.remove('inputError')
    inputPassword.classList.remove('inputError')
    inputRepetirPassword.classList.remove('inputError')
    
    const data={
      name,
      apellido,
        email,
        password,
        repetirPassword
    }
    console.log(data)
    
    if(password!==repetirPassword){
         repetirPasswordSpan.textContent=('password no coinciden')
         inputRepetirPassword.classList.add('inputError')
    }
    
    if(!email && !password){
        emailSpan.textContent='email requerido'
        passwordSpan.textContent='password requerido'

        inputEmail.classList.add('inputError');
        inputPassword.classList.add('inputError');
        inputRepetirPassword.classList.add('inputError')
     
       
    }else if(!email){
        emailSpan.textContent='email requerido'
        inputEmail.classList.add('inputError');
    }else if(!password){
        passwordSpan.textContent='password requerido'
        inputPassword.classList.add('inputError');
        inputRepetirPassword.classList.add('inputError')

    }

    if(name, password, email && password && repetirPassword===password){
        console.log('usuario registrado')
        console.log(data)
       
       const crear_usuario=await crearUsuario(name,apellido,email,password)

       if(crear_usuario.code===409){
        emailSpan.textContent=crear_usuario.message
       }
       if(crear_usuario.code===201){
          inputName.value=''
          inputApellido.value=''
          inputEmail.value=''
          inputPassword.value=''
          inputRepetirPassword.value=''
       }
        console.log('promesa')
        console.log(crear_usuario)
        window.location.href = '../contactos/contactos.html';
        
       
    }


  }

  const compararPassword=()=>{

    if(inputPassword.value===inputRepetirPassword.value){
        inputPassword.classList.remove('inputError')
        inputRepetirPassword.classList.remove('inputError')
        repetirPasswordSpan.textContent=''
    }else{
        inputRepetirPassword.classList.add('inputError')
        repetirPasswordSpan.textContent='password no coinciden'
    }

    
  }

  const crearUsuario = async (name, apellido, email, password) => {
    return new Promise((resolve, reject) => {
        // URL de tu backend
        const backendURL = `${url}/test-user/create`;

            const data = {
                email: email,
                password: password,
                name: name,
                apellido: apellido,
            };

            fetch(backendURL, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.code === 409) {
                        // Puedes manejar el caso de código 409 de alguna manera
                        // Por ejemplo, puedes rechazar la promesa con un mensaje de error
                        resolve(data);
                    }

                    if (data.code === 201) {
                        localStorage.setItem('token', data.token);
                        // Puedes resolver la promesa con los datos que desees
                        resolve(data);
                    }
                })
                .catch(error => {
                    // Puedes rechazar la promesa con un mensaje de error en caso de fallo
                    reject(error);
                });
        });
    };

