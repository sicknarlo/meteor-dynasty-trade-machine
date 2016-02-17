Index = React.createClass({
  componentWillMount() {
    // Update the page's title
    document.title = "Dynasty Trade Machine";
  },
  render() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <p>The Dynasty Trade Machine</p>
        </div>
      </div>
    );
  }
});
