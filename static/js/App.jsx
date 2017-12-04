// App.jsx

// libraries
import React from 'react';
import _ from 'underscore';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {BaseCard} from "simple-react-card";
// local imports
import config from './config.json';
import Utils from './lib/util.js';

//components
import Navbar from './components/Navbar.jsx';

//styles
import '../css/site.css';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      question: null,
      options: [],
      selectedOption: null,
      open: false,
      answerCount: 0,
      answer: ''
    };
    this.questions = [];
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAnotherQuestion = this.handleAnotherQuestion.bind(this);
  }

  async componentWillMount() {

    await this.getQuestions();

    var randomQuestion = Utils.randomItem(this.questions);
    this.findRandomQuestion({
      question: randomQuestion.question,
      options: randomQuestion.answers
    });
  }

  /**
   * async getQuestions - get all questions from endpoint
   *
   * @return {type}
   */
  async getQuestions() {
    try {
      var questionRes = await fetch(`${config.api}/questions`);
      questionRes = await questionRes.json();
      this.questions = questionRes;
    } catch(e) {
      console.error(e);
    }
  }

  /**
   * findRandomQuestion - Display a random question
   *
   * @param  {type} newState
   * @return {type}
   */
  findRandomQuestion(newState) {
    this.setState(newState, () => {
      var randomIndex = this.questions.findIndex(x => x.question === newState.question);
      console.log('Random Index ====>', randomIndex);
      if (randomIndex > -1) {
        this.questions.splice(randomIndex, 1);
        console.log(this.questions.length);
      }
    });
  }

  handleOptionChange(event) {
    this.setState({
      selectedOption: event.target.value
    });
  }


  /**
   * async handleFormSubmit - Save answer on the backend and display count
   *
   * @param  {type} event
   * @return {type}
   */
  async handleFormSubmit(event) {
    event.preventDefault();

    const answerObject = _.find(this.state.options, (item) => {
      return item.answer === this.state.selectedOption;
    });
    answerObject.count++;
    try {
      var putObject = await fetch(`${config.api}/answers/${answerObject.id}`, {
        method: 'PUT',
        body: JSON.stringify(answerObject)
      });
      putObject = await putObject.json();
      console.log('Selected value ---->', putObject);
      this.handleOpen(putObject);
    } catch(e) {
      console.error(e);
    }

  }

  handleOpen(answerObject) {
    this.setState(
      {
        open: true,
        answerCount: answerObject.count,
        answer: answerObject.answer
      }
    );
  }

  handleClose() {
    this.setState({open: false});
  }

  /**
   * async handleAnotherQuestion - get a new question to display
   *
   * @return {type}
   */
  async handleAnotherQuestion() {
    if(this.questions.length === 0) {
      await this.getQuestions();
    }
    var randomQuestion = Utils.randomItem(this.questions);
    this.findRandomQuestion({
      question: randomQuestion.question,
      options: randomQuestion.answers,
      open: false
    });
  }

  render () {
    const actions = [
      <FlatButton
        label="Answer another question?"
        primary={true}
        onClick={this.handleAnotherQuestion}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
        <Navbar/>
        <MuiThemeProvider>
          <BaseCard className="card">
            <div className="questionnaire">
              <h1>{this.state.question}</h1>
              <form onSubmit={this.handleFormSubmit}>
                {
                  this.state.options.map((option, index) => {
                    return(
                      <div key={index} className="radio">
                        <label>
                          <input type="radio"
                            className="radio-item"
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
              <Dialog
                title="Thank you for your response!"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
              >
                <h3>{this.state.answer}</h3> has been answered <h3>{this.state.answerCount}</h3> times.
              </Dialog>
            </div>
          </BaseCard>
        </MuiThemeProvider>
      </div>
    );
  }
}
