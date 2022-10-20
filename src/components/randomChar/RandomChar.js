import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';



const RandomChar = () => {
    const {loading, error, getCharacter, clearError} = useMarvelService();
    const [char, setChar] = useState({});
    useEffect(() => {
        updateChar();
    }, [])

    const onCharLoaded = (char) => {
        setChar(char);
    }
    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then(onCharLoaded);
    }


        
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View char={char}/> : null;
    
    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={ () => updateChar()} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki } = char;
    let decorationText = description ? `${description.slice(0, 210)}...` : 'There is no description for this character';
    let styleImg = {objectFit: 'cover'};
    if(thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"){
        styleImg = {objectFit: 'contain'};
    }
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" style={styleImg}  className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{decorationText}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;