

const url='https://api-agenda-mgys.onrender.com'

var totalContactos=0

    const nameUserSpan=document.querySelector("#nameUser")
    const nameUser=localStorage.getItem('name')
    const botonAddContacto=document.querySelector('#addContacto')
    const divCrearContacto=document.getElementById('crear-contacto')
    const contenedor_contactos=document.getElementById('contenedor')
    const boton_regresar=document.getElementById('botonRegresar')
    const c_name=document.getElementById('c-name')
    const c_apellido=document.getElementById('c-apellido')
    const c_email=document.getElementById('c-email')
    const c_telefono=document.getElementById('c-telefono')
    const c_image=document.getElementById('c-image')
    const boton_crear_contacto=document.getElementById('botonCrearContacto')
    const nameErrorSpam=document.getElementById('nombreErrorSpam')
    const apellidoErrorSpam=document.getElementById('apellidoErrorSpam')
    const emailErrorSpan=document.getElementById('emailErrorSpam')
    const telefonoErrorSpan=document.getElementById('telefonoErrorSpam')
    const imageErrorSpan=document.getElementById('imageErrorSpam')
    const crearContactoLocalStorage=localStorage.getItem('crear-contacto')
    const ir_agenta=document.getElementById('ir-agenda')
    const tablaContactos=document.querySelector('#tablaContactos')
    const bodyTabla=document.querySelector('#bodyTabla') 
    const deslogar=document.querySelector('#deslogar')
    const imput_limit=document.querySelector('#imputLimit')
    const boton_update_contacto=document.querySelector('#botonUpdateContacto')
    const boton_update_regresar=document.getElementById('botonRegresarUpdateContacto')
    const divUpdateContacto=document.getElementById('update-contacto')
    const formularioUpdateContacto=document.getElementById('formulario-update-contacto')
    const botonBuscarContacto=document.querySelector('#botonBurcarContacto')
    const inputBuscarContacto=document.getElementById('inputBuscarContacto')
    const divContactoNoEncontrado=document.getElementById('contactoNoEncontrado')
    const formulacionCrearcontacto=document.getElementById('formulario-crear-contacto')
    const botonSubirImagen=document.getElementById('subirImagen')
    const pagination=document.getElementById('pagination')
    const contenedorContactos=document.getElementById('contenedorContatos')
    const contenedorLoading=document.getElementById('loading')
    const loadingCrearContacto=document.getElementById('loadingCrearContacto')

 

    formularioUpdateContacto.addEventListener('submit',(e)=>{
           e.preventDefault()
    })
    
    if(crearContactoLocalStorage==='true'){
       
        divCrearContacto.style.display='block'
        contenedor_contactos.style.display='none'
    }

    botonBuscarContacto.addEventListener('click', ()=>{
        const name=inputBuscarContacto.value
        buscarContactoEspecifico(name)
    })

    ir_agenta.addEventListener('click',()=>{
        localStorage.setItem('crear-contacto','false')
        window.location.href = '/agenda-contactos/contactos/contactos.html';
    
           
    })
    deslogar.addEventListener('click',()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        window.location.href = '../index.html';
        
    })
   
    botonAddContacto.addEventListener('click',()=>{
        localStorage.setItem('crear-contacto','true')
        divCrearContacto.style.display='block'
        contenedor_contactos.style.display='none'
           
    })
    boton_regresar.addEventListener('click',()=>{
        localStorage.setItem('crear-contacto','false')
        divCrearContacto.style.display='none'
        contenedor_contactos.style.display='block'
        c_name.value=''
        c_apellido.value=''
        c_email.value=''
        c_telefono.value=''
        c_image.value=''
           
    })

    boton_update_regresar.addEventListener('click',()=>{
        contenedor_contactos.style.display='block'
        divUpdateContacto.style.display='none'

    })



    boton_crear_contacto.addEventListener('click',(e)=>{
        e.preventDefault()
        crearContscto()
      
    })

    imput_limit.addEventListener('change',(event)=>{
        const limit=event.target.value
        
        saveLimitStorage(limit)
        getAllContactoHttp(1,limit)
    })
   
    
    if(nameUser){
       nameUserSpan.textContent=localStorage.getItem('name')
    }

  

   

    
    // Función para editar un contacto (ejemplo)

 

