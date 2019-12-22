import React, { Component } from "react";
import FilterInput from "../FilterInput";
import { deletePerson, getPeople } from "../../utilities/fetch";
import List from "../List";

export default class UsersTable extends Component {
  state = {
    people: [],
    filterInput: "",
    filteredPeople: []
  };

  onChangeInputFilter = e => {
    this.setState({ filterInput: e.target.value }, () =>
      this.filterPeople(this.state.filterInput)
    );
  };

  deletePerson = id => {
    this.setState(prevState => ({
      people: prevState.people.filter(person => person.id !== id)
    }));
    this.setState(prevState => ({
      filteredPeople: prevState.filteredPeople.filter(
        person => person.id !== id
      )
    }));
    deletePerson(parseInt(id));
  };

  filterPeople = input => {
    let filteredPeople = this.state.people.filter(
      person =>
        person.firstName.toLowerCase().startsWith(input) ||
        person.secondName.toLowerCase().startsWith(input)
    );
    this.setState({ filteredPeople: filteredPeople });
  };

  async componentDidMount() {
    const people = await getPeople();
    this.setState({ people: people });
  }

  render() {
    let { people } = this.state;
    if (this.state.filteredPeople.length) {
      people = this.state.filteredPeople;
    }

    return (
      <div>
        <FilterInput
          filterInput={this.state.filterInput}
          onChangeInputFilter={this.onChangeInputFilter}
        />
        <table className="table table-hover table-striped mx-auto table-dark">
          <thead className="text-light">
            <tr>
              <th>ID</th>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Отчество</th>
              <th>Серия</th>
              <th>Номер</th>
              <th>Почта</th>
              <th>Телефон</th>
              <th colSpan="2">Управление</th>
            </tr>
          </thead>
          <tbody className="text-light">
            {people.length ? (
              <List people={people} deletePerson={this.deletePerson} />
            ) : (
              <tr>
                <td>Пока что не записей.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
