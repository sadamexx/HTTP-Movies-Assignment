import React, {useState, useEffect} from 'react';
import MovieCard from './MovieCard';
import axios from "axios";


// const initialMovie = {
//     id: '',
//     title: '',
//     director: '',
//     metascore: '',
//     stars: [],
// };

const UpdateMovie = props => {
    const [movie, setMovie] = useState({
        title: "",
        director: "",
        metascore: 0,
        stars: []
      });
    const id = props.match.params.id

    // useEffect(() => {
    //     const filmToEdit = 
    //     props.savedList.find(film => `${film.id}` === id) 
    //         if(filmToEdit) {
    //             setMovie(filmToEdit)}        
    // },[props.savedList, id])//end useEffect

    useEffect(() => {
        axios
          .get(`http://localhost:5000/api/movies/${id}`)
          .then(res => setMovie(res.data))
          .then(res => console.log("res", res.data))
          .catch(err => console.log(err));
      }, []);

    const handleChange = e => {
        e.preventDefault();
        setMovie({
            ...movie,
            [e.target.name] : e.target.value
        });
    };
    
    const handleSubmit = e => {
        e.preventDefault();
        axios
        .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(res => {
            console.log(res)
            setMovie(res.data)
            props.history.push(`/movies/${movie.id}`);
        })
        .catch(err => console.log('Editing error', err))
    }  

    return(
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    placeholder="Movie Title"
                    value={movie.title}
                />  
                <input
                    type="text"
                    name="director"
                    onChange={handleChange}
                    placeholder="Director"
                    value={movie.director}
                />
                <input
                    type="text"
                    name="metascore"
                    onChange={handleChange}
                    placeholder="Metascore"
                    value={movie.metascore}
                />
                <input
                    type="text"
                    name="stars"
                    onChange={handleChange}
                    placeholder="Stars"
                    value={movie.stars}
                />  
            <button>Update</button>
            </form>

        </div>
    );
}

export default UpdateMovie;

