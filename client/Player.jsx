const {Link} = ReactRouter;

ChartADP = React.createClass({
  buildChart(status) {
    const props = status == "this" ? this.props : status;
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
            categories: ['Jan 16', 'Dec 15', 'Nov 15', 'Oct 15', 'Sept 15'],
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
            name: 'Dynasty League Football',
            data: [props.player.dlf_116,props.player.dlf_1215,props.player.dlf_1115,props.player.dlf_1015, props.player.dlf_915]
        }, {
            name: 'Dynasty Nerds',
            data: [props.player.dn_116, props.player.dn_1215]
        },{
            name: 'Fantasy Pros',
            data: [props.player.fp_116]
        }, {
            name: 'Average',
            data: [props.player.avg_116,props.player.avg_1215,props.player.avg_1115,props.player.avg_1015, props.player.avg_915]
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
      players: Players.find({}, {sort: {avg_116: 1}}).fetch(),
      player: Players.find({id: parseInt(this.props.params.playerId)}).fetch()
    };
  },
  componentWillMount() {
    // Update the page's title
    document.title = "funk";
  },
  _calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  },
  _renderheight(inches) {
    const ft = Math.floor(inches / 12);
    const i = inches % 12;
    return ft + "'" + i + "\"";
  },
  _renderTrendArrow (player) {
    const trend = player.avg_1215 - player.avg_116;
    if (trend > 0) {
      return "glyphicon glyphicon-arrow-up green";
    } else if (trend == 0) {
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
            <li><a href="#"><span className="rating-star glyphicon glyphicon-star"></span></a></li>
            <li><a href="#"><span className="rating-star glyphicon glyphicon-star"></span></a></li>
            <li><a href="#"><span className="rating-star glyphicon glyphicon-star"></span></a></li>
            <li><a href="#"><span className="rating-star glyphicon glyphicon-star"></span></a></li>
            <li><a href="#"><span className="rating-star glyphicon glyphicon-star"></span></a></li>
          </ul>
        )
    } else if (adp < 25) {
       return (
          <ul title="Ratings" className="list-inline ratings text-center">
            <li><a href="#"><span className="rating-star glyphicon glyphicon-star"></span></a></li>
            <li><a href="#"><span className="rating-star glyphicon glyphicon-star"></span></a></li>
            <li><a href="#"><span className="rating-star glyphicon glyphicon-star"></span></a></li>
            <li><a href="#"><span className="rating-star glyphicon glyphicon-star"></span></a></li>
          </ul>
        )
    } else if (adp < 50) {
       return (
          <ul title="Ratings" className="list-inline ratings text-center">
            <li><a href="#"><span className="rating-star glyphicon glyphicon-star"></span></a></li>
            <li><a href="#"><span className="rating-star glyphicon glyphicon-star"></span></a></li>
            <li><a href="#"><span className="rating-star glyphicon glyphicon-star"></span></a></li>
          </ul>
        )
    } else if (adp < 100) {
       return (
          <ul title="Ratings" className="list-inline ratings text-center">
            <li><a href="#"><span className="rating-star glyphicon glyphicon-star"></span></a></li>
            <li><a href="#"><span className="rating-star glyphicon glyphicon-star"></span></a></li>
          </ul>
        )
    } else {
       return (
          <ul title="Ratings" className="list-inline ratings text-center">
            <li><a href="#"><span className="rating-star glyphicon glyphicon-star"></span></a></li>
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

      const imgLoc = player.espn_id == "PICK" ? "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png" 
                                               : "http://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/" + player.espn_id + ".png&w=350&h=254";

      const experience = player.draft_year == "PICK" ? "PICK" : this._calculateAge(new Date(player.draft_year - 1, 4, 1)) + " years";
      const age = player.birthdate == "PICK" ? "PICK" : this._calculateAge(new Date(player.birthdate * 1000));
      const stars = this._renderStars(player.avg_116);
      const similarPlayers = this._buildSimilarPlayers(player);
      const height = player.height == "PICK" ? "PICK" : this._renderheight(player.height);
      const weight = player.weight == "PICK" ? "PICK" : player.weight + "lbs";
      const hideRoto = player.rotoworld_id == "PICK" ? 'hidden' : "roto-link";
      const rotoLink = player.rotoworld_id == "PICK" ? '' : "http://www.rotoworld.com/player/nfl/" + player.rotoworld_id;
      const twitterLink = "https://twitter.com/" + player.twitter_username

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
                          <strong><h3><span className="glyphicon glyphicon-signal"></span> {player.avg_116}</h3></strong>
                        </div>
                      </div>
                      <div className="panel panel-default">
                        <div className="panel-heading text-center">
                           <h3 className="panel-title">Trend</h3>
                        </div>
                        <div className="panel-body text-center">
                          <strong><h3><span className={this._renderTrendArrow(player)}></span> {Math.ceil(player.avg_1215 - player.avg_116)}</h3></strong>
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
                            <td><Link to={"/items/" + p.id}>{p.name}</Link></td>
                            <td>{p.position}</td>
                            <td>{p.avg_116}</td>
                            <td>{p.value}</td>
                          </tr>);
                    } else {
                        return (<tr>
                                  <td><Link to={"/items/" + p.id}>{p.name}</Link></td>
                                  <td>{p.position}</td>
                                  <td>{p.avg_116}</td>
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
