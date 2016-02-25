// A container component for basic views to be rendered in
App = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      players: Players.find({}, {sort: {feb_16: 1}}).fetch()
    };
  },
  render() {

    return (
      <div>
        <AppNavBar/>
        <div className="container">
          {/* Views will be rendered here */}
          {this.props.children}
        </div>
      </div>
    );
  }
});
