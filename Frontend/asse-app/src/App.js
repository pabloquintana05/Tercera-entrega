import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Header from "./Components/Header"
import Nav from "./Components/Nav"
import Footer from './Components/Footer'
import Main from './Components/Main'
import Aside from './Components/Aside'
import Chat from './Pages/Chat'
import Medicamentos from './Pages/Medicamentos'
import Login from './Pages/Login'
import SolicitudVideo from './Pages/SolicitudVideo'
import Pendientes from './Pages/Pendientes'




function App() {
  
  
  //socket.emit('conectado', "Hola desde Cliente");
  
  return (
    <div className="Contenedor">
      
      <BrowserRouter>
      
       
       <Switch>
       
         <Route exact path="/">
           <Header tipo="index"  />
           <Nav />
           <Main />
           <Aside />
         </Route>
         <Route path="/Medicamentos">
            <Header />
            <Nav />
            <Medicamentos />
         </Route>
         <Route path="/SolicitudVideo">
           <Header />
           <Nav />
           <SolicitudVideo />
         </Route>
         <Route path="/LoginF">
           <Header />
           <Nav />
           <Login />
         </Route>
         <Route path="/Chat">
           <Header />
           <Nav /> 
           <Chat />
          </Route> 
          <Route path="/Pendientes"> 
           <Header /> 
           <Nav /> 
           <Pendientes />
          </Route>
          
          
           
         

       </Switch>
       <Footer />
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;

//Aside ver le tema twitter react-twitter-embed y va el mapa
//en main va el formulario en principio para ingreso al chat
