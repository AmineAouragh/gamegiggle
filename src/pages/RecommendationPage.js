import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import { rawg_api_key } from './api/rawg'


export default function RecommendationPage() {

    const [ games, setGames ] = useState([])
    const [ recommendation, setRecommendation ] = useState([])
    const [ clicked, setClicked ] = useState(false)


    const fetchGames = async () => {
        setClicked(true)
        try {
            const response = await fetch(`https://api.rawg.io/api/games?key=${rawg_api_key}&page=1`)
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
        <div className={`w-full h-full flex bg-yellow-300 flex-col justify-center items-center ${clicked ? 'absolute' : 'absolute'} py-4 px-2`}>
            <Head>
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="icon" href="/gamegiggle-favicon.ico" />
              <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500&family=Rubik+Doodle+Shadow&display=swap" rel="stylesheet" />
              <title>GameGiggle - THE video game recommendation platform for real gamers</title>
              <meta name="description" content="GameGiggle is your go-to platform for discovering new video game gems. Join a community of passionate gamers and elevate your playtime today." />
              <meta name="google-site-verification" content="UM4vPZXbpjsZHjRTVAc4o9s7vl9Q6TZcmc5zUOta_lQ" />
            </Head>
            <h2 className="text-2xl lg:text-4xl text-gray-800 font-poppins font-bold mb-10">GameGiggle</h2>
            {
                clicked == false &&
                <>
                  <h1 className="text-4xl md:text-6xl font-poppins xl:text-8xl w-full xl:w-1/2 mb-8 text-center text-gray-800 font-extrabold">
                    THE video game recommendation platform for <span className="bg-gray-800 text-yellow-300 inline-flex p-2">real gamers.</span>
                  </h1>
                  <h3 className="text-xl lg:text-3xl font-poppins text-center mb-6 font-semibold">
                    Don't know what to play? Hurry!
                  </h3>
                  <p className="text-4xl mb-4">👇</p>
                  <button type="button" onClick={fetchGames} className="font-bold transition font-poppins duration-1000 rounded-3xl text-2xl lg:text-4xl hover:scale-110 hover:bg-gray-800 shadow-lg shadow-gray-800 bg-gray-800 text-yellow-300 px-5 py-4">Find your game</button>  
                </>   
            }
            
            {
                clicked &&
                <>
                    <p className="text-2xl mb-8 font-semibold font-poppins">recommends... </p>
                    <div id={recommendation.id} className="border-4 border-gray-800 w-full sm:w-2/3 lg:w-1/2 xl:w-1/3 rounded-xl">
                        <p className="text-center font-poppins px-5 py-3 rounded-tr-lg rounded-tl-lg bg-gray-800 text-yellow-300 font-bold text-4xl">{recommendation.name}</p>
                        <Image className="rounded-br-lg rounded-bl-lg" alt={recommendation.name} src={recommendation.background_image} width={800} height={100} />
                    </div> 
                    <button type="button" onClick={fetchGames} className="mt-8 font-poppins shadow-lg font-bold rounded-3xl text-3xl transition duration-1000 hover:scale-110 hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-600 bg-gray-800 text-yellow-300 px-5 py-3">Try a new gem!</button>
                </> 
                
            } 
            <p className="mt-12 text-center">Thanks to <Link href="https://rawg.io"><span className="text-blue-700 font-semibold">rawg.io</span></Link> for providing the data used in GameGiggle</p>    
        </div>
    )
}