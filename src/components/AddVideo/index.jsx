import React, { Component } from "react";

// styles
import {
  Container,
  HeaderTitle,
  MiniContent,
  ContentBox,
  Button,
  Row,
  RowRight,
  FormContainer,
  Form,
  ImageForm,
  FormLabel,
  FormInput,
  FormUpload,
  CsvContainer
} from "../../style/init";

import { colour } from "../../style/colour";
import Select from "../../Reuseable/Select";

// reusable
import Modal from "../../Reuseable/Modal";
import Table from "./_partials/Table";

// axios
import axios from "axios";
import API from "../../api/constant";
import toastr from "toastr";

// Utils
import { Player } from "video-react";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";

// redux
import { connect } from "react-redux";
import * as actions from "../../store/actions";

class AddVideo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      upProgress: 0,
      videoText: false,
      imageText: false,
      loadingProgress: false,
      isUploading: false, 
      modalTitle: this.props.modalTitle,    
      videoDetails: {
        name: "",
        link: "",
        category: "",
        region: "",
        releaseDate: "",
        image: ""
      },
      modalInput: {
        categoryInput: "",
        regionInput: ""
      },
  
      Headers: ["Name", "Link", "Category", "Region", "Release Date", "Image"]
    };

    this.confirmCSV = React.createRef();
    this.uploadInput = React.createRef();
    this.CSVuploadInput = React.createRef();
    this.imageInput = React.createRef();
  }

    // category select
    getSelectedCategory = value => {
      const { videoDetails } = this.state;
      this.setState({
        videoDetails: {
          ...videoDetails,
          category: value
        }
      });
    };
  
    // region select
    getSelectedRegion = value => {
      const { videoDetails } = this.state;
      this.setState({
        videoDetails: {
          ...videoDetails,
          region: value
        }
      });
    };
  

  //  CSV modal
  OpenCsvModal = e => {
    const title = e.target.dataset.title;
    // const {modalTitle}
    this.setState({modalTitle: title})
    this.props.OpenCsvModal();
  };

  // add new category select option
  addNewCategory = () => {
    const { modalInput } = this.state;
    this.props.NewCategory(modalInput.categoryInput);
  };

  // add new region select option
  addNewRegion = () => {
    const { modalInput } = this.state;
    this.props.NewRegion(modalInput.regionInput);
  };

   // To upload CSV file
   uploadCSV = e => {
    let reader = new FileReader();
    let csvContent = "";
    let target = e.target;

    reader.onload = _e => {
      let file_content = _e.target.result.split(",");
      csvContent = atob(file_content[1]);

      let csvObj = {
        csvContent,
        csvFile: target.files[0]["name"]
      };

      this.props.csvUpload(csvObj);
    };

    reader.readAsDataURL(target.files[0]);
  };

  // When add csv button is clicked
  toggleCsvView = e => {
    this.props.toggleCsv();
  };

  // cancel button for CSV upload
  cancelCSV = () => {
    this.props.cancelCsv();
  };

  // closes modal
  dismissable = () => {
    this.props.dismissModal();
  };

