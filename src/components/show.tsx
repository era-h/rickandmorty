import React, { useState } from 'react'
import { CharModel } from '../models/charModel'
import { EpisodeModel } from '../models/episodeModel'
import { LocationModel } from '../models/locationModel'
import CharacterPopUp from './card'

interface CharacterCardProps {
    char:CharModel
    locations:LocationModel[]
    episode:EpisodeModel[]
}

const CharacterCard: React.FC<CharacterCardProps> = (props) => {
    const {char,locations,episode}= props
    const [showPopup, setShowPopup]= useState<boolean>(false)
    const handleClick = () =>{
        setShowPopup(!showPopup)
      }
      
    return (
        <div >
            <div  key={char.id}>
            <img src={char.image} onClick={handleClick} alt="images"/>
            {showPopup && 
            <CharacterPopUp  char={char}  locations={locations} episode={episode} handleClick={handleClick}/>}
            </div>
        </div>
    )
}

export default CharacterCard;