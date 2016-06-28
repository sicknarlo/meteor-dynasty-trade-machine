const {Link} = ReactRouter;

Index = React.createClass({mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      players: Players.find({jun_16: { $lt: 101 }}, {sort: {trend: 1}}).fetch()
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
                                      <td>{p.jun_16}</td>
                                      <td>+{p.trend}</td>
                                    </tr>);
                        });
    const fallersTable = fallingPlayers.map((p) => {
                            return (<tr>
                                      <td><Link to={"/players/" + p.id}>{p.name}</Link></td>
                                      <td>{p.jun_16}</td>
                                      <td>{p.trend}</td>
                                    </tr>);
                        });
    return (
      <div>

        <header className="jumbotron hero-spacer">
            <span className="hero-header">The Dynasty Trade Machine</span>
            <p className="hero-text">Win trades. Win championships. | Updated 6/28/16</p>
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
                <div className="col-lg-6">
                    <p>Copyright &copy; Dynasty Trade Machine 2016 | Data updates on the 25th of every month.</p>
                </div>
                <div className="col-lg-6">
                  <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                    <input type="hidden" name="cmd" value="_s-xclick" />
                    <input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----
                    " />
                    <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" />
                    <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
                  </form>
                </div>
            </div>
        </footer>

    </div>
    );
  }
});
