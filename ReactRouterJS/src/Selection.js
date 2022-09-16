import React from 'react';
import {Link} from "react-router-dom";
// import AffichageCapteur from './AffichageCapteur';
// import {
//     Route
// } from "react-router-dom";

//fonction gerant l'extraction des données pour la sélection dans la barre  de menu

function Selection(props) {
    let rows = [];

    for (const ligne of props.json) {
        //console.log(ligne.data.values.map((id, data) => {console.log(id+" : " + data)}));

        rows.push(
            <Link
                onClick={() => props.selectionner(ligne)}
                key={`link${ligne.name}`}
                to={`/${ligne.name.toLowerCase().replaceAll(" ", "_").normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`} className='titleName'>
                {ligne.name}
            </Link>
        );
    }

    return rows;
}

export default Selection;
