import { useHttp } from "../hooks/http.hook";
// https://gateway.marvel.com:443/v1/public/comics?limit=8&apikey=4a4506f14d5b70610f7a2deee5b2c67c
const useMarvelService = () => {
    const {loading, error, request, clearError} = useHttp();
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=4a4506f14d5b70610f7a2deee5b2c67c';
    const _baseOffsetChar = '210';
    const _baseOffsetComics = '210';

    
    const getAllCharacters = async (offset = _baseOffsetChar) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformChar);
    }
    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformChar(res.data.results[0]);
    }
    const getAllComics = async (offset = _baseOffsetComics) => {
        const res = await request(`${_apiBase}comics?issueNumber=1&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComic);
    }
    const getComics = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComic(res.data.results[0]);
    }
    const _transformChar = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
        }
    }
    const _transformComic = (comic) => {
        return {
            id: comic.id,
            title: comic.title,
            description: comic.description,
            price: comic.prices[0].price ? comic.prices[0].price + '$' : 'No price',
            pageCount: comic.pageCount,
            language: comic.textObjects.language,
            thumbnail: comic.thumbnail.path + "." + comic.thumbnail.extension,

        }
    }
    return {loading, error, clearError, getAllCharacters, getCharacter, getAllComics, getComics}
}


export default useMarvelService;