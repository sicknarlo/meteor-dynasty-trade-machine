const {Link} = ReactRouter;

Items = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      items: Players.find({}, {sort: {feb_16: 1}}).fetch()
    };
  },
  getInitialState () {
    return { players: [] }
  },
  componentWillMount() {
    // Update the page's title
    document.title = "Players";
  },
  filterPlayers() {
    const filter = this.refs.filter ? this.refs.filter.value.toLowerCase() : "";
    const playerList = this.data.items;

    if (filter != "") {
      const filteredPlayerList = playerList.filter((p) => {
                              return p.name.toLowerCase().includes(filter)
                            })
      this.setState({players: filteredPlayerList})
    } else {
      this.setState({players: this.data.items})
    }
  },
  componentDidMount() {
    this.setState({ players: this.data.items })
  },
  render() {

    return (
      <div className="container">
        <div className="col-md-8 col-md-offset-2">
          <div className="form-group">
            <input ref="filter" className="form-control" onChange={this.filterPlayers} placeholder="Filter Players by Name" />
          </div>
        </div>
        <PlayersTable
          playerList={this.state.players} />
      </div>
    );
  }
});


PlayersTable = React.createClass({
  _renderTrendArrow (player) {
    const trend = player.trend;
    if (trend > 0) {
      return "glyphicon glyphicon-arrow-up green";
    } else if (trend == 0) {
      return "glyphicon glyphicon-resize-horizontal";
    } else {
      return "glyphicon glyphicon-arrow-down red";
    }
    
  },
  render() {

    return (
      <div className="col-md-12">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>ADP</th>
              <th>Trend</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {this.props.playerList.map((item) => {
            return (<tr>
                      <td><Link to={"/players/" + item.id}>{item.name}</Link></td>
                      <td>{item.position}</td>
                      <td>{item.feb_16}</td>
                      <td>{item.trend} <span className={this._renderTrendArrow(item)}></span></td>
                      <td>{item.value}</td>
                    </tr>);
          })}
          </tbody>
        </table>
      </div>
    );
  }
});