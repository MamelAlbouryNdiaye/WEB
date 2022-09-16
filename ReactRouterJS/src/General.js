import Saisie from './Saisie';
import Selection from './Selection';
import AffichageCapteur from './AffichageCapteur';
import React, {useEffect, useState} from "react";
import {
    Routes,
    Route
} from "react-router-dom";
import './App.css';
import AfficheHistorique from './AfficheHistorique';
import pic from '../src/assets/door-open.jpeg';


function General() {
    //À chaque fois que l'input (situé dans saisie) est modifié, cela va appeler
    //la méthode updateURL qui modifie le state de General et donc fetch le fichier

    const [input, setInput] = useState(''); //le texte saisi dans le champ de Saisie
    const [data, setData] = useState(''); //le fichier json que l'on obtient avec input
    const [selection, setSelection] = useState([]); //le capteur qui est actuellement affiché
    const updateURL = e => {setInput(e.target.value);}
    const changerSelection = tab => {setSelection(tab); console.log(tab);}

    useEffect(() => {
        fetch(input)
        .then(function(response) {
            return response.json()
        }).then(function(json) {
            //console.log('parsed json', json)
            if (!jsonEquals(json, data)) //Si ce n'est pas la même donnée qu'avant, l'actualise (évite les boucles infinies)
                setData(json);
        }).catch(function(ex) {
            //console.log('parsing failed', ex)
            setData('');
            setSelection([]);
        });
    });

    return (
        <div> 
            
            <h1 className="barre" style={{ backgroundImage: `url(${pic})` }}>Welcome</h1>
            <h4>Entrez dans la barre de recherche l'URL suivante : https://pigne.org/teaching/sensors_data.json</h4> 
            <Saisie update={updateURL} />
            <Selection json={data} selectionner={changerSelection}/>
            <AffichageCapteur json={selection}/>
            <AfficheHistorique json={selection}/>

            <Routes>
                <Route path={`/${selection.name}`} element={<AffichageCapteur json={selection}/>} />
            </Routes>
        </div>
    );
}

//renvoie l'identifiant.
function jsonEquals(object1, object2){
    if (object1.length !== object2.length)
        return false;

    for (let i in object1)
        if (!object2.hasOwnProperty(i))
            return false;
    return true;
}

export default General;