const crearContscto=async ()=>{
    let name=c_name.value
    let apellido=c_apellido.value
    let email=c_email.value
    let telefono=c_telefono.value
    let image='image.png'

    const data={
        name,apellido,email,telefono
    }

    if(name && apellido && email && telefono){

      boton_crear_contacto.style.display='none'
      loadingCrearContacto.style.display='block'
      const creandoContacto= await crearContactoHttp(name,apellido,email,telefono,image)
       if(creandoContacto.code===201){
        const divNotieneContacto=document.getElementById('noTieneContactos')
        const divListContacto=document.getElementById('contenedor-2')
        const contactoNoEncontrado=document.getElementById('contactoNoEncontrado')
            localStorage.setItem('crear-contacto','false')
            divCrearContacto.style.display='none'
            contenedor_contactos.style.display='block'
            c_name.value=''
            c_apellido.value=''
            c_email.value=''
            c_telefono.value=''
            c_image.value=''
            agregarPagination(creandoContacto.data)
            agregarMensajeAAlerta(creandoContacto.message)

            divNotieneContacto.style.display='none'
            divListContacto.style.display='block'
            contactoNoEncontrado.display='mone'

       }
       boton_crear_contacto.style.display='block'
       loadingCrearContacto.style.display='none'
    }else{
        if(!name){
            c_name.classList.add('inputError')
        }
        if(!apellido){
            c_apellido.classList.add('inputError')
        }
        if(!email){
            c_email.classList.add('inputError')
        }
        if(!telefono){
            c_telefono.classList.add('inputError')
        }
        console.log('error')
    }

   
 
}

const crearContactoHttp=async (name,apellido,email,telefono,image)=> {
    return new Promise((resolve, reject) => {
        const data = { name,apellido,email,telefono,image };
        const token=localStorage.getItem('token')
        const limit=localStorage.getItem('limit') || 10
        // URL de tu backend
        const backendURL = `${url}/test/create/${limit}`;
        

            fetch(backendURL, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
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
                        const totalContactosSpam=document.querySelector('#totalContactos')


                        // Puedes resolver la promesa con los datos que desees
                        totalContactos=data.data.totalDocs
                        totalContactosSpam.textContent=`(${totalContactos})`
                        agregarContactosATabla(data.data.docs)
                      //  agregarPagination(data.data)
                        resolve(data);
                    }

                    console.log(data)
                })
                .catch(error => {
                    // Puedes rechazar la promesa con un mensaje de error en caso de fallo
                    reject(error);
                });
        });

         
}


const agregarPagination=(data)=>{
    const contenedorPagination=document.getElementById('contenedorPagination')
    contenedorPagination.innerHTML=''

 
    const totalPage=data.totalPages
    const page=Number(data.page)
  
    let ul =document.createElement('ul')
    ul.id='pagination'

        for (let index = 1; index <= totalPage; index++) {
        const li = document.createElement('li');
        li.textContent = index;
        li.classList.add('pagination-item');
        li.onclick=getContactoForPaginatiom
        if(index===page){
            li.classList.add('paginationSelected')
        }
        ul.appendChild(li);
      
        }
        const li2 = document.createElement('li');
        li2.innerHTML = `&laquo;`;
        li2.classList.add('pagination-item');
        li2.onclick=()=>nexPagination('regresar',page,totalPage)
        ul.insertBefore(li2, ul.firstChild);
        const li3 = document.createElement('li');
        li3.innerHTML='&raquo;'
        li3.classList.add('pagination-item');
        li3.onclick=()=>nexPagination('siguiente',page,totalPage)
        ul.appendChild(li3)
       
       
    //  
     
      contenedorPagination.append(ul)

}

const nexPagination=(accion,page,totalPage)=>{
    console.log('next')
    console.log(accion)
    if('siguiente'===accion){
        
          const pages=Number(page)+1

          if(pages<=Number(totalPage)){
            const limit=localStorage.getItem('limit') || 2

            getAllContactoHttp(pages,limit)
          }
           
        
    }else if('regresar'===accion){
        const pages=Number(page)-1
        if(pages>0){
            const limit=localStorage.getItem('limit') || 2

            getAllContactoHttp(pages,limit)
          }
           
    }
  

}



