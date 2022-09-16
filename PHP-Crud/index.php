<?php


use Roland_Garros\VueEdition;

include "MyPDO.php";
include "vardsn.php";
include "VueEdition.php";
include "EntiteEdition.php";

function getDebutHTML(): string
{
    return "<!doctype html>
<html lang=\"fr\">
<head>
  <meta charset=\"utf-8\">
  <title>Tournoi Roland Garros</title>
    <!--  <link rel=\"stylesheet\" href=\"style.css\"> -->
    <!--  <script src=\"script.js\"></script> -->
</head>
<body>
";
}

function getFinHTML(): string
{
    return "<!-- contenu -->
</body>
</html>
";
}

//session_start();

// initialisation de la connexion via l'instance de MyPDO
try {
    $myPDOEdition = new MyPDO('mysql', $_ENV['host'], $_ENV['db'],
        $_ENV['user'], $_ENV['password'], 'Edition');
    // print_r($myPDOEdition);
} catch (PDOException $e) {
    print "Erreur !: " . $e->getMessage() . "<br/>";
    die();
}

// initialisation du générateur de vues HTML
$vue = new VueEdition();

// initialisation des chaînes à afficher
$contenu = "";
$message = "";

// traitement des différentes actions possibles

if (isset($_GET['action']))
    switch ($_GET['action']) {
        case 'read':
            $edition = $myPDOEdition->get('annee', $_GET['annee']);
            $contenu .= $vue->getHTML4Edition($edition);
            $_SESSION['etat'] = 'lecture';
            break;
        case 'create':
            $nbEditions = $myPDOEdition->count();
            $contenu .= $vue->getFormulaire4Edition(array('annee' => array('type' => 'number', 'default' => $nbEditions + 1), 'annee' => 'number', 'nom' => 'text'));
            $_SESSION['etat'] = 'création';
            break;
        case 'update':
            $edition = $myPDOEdition->get('annee', $_GET['annee']);
            $contenu .= $vue->getFormulaire4Edition(array('nom' => array('type' => 'text', 'default' => $edition->getNom()),
                'annee' => array('type' => 'number', 'default' => $edition->getAnnee())));
            $_SESSION['etat'] = 'modification';
            break;
        case 'delete':
            $myPDOEdition->delete(array('annee' => $_GET['annee']));
            $_SESSION['etat'] = 'suppression';
            break;
        default:
            $message .= "<p>Action " . $_GET['action'] . " non implémentée.</p>\n";
    }
//<input type="number" min="1900" max="2099" step="1" value="2016" />

else
    if (isset($_SESSION['etat']))
        switch ($_SESSION['etat']) {
            case 'création':
                $myPDOEdition->insert(array('nom' => $_GET['nom'], 'annee' => $_GET['annee']));
                $_SESSION['etat'] = 'créé';
                break;
            case 'modification':
                $myPDOEdition->update('annee', array('nom' => $_GET['nom'], 'annee' => $_GET['annee']));
                $_SESSION['etat'] = 'modifié';
                break;
            case 'suppression':
                $_SESSION['etat'] = 'supprimé';
                break;
            case 'créé':
            case 'modifié':
            case 'supprimé':
            default:
                $_SESSION['etat'] = 'neutre';
        }


// affichage du nombre total de edition :
$nbLivres = $myPDOEdition->count();
$message .= "<p>La table Livre contient ".$nbLivres." enregistrements.</p>\n";

// sélection/modification/suppression/ d'un edition

$contenu .=
    "<form action='?' method='GET'>
            <select name='action'>
            <option value='read'>Lire</option>
            <option value='update'>Modifier</option>
            <option value='delete'>Supprimer</option>
</select>
<input type='number' min='1' max='' name='annee'/>
<input type='submit' name='envoi' value='Go' />
</form>\n";


// création d'un nouveau edition
// Attention suppose que le nombre de edition présent correspond au dernier identifiant attribué...
$contenu .= "<p><a href='?action=create'>Créer edition ";
$contenu .= 1;
$contenu .= "</a> </p>";

// récupération et affichage de la liste des editions avec liens vers édition/suppresion

$lesEditions = $myPDOEdition->getAll();
$contenu .= $vue->getAllEdition($lesEditions);

// Production de la page HTML
echo getDebutHTML();
echo $message;
echo $contenu;
echo getFinHTML();