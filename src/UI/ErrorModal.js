import React from 'react';

import './ErrorModal.css';

const Backdrop = React.memo(props => {
    return (
        <React.Fragment>
            <div className="backdrop" onClose={props.onClose}></div>

            <div className="error__modal">
                <div className="error__strip"></div>
                <div>
                <p style={{padding:"2rem"}}>{props.children}</p>
                <button className="error__button" onClick={props.onClose}>Okay</button>
                </div>
            </div>

        </React.Fragment>
    )
});

export default Backdrop;