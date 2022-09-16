<?php

namespace Roland_Garros;

class EntiteEdition
{
    protected $nom;
    protected $annee;

    private $persistant;

    /**
     * @return string
     */
    public function getNom(): string
    {
        return $this->nom;
    }

    /**
     * @param string $nom
     * @return EntiteEdition
     */
    public function setNom($nom): EntiteEdition
    {
        $this->nom = $nom;
        return $this;
    }

    /**
     * @return int
     */
    public function getAnnee(): int
    {
        return $this->annee;
    }

    /**
     * @param int $annee
     * @return EntiteEdition
     */
    public function setAnnee(int $annee): EntiteEdition
    {
        $this->annee = $annee;
        return $this;
    }

    /**
     * @return bool
     */
    public function getPersistant(): bool
    {
        return $this->persistant;
    }

    /**
     * @param bool $persistant
     * @return EntiteEdition
     */
    public function setPersistant(bool $persistant): EntiteEdition
    {
        $this->persistant = $persistant;
        return $this;
    }

    public function __toString()
    {
        return "object:EntiteJoeurs (" . $this->annee . ", " . $this->nom . ")";
    }
}