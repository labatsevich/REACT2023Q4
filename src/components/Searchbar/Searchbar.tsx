import { Component, ReactNode } from 'react';

export class Searchbar extends Component {
  constructor(props: {}) {
    super(props);
  }

  render(): ReactNode {
    return (
      <div className="search">
        <form>
          <input type="search" placeholder="type search term" />
          <button type="button">Search</button>
        </form>
      </div>
    );
  }
}
