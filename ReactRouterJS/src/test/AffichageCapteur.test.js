import { render, screen } from '@testing-library/react';
import AffichageCapteur from '../AffichageCapteur';
import { useState ,useEffect} from 'react'
import { Link } from 'react-router-dom';

describe("test AffichageCapteur",()=>{

    let data=   [
        {
          "id": 1234,
          "name": "Température Bureau",
          "type": "TEMPERATURE",
          "data": {
            "values": [23, 23, 22, 21, 23, 23, 23, 25, 25],
            "labels": [
              "2021-01-19T08:00:00.000Z",
              "2021-01-19T09:00:00.000Z",
              "2021-01-19T10:00:00.000Z",
              "2021-01-19T11:00:00.000Z",
              "2021-01-19T12:00:00.000Z",
              "2021-01-19T13:00:00.000Z",
              "2021-01-19T14:00:00.000Z",
              "2021-01-19T15:00:00.000Z",
              "2021-01-19T16:00:00.000Z"
            ]
          }
        },
        {
          "id": 10245,
          "name": "Porte du Garage",
          "type": "DOOR",
          "data": {
            "value": 0
          }
        },
        {
          "id": 2222,
          "name": "Ventilateur Ordinateur Bureau",
          "type": "FAN_SPEED",
          "data": {
            "values": [1073, 1800, 2299, 2176, 1899, 1400],
            "labels": [
              "2021-01-19T10:00:00.000Z",
              "2021-01-19T10:05:00.000Z",
              "2021-01-19T10:10:00.000Z",
              "2021-01-19T10:15:00.000Z",
              "2021-01-19T10:20:00.000Z",
              "2021-01-19T10:25:00.000Z"
            ]
          }
        }
      ];
      test('Récupération de données avec fetch', async () => {
        const response = await fetch("https://pigne.org/teaching/sensors_data.json");
        const json = response.ok ? await response.json(): "";
        expect(JSON.stringify(json)).toBe(JSON.stringify(data));
        render(<AffichageCapteur json="https://pigne.org/teaching/sensors_data.json"/>);
      });
});
