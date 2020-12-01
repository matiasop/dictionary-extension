import React from 'react';

class Dictionary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lang: 'es', word: '', definitions: [] };

    this.handleWord = this.handleWord.bind(this);
    this.handleLang = this.handleLang.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleWord(event) {
    this.setState({ word: event.target.value });
  }

  handleLang(event) {
    this.setState({ lang: event.target.value });
  }

  handleSubmit(event) {
    const url = "https://api.dictionaryapi.dev/api/v2/entries/" + this.state.lang + "/" + this.state.word;
    fetch(url).then(response => response.json()).then(data => {
      this.setState({ definitions: data[0].meanings[0].definitions });
    });
    event.preventDefault();
  }

  render() {
    const listDefinitions = this.state.definitions.map((def) =>
      <li>{def.definition}</li>
    );
    return (
      <div id="dictionary">
        <p class="extension-name">Dictionary</p>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input id="word" type="text" value={this.state.word} onChange={this.handleWord} />
          </label>
          <div id="bottom-row">
            <select id="laguage-select" value={this.state.lang} onChange={this.handleLang}>
              <option value="es">Spanish</option>
              <option value="en">English</option>
            </select>
            <input id="searchbar" type="submit" value="Search" />
          </div>
        </form>
        <ul class="definitions">{listDefinitions}</ul>
      </div>
    );
  }
}

export default Dictionary;