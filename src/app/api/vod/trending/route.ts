import { NextResponse } from "next/server"

const TMDB_API_KEY = "f618718a35df54116911fff972bc098d"
const TMDB_BASE_URL = "https://api.themoviedb.org/3"

interface TMDBItem {
  id: number
  title?: string
  name?: string
  original_title?: string
  original_name?: string
  vote_average?: number
  poster_path?: string
  release_date?: string
  first_air_date?: string
  overview?: string
}

export async function GET() {
  try {
    const [moviesRes, tvRes] = await Promise.all([
      fetch(`${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}&language=fr-FR`, {
        next: { revalidate: 3600 }
      }),
      fetch(`${TMDB_BASE_URL}/trending/tv/week?api_key=${TMDB_API_KEY}&language=fr-FR`, {
        next: { revalidate: 3600 }
      })
    ])

    if (!moviesRes.ok || !tvRes.ok) {
      throw new Error(`TMDB responded with error status: ${moviesRes.status} / ${tvRes.status}`)
    }

    const moviesData = await moviesRes.json()
    const tvData = await tvRes.json()

    const movies = (moviesData.results || []).slice(0, 15).map((item: TMDBItem) => ({
      id: item.id,
      title: item.title || item.original_title || "",
      type: "Film",
      rating: item.vote_average ? Math.round(item.vote_average * 10) / 10 : 7.5,
      poster: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null,
      year: item.release_date ? item.release_date.split("-")[0] : "",
      overview: item.overview || ""
    }))

    const series = (tvData.results || []).slice(0, 15).map((item: TMDBItem) => ({
      id: item.id,
      title: item.name || item.original_name || "",
      type: "Série",
      rating: item.vote_average ? Math.round(item.vote_average * 10) / 10 : 7.5,
      poster: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null,
      year: item.first_air_date ? item.first_air_date.split("-")[0] : "",
      overview: item.overview || ""
    }))

    return NextResponse.json({ vidéos: movies, movies, series })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch VOD data"
    console.error("TMDB proxy fetch error:", error)
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
