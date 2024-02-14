// Verifica que el documento esté completamente cargado antes de ejecutar código jQuery
document.addEventListener('DOMContentLoaded', function() {
    // Tu código jQuery aquí
     // Agrega un evento 'click' al botón
  const botonLogin=document.querySelector('#botonLogin')
  const emailSpan=document.querySelector('#emailSpan') 
  const passwordSpan=document.querySelector('#passwordSpan')
  const emailImput=document.querySelector('#email')
  const passwordImput=document.querySelector('#password')

  botonLogin.addEventListener('click', async function(e) {
    e.preventDefault(); // Evitar la acción predeterminada (enviar formulario)
   await singIng()
    // Aquí puedes agregar más lógica que se ejecutará cuando el botón sea clickeado
});
// Función para agregar un contacto
const singIng=async ()=> {
    const email= emailImput.value
    const password= passwordImput.value
    emailSpan.textContent=''
    passwordSpan.textContent=''
    emailImput.classList.remove('inputError')
    passwordImput.classList.remove('inputError')

    if (email && password) {
        const user = {
            email: email,
            password: password
        };

        // Limpiar los campos del formulario
        emailImput.value 
        passwordImput.value

      //  window.location.href = '/agenda-contactos/contactos/contactos.html';

        console.log('email: ',email+' password: ',password)
      await  sing_in(email,password)

     

    }else if(!email && !password){
        const mensaje1='email requerido'
        const mensaje2='password requerido'
        
        emailImput.classList.add('inputError');
        passwordImput.classList.add('inputError');
        
        emailSpan.textContent=mensaje1
        passwordSpan.textContent=mensaje2
        
    }
    else if(!email){
        emailImput.addClass('inputError');
       
        const mensaje='email requerido'
        emailSpan.textContent=mensaje
        console.log(emailSpan)
        
    }else if(!password){
        passwordImput.classList.add('inputError');
        const mensaje='password requerido'
        passwordSpan.textConten=mensaje
        console.log(emailSpan)

    }
    
    
    
}

const sing_in=async (email,password)=> {
    // URL de tu backend
    const backendURL = 'http://localhost:3001/test-user/sing-in';

   
    const data = { email: email, password: password };

            fetch(backendURL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
            })
            .then(response => response.json())
            .then(data => {
                if(data.code===404){
                    emailSpan.textContent=data.message
                }
                if(data.code===401){
                    passwordSpan.textContent=data.message
                }
                if(data.code===200){
                    let name=data.data.name+' '+data.data.apellido
                    localStorage.setItem('token',data.token)
                    localStorage.setItem('name',name)
                    window.location.href = '/agenda-contactos/contactos/contactos.html';
                }
              
            })
            .catch(error => {
                console.error(error);
            });

         
}
});
  