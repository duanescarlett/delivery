import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import ls from 'local-storage'
import axios from 'axios'
 
function imgDropZone() {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    uploader(acceptedFiles)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
 
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}

async function uploader(file) {

  let formData = new FormData()

  formData.append('image', file)
  await axios({
    method: 'post',
      url: '/api/dp/' + ls.get('store'),
      headers: {
        'Authorization': 'bearer ' + ls.get('token'),
        'Content-Type': 'multipart/form-data'
      },
      data: formData
  })
  .then((res) => {
    console.log(res)
  })
  .catch((res) => {
    console.log(res)
  })
}

export default imgDropZone