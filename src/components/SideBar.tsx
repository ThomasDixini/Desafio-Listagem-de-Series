import { useEffect, useState } from 'react'
import { Button } from './Button';
import { api } from '../services/api'



export interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SideBarProps {
  selectId: (id: number) => void,
  id: number;
}


export function SideBar({ selectId, id }: SideBarProps) {

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);


  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  return (
    
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => selectId(genre.id)}
              selected={id === genre.id}
            />
          ))}
        </div>

      </nav>
    
  );
}