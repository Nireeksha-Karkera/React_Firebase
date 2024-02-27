import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Auth} from "./components/auth1"
import {db,auth,storage} from './config/firebase1'
import {getDocs,collection,addDoc,deleteDoc,doc,updateDoc} from 'firebase/firestore'
import {ref,uploadBytes} from "firebase/storage"

function App() {
  const [movieList,setMovieList] = useState([])

  //new movie States
  const [newMovieTitle,setNewMovieTitle]=useState("")
  const [newReleaseData,setNewReleaseDate]=useState(0)
  const [isNewMovieOscar,setNewMovieOscar]=useState(false)

  //update title state

  const [updatedTitle,setUpdatedTitle]=useState()

//File upload state
const [fileUpload,setFileUpload] = useState(null)

  const moviesCollectionRef = collection(db,"movies")
  
  const getMovieList =async() =>{
    //read the data
    //set the movie list
    try{
    const data =await getDocs(moviesCollectionRef)
    const filteredData = data.docs.map((doc)=>({
      ...doc.data(),
      id:doc.id}))
    setMovieList(filteredData)
    }catch(err){
      console.error(err)
    }
  }
  const deleteMovie=async(id) =>{
    const movieDoc =doc(db,"movies",id)
    await deleteDoc(movieDoc)

  }
  getMovieList()
  const updateMovieTitle=async(id) =>{
    const movieDoc =doc(db,"movies",id)
    await updateDoc(movieDoc,{title:updatedTitle})

  }
  getMovieList()
  const uploadFile= async() =>{
    if(!fileUpload) return
    const filesFolderRef = ref(storage,'projectFiles/${fileUpload.name}')
    try{
    await uploadBytes(filesFolderRef, fileUpload)
    }catch(err){
      console.error(err)
    }

  }
 
  
  useEffect(() =>{
    
    getMovieList()

  },[])
  const onSubmitMovie = async() => {
    try{
    await addDoc(moviesCollectionRef,{
      title:newMovieTitle,
      releaseDate:newReleaseData,
      receivedAnOscar:isNewMovieOscar,
      userId:auth?.currentUser?.uid,
  })
  // console.log({title:newMovieTitle,
  //   releaseDate:newReleaseData,
  //   receivedAnOscar:isNewMovieOscar,
  //   userId:auth?.currentUser?.uid,})
  getMovieList()
}catch(err){
  console.error(err)
}

  }
  
  return (
   
      <div className ="App">
        <Auth/>
        <div>
          <input placeholder ="Movie Title..." 
          onChange ={(e) => setNewMovieTitle(e.target.value)}/>
          <input placeholder ="Release Date..." 
          type="number"
          onChange ={(e) => setNewReleaseDate(Number(e.target.value))}/>
          <input
           type="checkbox" 
          //  checked={isNewMovieOscar}
           onChange={(e) => setNewMovieOscar(e.target.checked)}/>
          <label>Received an Oscar</label>
          <button onClick={onSubmitMovie}>Submit Movie</button>
        </div>
        <div>
          {movieList.map((movie) => (
            <div key ={movie.id}>
              <h1 style={{color:movie.receivedAnOscar?"green":"red"}}>
                {movie.title}
                </h1>
              <p>Date:{movie.releaseDate}</p>
              <button onClick ={() =>deleteMovie(movie.id)}>Delete Movie</button>

              <input 
              placeholder="new title.." 
              onChange={(e) => setUpdatedTitle(e.target.value)}/>
              <button onClick = {() => updateMovieTitle(movie.id)}>Update Title</button>
            </div>
          ))}
        </div>
        <div>
          <input 
          type="file" 
          onChange ={(e) => setFileUpload(e.target.files[0])}/>
          <button onClick ={uploadFile}>Upload file</button>
        </div>
        </div>
   
  )
}

export default App