const editarContacto=(name,apellido,email,telefono,image,id)=>{
    const contenedor_contactos=document.getElementById('contenedor')
    const divUpdateContacto=document.getElementById('update-contacto')
    const formularioUupdateContacto=document.getElementById('formulario-update-contacto')
    contenedor_contactos.style.display='none'
    divUpdateContacto.style.display='block'
  
    const c_name=document.getElementById('c-name')
    const c_apellido=document.getElementById('c-apellido')
    const c_email=document.getElementById('c-email')
    const c_telefono=document.getElementById('c-telefono')
    const c_image=document.getElementById('c-image')
    

   const plantillas=`
                <div>
                <label for="name">nombre</label>
                <input value="${name}" id="u-name" name="name" type="text">
                <span id="updateNombreErrorSpam"></span>
                </div>
                <div>
                <label  for="apellido">apellido</label>
                <input value="${apellido}" id="u-apellido" name="apellido" type="text">
                <span id="updateApellidoErrorSpam"></span>
                </div>
                <div>
                <label for="email">email</label>
                <input value="${email}" id="u-email" name="email" type="text">
                <span id="updateEmailErrorSpam"></span>
                </div>
                <div>
                <label for="telefono">telefono</label>
                <input value="${telefono}" id="u-telefono" name="telefono" type="text">
                <span id="updateTelefonoErrorSpam"></span>
                </div>
                <div>
                    <label for="image">image</label>
                    <input type="file" name="image" id="c-image">
                    <span id="updateImageErrorSpam"></span>
                </div>
                   <div id="contenedorButonUpdateContacto">
                    <button onclick="updateContactoHttp('${id}')" id="botonUpdateContacto" class="mi-boton boton-success">actualizar</button>
                    <span id="loadingUpdateContacto">por favor espere...</span>
                    </div>
   `
   formularioUupdateContacto.innerHTML=plantillas
   
}

const deleteContactoHttp=async (id)=> {
    return new Promise((resolve, reject) => {

        const token=localStorage.getItem('token')
        // URL de tu backend
        const backendURL = `${url}/test/delete/${id}`;
        console.log('token: ',token)

            fetch(backendURL, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.code === 409) {
                        // Puedes manejar el caso de código 409 de alguna manera
                        // Por ejemplo, puedes rechazar la promesa con un mensaje de error
                        resolve(data);
                    }

                    if (data.code === 200) {
                        // Puedes resolver la promesa con los datos que desees
                        resolve(data);
                      
                    }

                    console.log(data)
                })
                .catch(error => {
                    // Puedes rechazar la promesa con un mensaje de error en caso de fallo
                    reject(error);
                });
        });

         
}


const getContactoForPaginatiom=async (data)=>{
    try {
        console.log('data por paginacion')
        const page=data.target.innerText
        const limitStorage=localStorage.getItem('limit') || 2
       
     // console.log(data)
     
     await   getAllContactoHttp(page,limitStorage)
        
    } catch (error) {
        console.log(error)
    }
}

