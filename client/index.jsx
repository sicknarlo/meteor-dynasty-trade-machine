const {Link} = ReactRouter;

Index = React.createClass({mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      players: Players.find({feb_16: { $lt: 101 }}, {sort: {trend: 1}}).fetch()
    };
  },
  componentWillMount() {
    // Update the page's title
    document.title = "Dynasty Trade Machine";
  },
  render() {
    const fallingPlayers = this.data.players.slice(0, 10);
    const risingPlayers = this.data.players.slice(this.data.players.length - 11, -1);
    const risersTable = risingPlayers.reverse().map((p) => {
                            return (<tr>
                                      <td><Link to={"/players/" + p.id}>{p.name}</Link></td>
                                      <td>{p.feb_16}</td>
                                      <td>+{p.trend}</td>
                                    </tr>);
                        });
    const fallersTable = fallingPlayers.map((p) => {
                            return (<tr>
                                      <td><Link to={"/players/" + p.id}>{p.name}</Link></td>
                                      <td>{p.feb_16}</td>
                                      <td>{p.trend}</td>
                                    </tr>);
                        });
    return (
      <div>

        <header className="jumbotron hero-spacer">
            <span className="hero-header">The Dynasty Trade Machine</span>
            <p className="hero-text">Win trades. Win championships. | Updated 2/25/2016</p>
        </header>

        <hr/>

        <div className="row">
            <div className="col-lg-12">
                <h3>Tools</h3>
            </div>
        </div>

        <div className="row text-center">

            <div className="col-md-6 col-sm-6 hero-feature">
                <div className="thumbnail">
                    <img className="fp-img" src="http://i.imgur.com/FiZOXVS.png?1" alt=""/>
                    <div className="caption">
                        <h3>Trade Calculator</h3>
                        <p>Stuck on a trade? Don't take our word for it. Use aggregate ADP from multiple sources to evaluate a trade.</p>
                        <p>
                            <Link to={"/calculator"} className="btn btn-primary">Evaluate a Trade</Link>
                        </p>
                    </div>
                </div>
            </div>

            <div className="col-md-6 col-sm-6 hero-feature">
                <div className="thumbnail">
                    <img className="fp-image" src="http://i.imgur.com/jyrj6gK.png?1" alt=""/>
                    <div className="caption">
                        <h3>Player Database</h3>
                        <p>Player pages provide historical ADP and more information to help you make the right decisions.</p>
                        <p>
                            <Link to={"/players"} className="btn btn-primary">Check out the Database</Link>
                        </p>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <h3>3 Month Risers</h3>
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th className="th-center">Name</th>
                          <th className="th-center">ADP</th>
                          <th className="th-center">Trend</th>
                        </tr>
                      </thead>
                      <tbody>
                      {risersTable}
                      </tbody>
                    </table>
                </div>
                <div className="col-md-6">
                    <h3>3 Month Fallers</h3>
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th className="th-center">Name</th>
                          <th className="th-center">ADP</th>
                          <th className="th-center">Trend</th>
                        </tr>
                      </thead>
                      <tbody>
                      {fallersTable}
                      </tbody>
                    </table>
                </div>
            </div>

        </div>

        <hr/>

        <footer>
            <div className="row">
                <div className="col-lg-12">
                    <p>Copyright &copy; Dynasty Trade Machine 2016</p>
                </div>
            </div>
        </footer>

    </div>
    );
  }
});
