import { useState, useEffect, useRef } from 'react';

import useMarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';


import './charList.scss';





const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newCharListLoading, setNewCharListLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [endedList, setEndedList] = useState(false);
    // const [selectedClass, setSelectedClass] = useState('');
    const {loading, error, getAllCharacters} = useMarvelService();

    const itemRefs = useRef([]);

    // setRef = (ref) => {
    //     this.itemRefs.push(ref);
    // }

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }



    
    // const onCharListLoaded = (charList) => {
    //     setCharList(charList);
    //     setLoading(false);
    // }


    useEffect(() => {
        onRequest();
    }, [])
    const onCharListLoading = (newCharList) =>{
        let ended = false;
        if(newCharList.length < 9){
            ended = true;
        }
        setCharList(charList => [...charList, ...newCharList]);
        setNewCharListLoading(false);
        setOffset(offset => offset + 9);
        setEndedList(ended);
    }

    const onRequest = (offset) => {
        setNewCharListLoading(true);

        getAllCharacters(offset)
            .then(onCharListLoading);
    }

    function renderItems(arr) {
        const items =  arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li onClick={() => {
                        props.onSelectChar(item.id);
                        focusOnItem(i);
                    }}
                    className="char__item"
                    key={item.id}
                    tabIndex={0}
                    ref={el => itemRefs.current[i] = el}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onSelectChar(item.id);
                            focusOnItem(i);
                        }
                    }}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }
    

    
    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newCharListLoading ? <Spinner/> : null;
    // const content = !(loading || error) ? items : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button 
                className="button button__main button__long"
                disabled={newCharListLoading}
                onClick={() => onRequest(offset)}
                style={{"display": endedList ? 'none' : 'block' }}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
    
}
CharList.propTypes = {
    onSelectChar: PropTypes.func.isRequired
}

export default CharList;