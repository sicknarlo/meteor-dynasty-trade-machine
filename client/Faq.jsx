// A container component for basic views to be rendered in
Faq = React.createClass({
  render() {

    return (
      <div>
        <div className="col-md-12">
          <h1>Frequently Asked Questions</h1>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="panel panel-default">
              <div className="panel-heading">
                 <h2 className="panel-title">What is this?</h2>
              </div>
              <div className="panel-body">
                One thing dynasty football players struggle with — both green and veteran alike — is how to value players.
                The Dynasty Trade Machine is a suite of tools designed to help remove the inherent abstraction and provide
                a rough idea of player value relative to the market.
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="panel panel-default">
              <div className="panel-heading">
                 <h2 className="panel-title">What is ADP?</h2>
              </div>
              <div className="panel-body">
                ADP stands for <strong>average draft position</strong>. This is where players are going in mock start up drafts.
                So if Dez Bryant has an ADP if 9, that means over a series of mock drafts the average spot he is taken is 9th.
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="panel panel-default">
              <div className="panel-heading">
                 <h2 className="panel-title">How is ADP different from rankings? Why do you use that instead of rankings?</h2>
              </div>
              <div className="panel-body">
                Though they may look similar, ADP is inherently different because it is a reflection of where players are taken in
                the context of the entire field of possibilities. This means in a way it gives us an idea of how the community feels
                about players with all factors considered, including position, age, etc. ADP is better to use when looking at relative
                value because it shows where people are actually taking players instead of where people rank players when not forced to
                make a choice.
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="panel panel-default">
              <div className="panel-heading">
                 <h2 className="panel-title">What is this "value" number?</h2>
              </div>
              <div className="panel-body">
                "Value" is an arbitrary number we put on players based on their most recent ADP. The number is completely relative to
                where that player is drafted amongst the field of other assets. Our value is assigned to try and reflect the decrease
                in value between each spot during a draft. This is very difficult and hardly exact, so our system is constantly evolving
                to try and reflect what we see fair value is.
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="panel panel-default">
              <div className="panel-heading">
                 <h2 className="panel-title">Why are the top players worth exponentially more than the middle and bottom players?</h2>
              </div>
              <div className="panel-body">
                Value is designed to drop significantly to emphasize the value of studs. You will never be able to overload a side of
                a trade in our calculator for lesser assets to get the top player. This is not an exact science. Suggestions for how to improve are welcome.
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="panel panel-default">
              <div className="panel-heading">
                 <h2 className="panel-title">What league settings are these numbers based on?</h2>
              </div>
              <div className="panel-body">
                A large number of leagues play 1QB PPR. ADP data, and thus this site, reflect that. This is not so much a personal choice or preference
                as just the reality of the data we have available.
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="panel panel-default">
              <div className="panel-heading">
                 <h2 className="panel-title">Will you support 2QB/IDP/coaches/[insert whatever here]?</h2>
              </div>
              <div className="panel-body">
                Because almost all of the ADP out there is specific to 1QB PPR, there is not enough to support any other formats. We are working on finding
                ways to incorporate the more popular formats (IDP and 2QB specifically), but in the meantime they simply cannot be supported.
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="panel panel-default">
              <div className="panel-heading">
                 <h2 className="panel-title">Where do you get your ADP? What sites do you recommend for general content?</h2>
              </div>
              <div className="panel-body">
                There are some really great resources out there, for ADP and more. If you are looking for ADP numbers, or overall great content, start here:
                <ul>
                  <li><a href="http://dynastyleaguefootball.com/">Dynasty League Football</a> is a great place to find ADP and quality content. Well worth the low
                  cost, and in addition to ADP you get excellent premium content.</li>
                  <li><a href="http://www.dynastynerds.com/">Dynasty Nerds</a> has great ADP and rankings, as well as one of the best podcasts out there.</li>
                  <li><a href="www.fantasypros.com">Fantasy Pros</a> typically isn't though of much when you think of dynasty, but they have a growing solid
                  dynasty section including great dynasty rankings from a couple of well regarded writers.</li>
                  <li><a href="www.reddit.com/r/dynastyff">Reddit's Dynasty Fantasy Football subreddit</a> is hands down the best resource out there. Lot's of 
                  great original content, awesome participation, and a good place to field questions. Can't recommend this enough.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="panel panel-default">
              <div className="panel-heading">
                 <h2 className="panel-title">Where are the ads?</h2>
              </div>
              <div className="panel-body">
                This tool originally began as an Excel sheet. It eventually evolved into this app with the intention of providing a tool for people to use 
                without being bombarded by daily fantasy sports ads. You will never see one on this site, period.
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="panel panel-default">
              <div className="panel-heading">
                 <h2 className="panel-title">What does it cost to run the site?</h2>
              </div>
              <div className="panel-body">
                The web app was recently completely rebuilt to be faster, more stable, and to never sleep. As a result hosting costs have gone up. You will 
                never see an ad. You will never have to pay to use any of these tools. If you'd like to donate to help offset server/hosting costs, they are appreciated.
                <span className="text-center">
                <br />
                <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                  <input type="hidden" name="cmd" value="_s-xclick" />
                  <input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----
                  " />
                  <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" />
                  <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
                </form>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});