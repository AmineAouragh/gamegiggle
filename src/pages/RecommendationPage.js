import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function RecommendationPage() {

    const [ games, setGames ] = useState([])
    const [ recommendation, setRecommendation ] = useState([])
    const [ clicked, setClicked ] = useState(false)
    const RAWG_API_KEY = "b65bd6cce1a04cf9b0f620274e44eef5"


        const fetchGames = async () => {
            setClicked(true)
            try {
                const response = await fetch(`https://api.rawg.io/api/games?key=${RAWG_API_KEY}&page=1`)
                const data = await response.json()
                setGames(data.results)
                const randomGame = data.results[Math.floor(Math.random() * data.results.length)]
                setRecommendation(randomGame)
                console.log(data.results)
            } catch(error) {
                console.error("Error occured while fetching games: ", error)
            }
        }
     
    return (
        <div className={`w-full h-full flex flex-col justify-center items-center ${clicked ? 'relative' : 'absolute'} my-4`}>
            <h1 className="text-6xl text-blue-600 font-bold mb-10">GameGiggle</h1>
            <h2 className="text-4xl mb-16 font-semibold">
                Hurry! Click for Your Next Gaming Adventure!
            </h2>
            <button type="button" onClick={fetchGames} className="shadow-lg font-bold rounded-lg bg-blue-800 text-gray-50 px-3 py-2">Get random recommendation</button>  
            {
                clicked &&
                <div className="grid mt-8 grid-columns-2 grid-rows-5 gap-4">
                    {
                        <div id={recommendation.id}>
                            <Image className="rounded-lg" alt={recommendation.name} src={recommendation.background_image} width={800} height={100} />
                            <p className="text-center text-4xl">{recommendation.name}</p>
                        </div>  
                    }
                </div>
                
            }     
        </div>
    )
}