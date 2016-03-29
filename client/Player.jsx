const {Link} = ReactRouter;

ChartADP = React.createClass({
  buildChart(status) {
    const props = status == "this" ? this.props : status;
    const player = props.player
    const data = [
                  player.mar_16,
                  player.feb_16,
                  player.jan_16,
                  player.dec_15,
                  player.nov_15,
                  player.oct_15,
                  player.sept_15
                                ]
    $('#adp-chart').highcharts({
        title: {
            text: props.player.name,
            x: -20 //center
        },
        subtitle: {
            text: 'Average Draft Position',
            x: -20
        },
        xAxis: {
            categories: ['Mar 16', 'Feb 16', 'Jan 16', 'Dec 15', 'Nov 15', 'Oct 15', 'Sept 15'],
            reversed: true
        },
        yAxis: {
            title: {
                text: 'ADP'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }],
            reversed: true
        },
        tooltip: {
            valueSuffix: ''
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'AVG',
            data: data
        }]
    });
  },
  componentDidMount: function() {
    this.buildChart("this");
    $('html,body').animate({ scrollTop: 0 }, 'slow');
  },
  componentWillReceiveProps: function(nextProps) {
    this.buildChart(nextProps);
    $('html,body').animate({ scrollTop: 0 }, 'slow');
  },
  render() {


    return (
      <div id='adp-chart'></div>
    );
  }
});


