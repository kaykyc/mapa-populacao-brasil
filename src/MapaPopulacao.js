import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import axios from 'axios';

function MapaPopulacao() {
  const [dadosPopulacao, setDadosPopulacao] = useState({});
  const [mapaInicializado, setMapaInicializado] = useState(false);

  useEffect(() => {
    console.log('Inicializando o mapa');
    if (!mapaInicializado) {
      axios.get('http://seuservidor.com/obter_dados_populacao.php')
        .then(response => {
          setDadosPopulacao(response.data);
          setMapaInicializado(true);
        })
        .catch(error => {
          console.error('Erro ao obter os dados da população:', error);
          alert('Erro ao carregar o mapa. Tente novamente mais tarde.');
        });
    }
  }, [mapaInicializado]);

  

  const coordenadas = {
    "Acre": { lat: -9.0238, lon: -70.812 },
    "Alagoas": { lat: -9.5713, lon: -36.7819 },
    "Amapá": { lat: 0.902, lon: -52.003 },
    "Amazonas": { lat: -3.4168, lon: -65.8561 },
    "Bahia": { lat: -12.5797, lon: -41.7007 },
    "Ceará": { lat: -5.4984, lon: -39.3206 },
    "Distrito Federal": { lat: -15.788, lon: -47.9292 },
    "Espírito Santo": { lat: -19.1834, lon: -40.3089 },
    "Goiás": { lat: -15.827, lon: -49.8362 },
    "Maranhão": { lat: -4.9609, lon: -45.2744 },
    "Mato Grosso": { lat: -12.6819, lon: -56.9211 },
    "Mato Grosso do Sul": { lat: -20.7722, lon: -54.7852 },
    "Minas Gerais": { lat: -18.5122, lon: -44.555 },
    "Pará": { lat: -3.4653, lon: -52.8696 },
    "Paraíba": { lat: -7.24, lon: -36.782 },
    "Paraná": { lat: -25.2521, lon: -52.0215 },
    "Pernambuco": { lat: -8.8137, lon: -36.9541 },
    "Piauí": { lat: -7.7183, lon: -42.7289 },
    "Rio de Janeiro": { lat: -22.9068, lon: -43.1729 },
    "Rio Grande do Norte": { lat: -5.7945, lon: -36.9541 },
    "Rio Grande do Sul": { lat: -30.0346, lon: -51.2177 },
    "Rondônia": { lat: -10.8301, lon: -63.3428 },
    "Roraima": { lat: 2.7376, lon: -62.0751 },
    "Santa Catarina": { lat: -27.5954, lon: -48.548 },
    "São Paulo": { lat: -23.5505, lon: -46.6333 },
    "Sergipe": { lat: -10.9472, lon: -37.0731 },
    "Tocantins": { lat: -10.1753, lon: -48.2982 }
  };

  return (
    <div>
      <MapContainer center={[-15.788, -47.9292]} zoom={4} style={{ height: '600px' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {Object.entries(dadosPopulacao).map(([estado, populacao]) => (
          <CircleMarker
            key={estado}
            center={[coordenadas[estado].lat, coordenadas[estado].lon]}
            radius={populacao / 100000} // Ajuste o divisor conforme necessário
            fillOpacity={0.7}
            color="blue"
          >
            <Popup>{`${estado}: ${populacao.toLocaleString('pt-BR')} habitantes`}</Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapaPopulacao;


    