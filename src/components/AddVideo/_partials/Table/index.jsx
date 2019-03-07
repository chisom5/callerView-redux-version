import React from "react";

// styled-component
import {
  Column,
  TableStyle,
  TableRow,
  Checkbox,
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

// modal for edit
import Modal from "./modal/index";

// select and options
import Select from "./select/select";
import Options from "./select/option";

// axios
import axios from "axios";
import API from "../../../../api/constant";

// toastr
import toastr from "toastr";

// library
import { Player } from "video-react";


class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Headers: [],
      Body: [],
      uploadables: [],
      modal: false,
      modalText: "",
      style: false,

      // state for edit
      loading: false,
      imageText: "Upload Image",
      loadingProgress: false,
      upProgress: 0,
      isUploading: false,

      videoDetails: {
        name: "",
        link: "",
        category: "",
        region: "",
        releaseDate: "",
        image: ""
      },
    
      categories: [],
      regions: [],
      checked: false
    };

    this.uploadInput = React.createRef();
    this.imageInput = React.createRef();
  }

  componentWillMount() {
    if (typeof this.props.isForCSV !== "undefined" && this.props.isForCSV) {
      let splitted = this.props.Content.split("\n");

      let index = [];
      let head, Body;

      head = this.props.Headers;
      Body = splitted.slice(1);
      Body = Body.splice( 0, Body.length - 1 ); // Remove empty row

      Body.map((body, i) => {
        index.push(i);
        return index;
      });

      localStorage.setItem("csvContent", JSON.stringify(Body));

      this.setState({
        Headers: head,
        Body,
        uploadables: [...this.state.uploadables, ...index]
      });
    }
  }

  componentDidMount() {
    this.props.confirmBtn.current.onclick = this.confirm.bind(this);
     // fetch all category
     this.fetchAllCategory();

     // fetch all region
     this.fetchAllRegion();
  }

  // status yes
  statusYes = () => {
    this.setState({
      modal: false
    });

    this.removeRow(this.state.activeIndex);
  };

  statusNo = () => {
    this.setState({
      modal: false,
      modalText: ""
    });
  };

  //   open modal
  openModal = index => {
    this.setState({
      modal: true,
      activeIndex: index,
      modalText: `Are you sure you want to delete row number: ${index + 1}`
    });
  };

  // delete a row
  removeRow(index) {
    this.setState({
      Body: this.state.Body.filter((row, i) => index !== i)
    });
    toastr.success(`Row ${index + 1} successfully Deleted`);
  }

  // checked
  check = (index, e) => {
    this.setState({
      uploadables: e.target.checked
        ? [...this.state.uploadables, index]
        : this.state.uploadables.filter(i => i !== index)
    });
  };

  // select all
  selectAll = () => {
    const csvContent = JSON.parse(localStorage.getItem("csvContent"));

    let index = [];

    csvContent.map((body, i) => {
      index.push(i);
      return index;
    });

    this.setState({
      checked: !this.state.checked,
      uploadables: []
    });

    if (this.state.checked) {
      this.setState({
        uploadables: [...this.state.uploadables, ...index]
      });
    }
  };

  //   confirm button
  confirm =(e)=> {
    let videos = this.state.uploadables;
    // console.log(videos);
    let obj =[];
    const token = localStorage.getItem("CallerView-XXX");

    if (videos.length) {
      for (let index in videos) {
        let videoData = this.state.Body[index].split(",");
        obj.push({
          name: videoData[0],
          link: videoData[1],
          category: videoData[2],
          region: videoData[3],
          releaseDate: videoData[4],
          image: videoData[5]
        })
        console.log(obj)
        axios({
          url: `${API.baseUrl}/video/insert/many`,
          method: "POST",
          data:{videos: obj},

          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(res => {
            console.log(res.data)
            this.setState({
              Body: this.state.Body.filter((row, i) => i !== videos[index]),
              uploadables: []
            });

            toastr.success("Vidoes successfully added");
          }) 
          .catch(err => console.log(err));
      }
    }
  }

    // get all category
    fetchAllCategory = () => {
      const token = localStorage.getItem("CallerView-XXX");
  
      axios({
        url: `${API.baseUrl}/category`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => {
          this.setState({ categories: res.data.data });
        })
        .catch(err => {
          console.log(err);
        });
    };
  
    // get all rgion
    fetchAllRegion = () => {
      const token = localStorage.getItem("CallerView-XXX");
  
      axios({
        url: `${API.baseUrl}/region`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => {
          let newArray = [...new Set(res.data.data.regions)];
  
          this.setState({
            regions: newArray
          });
        })
        .catch(err => {});
    };
  // edit a row
  editRow = index => {
    this.setState({
      modal: !this.state.modal,
      modalText: `Edit Video of row number: ${index + 1}`,
      style: !this.state.style
    });

    this.getRowDetails(index);
  };

  getRowDetails = index => {

    let id = index;
    this.setState({ activeId: id});

    const csvContent = JSON.parse(localStorage.getItem("csvContent"));

    const { videoDetails } = this.state;

    let result;

    for (let i = 0; i < csvContent.length; i++) {
      if (i === id) {
        result = csvContent[i].split(",");
        // console.log(result);

        this.setState({
          videoDetails: {
            ...videoDetails,
            name: result[0],
            link: result[1],
            category: result[2],
            region: result[3],
            releaseDate: result[4],
            image: result[5]
          }
        });
      }
    }
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
// handle change event for the image modal
onChangeImage = e => {
  // console.log('hi')
  const selectedImage = e.target.files[0];
  let img = new FormData();
  img.append("video", selectedImage);

  const token = localStorage.getItem("CallerView-XXX");
  const { videoDetails } = this.state;

  this.setState({
    isUploading: true,
    imageText: "Loading"
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
          isUploading: false,
          imageText: 'Upload Image',
          
        });
        return false;
      }
    })
    .catch(err => {
      toastr.error(err);
    });
};

 // pause video player
 pauseVideo =()=>{
  this.refs.player.pause();
}

// handle change of video
onChangeVideo = e => {
  const selectedFile = e.target.files[0];

  let f = new FormData();
  f.append("video", selectedFile);
  
  if(f !== ''){
    // pause the video
    this.pauseVideo();  
  }

  const token = localStorage.getItem("CallerView-XXX");
  const { videoDetails } = this.state;

  this.setState({
    loadingProgress: true,
    isUploading: true,
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

  const { videoDetails, activeId, Body} = this.state;
  
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

  for(let i=0; i<Body.length; i++){
    if(i === activeId){
       Body[i] = Object.values( videoDetails ).join( ',' )
    }
  }
  
  this.setState({
    Body,
    modal: false,
    modalText: '',
    style: false
  });

  
};

  //   dismiss modal
  dismissable = () => {
    this.setState({ modal: false, style: false, modalText: "", loading: false });
  };

  render() {
    let id, children, className;
    const {
      modal,
      modalText,
      checked,
      Headers,
      Body,
      uploadables,
      videoDetails,
      loading,
      imageText,
      loadingProgress,
      categories,
      regions,
      style
    } = this.state;
    // css style
    className = videoDetails.link ? "video-active" : null;

       // video Progress bar
       const videoProgressBar = loadingProgress ? (
        <p className="video-text">Please wait...</p>
     ) : null;

    // category options
    const categoryContent =
      categories &&
      categories.map(category => (
        <Options value={category.name} key={category._id}>
          {category.name}
        </Options>
      ));

    // region options
    const regionContent =
      regions &&
      regions.map((region, i) => (
        <Options value={region} key={i}>
          {region}
        </Options>
      ));

    if (modal && style) {
      let videoDate = new Date( videoDetails.releaseDate )
      
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

                <Select
                  style={{ width: "100%", height: "60px" }}
                  onChange={this.handleChangeRow}
                  name="category"
                >
                  <Options value={videoDetails.category}>
                    {" "}
                    {videoDetails.category}{" "}
                  </Options>

                  {categoryContent}
                </Select>
              </Form>

              {/* region select field */}
              <Form>
                <FormLabel>Region</FormLabel>

                <Select
                  style={{ width: "100%", height: "60px" }}
                  name="region"
                  onChange={this.handleChangeRow}
                >
                  <Options value={videoDetails.region}>
                    {" "}
                    {videoDetails.region}{" "}
                  </Options>

                  {regionContent}
                </Select>
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
                  value={ videoDate.getFullYear() + '-' + ( '0' + ( videoDate.getMonth() + 1 ) ).slice( -2 ) + '-' + ( '0' + videoDate.getDate() ).slice( -2 )}
                />
              </Form>

              {/* Image upload */}
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

                  {!this.state.isUploading ? (
                    <p className="img-text">{imageText}</p>
                  ) : (
                    <p className="img-text">{imageText}</p>
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
      <React.Fragment>
        {
          <TableStyle>
            <Column>
              <TableRow id="header">
                <Checkbox
                  type="checkbox"
                  onChange={this.selectAll.bind(this)}
                  checked={!checked}
                />

                {Headers.map((head, index) => {
                  if (index === 2) {
                    id = "margin-left";
                  } else {
                    id = null;
                  }
                  return (
                    <p key={index} className="headers" id={id}>
                      {head}
                    </p>
                  );
                })}
              </TableRow>
              <hr />

              {Body.map((row, index) => {
                const content = row.split(",");
                return (
                  <React.Fragment key={index}>
                    <TableRow>
                      <Checkbox
                        type="checkbox"
                        checked={uploadables.includes(index)}
                        onChange={this.check.bind(this, index)}
                      />

                      <p>{content[0].replace(/"/g, "")}</p>
                      <p className="link">{content[1]}</p>
                      <p>{content[2]}</p>
                      <p>{content[3]}</p>
                      <p>{content[4]}</p>
                      <p className="link">{content[5]}</p>

                      <div id="group-icon">
                        <button onClick={this.openModal.bind(this, index)}>
                          <img
                            src={require("../../../../assets/imgs/actions/deleteIcon.svg")}
                            alt="delete-icon"
                          />
                        </button>
                        <button onClick={this.editRow.bind(this, index)}>
                          <img
                            src={require("../../../../assets/imgs/actions/editIcon.svg")}
                            alt="edit-icon"
                          />
                        </button>
                      </div>
                    </TableRow>
                    <hr />
                  </React.Fragment>
                );
              })}
            </Column>
          </TableStyle>
        }

        {/* normal modal */}
        <Modal
          visible={modal}
          dismiss={this.dismissable}
          children={children}
          styles={style}
        />
      </React.Fragment>
    );
  }
}

export default Table;
