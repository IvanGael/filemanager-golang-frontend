import { useState } from 'react';

import FileDropZone from './fileDropZone';

import FileService from './fileService';

function App() {

  const fileService = new FileService();


  const [selectedFiles, setSelectedFiles] = useState([]);

  const [search, setSearch] = useState("");

  const [fileContent, setFileContent] = useState(null);

  const handleFilesSelected = (files) => {
    setSelectedFiles(files);
  };

  const handleUpload = () => {
    if (selectedFiles.length !== 0) {
      fileService.uploadFile(selectedFiles[0])
        .then((data) => {
          alert(data);
          setSelectedFiles([]);
        }).catch((error) => {
          console.error(error);
        });
    } else {
      alert('Veuillez sélectionner un fichier');
    }
  }


  const handleSearchFile = () => {
    fileService.readFile(search)
      .then((response) => {
        console.log(response.content);
        setFileContent(response.content);
      })
      .catch((error) => {
        alert(error.response.data);
      });
  }

  const handleDeleteFile = () => {
    fileService.deleteFile(search)
      .then((data) => {
        setSearch("");
        setFileContent(null);
        alert(data);
      })
      .catch((error) => {
        alert(error.response.data);
      });
  }


  // Function to convert array of bytes to data URL
  // const arrayBufferToBase64 = (buffer) => {
  //   let binary = '';
  //   const bytes = new Uint8Array(buffer);
  //   for (let i = 0; i < bytes.byteLength; i++) {
  //     binary += String.fromCharCode(bytes[i]);
  //   }
  //   return 'data:image/png;base64,' + btoa(binary);
  // }

  function getMimeTypeFromBase64(base64String) {
    // Extract the data part of the base64 string
    const dataPart = base64String.split(',')[0];

    // Extract the MIME type
    const mimeTypeMatch = dataPart.match(/:(.*?);/);
    if (mimeTypeMatch && mimeTypeMatch[1]) {
      return mimeTypeMatch[1];
    }

    return null;
  }



  return (
    <div >
      <div style={{ margin: 20 }}>
        <FileDropZone allowMultiple={false} onFilesSelected={handleFilesSelected} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
        {
          selectedFiles.length !== 0 &&
          (
            selectedFiles[0].type === "application/pdf" ?
              <iframe src={URL.createObjectURL(selectedFiles[0])} width={"200px"} height={"200px"} /> :
              <img
                src={URL.createObjectURL(selectedFiles[0])}
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                alt='selected file'
              />

          )
        }
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
        <button
          style={{
            padding: 5,
            backgroundColor: 'lightseagreen',
            borderRadius: 5,
            width: '200px',
            height: '50px',
            cursor: 'pointer',
            borderStyle: 'dotted',
            color: 'white',
            fontSize: '18',
            fontWeight: 'bold'
          }}
          onClick={handleUpload}
        >
          Upload
        </button>
      </div>

      <div style={{ marginTop: 20, padding: 5, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <input
            placeholder='Rechercher un fichier'
            style={{ padding: 10, width: '300px', borderRadius: 10 }}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button
            style={{
              padding: 5,
              backgroundColor: 'lightseagreen',
              borderRadius: 10,
              width: '100px',
              height: '42px',
              cursor: 'pointer',
              borderStyle: '',
              color: 'white',
              fontSize: '18',
              fontWeight: 'bold'
            }}
            onClick={handleSearchFile}
            disabled={search === ""}
          >
            Rechercher
          </button>
        </div>
        <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {
            fileContent != null &&
            <>
              {
                getMimeTypeFromBase64(fileContent) === "application/pdf" ?
                  <iframe
                    src={`data:application/pdf;base64,${fileContent}`}
                    width={"200px"}
                    height={"200px"}
                  /> :
                  <img
                    src={`data:image/png;base64,${fileContent}`}
                    style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                    alt="File Content"
                  />
              }

              <button
                style={{
                  padding: 5,
                  backgroundColor: 'red',
                  borderRadius: 5,
                  width: '30px',
                  height: '30px',
                  cursor: 'pointer',
                  color: 'white',
                  fontSize: '18',
                  fontWeight: 'bold',
                  marginLeft: 10
                }}
                disabled={search === ""}
                onClick={handleDeleteFile}
              >
                X
              </button>
            </>

          }


        </div>

      </div>

    </div>
  );
}

export default App;
