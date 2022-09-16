import React from 'react';
import './App.css';
import TableDisplay from './table.display';
import pic from '../src/assets/door-close.jpeg';

//Fonction permettant d'extraire les valeurs contenues dans data
const t = (y) => {
    //Nous recuperons les proprietes enumerable de l'objet sous forme de [clee, valeur]
    for (const [country, capital] of Object.entries(y))
    {
        //Animation pour la porte du garage
        if(capital ==="Porte du Garage")
        {
            //Dans le cas ou c est la porte du garage, nous affichons cette image
            return <div>
                        <img src={pic} width="100px" alt="door open" />
                   </div>
        }

        //Sinon
        else
        {
            //Nous reprenons le même procedé sur la valeur du tableau
            for(const [identifiant,valeur] of Object.entries(capital))
            {
                //Nous nous interessons aux valeurs du tableau contenant les données des températures
                if(identifiant==="values")
                {
                    //Nous affichons les differentes valeurs du tableau 
                    return <div>
                            <div> 
                                <p><b>
                                    Valeur actuelle :
                                </b></p>
                                <p className='idTempActuelle'><h2>
                                    {valeur[0]}&deg;
                                </h2></p>
                            </div> 
                            <div>
                                {<TableDisplay data={valeur} />}
                            </div>
                        </div>;
                }
            }
        }
    }
}

//Fonction faisant appelle a t() pour l'affichage des valeurs du tableau des temperature
function AfficheHistorique(props) {
    
    return (
        <div>
           <p>
               {
                   t(props.json)
               }
           </p>
            
        </div>
  
    );
}

export default AfficheHistorique;
