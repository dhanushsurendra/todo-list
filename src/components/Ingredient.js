import React from 'react';

import AddIngredients from './AddIngredients';
import Search from './Search';
import IngredientsList from './IngredientsList';

import ErrorModal from '../UI/ErrorModal';

const Ingredient = props => {

    const [ingredients, setIngredients] = React.useState([]);

    const [isLoading, setIsLoading] = React.useState(false);

    const [error, setError] = React.useState(null);

    React.useEffect(() => {
      setIsLoading(true);
      fetch('https://react-project-1-3dc37.firebaseio.com/ingredients.json')
        .then(response => {
            return response.json();
        })
        .then(responseData => {
            const loadedIngredients = [];
            for(const key in responseData) {
                loadedIngredients.push({
                    id:key,
                    title: responseData[key].title,
                    amount: responseData[key].amount
                })
            }
            setIsLoading(false);
            setIngredients(loadedIngredients)
        })
        .catch(error => {
            setIsLoading(false)
            setError('Something went wrong!')
        })
    }, [])

    const addIngredinets = ingredient => {
        setIsLoading(true);
        fetch('https://react-project-1-3dc37.firebaseio.com/ingredients.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ingredient)
            })
            .then(response => {
                return response.json();
            })
            .then(responseData => {
               setIngredients(prevState => [
                   ...prevState, {
                       id: responseData.name,
                       ...ingredient
                   }
               ])
               setIsLoading(false);
            })
            .catch(error => {
               setError('Something went wrong!')
            })
    }

    const removeIngredinetsHandler = ingredientId => {
        setIsLoading(true);
        fetch(`https://react-project-1-3dc37.firebaseio.com/ingredients/${ingredientId}.json`, {
            method: 'DELETE'
        })
        .then(response => {
            setIsLoading(false)
            const ingredientsArr = ingredients.filter(ingredient => {
                return ingredient.id !== ingredientId;
            });
            setIngredients(ingredientsArr)
        })
        .catch(error => {
            setError('Something went wrong!')
        })
    }

    const filterIngredientsHandler = filterIngredients => {
        setIngredients(filterIngredients)
    }

    const clearError = () => {
        setError(null);
    }

    return (
        <div>
            {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}

            <AddIngredients onAddIngredients={addIngredinets} loading={isLoading} />

            <Search onLoadIngredients={filterIngredientsHandler} />

            <IngredientsList
                onLoadIngredients={ingredients}
                onRemoveItem={removeIngredinetsHandler} />

        </div>
    )
}

export default Ingredient;