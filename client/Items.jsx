const {Link} = ReactRouter;

Items = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      items: Players.find({}, {sort: {avg_116: 1}}).fetch()
    };
  },
  componentWillMount() {
    // Update the page's title
    document.title = "Players";
  },
  _renderTrendArrow (player) {
    const trend = player.avg_116 - player.avg_1215;
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
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>ADP</th>
              <th>3 Month Trend</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {this.data.items.map((item) => {
            return (<tr>
                      <td><Link to={"/items/" + item._id}>{item.name}</Link></td>
                      <td>{item.position}</td>
                      <td>{item.avg_116}</td>
                      <td>{item.avg_116 - item.avg_1215} <span className={this._renderTrendArrow(item)}></span></td>
                      <td>{item.value}</td>
                    </tr>);
          })}
          </tbody>
        </table>
      </div>
    );
  }
});
