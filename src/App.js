import React, { Component } from 'react';
import './style/App.css';
import ErrorPanel from "./components/ErrorPanel";
import ResultPanel from "./components/ResultPanel";
import Title from './components/Title';
import Form from './components/Form';

class App extends Component {
  day = new Date().toISOString().slice(0, 10);
  state = {
    value: "",
    currencies: [],
    day: this.day,
    rate: "",
    date: "",
    tableNo: "",
    err: false
  };
  handleSelect = e => {
    this.setState({
      value: e.target.value
    });
  };
  handleDateChange = e => {
    this.setState({
      day: e.target.value
    });
  };
  handleReset = () => {
    this.setState(prevState => ({
      value: "eur",
      day: this.day,
      rate: "",
      date: "",
      tableNo: "",
      err: false
    }));
  };
  handleButton = (e) => {
    e.preventDefault();
    fetch(
      `https://api.nbp.pl/api/exchangerates/rates/a/${this.state.value}/${
      this.state.day
      }`
    )
      .then(response => {
        if (response.ok) {
          return response;
        }
        throw Error("nie udało się!");
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState(prevState => ({
          rate: data.rates[0].mid,
          date: data.rates[0].effectiveDate,
          tableNo: data.rates[0].no
        }));
      })
      .catch(err => {
        this.setState(prevState => ({
          err: !this.state.err
        }));
      });


  };

  componentDidMount() {
    fetch("https://api.nbp.pl/api/exchangerates/tables/a/?format=json")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          currencies: data[0].rates
        });
      });
  }

  render() {
    let currencies = this.state.currencies;

    const { value, day, rate, date, tableNo, err } = this.state;
    return (
      <>
        <div className="wrapper">
          <div className="app">
            <Title />
            <Form
              submitFn={this.handleButton}
              changeFn={this.handleSelect}
              changeDateFn={this.handleDateChange}
              resetFn={this.handleReset}
              value={value}
              day={day}
              currencies={currencies}
            />

            {rate && !err && (
              <ResultPanel
                rate={rate}
                date={date}
                table={tableNo}
              />
            )}
            {err && <ErrorPanel />}
          </div>
          <div className="image" />
        </div>
      </>
    );
  }
}

export default App;


