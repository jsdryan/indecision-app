import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Header from './Header';
import Action from './Action';

export default class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleRemoveOne = this.handleRemoveOne.bind(this);
    this.state = {
      options: [],
    };
  }
  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);
      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (e) {}
  }
  componentDidUpdate(_prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }
  handleAddOption(option) {
    if (!option) {
      return 'Please enter a valid option.';
    } else if (this.state.options.indexOf(option) > -1) {
      return `The option ${option} is already existed.`;
    }

    this.setState((prevState) => ({
      options: prevState.options.concat([option]),
    }));
  }
  handlePick() {
    const options = this.state.options;
    const randNum = Math.floor(Math.random() * options.length);
    alert(options[randNum]);
  }
  handleRemoveAll() {
    this.setState(() => ({ options: [] }));
  }
  handleRemoveOne(option) {
    this.setState((prevState) => ({
      options: prevState.options.filter((o) => option !== o),
    }));
  }
  render() {
    const subtitle = 'Put your life in the hands of a computer';

    return (
      <div>
        <Header subtitle={subtitle} />
        <Action
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}
        />
        <Options
          options={this.state.options}
          handleRemoveAll={this.handleRemoveAll}
          handleRemoveOne={this.handleRemoveOne}
        />
        <AddOption handleAddOption={this.handleAddOption} />
      </div>
    );
  }
}
