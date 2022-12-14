import { Link, useParams  } from 'react-router-dom';
import { useState, useEffect } from 'react';


import useMarvelService from '../../../services/MarvelService';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import './singleComicPage.scss';

const SingleComicPage = () => {

    let {comicId} = useParams();
    const [comic, setComic] = useState(comicId);

    const {loading, error, getComics, clearError} = useMarvelService();

    
    
    const updateComic = () => {
        clearError();
        getComics(comic)
            .then(onCharLoaded);

    }

    const onCharLoaded = (comic) => {
        setComic(comic);

    }
    useEffect(() => {
        updateComic();
    }, [comicId])


    
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null;


    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        
        </>
    )
}

const View = ({comic}) => {

    const {title, description, thumbnail, price, language, pageCount} = comic;
    
    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title}className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to={'/comics'} className="single-comic__back">Back to all</Link>
        </div>

    )
}


export default SingleComicPage;