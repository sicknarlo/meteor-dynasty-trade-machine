const {Link} = ReactRouter;

Items = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      items: Players.find({}, {sort: {feb_16: 1}}).fetch()
    };
  },
  componentWillMount() {
    // Update the page's title
    document.title = "Players";
  },
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
      <div className="container">
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
              {this.data.items.map((item) => {
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
      </div>
    );
  }
});
