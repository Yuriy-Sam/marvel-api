import { useState, useEffect } from 'react';


import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';
// import thor from '../../resources/img/thor.jpeg';



const CharInfo = (props) => {
    const [char, setChar] = useState(null);

    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [])
    
    
    const updateChar = () => {
        clearError();
        const {charId} = props;
        if(!charId){
            return;
        }
        getCharacter(charId)
            .then(onCharLoaded);

    }

    const onCharLoaded = (char) => {
        setChar(char);

    }
    useEffect(() => {
        updateChar();
    }, [props.charId])


    
    const skeleton = !(loading || error || char) ? <Skeleton/> : null;

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}

        </div>
    )
}

const View = ({char}) => {

    const {name, description, thumbnail, homepage, wiki, comics } = char;
    let styleImg = {objectFit: 'cover'};
    if(thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"){
        styleImg = {objectFit: 'contain'};
    }

    
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={styleImg}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{description ? description : 'There is no description for this character.'}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
            {comics.length > 0 ? null : 'There is no comics for this character.'}
            {
                comics.map((item, i) => {
                    // eslint-disable-next-line
                    if(i > 10) return;
                    return (
                        <li key={i} className="char__comics-item">
                            {item.name}
                        </li>
                    )
                })
            }
            </ul>

        </>
    )
}
export default CharInfo;