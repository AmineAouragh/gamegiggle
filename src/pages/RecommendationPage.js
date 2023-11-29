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
        <div className={`w-full h-full bg-yellow-300 flex flex-col justify-center items-center ${clicked ? 'absolute' : 'absolute'} py-4`}>
            <h1 className="text-6xl text-blue-600 font-bold mb-10">GameGiggle 🎮</h1>
            <h2 className="text-4xl text-blue-600 mb-10 font-semibold">
                A video game recommendation platform for gamers
            </h2>
            {
                clicked == false &&
                <>
                <h3 className="text-3xl mb-10 font-semibold">
                  Hurry! Click for Your Next Gaming Adventure!
                </h3>
                <button type="button" onClick={fetchGames} className="shadow-lg transition duration-300 hover:scale-110 hover:shadow-blue-500 hover:bg-blue-500 font-bold text-lg font-bold rounded-lg bg-blue-600 text-gray-50 px-5 py-4">Game me up!</button>  
                </>            
           }
            
            {
                clicked &&
                <div className="flex flex-col items-center">
                    {
                        <div id={recommendation.id} className="border-4 border-blue-600 rounded-lg">
                            <p className="px-5 py-3 bg-blue-600 text-yellow-300 font-bold text-center text-4xl">{recommendation.name}</p>
                            <Image className="rounded-bl-lg rounded-br-lg" alt={recommendation.name} src={recommendation.background_image} width={800} height={100} />
                            
                        </div>  
                    }
                    <button type="button" onClick={fetchGames} className="shadow-lg mt-8 transition duration-300 hover:scale-110 hover:shadow-blue-500 hover:bg-blue-500 font-bold text-lg font-bold rounded-lg bg-blue-600 text-gray-50 px-5 py-4">Try another gem!</button>  
                    <p className="text-blue-800 font-bold text-center absolute bottom-2">Thanks to RAWG.io for providing the data used in GameGiggle</p>
                </div> 
            }     
        </div>
    )
}