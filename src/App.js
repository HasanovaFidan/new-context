import { createBrowserRouter } from 'react-router-dom';
import './App.css';
import DataContexs from './context';
import { RouterProvider } from 'react-router';
import ROOT from './Router/index.routes';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
function App() {
  const root=createBrowserRouter(ROOT)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [orginal,setOrginal]=useState([])
  const[basketItems,setBasketItems]=useState(localStorage.getItem("basketItems")? JSON.parse(localStorage.getItem("basketItems")):[])


  
  useEffect(() => {
    axios.get("https://dummyjson.com/products").then(res => {
      setData(res.data.products);
      setOrginal(res.data.products);
      console.log(res.data.products)
      setLoading(false);
    }).catch(err => {
      setError(err);
      setLoading(false);
    });
  }, []);


  const values={
    data,
    setData,
    loading,
    setLoading,
    error,
    setError,
    orginal,
    setOrginal,
    basketItems,
    setBasketItems
  }
  return (

    <div className="App">
     <DataContexs.Provider value={values}>
     <RouterProvider router={root}/>
     </DataContexs.Provider>
    </div>
  );
}

export default App;
