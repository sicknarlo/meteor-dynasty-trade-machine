const {
  Router,
  Route,
  IndexRoute,
  history,
  Link
} = ReactRouter;

const browserHistory = history.createHistory();
          // <Route path="faq" component={Faq}/>

Routes = React.createClass({
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Index}/>
          <Route path="players" component={Items}/>
          <Route path="players/:playerId" component={Player}/>
          <Route path="calculator" component={Calculator}/>
          <Route path="calculator-2qb" component={Calculator2QB}/>
          <Route path="2qb" component={PlayersSuperflex}/>
          <Route path="2qb/:playerId" component={Player2QB}/>
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