const getAllContactoHttp=async (page,limit)=> {
    
    return new Promise((resolve, reject) => {

        const token=localStorage.getItem('token')
     
        // URL de tu backend
        if(token){
            const backendURL = `${url}/test/get-all/${page}/${limit}`;
           
    
                fetch(backendURL, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(response => response.json())
                    .then(async data => {
                        if (data.code === 409) {
                            // Puedes manejar el caso de código 409 de alguna manera
                            // Por ejemplo, puedes rechazar la promesa con un mensaje de error
                            resolve(data);
                        }
    
                        if (data.code === 200) {
                            const totalContactosSpam=document.querySelector('#totalContactos')
                            const divNotieneContacto=document.getElementById('noTieneContactos')
                            const divListContacto=document.getElementById('contenedor-2')
                            // Puedes resolver la promesa con los datos que desees
                            localStorage.setItem('page',data.data.page)
                            totalContactos=data.data.totalDocs
                            totalContactosSpam.textContent=`(${totalContactos})`
                            
                            if(data.data.totalDocs===0){
                                divListContacto.style.display='none'
                                divNotieneContacto.style.display='block'
                             
                            }else{
                             
                              
                                divNotieneContacto.style.display='none'
                                divListContacto.style.display='block'
                            }
                           
                            
                          await  agregarContactosATabla(data.data.docs)
                          resolve(data);
                            agregarPagination(data.data)
                           
                           
                           
                            
                        }

                    
                    })
                    .catch(error => {
                        // Puedes rechazar la promesa con un mensaje de error en caso de fallo
                        reject(error);
                    });

        }else(
            reject()
        )
       
        });

         
}

const agregarContactosATabla=async (contactos)=>{
    bodyTabla.innerHTML=''
    contactos.forEach(contacto => {
        const id=contacto._id
        const fila = document.createElement('tr');
        fila.id=id

        fila.innerHTML = `

        
        <td id="td-name-${id}">${contacto.name}</td>
        <td id="td-apellido-${id}">${contacto.apellido}</td>
        <td id="td-email-${id}">${contacto.email}</td>
        <td id="td-telefono-${id}">${contacto.telefono}</td>
        <td ><!-- Botones de acciones aquí -->
            <svg  onclick="eliminarContacto('${contacto._id}')"   xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash papelera" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg>
            
            <svg onclick="editarContacto('${contacto.name}','${contacto.apellido}','${contacto.email}','${contacto.telefono}','${contacto.image}','${contacto._id}')"  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square pincel" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
              </svg>
        
        </td>
             
        `
     
        bodyTabla.appendChild(fila);
    
    })
    


}

const saveLimitStorage=(limit)=>{
    localStorage.setItem('limit',limit)
}

const updateContactoHttp=(id)=>{
    try {
        const name=document.getElementById('u-name')
        const apellido=document.getElementById('u-apellido')
        const email=document.getElementById('u-email')
        const telefono=document.getElementById('u-telefono')
        const image=document.getElementById('u-image')
        const loadingUpdate=document.getElementById('loadingUpdateContacto')
        const botonUpdateContacto=document.getElementById('botonUpdateContacto')
        botonUpdateContacto.style.display='none'
        loadingUpdate.style.display='block'
        

        return new Promise((resolve, reject) => {
          
            const data = {
                 name:name.value,
                 apellido:apellido.value,
                 email:email.value,
                 telefono:telefono.value,
                 image:'sas',
                 id };
          
            const token=localStorage.getItem('token')
            // URL de tu backend
            const backendURL = `${url}/test/update`;
    
                fetch(backendURL, {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        botonUpdateContacto.style.display='block'
                        loadingUpdate.style.display='none'
                        if (data.code === 409) {
                            // Puedes manejar el caso de código 409 de alguna manera
                            // Por ejemplo, puedes rechazar la promesa con un mensaje de error
                            resolve(data);
                        }
    
                        if (data.code === 200) {
                          
                            // Puedes resolver la promesa con los datos que desees
                           const id=data.data._id
                           const contacto=data.data
                           const divUpdateContacto=document.getElementById('update-contacto')
                           const contenedor_contactos=document.getElementById('contenedor')
                 
                           const name=document.querySelector(`#td-name-${id}`).innerHTML=contacto.name
                           const apellido=document.querySelector(`#td-apellido-${id}`).innerHTML=contacto.apellido
                           const email=document.querySelector(`#td-email-${id}`).innerHTML=contacto.email
                           const telefono=document.querySelector(`#td-telefono-${id}`).innerHTML=contacto.telefono
                           agregarMensajeAAlerta(data.message)
                           contenedor_contactos.style.display='block'
                           divUpdateContacto.style.display='none'
                         
                           resolve(data);
                        }

                        console.log(data)
                    })
                    .catch(error => {
                        botonUpdateContacto.style.display='block'
                        loadingUpdate.style.display='none'
                        // Puedes rechazar la promesa con un mensaje de error en caso de fallo
                        reject(error);
                    });
            });
        
    } catch (error) {
        console.error('error al actualizar contacto: '.error)
    }
}

const buscarContactoEspecifico=(name)=>{
    try {
        
        return new Promise((resolve, reject) => {
            
            const token=localStorage.getItem('token')
            // URL de tu backend
            const backendURL = `${url}/test/busqueda/${name}`;
    
                fetch(backendURL, {
                    method: 'GET',   
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.code === 409) {
                            // Puedes manejar el caso de código 409 de alguna manera
                            // Por ejemplo, puedes rechazar la promesa con un mensaje de error
                            resolve(data);
                        }
    
                        if (data.code === 200) {
                          
                            // Puedes resolver la promesa con los datos que desees
                            const divContactoNoEncontrado=document.getElementById('contactoNoEncontrado')
                            const divListContacto=document.getElementById('contenedor-2')
                            agregarContactosATabla(data.data)
                            if(data.data.length<=0){
                                divListContacto.style.display='none'
                                divContactoNoEncontrado.style.display='block'

                            }else{
                                divListContacto.style.display='block'
                                divContactoNoEncontrado.style.display='none'
                            }
                            resolve(data);
                        }

                        console.log(data)
                    })
                    .catch(error => {
                        // Puedes rechazar la promesa con un mensaje de error en caso de fallo
                        reject(error);
                    });
            });
        

        
    } catch (error) {
        console.error('error al buscar contacto')
    }
}

