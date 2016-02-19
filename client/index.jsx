Index = React.createClass({
  componentWillMount() {
    // Update the page's title
    document.title = "Dynasty Trade Machine";
  },
  render() {
    return (
      <div>

        <header className="jumbotron hero-spacer">
            <span className="hero-header">The Dynasty Trade Machine</span>
            <p className="hero-text">Helping dynasty fantasy football players use data and win championships.</p>
        </header>

        <hr/>

        <div className="row">
            <div className="col-lg-12">
                <h3>Latest Features</h3>
            </div>
        </div>

        <div className="row text-center">

            <div className="col-md-3 col-sm-6 hero-feature">
                <div className="thumbnail">
                    <img src="http://placehold.it/800x500" alt=""/>
                    <div className="caption">
                        <h3>Feature Label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        <p>
                            <a href="#" className="btn btn-primary">Buy Now!</a> <a href="#" className="btn btn-default">More Info</a>
                        </p>
                    </div>
                </div>
            </div>

            <div className="col-md-3 col-sm-6 hero-feature">
                <div className="thumbnail">
                    <img src="http://placehold.it/800x500" alt=""/>
                    <div className="caption">
                        <h3>Feature Label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        <p>
                            <a href="#" className="btn btn-primary">Buy Now!</a> <a href="#" className="btn btn-default">More Info</a>
                        </p>
                    </div>
                </div>
            </div>

            <div className="col-md-3 col-sm-6 hero-feature">
                <div className="thumbnail">
                    <img src="http://placehold.it/800x500" alt=""/>
                    <div className="caption">
                        <h3>Feature Label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        <p>
                            <a href="#" className="btn btn-primary">Buy Now!</a> <a href="#" className="btn btn-default">More Info</a>
                        </p>
                    </div>
                </div>
            </div>

            <div className="col-md-3 col-sm-6 hero-feature">
                <div className="thumbnail">
                    <img src="http://placehold.it/800x500" alt=""/>
                    <div className="caption">
                        <h3>Feature Label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        <p>
                            <a href="#" className="btn btn-primary">Buy Now!</a> <a href="#" className="btn btn-default">More Info</a>
                        </p>
                    </div>
                </div>
            </div>

        </div>

        <hr/>

        <footer>
            <div className="row">
                <div className="col-lg-12">
                    <p>Copyright &copy; Your Website 2014</p>
                </div>
            </div>
        </footer>

    </div>
    );
  }
});
