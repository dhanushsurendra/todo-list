import React from 'react';

import './Search.css';
import Card from '../UI/Card/Card';

const Search = React.memo(props => {

    const [search, setSearch] = React.useState('');

    const inputRef = React.useRef();

    const { onLoadIngredients } = props;

    React.useEffect(() => {
        const timer = setTimeout(() => {
            if(search === inputRef.current.value) {
                const query = search.length === 0 ? '' : `?orderBy="title"&equalTo="${search}"`

                fetch(`https://react-project-1-3dc37.firebaseio.com/ingredients.json/${query}`)
                    .then(response => {
                        return response.json();
                    })
                    .then(responseData => {
                        const loadedIngredients = [];
                        for(const key in responseData) {
                            loadedIngredients.push({
                                id: key,
                                title: responseData[key].title,
                                amount: responseData[key].amount
                            })
                        }
                        onLoadIngredients(loadedIngredients)
                    });
            }
        }, 500);

        return () => {
            clearTimeout(timer);
        }
    }, [search, onLoadIngredients])

    return (
        <Card>
            <p>Search: </p>
            <input
                className="search__input"
                type="text"
                name="search"
                value={search}
                onChange={event => {
                    setSearch(event.target.value)
                }}
                ref={inputRef}/>
        </Card>
    )
})

export default Search;