const uploadImage=async ()=>{
    return new Promise((resolve, reject) => {
         
        try {

            const inputFile = document.getElementById('c-image');
            const file = inputFile.files[0];
          
            const formData = new FormData();
            formData.append('image', file);
    
            const backendURL = `http://localhost:3001/test-image/upload`;
            const data=JSON.stringify(Object.fromEntries(formData.entries()))
            console.log(data)
          
            fetch(backendURL, {
              method: 'POST',
              body: formData,
            })
              .then(response => response.json())
              .then(data => {
                console.log('Imagen subida exitosamente', data);
              })
              .catch(error => {
                console.error('Error al subir la imagen', error);
              });
        } catch (error) {
            console.error('error al subir imagen')
        }

    })
  
  
}
const uploadImage2 = async () => {
    return new Promise((resolve, reject) => {
        try {
            const inputFile = document.getElementById('c-image');
            const file = inputFile.files[0];

            const formData = new FormData();
            formData.append('image', file);

            const backendURL = 'http://localhost:3001/test-image/upload';

            const xhr = new XMLHttpRequest();
            xhr.open('POST', backendURL, true);

            // Puedes agregar encabezados adicionales si es necesario
            // xhr.setRequestHeader('Content-Type', 'multipart/form-data');

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        const data = JSON.parse(xhr.responseText);
                        console.log('Imagen subida exitosamente', data);
                        resolve(data);
                    } else {
                        console.error('Error al subir la imagen', xhr.statusText);
                        reject(xhr.statusText);
                    }
                }
            };

            xhr.send(formData);
        } catch (error) {
            console.error('Error al subir la imagen', error);
            reject(error);
        }
    });
}

const agregarMensajeAAlerta=(message)=>{
    try {
        const divAlerta=document.getElementById("alertSucces")
        const spanAlerta=document.getElementById('alertSpanSucces')
        const plantilla=`
        <span id="alertSpanSucces">${message}</span>
        <button onclick="cerrarAlerta()"  id="botonCerrarAlerta">
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
           <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
         </svg>
         </button>
        `
       
        divAlerta.style.display='flex'        
        divAlerta.innerHTML=plantilla

        
    } catch (error) {
        console.error('error al agregar mensaje a alarta: ',error)
    }
}

const cerrarAlerta=()=>{
    try {
        const divAlerta=document.getElementById("alertSucces")
        const botonAlerta=document.getElementById('botonCerrarAlerta')

        if(botonAlerta && divAlerta){
             divAlerta.style.display='none'
        }
        
    } catch (error) {
        console.error('error al cerrar alerta: ',error)
    }
}


const limirStorage=localStorage.getItem('limit') || 10
getAllContactoHttp(1,limirStorage).then((data)=>{
    console.log(data)
    contenedorContactos.style.display='block'
    contenedorLoading.style.display='none'
})

 const eliminarContacto=async (id)=> {
    // Lógica para editar el contacto con el email proporcionado
    console.log(`eliminar id: ${id}`);
    const eliminadoContacto=await deleteContactoHttp(id)
    console.log(eliminadoContacto)
    if(eliminadoContacto.code===200){
        // Busca la fila por su ID
     const filaEliminar = document.getElementById(id);
     if(filaEliminar){
        filaEliminar.remove()
     }

     const totalContactosSpam=document.querySelector('#totalContactos')
   
  
     // Puedes resolver la promesa con los datos que desees
     totalContactos=eliminadoContacto.data.totalDocs
     totalContactosSpam.textContent=`(${totalContactos})`
     agregarMensajeAAlerta(eliminadoContacto.message)
   

    }
}
   
