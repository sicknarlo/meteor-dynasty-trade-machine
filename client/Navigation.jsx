const {
  Link,
  History
} = ReactRouter;

// Navigation bar for the public app
AppNavBar = React.createClass({
  render() {
        // <ul className="nav navbar-nav navbar-right">
        //   <NavLink to="/signin">Sign In</NavLink>
        // </ul>
          // <NavLink to="/faq">F.A.Q.</NavLink>
    return (
      <NavBar brandRoute="/">
        <ul className="nav navbar-nav">
          <NavLink to="/" index>Home</NavLink>
          <NavLink to="/players">Players</NavLink>
          <NavLink to="/calculator">Calculator</NavLink>
          <NavLink to="/players-2qb">Players - 2QB</NavLink>
          <NavLink to="/calculator-2qb">Calculator - 2QB</NavLink>
        </ul>
      </NavBar>
    );
  }
});


// Navigation bar the authentication-protected app
AuthenticatedAppNavBar = React.createClass({
  render() {
    return (
      <NavBar brandRoute="/app">
        <ul className="nav navbar-nav">
          <NavLink to="/app" index>App Index</NavLink>
          {/* Additional links for the authenticated app go here */}
        </ul>
        <button className="btn btn-default navbar-right" style={{marginTop: "8px"}} onClick={this.props.signOut}>Sign Out</button>
      </NavBar>
    );
  }
});


// A reusable component for creating navigation bars
var NavBar = React.createClass({
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#nav-collapse" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to={this.props.brandRoute}>Dynasty Trade Machine</Link>
          </div>
          <div className="collapse navbar-collapse" id="nav-collapse">
            {/* Components of the navigation bar will be rendered here */}
            {this.props.children}
          </div>
        </div>
      </nav>
    );
  }
});

var NavLink = React.createClass({
  mixins: [History],
  render() {
    let isIndex = this.props.index !== undefined;
    let isActive = this.history.isActive(this.props.to, this.props.query, isIndex);
    let className = isActive ? 'active' : '';

    return (
      <li className={className}><Link to={this.props.to}>{this.props.children}</Link></li>
    );
  }
});
