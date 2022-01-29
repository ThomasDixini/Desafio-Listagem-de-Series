import { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";
import { api } from '../services/api'
import { GenreResponseProps } from "./SideBar";

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface ContentProps {
  id: number;
}


export function Content(id: ContentProps) {

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${id.id}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${id.id}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [id.id]);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);


  return (
    
    <div className="container">
        <header>
          <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
        </header>

        <main>
          <div className="movies-list">
            {movies.map(movie => (
              <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
            ))}
          </div>
        </main>
      </div>
    
    
  );
}