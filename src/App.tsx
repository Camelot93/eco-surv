import {useEffect, useState} from 'react';
import './App.css';
import ControlSection from './components/ControlSection';
import ControlArrayTypes from './genInter'
import ImagesDisplay from './components/ImagesDisplay';
import CallFetch from './CallFetch'


const App = () => {

  const [dogs, setDogs] = useState<Object | null>(null)
  const [dogImg, setDogImg] = useState <string[] | null>(null)

  useEffect(()=>{
    CallFetch("https://dog.ceo/api/breeds/list/all").then(v=>setDogs(v))
    },[])

  function retrieveImg (array:ControlArrayTypes[]):void {
      const pathKey:String | null = array[1].value !== null ? array[0].value + "/" + array[1].value : array[0].value
      const url: RequestInfo = `https://dog.ceo/api/breed/${pathKey}/images/random/${Number(array[2].value)}`
      CallFetch(url).then(v=>v !== null && (v as string[]).length  > 0 ? setDogImg(v as string[]) : setDogImg(dogImg))
  }

    return (
      <div className="App">
      <ControlSection retrieveImgFunc={retrieveImg} data={dogs}/>
      <ImagesDisplay data={dogImg}/>
      </div>
    );
  }

export default App;
