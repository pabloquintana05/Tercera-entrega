import React from 'react';
import iframe from 'react-iframe';
import { Timeline } from 'react-twitter-widgets';
import '../Components/Aside.css';

export default function Aside() {
    return (
        <aside className="contenido-aside">
            <div>
                <Timeline 
                   dataSource={{
                       sourceType: 'profile',
                       screenName: 'ASSEcomunica'
                   }}
                   options={{
                       height: '300px',
                       width: '480px'
                   }}
                />           
                
            </div>
            <div>
                <iframe title='myframe' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3289.757842857095!2d-57.83257708520045!3d-34.45829445732424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a3127e9182f58b%3A0xfb56b7773e30986!2sHospital%20Colonia%20-%20Doctor%20Samuel%20Bert%C3%B3n!5e0!3m2!1ses-419!2suy!4v1618600902199!5m2!1ses-419!2suy" style={{width:"370px", height:"300px"}} ></iframe>
            </div>    
        </aside>
    )
}
