// App.jsx
import React from "react";
import config from "./config.json";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      question: null,
      options: [],
      selectedOption: null
    };

    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  async componentWillMount() {
    var questionRes = await fetch(`${config.api}/questions`);
    questionRes = await questionRes.json();
    this.setState(
      {
        question: questionRes.question,
        options: questionRes.answers
      }
    );
  }

  handleOptionChange(event) {
    this.setState({
      selectedOption: event.target.value
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();

    console.log('Selected value ---->', this.state.selectedOption);
  }

  render () {
    return (
      <div>
        <h1>{this.state.question}</h1>
        <form onSubmit={this.handleFormSubmit}>
          {
            this.state.options.map((option, index) => {
              return(
                <div key={index} className="radio">
                  <label>
                    <input type="radio"
                      value={option.answer}
                      checked={this.state.selectedOption === option.answer}
                      onChange={this.handleOptionChange}
                    />
                    {option.answer}
                  </label>
                </div>
              )
            })
          }
          <button className="btn btn-default" type="submit">Save</button>
        </form>
      </div>
    );
  }
}
