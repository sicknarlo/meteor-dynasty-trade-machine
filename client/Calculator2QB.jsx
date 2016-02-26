const {Link} = ReactRouter;

Results = React.createClass({
  renderTeam1 () {
    return this.props.team2.map((player) => {
      return (
          <tr>
            <td><Link key={player._id} to={"/players-2qb/" + player.id}>{player.name}</Link></td>
            <td>{player.value}</td>
          </tr>
        )
    });
  },
  renderTeam2 () {
    return this.props.team1.map((player) => {
      return (
          <tr>
            <td><Link key={player._id} to={"/players-2qb/" + player.id}>{player.name}</Link></td>
            <td>{player.value}</td>
          </tr>
        )
    });
  },


  render () {

    let team1OutboundValue = 0;

    for (var i=0; i < this.props.team1.length; i++) {
      team1OutboundValue += this.props.team1[i].value;
    }

    let team2OutboundValue = 0;

    for (var i=0; i < this.props.team2.length; i++) {
      team2OutboundValue += this.props.team2[i].value;
    }

    const team1ValueGained = team2OutboundValue - team1OutboundValue;
    const team2ValueGained = team1OutboundValue - team2OutboundValue;
    const tradeRating = Math.round((Math.min(team1OutboundValue, team2OutboundValue) / Math.max(team1OutboundValue, team2OutboundValue)) * 100);

    let closestPlayer = this.props.players[0];
    
    if (Math.abs(team1ValueGained) < 3000) {
      for (var i=0; i < this.props.players.length; i++) {
        if (Math.abs(Math.abs(team1ValueGained) - this.props.players[i].value) < Math.abs(Math.abs(team1ValueGained) - closestPlayer.value)) {
          closestPlayer = this.props.players[i];
        }
      }
    }

    return (
        <div>
          <div className="row">
            <div className="col-xs-6">
              <h3>Team 1 Recieves:</h3>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>
                      Player
                    </th>
                    <th>
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderTeam1()}
                   <tr>
                    <td>
                      <strong>Value Gained:</strong>
                    </td>
                    <td>
                      {team1ValueGained}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-xs-6">
              <h3>Team 2 Recieves:</h3>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>
                      Player
                    </th>
                    <th>
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderTeam2()}
                  <tr>
                    <td>
                      <strong>Value Gained:</strong>
                    </td>
                    <td>
                      {team2ValueGained}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 text-center">
              <h3>Trade Fairness: {tradeRating}%</h3> 
            </div>
            <div className="col-xs-12 text-center">
              <h3>The difference is equivalent to <Link key={closestPlayer._id} to={"/players-2qb/" + closestPlayer.id}>{closestPlayer.name}</Link> with an ADP of {closestPlayer.feb_16}</h3> 
            </div>
            <div className="col-md-6 col-md-offset-3 text-center">
              <button className="btn btn-primary btn-lg" onClick={this.props.clearEvent}>Clear this Trade</button>
            </div>
          </div>
        </div>
      )
  }
});


