Player = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      players: Players.find({}, {sort: {avg_116: 1}}).fetch()
    };
  },
  componentWillMount() {
    // Update the page's title
    document.title = "funk";
  },
  render() {
    const pId = this.props.params.playerId;
    const player = this.data.players.filter(function ( p ) {
        return p._id._str == pId;
    })[0];
    return (
      <div className="container">
        <ul>
          <li>{player.name}</li>
        </ul>
      </div>
    );
  }
});
