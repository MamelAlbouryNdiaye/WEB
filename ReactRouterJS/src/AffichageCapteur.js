import React from 'react';
import './App.css';

// Fonction permettant d'extraire les données contenues dans le fichier json
//Ces données concernent notamment : l'identifiant, le nom, le type.
function AffichageCapteur(props) {
    return (
        <div>
            <p className='bordureTab'>
                <span>Identifiant: {props.json.id}</span>
            </p>
            <p className='bordureTab'>
                <span>Nom: {props.json.name}</span>
            </p>
            <p className='bordureTab'>
                <span>Type: {props.json.type}</span>
            </p>
        </div>
    );
}

export default AffichageCapteur;
