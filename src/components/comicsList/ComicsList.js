import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './comicsList.scss';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newComicsListLoading, setNewComicsListLoading] = useState(false);
    const [offset, setOffset] = useState(610);
    const [endedList, setEndedList] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest();
    }, [])
    const onComicsListLoading = (newComicsList) =>{
        let ended = false;
        if(newComicsList.length < 8){
            ended = true;
        }
        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewComicsListLoading(false);
        setOffset(offset => offset + 8);
        setEndedList(ended);
    }

    const onRequest = (offset) => {
        setNewComicsListLoading(true);

        getAllComics(offset)
            .then(onComicsListLoading);
    }

    function renderItems(arr) {
        const items =  arr.map((item, i) => {
            
            return (
                <li className="comics__item" 
                key={i}
                tabIndex={0}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.name} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        });
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }
    

    
    const items = renderItems(comicsList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newComicsListLoading ? <Spinner/> : null;
    // const content = !(loading || error) ? items : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            
            <button 
                className="button button__main button__long"
                disabled={newComicsListLoading}
                onClick={() => onRequest(offset)}
                style={{"display": endedList ? 'none' : 'block' }}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;