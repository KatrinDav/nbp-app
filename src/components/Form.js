import React from 'react';
import Option from './Option';

const Form = ({ value, changeFn, currencies, resetFn, submitFn, changeDateFn, day }) => {

    currencies[26] = { currency: "rand (RPA)", code: "ZAR", mid: "" };
    currencies[32] = { currency: "won (płd. Korea)", code: "KRW", mid: "" };
    currencies = currencies.map(item => (
        <Option key={item.code} value={item.code} name={item.currency} />
    ));
    return (
        <>
            <form className="select" onSubmit={submitFn}>
                <h2>Wybierz walutę:</h2>
                <select value={value} onChange={changeFn}>
                    {currencies}
                </select>
                <br />
                <h2>Wybierz datę:</h2>
                <input
                    type="date"
                    value={day}
                    onChange={changeDateFn}
                />
                <br />

                <button type="submit"
                >sprawdź</button>
                <button type="reset" className="reset" onClick={resetFn}>
                    resetuj
              </button>
            </form>
        </>
    );
}

export default Form;