Player = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      players: Players.find({}, {sort: {mar_16: 1}}).fetch(),
      player: Players.find({id: parseInt(this.props.params.playerId)}).fetch()
    };
  },
  componentWillMount() {
    // Update the page's title
    document.title = this.data.player.name ? this.data.player.name : "Player";

  },
  _calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  },
  componentWillUpdate() {
    
  },
  _renderheight(inches) {
    const ft = Math.floor(inches / 12);
    const i = inches % 12;
    return ft + "'" + i + "\"";
  },
  _renderTrendArrow (player) {
    const trend = player.trend;
    if (trend > 0) {
      return "glyphicon glyphicon-arrow-up green";
    } else if (trend === 0) {
      return "glyphicon glyphicon-resize-horizontal";
    } else {
      return "glyphicon glyphicon-arrow-down red";
    }
    
  },
  _buildSimilarPlayers(player) {
    const playerIndex = this.data.players.indexOf(player);
    let previous10 = [];
    let next10 = [];

    if (playerIndex < 5) {
      previous10 = this.data.players.slice(0, playerIndex);
    } else {
      previous10 = this.data.players.slice(playerIndex - 5, playerIndex);
    }

    if (playerIndex + 5 > this.data.players.length - 1) {
      next10 = this.data.players.slice(playerIndex + 1, -1)
    } else {
      next10 = this.data.players.slice(playerIndex + 1, (playerIndex + 1) + 5);
    }

    previous10.push(player);

    return previous10.concat(next10);

  },
  _renderStars(adp) {
    if (adp < 10) {
      return (
          <ul title="Ratings" className="list-inline ratings text-center">
            <li><span className="rating-star glyphicon glyphicon-star"></span></li>
            <li><span className="rating-star glyphicon glyphicon-star"></span></li>
            <li><span className="rating-star glyphicon glyphicon-star"></span></li>
            <li><span className="rating-star glyphicon glyphicon-star"></span></li>
            <li><span className="rating-star glyphicon glyphicon-star"></span></li>
          </ul>
        )
    } else if (adp < 25) {
       return (
          <ul title="Ratings" className="list-inline ratings text-center">
            <li><span className="rating-star glyphicon glyphicon-star"></span></li>
            <li><span className="rating-star glyphicon glyphicon-star"></span></li>
            <li><span className="rating-star glyphicon glyphicon-star"></span></li>
            <li><span className="rating-star glyphicon glyphicon-star"></span></li>
            <li><span className="rating-star glyphicon glyphicon-star-empty"></span></li>
          </ul>
        )
    } else if (adp < 50) {
       return (
          <ul title="Ratings" className="list-inline ratings text-center">
            <li><span className="rating-star glyphicon glyphicon-star"></span></li>
            <li><span className="rating-star glyphicon glyphicon-star"></span></li>
            <li><span className="rating-star glyphicon glyphicon-star"></span></li>
            <li><span className="rating-star glyphicon glyphicon-star-empty"></span></li>
            <li><span className="rating-star glyphicon glyphicon-star-empty"></span></li>
          </ul>
        )
    } else if (adp < 100) {
       return (
          <ul title="Ratings" className="list-inline ratings text-center">
            <li><span className="rating-star glyphicon glyphicon-star"></span></li>
            <li><span className="rating-star glyphicon glyphicon-star"></span></li>
            <li><span className="rating-star glyphicon glyphicon-star-empty"></span></li>
            <li><span className="rating-star glyphicon glyphicon-star-empty"></span></li>
            <li><span className="rating-star glyphicon glyphicon-star-empty"></span></li>
          </ul>
        )
    } else {
       return (
          <ul title="Ratings" className="list-inline ratings text-center">
            <li><span className="rating-star glyphicon glyphicon-star"></span></li>
            <li><span className="rating-star glyphicon glyphicon-star-empty"></span></li>
            <li><span className="rating-star glyphicon glyphicon-star-empty"></span></li>
            <li><span className="rating-star glyphicon glyphicon-star-empty"></span></li>
            <li><span className="rating-star glyphicon glyphicon-star-empty"></span></li>
          </ul>
        )
    }
  },
  render() {

    if (this.data.player.length > 0 ) {

      const pId = this.data.player[0].id;
      const player = this.data.players.filter(function ( p ) {
          return p.id == pId;
      })[0];

      const imgLoc = player.position == "PICK" ? "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png" 
                                               : "http://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/" + player.espn_id + ".png&w=350&h=254";

      const experience = player.draft_year == "PICK" ? "PICK" : this._calculateAge(new Date(player.draft_year - 1, 4, 1)) + " years";
      const age = player.birthdate == "PICK" ? "PICK" : this._calculateAge(new Date(player.birthdate * 1000));
      const stars = this._renderStars(player.mar_16);
      const similarPlayers = this._buildSimilarPlayers(player);
      const height = player.height == "PICK" ? "PICK" : this._renderheight(player.height);
      const weight = player.weight == "PICK" ? "PICK" : player.weight + "lbs";
      const hideRoto = player.rotoworld_id == "PICK" ? 'hidden' : "roto-link";
      const rotoLink = player.rotoworld_id == "PICK" ? '' : "http://www.rotoworld.com/player/nfl/" + player.rotoworld_id;
      const twitterLink = "https://twitter.com/" + player.twitter_username;
      const pName = player.name ? player.name.split(" ") : "";
      const rssURL = "https://www.fantasysp.com/rss/nfl/player!" + pName[0] + "_" + pName[1] + "/";

      return (
        
        <div>
          <div className="row bootstrap snippet">
            <div className="panel-body inf-content">
                <div className="row">
                    <div className="col-md-4 profile-panel">
                        <img alt="" title="" className="img-circle img-thumbnail isTooltip player-profile" src={imgLoc} data-original-title="Usuario" /> 
                        {stars}
                        <span className="roto-link"><a href={rotoLink}>Get the latest news on {player.name} at Rotoworld</a></span>
                    </div>
                    <div className="col-md-6 profile-panel">
                        <h2>{player.name}</h2>
                        <div className="table-responsive">
                        <table className="table table-condensed table-responsive table-user-information">
                            <tbody>
                                <tr>        
                                    <td>
                                        <strong>
                                            Age                                               
                                        </strong>
                                    </td>
                                    <td className="text-primary">
                                        {age}    
                                    </td>
                                </tr>
                                <tr>    
                                    <td>
                                        <strong>
                                            Position                                                
                                        </strong>
                                    </td>
                                    <td className="text-primary">
                                        {player.position}     
                                    </td>
                                </tr>
                                <tr>        
                                    <td>
                                        <strong>
                                            Team                                                
                                        </strong>
                                    </td>
                                    <td className="text-primary">
                                        {player.team}  
                                    </td>
                                </tr>

                                <tr>        
                                    <td>
                                        <strong>
                                            Experience                                                
                                        </strong>
                                    </td>
                                    <td className="text-primary">
                                        {experience} 
                                    </td>
                                </tr>


                                <tr>        
                                    <td>
                                        <strong>
                                            Height                                                
                                        </strong>
                                    </td>
                                    <td className="text-primary">
                                        {height}
                                    </td>
                                </tr>
                                <tr>        
                                    <td>
                                        <strong>
                                            Weight                                                
                                        </strong>
                                    </td>
                                    <td className="text-primary">
                                        {weight} 
                                    </td>
                                </tr>
                                <tr>        
                                    <td>
                                        <strong>
                                            College                                               
                                        </strong>
                                    </td>
                                    <td className="text-primary">
                                        {player.college}
                                    </td>
                                </tr>
                                <tr>        
                                    <td>
                                        <strong>
                                            Twitter Username                                               
                                        </strong>
                                    </td>
                                    <td className="text-primary">
                                        <a href={twitterLink}>{player.twitter_username}</a>
                                    </td>
                                </tr>                                 
                            </tbody>
                        </table>
                        </div>
                    </div>
                    <div className="col-md-2">
                      <div className="panel panel-default">
                        <div className="panel-heading text-center">
                           <h3 className="panel-title">Value</h3>
                        </div>
                        <div className="panel-body text-center">
                          <strong><h3><span className="glyphicon glyphicon-tag"></span> {player.value}</h3></strong>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading text-center">
                          <h3 className="panel-title">ADP</h3>
                        </div>
                        <div className="panel-body text-center">
                          <strong><h3><span className="glyphicon glyphicon-signal"></span> {player.mar_16}</h3></strong>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading text-center">
                           <h3 className="panel-title">3 Mo. Trend</h3>
                        </div>
                        <div className="panel-body text-center">
                          <strong><h3><span className={this._renderTrendArrow(player)}></span> {player.trend}</h3></strong>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <ChartADP
                player={player} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
               <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>ADP</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {similarPlayers.map((p) => {
                    if (p == player) {
                       return (<tr className="info">
                            <td><Link to={"/players/" + p.id}>{p.name}</Link></td>
                            <td>{p.position}</td>
                            <td>{p.mar_16}</td>
                            <td>{p.value}</td>
                          </tr>);
                    } else {
                        return (<tr>
                                  <td><Link to={"/players/" + p.id}>{p.name}</Link></td>
                                  <td>{p.position}</td>
                                  <td>{p.mar_16}</td>
                                  <td>{p.value}</td>
                                </tr>);
                      }
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>                                        
      );
    } else {
      return <div></div>
    }
  }

});
