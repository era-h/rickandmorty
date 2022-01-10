import React, { useState, useEffect } from 'react';
import './App.css';
import CharacterCard from './components/characterCard';
import { CharModel } from './models/charModel';
import { EpisodeModel } from './models/episodeModel';
import { LocationModel } from './models/locationModel';

export const dataApi = [
  'https://rickandmortyapi.com/api/character/',
  'https://rickandmortyapi.com/api/location/',
  'https://rickandmortyapi.com/api/episode/'

]

function App() {

  const [char, setChar] = useState<CharModel[]>([])
  const [location, setLocation] = useState<LocationModel[]>([])
  const [episode, setEpisode] = useState<EpisodeModel[]>([])
  const [error, setError] = useState<boolean>(false)

  const getData = async () => {
    try {
      const response = await Promise.all(
        dataApi.map(url => fetch(url).then(res => res.json()))
      )
      setChar(response[0].results)
      setLocation(response[1].results)
      setEpisode(response[2].results)
    } catch (error) {
      setError(true)
    }
  }

  useEffect(() => {
    getData()
  }, [])


  return (
    <div className="App">
      <h1 className='h1-style'>Rick and Morty Gallery</h1>
      <div className="App-header">
       { error ? "Come again later" :
        char.map((character: CharModel) =>
          <CharacterCard key={character.id} locations={location} episode={episode} char={character} />
        )
        }
      </div>
    </div>
  );
}

export default App;
