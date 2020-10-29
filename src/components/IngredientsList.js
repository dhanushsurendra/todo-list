import React from 'react';

import './IngredientsList.css';

const IngredientsList = React.memo(props => {

    return (
        <ul>
            {props.onLoadIngredients.map(ig => (
                 <li key={ig.id} onClick={props.onRemoveItem.bind(this, ig.id)}>
                    <span>{ig.title}</span>
                    <span>{ig.amount}x</span>
                 </li>
            ))}
        </ul>
    )
})

export default IngredientsList;