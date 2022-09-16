<?php
namespace Roland_Garros;

/**
 * Class VueEdition
 * @package Roland_Garros
 */
class VueEdition
{

/**
     * production d'une string contenant un tableau HTML représentant une Edition
     * @param EntiteEdition $Edition
     * @return string
        */
    public function getHTML4Joueur(EntiteEdition $Edition): string
    {
        $ch = "<table border='1'>
        <tr><th>nom</th><th>annee</th></tr><tr>\n";
        $ch .= "<tr><td>" . $Edition->getEditionNom() . "</td>\n";
        $ch .= "<td>" . $Edition->getEditionAnnee() . "</td>\n";
        $ch.= "</tr></table>\n";
        return $ch;
    }

    /**
     * production d'une string contenant un formulaire HTML 
     * destiné à saisir une nouvelle Edition ou à modifier une Edition existante
     * @param array $assoc
     * @return string
        */

    public function getFormulaire4Edition(array $assoc): string
    {
        $ch = "<form action='".$_SERVER['PHP_SELF']."' method='GET'>\n";
        foreach ($assoc as $col => $val) {
            if (is_array($val)) {
                $ch .= "$col : <input name='$col' type='".$val['type']
                                  ."' value='".$val['default']."' />\n";
            }
            else
                $ch .= "$col : <input type='$val' name='$col' />\n";
        }
        $ch .= "<input type='submit' name='Valider' value='Sauver'/>\n";


        return $ch."</form>\n";
    }

/**
     * production d'une string contenant une liste HTML représentant un ensemble d'Editions
     * et permettant de les modifier ou de les supprimer grace à un lien hypertexte
     * @param $tabEntiteEdition, un tableau d'instances d'EntiteEdition
     * @return string
        */
    public function getAllEdition(array $tabEntiteEdition): string
    {
        $ch = "<ul>\n";
        foreach ($tabEntiteEdition as $Edition) {
            if ($Edition instanceof EntiteEdition) {
                $ch .= "<li>".$Edition->getNom()." ";
                $ch .= $Edition->getAnnee()." ";
               
                $ch .= "<a href='?action=update&annee=".$Edition->getAnnee()."'>Modifier</a> ";
                $ch .= "<a href='?action=delete&annee=".$Edition->getAnnee()."'>Supprimer</a> ";
                $ch .= "</li>\n";
            }
        }
        return $ch."</ul>\n";
    }
}
?>
