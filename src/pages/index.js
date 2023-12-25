import RecommendationPage from "./RecommendationPage"
import { Analytics } from '@vercel/analytics/react';

export default function Home() {
  return (
    <>
     <RecommendationPage />
     <Analytics />
    </>
  )
}
