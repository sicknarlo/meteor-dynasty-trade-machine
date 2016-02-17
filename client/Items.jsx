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
  render() {
    return (
      <div className="container">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>ADP</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {this.data.items.map((item) => {
            return (<tr>
                      <td><Link to={"/items/" + item._id}>{item.name}</Link></td>
                      <td>{item.avg_jan16}</td>
                      <td>{item.value}</td>
                    </tr>);
          })}
          </tbody>
        </table>
      </div>
    );
  }
});
