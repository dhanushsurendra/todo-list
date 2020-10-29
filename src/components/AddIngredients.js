import React from 'react';

import './AddIngredients.css';

import Card from '../UI/Card/Card';
import LoadingIndicator from '../UI/LoadingIndicator';

const AddIngredients = props => {

    const [enteredTitle, setEnteredTitle] = React.useState('');
    const [enteredAmount, setEnteredAmount] = React.useState('');

    const submitHandler = event => {
        event.preventDefault()
        props.onAddIngredients({
            title: enteredTitle,
            amount: enteredAmount
        })
        setEnteredTitle('');
        setEnteredAmount('');
    }

    return (
        <Card>
            <form className="form" onSubmit={submitHandler}>
                <div className="form__group">
                    <label htmlFor="name" className="form__label">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form__input"
                        value={enteredTitle}
                        onChange={event => setEnteredTitle(event.target.value)}/>
                </div>

                <div className="form__group">
                    <label htmlFor="amount" className="form__label">Amount</label>
                    <input
                        type="number"
                        name="amount"
                        className="form__input"
                        value={enteredAmount}
                        onChange={event => setEnteredAmount(event.target.value)}/>
                </div>

                <div className="form__submit">
                    <button type="submit" className="button">Submit</button>

                    {props.loading ? <LoadingIndicator /> : null}
                </div>
            </form>
        </Card>
    )
}

export default AddIngredients;