import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { getHotPosts } from "./utils/API";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotPosts: null
    };
    this.fetchForHotPosts = this.fetchForHotPosts.bind(this);
  }

  componentWillMount() {
    this.fetchForHotPosts();
  }

  fetchForHotPosts() {
    this.setState({ hotPosts: null });
    getHotPosts().then(hotPosts => {
      this.setState({ hotPosts: "topMovies.results" });
    });
  }

  render() {
    if (this.state.hotPosts === null) {
      return <div className="loading-state" />;
    }
    const options = {
      sizePerPage: 50,
      noDataText: "No Data Found",
      sizePerPageList: [25, 50, 75, 100]
    };
    return (
      <div>
          <div id="page-header" className="row">
            <div className="col-xs-6">
              <h3 className="page-title" id="topUser">
                Movies Collection
              </h3>
            </div>
          </div>
          <div className="table-container">
            <BootstrapTable data={this.state.moviesArr} options={options}>
              <TableHeaderColumn
                dataField="original_title"
                width="320"
                columnClassName="tdBg"
                dataSort
                isKey
              >
                Title
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="vote_average"
                width="190"
                className="tdBg"
                columnClassName="tdBg"
                dataSort
              >
                Rating
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="createdAt"
                width="160"
                className="tdBg"
                columnClassName="tdBg"
                dataFormat={this.userDetailsButton}
              >
                User Details
              </TableHeaderColumn>
            </BootstrapTable>
          </div>
          <div className="panel-footer panel-foot-margin" />
        </div>
    );
  }
}

export default App;
