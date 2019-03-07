import React, { Component } from "react";
import {
  Container,
  BoxList,
  Row,
  MiniContent,
  Button,
  HeaderTitle,
  TableOverview,
  TableFooter,
  TableStyle,
  Column
} from "../../style/init";
import BoxItem from "../../Reuseable/BoxItem";
import { Link } from "react-router-dom";
import { colour } from "../../style/colour";

// carousel
import Swiper from "react-id-swiper";

//  redux
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

// datamaps
import Datamap from "datamaps";
import d3 from "d3";

class Overview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editable: false,
      Headers: ["Name", "Upload Date", "Download"],
      Footer: [
        {
          name: "See All",
          icon: require("../../assets/imgs/chevron/right.svg")
        }
      ],
      AllVideo: false,
      datamap: null,
      active: "active1"
    };

    this.element = React.createRef();
    // swiper
    this.goNext = this.goNext.bind(this);
    this.goPrev = this.goPrev.bind(this);
    this.swiper = null;
  }

  goNext() {
    if (this.swiper) this.swiper.slideNext();
  }

  goPrev() {
    if (this.swiper) this.swiper.slidePrev();
  }

  componentDidMount() {
    this.renderDataMaps("world", "", "", "", "active1");

    if (this.props.Content === null) {
      this.callVideoPerPage();
    } else {
      return false;
    }
    // fetch all users
    this.callAllUser();
  }

  // datamaps
  renderDataMaps(scope, dataUrl, lat, long, active) {
    this.setState({ active: active });
    let existing = document.querySelectorAll(".datamap");

    existing.forEach(node => node.parentNode.removeChild(node));

    let maps = {
      element: this.element.current,
      fills: {
        defaultFill: "#D3D3D3"
      },

      scope: scope,
      responsive: true,
      geographyConfig: {
        dataUrl: dataUrl
      }
    };

    if (scope !== "world") {
      maps.setProjection = function(element, options) {
        console.log(options);
        var projection = d3.geo
          .mercator()
          .center([lat, long]) // always in [East Latitude, North Longitude]
          .scale(1500)
          .translate([element.offsetWidth / 2, element.offsetHeight / 2]);

        var path = d3.geo.path().projection(projection);

        return { path: path, projection: projection };
      };
    }

    this.setState({ datamap: new Datamap(maps) });

  }

  // fetch Video per page
  callVideoPerPage = () => {
    this.props.fetchVideoPerPage();
  };
  // fetch all users
  callAllUser = () => {
    this.props.fetchAllUsers();
  };
  // see all videos
  callAllVideos = () => {
    this.props.fetchAllVideos();
  };

  // go back
  toggle = () => {
    this.props.toggleView();
  };

  render() {
    const { Headers, Footer } = this.state;

    let view;
    const {
      Content,
      availableVideos,
      allUsers,
      allContent,
      AllVideo
    } = this.props;

    if (AllVideo) {
      view = (
        <MiniContent width="100%">
          <div className="top">
            <h2>Videos</h2>

            <Button
              width="153px"
              height="45px"
              fontColor={colour.secondary}
              bgColor={colour.accentMedium}
              onClick={this.toggle}
            >
              Go back
            </Button>
          </div>
          <div className="content" style={{ width: "100%", height: "100%" }}>
            <TableStyle>
              <Column>
                <TableOverview>
                  {Headers.map((head, index) => {
                    return (
                      <p key={index} className="header">
                        {head}
                      </p>
                    );
                  })}
                </TableOverview>
                <hr />

                {allContent.map((row, index) => {
                  return (
                    <React.Fragment key={index}>
                      <TableOverview>
                        <p>{row.name}</p>
                        <p>{row.releaseDate}</p>
                        <p>{row.numberOfUsage}</p>
                      </TableOverview>
                      <hr />
                    </React.Fragment>
                  );
                })}
              </Column>
            </TableStyle>
          </div>
        </MiniContent>
      );
    } else {
      view = (
        <>
          <HeaderTitle>
            <h2>OVERVIEW</h2>
          </HeaderTitle>

          <BoxList>
            <BoxItem
              icon={require("../../assets/imgs/boxlist/Video.svg")}
              title="Available Videos"
              value={availableVideos}
            />
            <BoxItem
              icon={require("../../assets/imgs/boxlist/Money.svg")}
              title="All-time sales"
              value="NGN 4.5m"
            />
            <BoxItem
              icon={require("../../assets/imgs/boxlist/Happy.svg")}
              title="Total users"
              value={allUsers + ` users`}
            />
          </BoxList>

          <Row>
            <MiniContent width="48%">
              <div className="top">
                <h2>Usage Statistics</h2>
              </div>
              <div
                className="content"
                style={{ width: "100%", height: "485px" }}
              >
                {/* google map here */}
                <div
                  ref={this.element}
                  style={{
                    height: "360px",
                    width: "400px",
                    position: "relative",
                    left: "10.03%",
                    top: "60px"
                  }}
                />

                <hr id="map-line" />
                <div className="map-nav">
                  <Swiper
                    ref={node => (node ? (this.swiper = node.swiper) : null)}
                    id="nav"
                  >
                    <p
                      className={[
                        this.state.active === "active1" ? "active" : null
                      ].join(" ")}
                      onClick={this.renderDataMaps.bind(
                        this,
                        "world",
                        "",
                        "",
                        "",
                        "active1"
                      )}
                    >
                      All
                    </p>
                    <p
                      className={[
                        this.state.active === "active2" ? "active" : null
                      ].join(" ")}
                      onClick={this.renderDataMaps.bind(
                        this,
                        "nga",
                        "https://raw.githubusercontent.com/markmarkoh/datamaps/master/src/js/data/nga.topo.json",
                        "9.0778",
                        "8.6775",
                        "active2"
                      )}
                    >
                      Nigeria
                    </p>
                    <p
                      className={[
                        this.state.active === "active3" ? "active" : null
                      ].join(" ")}
                      onClick={this.renderDataMaps.bind(
                        this,
                        "ken",
                        "https://raw.githubusercontent.com/markmarkoh/datamaps/master/src/js/data/ken.topo.json",
                        "37.9083",
                        "0.1769",
                        "active3"
                      )}
                    >
                      Kenya
                    </p>
                    <p
                      className={[
                        this.state.active === "active4" ? "active" : null
                      ].join(" ")}
                      onClick={this.renderDataMaps.bind(
                        this,
                        "gha",
                        "https://raw.githubusercontent.com/markmarkoh/datamaps/master/src/js/data/gha.topo.json",
                        "5.5500",
                        "-0.2500",
                        "active4"
                      )}
                    >
                      Ghana
                    </p>
                    <p
                      className={[
                        this.state.active === "active5" ? "active" : null
                      ].join(" ")}
                      onClick={this.renderDataMaps.bind(
                        this,
                        "south-africa",
                        "active5"
                      )}
                    >
                      South Africa
                    </p>

                    <p>Nigeria</p>
                    <p>Kenya</p>
                    <p>Ghana</p>
                    <p>South Africa</p>

                    <p>Nigeria</p>
                    <p>Kenya</p>
                    <p>Ghana</p>
                    <p>South Africa</p>
                  </Swiper>

                  <div className="group-icon">
                    <button onClick={this.goPrev}>
                      <img
                        src={require("../../assets/imgs/chevron/chevron-right.svg")}
                        alt="chevron-right"
                      />
                    </button>

                    <button onClick={this.goNext}>
                      <img
                        src={require("../../assets/imgs/chevron/chevron-left.svg")}
                        alt="chevron-left"
                      />
                    </button>
                  </div>
                </div>
                {/* google map end here */}
              </div>
            </MiniContent>

            <MiniContent width="48%">
              <div className="top">
                <h2>Videos</h2>

                <Link to="/add-videos">
                  <Button
                    width="153px"
                    height="45px"
                    fontColor={colour.secondary}
                    bgColor={colour.accentMedium}
                  >
                    Add New Video
                  </Button>
                </Link>
              </div>
              <div
                className="content"
                style={{ width: "100%", height: "100%" }}
              >
                <TableStyle>
                  <Column>
                    <TableOverview>
                      {Headers.map((head, index) => {
                        return (
                          <p key={index} className="header">
                            {head}
                          </p>
                        );
                      })}
                    </TableOverview>
                    <hr />

                    {Content &&
                      Content.map((row, index) => {
                        return (
                          <React.Fragment key={index}>
                            <TableOverview>
                              <p>{row.name}</p>
                              <p>{row.releaseDate}</p>
                              <p>{row.numberOfUsage}</p>
                            </TableOverview>
                            <hr />
                          </React.Fragment>
                        );
                      })}

                    {Footer.map((footer, index) => {
                      return (
                        <TableFooter key={index}>
                          <span onClick={this.callAllVideos}>
                            <p>{footer.name}</p>
                            <img src={footer.icon} alt={footer.name} />
                          </span>
                        </TableFooter>
                      );
                    })}
                  </Column>
                </TableStyle>
              </div>
            </MiniContent>
          </Row>
        </>
      );
    }

    return <Container>{view}</Container>;
  }
}

const mapStateToProps = state => ({
  Content: state.overViewReducer.Content,
  availableVideos: state.overViewReducer.availableVideos,
  allUsers: state.overViewReducer.allUsers,
  allContent: state.overViewReducer.allContent,
  AllVideo: state.overViewReducer.AllVideo
});

const mapDispatchToProps = dispatch => ({
  fetchVideoPerPage: () => dispatch(actions.fetchVideoPerPage()),
  fetchAllUsers: () => dispatch(actions.fetchAllUsers()),
  fetchAllVideos: () => dispatch(actions.fetchAllVideos()),
  toggleView: () => dispatch(actions.toggleView())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Overview);
