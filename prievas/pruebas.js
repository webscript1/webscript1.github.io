'use strict'


console.log('laqueso')
   
document.addEventListener('DOMContentLoaded', async ()=> {
    const imageImpur=document.getElementById('imagefile')

    imageImpur.addEventListener('change',(e)=>{
        e.preventDefault()
        console.log('imagen subina')
        uploadImagejquery()
        e.stopPropagation();
    })

})


const uploadImage=async ()=>{
  
         
        try {

            const inputFile = document.getElementById('imagefile');
            const file = inputFile.files[0];
          
            const formData = new FormData();
            formData.append('image', file);
    
            const backendURL = `http://localhost:3001/test-image/upload`;
            const data=JSON.stringify(Object.fromEntries(formData.entries()))
            console.log(data)
          
            fetch(backendURL, {
              method: 'POST',
              body: data,
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


  
}

const uploadImagejquery= async () => {
    return new Promise((resolve, reject) => {
        try {
            const inputFile = document.getElementById('imagefile');
            const file = inputFile.files[0];

            const formData = new FormData();
            formData.append('image', file);

            const backendURL = 'http://localhost:3001/test-image/upload';

            $.ajax({
                url: backendURL,
                type: 'POST',
                data: formData,
                processData: false,  // Evita que jQuery procese los datos
                contentType: false,  // Evita que jQuery establezca el encabezado Content-Type
                success: function(data) {
                    console.log('Imagen subida exitosamente', data);
                    resolve(data);
                },
                error: function(xhr, status, error) {
                    console.error('Error al subir la imagen', error);
                    reject(error);
                }
            });
        } catch (error) {
            console.error('Error al subir la imagen', error);
            reject(error);
        }
    });
}

