import { render, screen } from '@testing-library/react';
import TableDisplay from '../table.display';

describe("test TableDisplay de l'historique des valeurs pour : Température Bureau et Ventilateur Ordinateur Bureau",()=>{
  let tabValeurTemperatureBureau=[23, 23, 22, 21, 23, 23, 23, 25, 25];
  for ( let i = 0; i < tabValeurTemperatureBureau.length; i++) {
    test('La valeur '+tabValeurTemperatureBureau[i]+' dans screen', () => {
      render(<TableDisplay data={tabValeurTemperatureBureau} />);
      const element = screen.getAllByText(tabValeurTemperatureBureau[i]+"°");
      expect(element).toBeTruthy();
    });
  }
  
  let tabValeurVentilateurOrdinateurBureau=[1073, 1800, 2299, 2176, 1899, 1400];
  for ( let i = 0; i < tabValeurVentilateurOrdinateurBureau.length; i++) {
    test('La valeur '+tabValeurVentilateurOrdinateurBureau[i]+' dans screen', () => {
      render(<TableDisplay data={tabValeurVentilateurOrdinateurBureau} />);
      const element = screen.getAllByText(tabValeurVentilateurOrdinateurBureau[i]+"°");
      expect(element).toBeTruthy();
    });
  }
});
