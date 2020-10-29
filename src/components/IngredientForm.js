import React from 'react';

import './IngredientForm.css';
import Search from './Search';

import LoadingIndicator from '../UI/LoadingIndicator';

const IngredientForm = props => {

    const [enteredTitle, setEnteredTitle] = React.useState('');
    const [enteredAmount, setEnteredAmount] = React.useState('');

    const addItemHandler = (event) => {
        event.preventDefault();
        props.onAddIngredients({
            title: enteredTitle,
            amount: enteredAmount
        })
    }

    return (
        <div>
            <Search />
            <form onSubmit={addItemHandler} className="form">
                <div className="form__group">
                    <label htmlFor="item" className="form__label">Name</label>
                    <input className="form__input" type="text" value={enteredTitle} onChange={(event) => {
                        setEnteredTitle(event.target.value)
                    }} />
                </div>

                <div className="form__group">
                    <label className="form__label" htmlFor="amount">Amount</label>
                    <input className="form__input" type="number" value={enteredAmount} onChange={(event) => {
                        setEnteredAmount(event.target.value)
                    }} />
                </div>

            </form>
        </div>
    )
}

export default IngredientForm;