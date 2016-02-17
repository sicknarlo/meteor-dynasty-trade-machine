const {
  Router,
  Route,
  IndexRoute,
  history,
  Link
} = ReactRouter;

const browserHistory = history.createHistory();

Routes = React.createClass({
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Index}/>
          <Route path="items" component={Items}/>
          <Route path="items/:playerId" component={Player}/>
          <Route path="calculator" component={Calculator}/>
          <Route path="signin" component={SignIn}/>
        </Route>
        <Route path="/app" component={AuthenticatedApp}>
          <IndexRoute component={AuthenticatedAppIndex}/>
          {/* Additional routes requiring authentication go here */}
        </Route>
      </Router>
    );
  }
});
