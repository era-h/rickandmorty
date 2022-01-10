import React from 'react'
import { CharModel } from '../models/charModel'
import { EpisodeModel } from '../models/episodeModel'
import { LocationModel } from '../models/locationModel'

interface CharacterPopUpProps {
    char: CharModel
    locations: LocationModel[]
    episode: EpisodeModel[]
    handleClick: () => void
}

const CharacterPopUp: React.FC<CharacterPopUpProps> = (props) => {
    const { char, locations, episode, handleClick } = props

    const location = locations?.find((element: LocationModel) => element.id === char.id)

    const findEpisodes = () => {
        let episodeName: Array<string> = []
        episode?.map((episode: EpisodeModel) =>
        (
           episode?.characters.map((character: string) => {
                if (character === char.url) {
                    return episodeName.push(episode.name)
                }
            })
        ))
        return episodeName
    }

    return (
        <div className='popup'>
            <div className='popup-inner' key={char?.id}>
                <div className='photo-container'>
                    <img className='charcter-photo' src={char?.image} alt="charackter name"/>
                    <span className='name-style'>{char?.name}</span>
                </div>
                <div>
                    <button className="close-button" onClick={() => handleClick()} >
                        <span className='span-x'>&times;</span>
                    </button>
                    <p>
                        <b>Species:</b>
                        {char?.species}
                    </p>
                    <p>
                        <b>Gender:</b>
                        {char?.gender}
                    </p>
                    <p>
                        <b>Origin:</b>
                        {location && location.name}
                    </p>
                    <p>
                        <div>Dimension:</div>

                        {location && location.dimension}
                    </p>
                    <p>
                        <b>Number of residents:</b>
                        {location && location?.residents.length}
                    </p>


                </div>
                <div>
                <p style={{whiteSpace:'nowrap'}}>
                        <b>Episodes:</b>
                        {findEpisodes().length !==0 ? <ul aria-label='episodes'> {findEpisodes().map((name:string)=><li className='list'>{name}</li>)} </ul>: "No episodes found"}
                    </p>
                </div>

            </div>
        </div>
    )
}

export default CharacterPopUp;