// upload image file
uploadImage = e => {
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

   // when complete is clicked
   videoProfile = e => {
    e.preventDefault();

    const { videoDetails } = this.state;
    console.log(this.state.videoDetails)
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

    this.props.add_VideoSuccessful(videoDetails).then(()=>
         this.props.EndAdd_Video()
    )
    this.setState({
      videoDetails:{
        name: "",
        link: "",
        category: "",
        region: "",
        releaseDate: "",
        image: ""
      }
    })
  };


  // Modal title
  addCategory = (value, type) => {
    
    if (type === "Add a Category") {
      this.setState({
        modalTitle:"NEW CATEGORY",
      })

      let modalObj ={
        modal: value,
        modalTitle: this.state.modalTitle
      }

      this.props.AddCategory(modalObj);

    } else if (type === "Add a region") {
      this.setState({
        modalTitle:"NEW REGION",
      })
      
      let modalObj ={
        modal: value,
        modalTitle: this.state.modalTitle
      }

      this.props.AddRegion(modalObj)
    }
  };

  // handle change of modal input
  handleModalInput = e => {
    const { modalInput } = this.state;
    let m = {};
    m[e.target.name] = e.target.value;
    this.setState({ modalInput: Object.assign(modalInput, m) });
  };

  // handle change of General form input
  handleChangeEvent = e => {
    const { videoDetails } = this.state;

    this.setState({
      videoDetails: {
        ...videoDetails,
        [e.target.name]: e.target.value
      }
    });
  };

 
  // pause video player
  pauseVideo = () => {
    this.refs.player.pause();
  };

  // upload a video file
  uploadVideo = e => {
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
      isUploading: true,
      videoText: !this.state.videoText
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

 
  render() {
    const {
      modalTitle,
      isUploading,
      videoText,
      loadingProgress,
      upProgress,
      imageText,
      videoDetails,
      Headers
    } = this.state;

    const {
      modal,
      csvButton,
      csvContent,
      csvFile,
      border,
      isAddCsvButton,
      optionsCategory,
      optionsRegion,
      loading
    } = this.props;

    const videoProgressBar = loadingProgress ? (
      <Progress type="circle" percent={upProgress} />
    ) : null;

    // styles
    let children, className, line, hide, view;

    className = videoDetails.link ? "video-active" : null;
    line = border ? "border" : null;

    hide = videoText ? "hide" : null;

    if (modalTitle === "NEW CATEGORY") {
      children = (
        <React.Fragment>
          <p>{modalTitle}</p>
          <FormInput
            name="categoryInput"
            width="100%"
            height="60px"
            type="text"
            placeholder="Category Name"
            onChange={this.handleModalInput}
          />

          <Button
            height="60px"
            id="margin-left"
            width="123px"
            fontColor={colour.white}
            bgColor={colour.secondary}
            onClick={this.addNewCategory}
          >
            ADD
          </Button>

          <Button
            height="60px"
            width="123px"
            fontColor={colour.white}
            bgColor={colour.gray}
            onClick={this.dismissable}
          >
            CLOSE
          </Button>
        </React.Fragment>
      );
    } else if (modalTitle === "NEW REGION") {
      children = (
        <React.Fragment>
          <p>{modalTitle}</p>
          <FormInput
            name="regionInput"
            width="100%"
            height="60px"
            type="text"
            placeholder="Region Name"
            onChange={this.handleModalInput}
          />

          <Button
            height="60px"
            id="margin-left"
            width="123px"
            fontColor={colour.white}
            bgColor={colour.secondary}
            onClick={this.addNewRegion}
          >
            ADD
          </Button>

          <Button
            height="60px"
            width="123px"
            fontColor={colour.white}
            bgColor={colour.gray}
            onClick={this.dismissable}
          >
            CLOSE
          </Button>
        </React.Fragment>
      );
    } else {
      children = (
        <div id="csv-field">
          <p>{modalTitle}</p>

          <a
            href={`${API.baseUrl}/template`}
            target="_blank"
            rel="noopener noreferrer"
            className="csv-text"
          >
            Click here to download CSV template
          </a>

          <CsvContainer
            onClick={_ => {
              this.CSVuploadInput.current.click();
            }}
            id={line}
          >
            <p className="csv-para">
              <i className="fa fa-cloud-upload" />
              {csvFile ? csvFile : "Click to Select CSV File"}
            </p>

            <input
              type="file"
              style={{ display: "none" }}
              accept="text/csv"
              ref={this.CSVuploadInput}
              onChange={this.uploadCSV}
            />
          </CsvContainer>

          <Button
            height="60px"
            width="300px"
            fontColor={colour.white}
            bgColor={colour.secondary}
            onClick={this.toggleCsvView}
            disabled={!isAddCsvButton}
          >
            ADD CSV
          </Button>
        </div>
      );
    }

    if (csvButton) {
      view = (
        <React.Fragment>
          <HeaderTitle>
            <h2>ADD VIDEOS</h2>
            <div>
              <Button
                id="btn-cancel"
                width="153px"
                height="45px"
                fontColor={colour.orange}
                bgColor={colour.accentOrange}
                onClick={this.cancelCSV}
              >
                Cancel
              </Button>

              <Button
                width="153px"
                height="45px"
                fontColor={colour.secondary}
                ref={this.confirmCSV}
                bgColor={colour.accentMedium}
              >
                Confirm
              </Button>
            </div>
          </HeaderTitle>

          <MiniContent>
            <div className="content" height="600px">
              <Table
                isForCSV={true}
                Headers={Headers}
                Content={csvContent}
                confirmBtn={this.confirmCSV}
              />
            </div>
          </MiniContent>
        </React.Fragment>
      );
    } else {
      view = (
        <React.Fragment>
          {/* Add video View */}
          <HeaderTitle>
            <h2>ADD A VIDEO</h2>
            <Button
              width="199px"
              height="45px"
              fontColor={colour.secondary}
              bgColor={colour.accentMedium}
              data-title="ADD A CSV FILE"
              onClick={this.OpenCsvModal}
            >
              Upload With CSV
            </Button>
          </HeaderTitle>

          <ContentBox>
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
                    onChange={this.handleChangeEvent}
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

                  <Select
                    options={optionsCategory}
                    getSelected={this.getSelectedCategory}
                    addPlaceholder={"Add a Category"}
                    defaultSelected=""
                    onAddCategory={this.addCategory}
                  />
                </Form>

                {/* region select field */}
                <Form>
                  <FormLabel>Region</FormLabel>
                  <Select
                    options={optionsRegion}
                    getSelected={this.getSelectedRegion}
                    defaultSelected=""
                    addPlaceholder={"Add a region"}
                    onAddCategory={this.addCategory}
                  />
                </Form>

                {/* date input*/}
                <Form>
                  <FormLabel>Release Date</FormLabel>
                  <FormInput
                    width="100%"
                    height="60px"
                    type="date"
                    name="releaseDate"
                    placeholder="dd/MM/YYYY"
                    onChange={this.handleChangeEvent}
                    value={videoDetails.releaseDate}
                  />
                </Form>

                {/* Image upload */}
                <ImageForm>
                  <FormUpload
                    height="65px"
                    className="img-upload"
                    onClick={_ => {
                      !isUploading && this.imageInput.current.click();
                    }}
                  >
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={this.uploadImage}
                      accept="image/*"
                      ref={this.imageInput}
                    />

                    {!imageText ? (
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

              <FormContainer width="25%">
                <FormUpload
                  height="322px"
                  onClick={_ => {
                    !isUploading && this.uploadInput.current.click();
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
                    onChange={this.uploadVideo}
                    style={{ display: "none" }}
                    accept="video/*"
                    ref={this.uploadInput}
                  />

                  <p className="upload-text" id={hide}>
                    Upload video
                  </p>

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
                onClick={this.videoProfile}
              >
                {loading && <i className="fas fa-spinner fa-spin " />}
                COMPLETE
              </Button>
            </RowRight>
          </ContentBox>

          <Modal
            visible={modal}
            dismiss={this.dismissable}
            children={children}
          />
        </React.Fragment>
      );
    }

    return <Container>{view}</Container>;
  }
}

const mapStateToProps = state => ({
  csvButton: state.addVideoReducer.csvButton,
  csvFile: state.addVideoReducer.csvFile,
  modalTitle: state.addVideoReducer.modalTitle,
  csvContent: state.addVideoReducer.csvContent,
  isAddCsvButton: state.addVideoReducer.isAddCsvButton,
  border: state.addVideoReducer.border,
  modal: state.addVideoReducer.modal,
  loading: state.addVideoReducer.loading,
  optionsCategory: state.addVideoReducer.optionsCategory,
  optionsRegion: state.addVideoReducer.optionsRegion
});

const mapDispatchToProps = dispatch => ({
  toggleCsv: () => dispatch(actions.toggleCsv()),
  csvUpload: params => dispatch(actions.csvUpload(params)),
  cancelCsv: () => dispatch(actions.cancelCsv()),
  dismissModal: () => dispatch(actions.dismissModal()),
  OpenCsvModal: () => dispatch(actions.OpenCsvModal()),
  NewCategory: params=> dispatch(actions.NewCategory(params)),
  NewRegion: params=> dispatch(actions.NewRegion(params)),
  AddCategory: params=> dispatch(actions.AddCategory(params)),
  AddRegion: params=> dispatch(actions.AddRegion(params)),
  add_VideoSuccessful: (params)=> dispatch(actions.add_VideoSuccessful(params)),
  EndAdd_Video: ()=> dispatch(actions.EndAdd_Video()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddVideo);
