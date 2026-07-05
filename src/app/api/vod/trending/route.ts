import { NextResponse } from "next/server"

const TMDB_API_KEY = "f618718a35df54116911fff972bc098d"
const TMDB_BASE_URL = "https://api.themoviedb.org/3"

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

    const movies = (moviesData.results || []).slice(0, 15).map((item: any) => ({
      id: item.id,
      title: item.title || item.original_title,
      type: "Film",
      rating: item.vote_average ? Math.round(item.vote_average * 10) / 10 : 7.5,
      poster: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null,
      year: item.release_date ? item.release_date.split("-")[0] : "",
      overview: item.overview || ""
    }))

    const series = (tvData.results || []).slice(0, 15).map((item: any) => ({
      id: item.id,
      title: item.name || item.original_name,
      type: "Série",
      rating: item.vote_average ? Math.round(item.vote_average * 10) / 10 : 7.5,
      poster: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null,
      year: item.first_air_date ? item.first_air_date.split("-")[0] : "",
      overview: item.overview || ""
    }))

    return NextResponse.json({ movies, series })
  } catch (error: any) {
    console.error("TMDB proxy fetch error:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch VOD data" }, { status: 500 })
  }
}
