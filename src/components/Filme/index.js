import { useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import './filme.css';

function Filme(){

    const { id } = useParams();
    const navigate = useNavigate();

    const [film, setFilm] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        async function loadFilm(){
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "2a218b94658623808fa26dcd90b4446f",
                    language: "pt-BR"
                }
            })
            .then((response)=>{
                setFilm(response.data);
                setLoading(false);
            })
            .catch(()=>{
                navigate("/", {replace : true});
                console.log("FILME NÃO ENCONTRADO");
            })
        }

        loadFilm();

        return () => {
            console.log("COMPONENTE FOI DESMONTADO");
        }

    }, [id])

    function saveFilm(){
        const myList = localStorage.getItem("@primeFlix");

        let savedFilms = JSON.parse(myList) || [];

        const hasFilm = savedFilms.some((savedFilm)=> savedFilm.id === film.id);

        if (hasFilm){
            toast.warn("Esse filme já está na sua lista!");
            return;
        }

        savedFilms.push(film);
        localStorage.setItem("@primeFlix", JSON.stringify(savedFilms));
        toast.success("Filme salvo com sucesso!");
    }

    if(loading){
        return(
            <div className="film-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return(
        <div className="film-info">
            <h1>{film.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${film.backdrop_path}`} alt={film.title} />

            <h3>Sinopse</h3>
            <span>{film.overview}</span>
            <strong>Avaliação: {film.vote_average} / 10</strong>

            <div className="area-buttons">
                <button onClick={saveFilm}>Salvar</button>
                <button>
                    <a target="_blank" rel="external" href={`https://youtube.com/results?search_query=${film.title} Trailer`} >
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    );
}

export default Filme;