import { useState, useEff, useEffect } from 'react';
import { json, Link, useFetcher } from 'react-router-dom';
import { toast } from 'react-toastify';
import './favoritos.css';

function Favoritos(){

    const [films, setFilms] = useState([]);

    useEffect(()=> {
        const myList = localStorage.getItem("@primeFlix");
        setFilms(JSON.parse(myList) || []);

    }, [])

    function handleDelete(id){
        let filterFilms = films.filter((item) =>{
            return(item.id !== id);
        })

        setFilms(filterFilms);
        localStorage.setItem("@primeFlix", JSON.stringify(filterFilms));
        toast.success("Filme removido com sucesso!");
    }

    return(
        <div className="my-movies">
            <h1>Meus Filmes</h1>

            {films.length === 0 && <span>Você não possui nenhum filme salvo :(</span>}

            <ul>
                {films.map((item) =>{
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>

                            <div>
                                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                                <button onClick={() => handleDelete(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default Favoritos;