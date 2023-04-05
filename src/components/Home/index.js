import api from "../../services/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './home.css';

//URL da API: movie/now_playing?api_key=2a218b94658623808fa26dcd90b4446f&language=pt-BR

function Home(){

    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {

        async function loadFilmes(){
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: "2a218b94658623808fa26dcd90b4446f",
                    language: "pt-BR",
                    page: 1
                }
            })

            //slice corta um pedaço do array
            //console.log(response.data.results.slice(0,10));

            setFilmes(response.data.results.slice(0,10));
            setLoading(false);
        }

        loadFilmes();

    }, []);

    if (loading){
        return(
            <div className="loading">
                <h2>Carregando filmes...</h2>
            </div>
        )
    }

    return(
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((item) => {
                    return(
                        <article key={item.id}>
                            <strong>{item.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt={item.title} />
                            <Link to={`filme/${item.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    );
}

export default Home;