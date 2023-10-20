import react, { useState, useEffect } from "react";
import axios from "axios";
import './App.modules.css';
import deleteIcon from './assets/delete.png';
const BASE_URL = "http://localhost:5000/api";
function App() {
  const [docs, setDocs] = useState(null);

  const [doc, setDoc] = useState("");

  useEffect(()=>{
    getDocs();
  }, []);

  const getDocs = () => {
    axios.get(`${BASE_URL}/documents`)
    .then((res)=>setDocs(res.data))
    .catch((err) => console.error(err));
  };

  const handleAddDoc = () => {
    axios.post(`${BASE_URL}/documents`, {
      title: "New doc",
    })
    .then((res) => {
      setDocs([...docs, res.data]);
      setDocs("");
    })
  }

  const handleDeleteDoc = (id) => {
    axios.delete(`${BASE_URL}/documents/${id}`)
    .then((res) => 
      setDocs(docs.filter((doc)=> doc._id!==res.data._id))
    ).catch((err) => console.error(err));
  };

  return (
    <div className="App">
      <div className='document-input-wrapper'>
        <input
        className='doc-input-bar'
        value={docs}
        onChange={(e)=> setDoc(e.target.value)}
        placeholder='Add a new document'
        />
        <div className='upload-button' onClick={handleAddDoc}>
          Upload
        </div>
        <div className='docs-list'>
          {!docs || !docs.length?(
            <h3 style={{ textAlign: "center" }}> No docs!</h3>
          ): (
            docs.map((doc) => (
              <div className='doc' key={doc._id}>
                <span>{doc.title}</span>
                <span className='delete' onClick={() => handleDeleteDoc(doc._id)}>
                  <img src={deleteIcon} alt='delete' height='20px' width='20px'/>
                </span>
                </div>
            ))

          )}
        </div>
      </div>
    </div>
  );
}

export default App;
