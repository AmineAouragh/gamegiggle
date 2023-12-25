import Head from 'next/head'
import { useState, useEffect } from 'react'

export default function JustForYou() {

    const [ keywords, setKeywords ] = useState([])
    const RAWG_API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY

    const fetchKeywords = async () => {
        try {
            const response1 = await fetch(`https://api.rawg.io/api/tags?key=${RAWG_API_KEY}&page=1`)
            const response2 = await fetch(`https://api.rawg.io/api/tags?key=${RAWG_API_KEY}&page=2`)
            const data1 = await response1.json()
            const data2 = await response2.json()
            setKeywords(data1.results)
            setKeywords(
                keywords => keywords.concat(
                    data2.results
                )
            )
            console.log(data1.results)
            console.log(data2.results)
        } catch(error) {
            console.error("Error occured while fetching games: ", error)
        }
    }

    useEffect(() => {
        fetchKeywords()
    }, [])

    return (
        <div className="w-full h-full flex bg-yellow-300 flex-col justify-center items-center absolute">
            <Head>
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
              <link rel="icon" href="/gamegiggle-favicon.ico" />
              <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500&family=Rubik+Doodle+Shadow&display=swap" rel="stylesheet" />
              <title>GameGiggle - THE video game recommendation platform for real gamers</title>
              <meta name="description" content="GameGiggle is your go-to platform for discovering new video game gems. Join a community of passionate gamers and elevate your playtime today." />
            </Head>
            <h2 className="text-2xl lg:text-4xl text-gray-800 font-poppins font-bold mb-8">GameGiggle</h2>
            <h1 className="text-4xl md:text-6xl font-poppins w-full xl:w-1/2 mb-8 text-center text-gray-800 font-extrabold">
                Personalized video game recommendations just <span className="bg-gray-800 text-yellow-300 inline-flex p-2">for you.</span>
            </h1>
            <div className="w-full grid gap-4 grid-cols-4 mt-10 grid-rows-4 lg:w-3/4 2xl:w-1/2">
                {
                    keywords.map(
                        keyword => 
                        <div key={keyword.id} id={keyword.id} className="flex flex-col justify-center items-center rounded-2xl shadow-yellow-600 shadow-lg bg-gradient-to-r from-gray-700 to-gray-900 px-4 py-2 bg-gray-800 text-xl text-yellow-300 font-poppins">
                            {keyword.name}
                        </div>
                    )
                }
            </div>
        </div>
    )
}