Calculator2QB = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      players: Players2QB.find({}, {sort: {feb_16: 1}}).fetch()
    };
  },
  getInitialState: function() {
    return {
      team1: [],
      team2: [],
      showResults: false
    };
  },
  componentWillMount() {
    // Update the page's title
    document.title = "Trade Calculator";
  },

  componentDidMount() {
    // Update the page's title
    let names = [];

    for (var i=0; i < this.data.players.length; i++) {
      names.push(this.data.players[i].name);
    }

    $('.playerList').on("focus", function(){
      $(this).autocomplete({
       source: names
      });
    });
  },

  findPlayer(ref) {
    const pName = ReactDOM.findDOMNode(ref).value.trim();
    const player = this.data.players.filter(function ( p ) {
        return p.name === pName;
    })[0];

    if (typeof player != undefined) {
      return player;
    }

  },
  buildTeam1() {
    let returnArray = [];

    const team1 = [
                    this.findPlayer(this.refs.t1p1),
                    this.findPlayer(this.refs.t1p2),
                    this.findPlayer(this.refs.t1p3),
                    this.findPlayer(this.refs.t1p4),
                    this.findPlayer(this.refs.t1p5)
                  ]

    for (var i=0; i < team1.length; i++) {
      if (team1[i] !== undefined) {
        returnArray.push(team1[i])
      }
    }

    return returnArray;
  },
  buildTeam2() {
    let returnArray = [];

    const team2 = [
                    this.findPlayer(this.refs.t2p1),
                    this.findPlayer(this.refs.t2p2),
                    this.findPlayer(this.refs.t2p3),
                    this.findPlayer(this.refs.t2p4),
                    this.findPlayer(this.refs.t2p5)
                  ]

    for (var i=0; i < team2.length; i++) {
      if (team2[i] !== undefined) {
        returnArray.push(team2[i])
      }
    }

    return returnArray;
  },
  evaluateTrade(e) {
    // Update the page's title
    e.preventDefault();
    window.scrollTo(0, 0);

    this.setState({team1:this.buildTeam1()});
    this.setState({team2:this.buildTeam2()});
    this.setState({showResults: true})

    let team1Value = 0;

    for (var i=0; i<this.state.team1.length;i++) {
      team1Value += this.state.team1[i].value;
    }

    let team2Value = 0;

    for (var i=0; i<this.state.team2.length;i++) {
      team2Value += this.state.team2[i].value;
    }

  },
  clearInput() {
    $(".playerList").each(function(){
      $(this).val("");
    })
    this.replaceState({
      team1: [],
      team2: [],
      showResults: false
    })
  },
  render() {

    let names = [];

    for (var i=0; i < this.data.players.length; i++) {
      names.push(this.data.players[i].name);
    }

    $('.playerList').on("focus", function(){
      $(this).autocomplete({
       source: names
      });
    });

    const resultsComponent = !!this.state.showResults ? 
                                <div className="row">
                                  <Results 
                                    team1={this.state.team1}
                                    team2={this.state.team2}
                                    players={this.data.players}
                                    clearEvent={this.clearInput} /> 
                                </div> : "";
    return (
      <div>
          <div className="row">
              <div className="col-md-6 col-md-offset-3">
                <div className="panel-body inf-content">
                    <div className="col-md-12">
                        <h3>How to use:</h3>
                        <p>Add the players being exchanged to the corresponding teams in the inputs below. The calculator will output their values, as well as how much value each team receives and a player that might make the trade more fair.</p>
                        <p>You can also add draft picks. 2016 picks are listed as absolute picks, i.e. Pick 1 - Pick 48. Future picks can be found by using the year of the pick (out to 2018) and the round (up to 4th), i.e. 2017 1st or 2018 4th.</p>
                        <h2 className="warning"> WARNING-EXPERIMENTAL </h2>
                    </div>
                </div>
              </div>
          </div>
        {resultsComponent}
        <div className="row">
          <div className="col-md-6">
            <div className="text-center">
              <h2>Team 1 Sends:</h2>
            </div>
            <div className="form-group">
                <input 
                  type="text"
                  className="form-control playerList"
                  id="players"
                  ref="t1p1"
                  placeholder="Player 1"
                  autoComplete="on" />
            </div>
            <div className="form-group">
                <input 
                  type="text"
                  className="form-control playerList"
                  id="players"
                  ref="t1p2"
                  placeholder="Player 2"
                  autoComplete="on" />
            </div>
            <div className="form-group">
                <input 
                  type="text"
                  className="form-control playerList"
                  id="players"
                  ref="t1p3"
                  placeholder="Player 3"
                  autoComplete="on" />
            </div>
            <div className="form-group">
              <input 
                type="text"
                className="form-control playerList"
                id="players"
                ref="t1p4"
                placeholder="Player 4"
                autoComplete="on" />
            </div>
            <div className="form-group">
              <input 
                type="text"
                className="form-control playerList"
                id="players"
                ref="t1p5"
                placeholder="Player 5"
                autoComplete="on" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="text-center">
              <h2>Team 2 Sends:</h2>
            </div>
            <div className="form-group">
                <input 
                  type="text"
                  className="form-control playerList"
                  id="players"
                  ref="t2p1"
                  placeholder="Player 1"
                  autoComplete="on" />
            </div>
            <div className="form-group">
                <input 
                  type="text"
                  className="form-control playerList"
                  id="players"
                  ref="t2p2"
                  placeholder="Player 2"
                  autoComplete="on" />
            </div>
            <div className="form-group">
                <input 
                  type="text"
                  className="form-control playerList"
                  id="players"
                  ref="t2p3"
                  placeholder="Player 3"
                  autoComplete="on" />
            </div>
            <div className="form-group">
              <input 
                type="text"
                className="form-control playerList"
                id="players"
                ref="t2p4"
                placeholder="Player 4"
                autoComplete="on" />
            </div>
            <div className="form-group">
              <input 
                type="text"
                className="form-control playerList"
                id="players"
                ref="t2p5"
                placeholder="Player 5"
                autoComplete="on" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 text-center">
            <button className="btn btn-primary btn-lg" onClick={this.evaluateTrade}>Evaluate Trade</button>
          </div>
        </div>
      </div>
    );
  }
});