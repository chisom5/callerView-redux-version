import React, { Component } from "react";

// react-bootstrap-table
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

// bootstrap and custom css
import "bootstrap/dist/css/bootstrap.min.css";
import "./tableList.css";

// styled-component
import {
  Button,
  FormContainer,
  RowRight,
  Row,
  FormUpload,
  ImageForm,
  FormLabel,
  FormInput,
  Form
} from "../../../../style/init";
import { colour } from "../../../../style/colour";

// axios
import axios from "axios";
import API from "../../../../api/constant";

// select and option component
import VideoListSelect from "../select/select";
import VideoListOption from "../select/option";

// library
import { Player } from "video-react";

// dummy data
import { video } from "./data";

// modal for the edit alone
import ModalVideoList from "../modal";
import toastr from "toastr";

// redux
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";

// added custom file
const { SearchBar } = Search;

const defaultSorted = [
  {
    dataField: "name",
    order: "desc"
  }
];

const customPagination = {
  sizePerPageList: [{ text: "5", value: 5 }]
};

class TableList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: null,
      checkoxes: null,
      categories: this.props.category,
      regions: this.props.region,
      selected: [],

      content:this.props.content,
      videoDetails: {
        name: "",
        link: "",
        category: "",
        region: "",
        releaseDate: "",
        image: ""
      },
      loading: false,
      loadingProgress: false,
      upProgress: 0,
      isUploading: false,
      imageText: false
    };

    this.uploadInput = React.createRef();
    this.imageInput = React.createRef();
    // this.pause = this.pause.bind(this);
  }

  componentDidMount() {
    // fetch all videos
    this.fetchVideos();

    // fetch all category
    this.fetchAllCategory();

    // fetch all region
    this.fetchAllRegion();
  }

  componentWillMount() {
    // react-bootstrap table checkboxes
    const selectRow = {
      mode: "checkbox",
      clickToSelect: false,
      hideSelectAll: true
    };

    // set state of columns
    const columns = [
      {
        dataField: "name",
        text: "Name"
      },
      {
        dataField: "category",
        text: "Category"
      },
      {
        dataField: "link",
        text: "URL/Link"
      },
      {
        dataField: "region",
        text: "Region"
      },
      {
        dataField: "releaseDate",
        text: "Release Date"
      },
      {
        dataField: "image",
        text: "Image"
      },
      {
        dataField: "actions",
        text: "",
        formatter: (cell, row) => (
          <span className="group-icon">
            <button onClick={this.openModal.bind(this, row)}>
              <img
                src={require("../../../../assets/imgs/actions/deleteIcon.svg")}
                alt="edit-icon"
              />
            </button>

            <button onClick={this.editRow.bind(this, row)}>
              <img
                src={require("../../../../assets/imgs/actions/editIcon.svg")}
                alt="edit-icon"
              />
            </button>
          </span>
        )
      }
    ];

    this.setState({
      columns: columns,
      checkboxes: selectRow
    });
  }

  // fetch all video and set state as an array
  fetchVideos = () => {
    this.props
      .handleFetchVideos()
      .then(() =>
        localStorage.setItem("videos", JSON.stringify(this.props.content))
      );
  };

  // get all category
  fetchAllCategory = () => {
    this.props.handleFetchAllCategory();
  };

  // get all rgion
  fetchAllRegion = () => {
    this.props.handleFetchAllRegion();
  };

  // hanle change by category
  handleCategoryChange = e => {
    const value = e.target.value;
    let videos = JSON.parse(localStorage.getItem("videos"));

    if (value === "all") {
      // this.setState({ content: videos });
      this.props.handleSelectChange(videos)

    } else {
      videos = videos.filter(
        video => video.category.toLowerCase() === value.toLowerCase()
      );
      // this.setState({ content: videos });
      this.props.handleSelectChange(videos)
    }
  };

  // handle change by region
  handleRegionChange = e => {
    const value = e.target.value;

    let videos = JSON.parse(localStorage.getItem("videos"));

    if (value === "all") {
      // this.setState({ content: videos });
      // dispatch action SelectChange
      this.props.handleSelectChange(videos)
    } else {
      videos = videos.filter(
        video => video.region.toLowerCase() === value.toLowerCase()
      );
      // this.setState({ content: videos });
      this.props.handleSelectChange(videos)

    }
  };

  // yes btn action
  statusYes = () => {
    this.props.statusYes();

    // call the remove method here
    this.deleteRow(this.props.activeRow);
  };

  // No btn action
  statusNo = () => {
    this.props.statusNo();
  };

  // onClick of delete btn
  openModal = row => {
    const Obj = {
      id: row._id,
      title: "Are you sure you want to continue this process?"
    };
    this.props.openModal(Obj);
  };

  deleteRow = index => {
    const { content } = this.props;
    let arr = [];
    let result = arr[0];

    for (let i = 0; i < content.length; i++) {
      if (content[i]._id === index) {
        arr.push(i);
        content.splice(i, 1);
      }
    }
    const obj = {
      index: index,
      content: content[result]
    };
    this.props.handleDeleteRow(obj);
    this.props.handleFetchVideos()
  };

  // display row inside modal
  editRow = row => {
    // set modal open with modal Title
    const obj = {
      title: "Edit a Single Video"
    };

    this.props.openEditRow(obj);
    // call the update method with the row passed
    this.getVideoRow(row);
  };

  // update a row
  getVideoRow = activeRow => {
    // set the modal to be the values from the row
    let id = activeRow._id;

    let videos = JSON.parse(localStorage.getItem("videos"));
    const { videoDetails } = this.state;
    let result;

    for (let i = 0; i < videos.length; i++) {
      if (videos[i]._id === id) {
        result = videos[i];
      }
    }
    // this.props.getVideoDetails(result)
    this.setState({
      activeId: id,
      videoDetails: {
        ...videoDetails,
        name: result.name,
        link: result.link,
        image: result.image,
        category: result.category,
        region: result.region,
        releaseDate: result.releaseDate
      }
    });
  };

  // handle change event for the input modal
  handleChangeRow = event => {
    const { videoDetails } = this.state;

    this.setState({
      videoDetails: {
        ...videoDetails,
        [event.target.name]: event.target.value
      }
    });
  };

  // pause video player
  pauseVideo = () => {
    this.refs.player.pause();
  };

  // handle change event for the image modal
  onChangeImage = e => {
    // console.log("hi");
    const selectedImage = e.target.files[0];
    let img = new FormData();
    img.append("video", selectedImage);

    const token = localStorage.getItem("CallerView-XXX");
    const { videoDetails } = this.state;

    this.setState({
      isUploading: true,
      imageText: true
    });

    axios({
      url: `${API.baseUrl}/video/upload`,
      method: "POST",
      data: img,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    })
      .then(json => {
        // console.log(json.data)

        if (json.data.status === 200) {
          //works
          this.setState({
            videoDetails: {
              ...videoDetails,
              image: json.data.url
            },
            imageText: false,
            isUploading: false
          });
          return false;
        }
      })
      .catch(err => {
        toastr.error(err);
      });
  };

  // handleChange for the video modal
  onChangeVideo = e => {
    const selectedFile = e.target.files[0];

    let f = new FormData();
    f.append("video", selectedFile);

    if (f !== "") {
      // pause the video
      this.pauseVideo();
    }

    const token = localStorage.getItem("CallerView-XXX");
    const { videoDetails } = this.state;

    this.setState({
      loadingProgress: true,
      isUploading: true
    });

    axios({
      url: `${API.baseUrl}/video/upload`,
      method: "POST",
      data: f,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress: progressEvent => {
        let percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );

        this.setState({
          upProgress: percentCompleted
        });

        if (percentCompleted === 100) {
          this.setState({
            upProgress: 0,
            loadingProgress: false
          });
        }
      }
    })
      .then(json => {
        if (json.data.status === 200) {
          //works
          this.setState({
            videoDetails: {
              ...videoDetails,
              link: json.data.url
            },
            isUploading: false
          });
          return false;
        }
      })
      .catch(err => {
        toastr.error(err);
      });
  };

  // when complete is clicked
  updateVideo = e => {
    // e.preventDefault();

    const { videoDetails, activeId } = this.state;
    const {content} = this.props;
    
    const token = localStorage.getItem("CallerView-XXX");

    if (
      videoDetails.name.trim() === "" ||
      videoDetails.category.trim() === "" ||
      videoDetails.region.trim() === "" ||
      videoDetails.releaseDate.trim() === "" ||
      videoDetails.image === "" ||
      videoDetails.link === ""
    ) {
      toastr.error("Ensure that the form isn't empty...");
      return false;
    }

    this.setState({
      loading: true
    });

    axios({
      url: `${API.baseUrl}/video/single/${activeId}`,
      method: "PUT",
      data: videoDetails,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        let response = res.data.data.videos;

        for (let i = 0; i < content.length; i++) {
          if (content[i]._id === activeId) {
            content[i] = response;
          }
        }

        // dispatch action here
        this.props.handleupdateVideo(content)
        this.props.handleFetchVideos()
        this.props.dismissable()

        this.setState({
          loading: false
        });
      })
      .catch(error => {
        toastr.error(error);
        console.log(error)
        this.setState({
          loading: false
        });
      });
  };

  // dismiss modal
  dismissable = () => {
    this.props.dissmissModal();
  };

  render() {
    const {
      categories,
      regions,
      columns,
      checkboxes,
      videoDetails,
      loading,
      loadingProgress
    } = this.state;

    const { modal, modalText, style, content } = this.props;

    let children, className;

    // css style
    className = videoDetails.link ? "video-active" : null;

    // hide = videoText ? "hide" : null;

    // video Progress bar
    const videoProgressBar = loadingProgress ? (
      <p className="video-text">Please wait...</p>
    ) : null;

    // category options
    const categoryContent =
      categories &&
      this.props.category.map(category => (
        <VideoListOption value={category.name} key={category._id}>
          {category.name}
        </VideoListOption>
      ));

    // region options
    const regionContent =
      regions &&
      this.props.region.map((region, i) => (
        <VideoListOption value={region} key={i}>
          {region}
        </VideoListOption>
      ));

    if (modal && style) {
      children = (
        <>
          {/* modal children for edit here */}
          <div className="text-title">
            <p>{modalText}</p>
          </div>

          <Row>
            <FormContainer width="70%">
              {/* video name input */}
              <Form>
                <FormLabel>Video Name</FormLabel>
                <FormInput
                  width="100%"
                  height="60px"
                  type="text"
                  name="name"
                  onChange={this.handleChangeRow}
                  value={videoDetails.name}
                />
              </Form>

              {/* video link */}
              <Form>
                <FormLabel>URL/Link</FormLabel>
                <FormInput
                  width="100%"
                  height="60px"
                  type="text"
                  readOnly
                  value={videoDetails.link}
                />
              </Form>

              {/* category select field */}
              <Form>
                <FormLabel>Category</FormLabel>

                <VideoListSelect
                  style={{ width: "100%", height: "60px" }}
                  onChange={this.handleChangeRow}
                  name="category"
                >
                  <VideoListOption value={videoDetails.category}>
                    {" "}
                    {videoDetails.category}{" "}
                  </VideoListOption>

                  {categoryContent}
                </VideoListSelect>
              </Form>

              {/* region select field */}
              <Form>
                <FormLabel>Region</FormLabel>

                <VideoListSelect
                  style={{ width: "100%", height: "60px" }}
                  name="region"
                  onChange={this.handleChangeRow}
                >
                  <VideoListOption value={videoDetails.region}>
                    {" "}
                    {videoDetails.region}{" "}
                  </VideoListOption>

                  {regionContent}
                </VideoListSelect>
              </Form>

              {/* date input*/}
              <Form>
                <FormLabel>Release Date</FormLabel>
                <FormInput
                  width="100%"
                  height="60px"
                  type="date"
                  name="releaseDate"
                  onChange={this.handleChangeRow}
                  value={videoDetails.releaseDate}
                />
              </Form>

              <ImageForm>
                <FormUpload
                  height="65px"
                  className="img-upload"
                  onClick={_ => {
                    !this.state.isUploading && this.imageInput.current.click();
                  }}
                >
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={this.onChangeImage}
                    accept="image/*"
                    ref={this.imageInput}
                  />

                  {!this.state.imageText ? (
                    <p className="img-text">Upload image</p>
                  ) : (
                    <p className="img-text">Loading...</p>
                  )}
                </FormUpload>

                <div className="img-input">
                  <FormLabel id="img-url">Image URL</FormLabel>
                  <FormInput
                    type="text"
                    width="100%"
                    height="40px"
                    readOnly
                    value={videoDetails.image}
                  />
                </div>
              </ImageForm>
            </FormContainer>

            <FormContainer
              width="25%"
              style={{ position: "relative", top: "15px" }}
            >
              <FormUpload
                height="305px"
                onClick={_ => {
                  !this.state.isUploading && this.uploadInput.current.click();
                }}
              >
                <Player
                  ref="player"
                  className={className}
                  playsInline
                  src={videoDetails.link}
                />

                <input
                  type="file"
                  onChange={this.onChangeVideo}
                  style={{ display: "none" }}
                  accept="video/*"
                  ref={this.uploadInput}
                />

                {videoProgressBar}
              </FormUpload>
            </FormContainer>
          </Row>

          <RowRight>
            <Button
              width="25%"
              height="60px"
              fontColor={colour.white}
              bgColor={colour.secondary}
              onClick={this.updateVideo}
            >
              {loading && <i className="fas fa-spinner fa-spin " />}
              COMPLETE
            </Button>
          </RowRight>
        </>
      );
    } else if (modal && !style) {
      children = (
        <>
          <div className="text">
            <p>{modalText}</p>
          </div>

          <div className="group-btn">
            <Button
              height="60px"
              id="margin-left"
              width="123px"
              fontColor={colour.white}
              bgColor={colour.secondary}
              onClick={this.statusYes}
            >
              YES
            </Button>

            <Button
              height="60px"
              width="123px"
              fontColor={colour.white}
              bgColor={colour.gray}
              onClick={this.statusNo}
            >
              NO
            </Button>
          </div>
        </>
      );
    }

    return (
      <>
        <ToolkitProvider
          keyField="_id"
          data={content ? this.props.content : video}
          columns={columns}
          search
          // onChange={this.onChangeRow}
        >
          {props => (
            <div className="wrapper">
              <div className="search-section">
                <div>
                  <h2>ALL VIDEOS</h2>
                </div>

                <div className="main-content">
                  <SearchBar
                    className="inputfield-filter"
                    {...props.searchProps}
                  />

                  <div className="search-group">
                    <VideoListSelect
                      onChange={this.handleCategoryChange}
                      className="selectedItem1"
                    >
                      <VideoListOption value="">
                        {" "}
                        Select category{" "}
                      </VideoListOption>
                      <VideoListOption value="all">All</VideoListOption>

                      {categoryContent}
                    </VideoListSelect>

                    <VideoListSelect
                      className="selectedItem2"
                      onChange={this.handleRegionChange}
                    >
                      <VideoListOption value="">
                        {" "}
                        Select Region{" "}
                      </VideoListOption>

                      <VideoListOption value="all">All</VideoListOption>

                      {regionContent}
                    </VideoListSelect>
                  </div>
                </div>
              </div>
              <BootstrapTable
                pagination={paginationFactory(customPagination)}
                defaultSorted={defaultSorted}
                selectRow={checkboxes}
                {...props.baseProps}
              />
            </div>
          )}
        </ToolkitProvider>

        <ModalVideoList
          visible={modal}
          dismiss={this.dismissable}
          children={children}
          styles={style}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  content: state.videoListReducer.content,
  region: state.videoListReducer.region,
  category: state.videoListReducer.category,
  modal: state.videoListReducer.modal,
  activeRow: state.videoListReducer.activeRow,
  modalText: state.videoListReducer.modalText,
  style: state.videoListReducer.style
});

const mapDispatchToProps = dispatch => ({
  handleFetchVideos: () => dispatch(actions.handleFetchVideos()),
  handleFetchAllCategory: () => dispatch(actions.handleFetchAllCategory()),
  handleFetchAllRegion: () => dispatch(actions.handleFetchAllRegion()),
  handleDeleteRow: params => dispatch(actions.handleDeleteRow(params)),
  openModal: params => dispatch(actions.openModal(params)),
  statusYes: () => dispatch(actions.statusYes()),
  statusNo: () => dispatch(actions.statusNo()),
  openEditRow: params => dispatch(actions.openEditRow(params)),
  dissmissModal: () => dispatch(actions.dissmissModal()),
  handleSelectChange: (params)=> dispatch(actions.handleSelectChange(params)),
  handleupdateVideo: (params)=> dispatch(actions.handleupdateVideo(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableList);
