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
    this.makeThumbnail = this.makeThumbnail.bind(this);
  }

  componentWillMount() {
    this.fetchForHotPosts();
  }

  fetchForHotPosts() {
    this.setState({ hotPosts: null });
    getHotPosts().then(async res => {
      let prettyJson = res.data.children.map(async (value) => {
        async function getAllData() {
          return await new Promise((resolve, reject) => {
            fetch(`https://www.reddit.com${value.data.permalink}.json?pjson=?`).then(posts => {
              posts.json().then((postRes) => {
                value.data.description = postRes[0].data.children[0].data.selftext //This is the description
                resolve(value.data);
              }).catch(() => {
                resolve(value.data);
              })
            });
          });
        }
        return await getAllData()
      })
      this.setState({ hotPosts: await Promise.all(prettyJson) });
    });
  }

  makeThumbnail(data, err) {
    console.log(data)
    return <div style={{height: 140}}>
              <img src={data}/>
            </div>
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
                Reddit Hot Posts
              </h3>
            </div>
          </div>
          <div className="table-container">
            <BootstrapTable
              data={this.state.hotPosts}
              options={options}
              >
              <TableHeaderColumn
                dataField="thumbnail"
                dataFormat={this.makeThumbnail}
                width="120"
              >
                Thumbnail
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="title"
                width="190"
                dataSort
                isKey
              >
                Heading
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="description"
                width="160"
              >
                Description
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="author"
                width="90"
                dataSort
              >
                Author
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="ups"
                width="70"
                dataSort
              >
                Upvotes
              </TableHeaderColumn>
            </BootstrapTable>
          </div>
          <div className="panel-footer panel-foot-margin" />
        </div>
    );
  }
}

export default App;
