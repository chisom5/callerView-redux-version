import React, { Component } from "react";
import {
  Container,
  HeaderTitle,
  Row,
  MiniContent,
  FormLabel,
  FormInput,
  Button,
  Column,
  TableStyle,
  TableAdmin,
  Checkbox

} from "../../style/init";
import { colour } from "../../style/colour";
// import { Table3 } from "../../sampledata-3";

import Modal from "../../Reuseable/Modal";
import axios from "axios";
import toastr from "toastr";
import API from "../../api/constant";

class Admin extends Component {
  constructor() {
    super();

    this.state = {
      adminDetails: {
        name: "",
        email: "",
        privilege: []
      },
      viewChecked: false,
      editChecked: false,
      createChecked: false,
      modal: false,
      modalText: "",
      Headers: ["User Name", "Email", "Privileges"],

      contentAdmin: []
    };
  }

  componentDidMount() {
    this.fetchAdmin();
  }

  // make an axios call to get logged in admin
  fetchAdmin = e => {
    const token = localStorage.getItem("CallerView-XXX");

    axios({
      url: `${API.baseUrl}/admin/all`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        // console.log(res.data.data);
        this.setState({
          contentAdmin: res.data.data
        });
      })
      .catch(err => console.log(err));
  };

  // yes btn action
  statusYes = () => {
    this.setState({
      modal: false,
      modalText: ""
    });
    // call the remove method here
    this.removeAdmin(this.state.activeRow);
  };

  // No btn action
  statusNo = () => {
    this.setState({
      modal: false,
      activeRow: null
    });
  };
  // onClick of delete btn
  openModal = index => {
    this.setState({
      activeRow: index,
      modal: true,
      modalText: "Are you sure you want to continue this process?"
    });
  };

  //   remove an admin
  removeAdmin = index => {
    // console.log(index)
    const { contentAdmin } = this.state;
    let id = contentAdmin[index]._id;

    this.setState({
      modal: true,
      modalText: "Admin successfully deleted"
    });
    setTimeout(() => {
      this.setState({
        modal: false,
        modalText: "",
        activeRow: null
      });
    }, 1000);

    const token = localStorage.getItem("CallerView-XXX");
    let result = contentAdmin;
    result.splice(index, 1);

    axios({
      url: `${API.baseUrl}/admin/delete/${id}`,
      method: "DELETE",
      Data: contentAdmin[index],
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      this.setState({
        contentAdmin: result
      });
    });
  };

  // Add new admin
  addAmin = () => {
    if (
      this.state.adminDetails.name.trim() === "" ||
      this.state.adminDetails.email.trim() === "" ||
      this.state.adminDetails.privilege === ""
    ) {
      toastr.error("The fields are empty!");
      return false;
    }

    this.setState({
      modal: true,
      modalText: "New admin added Successfully"
    });
    setTimeout(() => {
      this.setState({
        modal: false,
        modalText: ""
      });
    }, 1000);

    const { adminDetails, contentAdmin } = this.state;
    const token = localStorage.getItem("token");
    let result;

    axios({
      url: `${API.baseUrl}/admin/create`,
      method: "POST",
      data: adminDetails,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        result = {
          name: res.data.data.admin.name,
          email: res.data.data.admin.email,
          id: res.data.data.admin._id,
          privileges: res.data.data.privileges
        };
        contentAdmin.push(result);
        this.setState({
          contentAdmin,
          adminDetails: ""
        });
      })
      .catch(err => {
        // toastr.error("Bad request.");
        console.log(err);
      });
  };

  // handle change input
  handleChangeEvent = e => {
    const { adminDetails } = this.state;
    this.setState({
      adminDetails: {
        ...adminDetails,
        [e.target.name]: e.target.value
      }
    });
  };

  //   handle change checkboxes
  handleCheckboxeEvent = (event, name) => {
    const { adminDetails } = this.state;

    if (event.target.checked) {
      let result = adminDetails.privilege;
      result.push(name.toLowerCase());

      this.setState({
        adminDetails: {
          ...adminDetails,
          privilege: result
        }
      });
    } else {
      let result = adminDetails.privilege;

      for (let i = 0; i < result.length; i++) {
        if (result[i].toLowerCase() === name.toLowerCase()) {
          result.splice(i, 1);
        }
      }
      this.setState({
        ...adminDetails,
        privilege: result
      });
    }
  };

  //   edit admin privileges
  EditAdmin = index => {
    this.setState({
      modal: true,
      modalText: "Edit privileges"
    });

    // call getContentAdmin
    this.getContentAdmin(index);
  };

  // get the value from back end and display
  getContentAdmin = index => {
    const { contentAdmin, adminDetails } = this.state;
    let privileges = adminDetails.privilege;
    const id = contentAdmin[index]._id;

    let result = contentAdmin[index].privileges;

    result.forEach((value, i) => {
      if (value.toLowerCase() === "view") {
        privileges.push(value);
        
        this.setState({
          viewChecked: !this.state.viewChecked,
          
          adminDetails: {
            ...adminDetails, privilege: privileges
          }

        });
      }
      if (value.toLowerCase() === "create") {
        privileges.push(value);
        this.setState({
          createChecked: !this.state.createChecked,
          adminDetails: {
            ...adminDetails, privilege: privileges
          }
        });
      }
      if (value.toLowerCase() === "edit") {
        privileges.push(value);
        this.setState({
          editChecked: !this.state.editChecked,
          adminDetails: {
            ...adminDetails, privilege: privileges
          }
        });
      }
    });
    this.setState({activeId: id});
  };

  // handle change of admin privileges
  handlecheckUpdate = (event) => {
    const { adminDetails, viewChecked, createChecked, editChecked } = this.state;
    let privileges = adminDetails.privilege;

      const i = privileges.indexOf(event.target.name.toLowerCase());
      if (privileges.indexOf(event.target.name) !== -1) {
        privileges.splice(i, 1);
      } else {
          privileges.push(event.target.name.toLowerCase());
      }
      this.setState({
        adminDetails: {
          ...adminDetails, privilege: privileges
        }
      });
      if (event.target.name.toLowerCase() === 'view') {
        this.setState({ viewChecked: !viewChecked });
      }
      if (event.target.name.toLowerCase() === 'create') {
        this.setState({ createChecked: !createChecked });
      }
      if (event.target.name.toLowerCase() === 'edit') {
        this.setState({ editChecked: !editChecked });
      }
  };

  //   save admin privileges
  saveAdminPrivileges = () => {

    const { adminDetails, contentAdmin, activeId } = this.state;

    const id = activeId;
    const token = localStorage.getItem("CallerView-XXX");

    this.setState({
      modal: false
    });

    axios({
      url: `${API.baseUrl}/admin/privilege/${id}`,
      method: "PUT",
      data:{ name: adminDetails.privilege}, 
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res =>{
        let response = res.data.data.name;

        for (let i = 0; i < contentAdmin.length; i++){
          if(contentAdmin[i]._id === id){
            contentAdmin[i].privileges = response
          }
        }
        
        this.setState({ 
          contentAdmin
        })
        
        toastr.success('Privileges successfully Edited');

      })
      .catch(err => {
        toastr.error(err)
      });
  };

  // close modal
  dismissable = () => {
    this.setState({
      modal: false,
      modalText: "",
      activeRow: null
    });
  };

  render() {
    const { modal, modalText, Headers, contentAdmin } = this.state;

    let children;

    if (
      modal &&
      modalText === "Are you sure you want to continue this process?"
    ) {
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
    } else if (modal && modalText === "New admin added Successfully") {
      children = (
        <React.Fragment>
          <div className="text">
            <img
              src={require("../../assets/imgs/check.svg")}
              alt="check icon"
            />
            <p>{modalText}</p>
          </div>
        </React.Fragment>
      );
      return false;
    } else if (modal && modalText === "Admin successfully deleted") {
      children = (
        <React.Fragment>
          <div className="text">
            <img
              src={require("../../assets/imgs/check.svg")}
              alt="check icon"
            />
            <p>{modalText}</p>
          </div>
        </React.Fragment>
      );
    } else if (modal) {
      children = (
        <>
          <div id="privilege">
            <FormLabel>{modalText}</FormLabel>

            <div className="checkbox-div" width="100%">
              <label>View</label>
              <Checkbox
                type="checkbox"
                className="boxes"
                name="view"
                checked={this.state.viewChecked}
                onChange={event => {
                  this.handlecheckUpdate(event);
                }}
              />
              <label>Create</label>
              <Checkbox
                type="checkbox"
                className="boxes"
                name="create"
                checked={this.state.createChecked}
                onChange={event => {
                  this.handlecheckUpdate(event);
                }}
              />
              <label>Edit</label>
              <Checkbox
                type="checkbox"
                className="boxes"
                name="edit"
                checked={this.state.editChecked}
                onChange={event => {
                  this.handlecheckUpdate(event);
                }}
              />
            </div>

            <Button
              height="60px"
              id="margin-left"
              width="100%"
              fontColor={colour.white}
              bgColor={colour.secondary}
              onClick={this.saveAdminPrivileges}
            >
              SAVE
            </Button>
          </div>
        </>
      );
    }
    return (
      <Container>
        <HeaderTitle>
          <h2>ADMIN MANAGEMENT</h2>
        </HeaderTitle>

        <Row>
          <MiniContent width="34%">
            <div className="top">
              <h2>Add new Admin</h2>
            </div>

            <div className="content" style={{height:"470px"}}>
              <section>
                <div>
                  <FormLabel>User Name</FormLabel>
                  <FormInput
                    width="100%"
                    height="60px"
                    type="text"
                    name="name"
                    onChange={this.handleChangeEvent}
                  />
                </div>
                <div>
                  <FormLabel>Email</FormLabel>
                  <FormInput
                    width="100%"
                    height="60px"
                    type="text"
                    minLength="8"
                    name="email"
                    onChange={this.handleChangeEvent}
                  />
                </div>

                <div id="privilege">
                  <FormLabel>Privileges</FormLabel>

                  <div className="checkbox-div" width="100%">
                    <label>View</label>
                    <Checkbox
                      type="checkbox"
                      className="boxes"
                      name="view"
                      onChange={event => {
                        this.handleCheckboxeEvent(event, "View");
                      }}
                    />
                    <label>Create</label>

                    <input
                      type="checkbox"
                      className="boxes"
                      name="create"
                      onChange={event => {
                        this.handleCheckboxeEvent(event, "Create");
                      }}
                    />
                    <label>Edit</label>
                    <input
                      type="checkbox"
                      className="boxes"
                      name="edit"
                      onChange={event => {
                        this.handleCheckboxeEvent(event, "Edit");
                      }}
                    />
                  </div>
                </div>

                <div>
                  <Button
                    width="100%"
                    height="60px"
                    id="btn"
                    fontColor={colour.white}
                    bgColor={colour.secondary}
                    onClick={this.addAmin}
                  >
                    ADD
                  </Button>
                </div>
              </section>
            </div>
          </MiniContent>

          {/* admin table display */}
          <MiniContent width="63%">
            <div className="top">
              <h2>Available Admin</h2>
            </div>

            <div className="content">
              <TableStyle>
                <Column>
                  <TableAdmin>
                    {Headers.map((head, index) => {
                      return (
                        <p key={index} className="header">
                          {head}
                        </p>
                      );
                    })}
                  </TableAdmin>
                  <hr />

                  {contentAdmin.map((row, index) => {
                    return (
                      <React.Fragment key={index}>
                        <TableAdmin>
                          <p>{row.name}</p>
                          <p>{row.email}</p>
                          <p id="previleges">
                            {row.privileges.map((body, i) => {
                              // console.log(i);

                              return (
                                <React.Fragment key={i}>
                                  <span className={`prev-${i}`}>{body}</span>
                                </React.Fragment>
                              );
                            })}
                          </p>

                          <div id="group-icon">
                            <button onClick={this.openModal.bind(this, index)}>
                              <img
                                src={require("../../assets/imgs/actions/deleteIcon.svg")}
                                alt="delete-icon"
                              />
                            </button>

                            <button onClick={this.EditAdmin.bind(this, index)}>
                              <img
                                src={require("../../assets/imgs/actions/editIcon.svg")}
                                alt="edit-icon"
                              />
                            </button>
                          </div>
                        </TableAdmin>
                        <hr />
                      </React.Fragment>
                    );
                  })}
                </Column>
              </TableStyle>
            </div>
          </MiniContent>
        </Row>

        <Modal visible={modal} dismiss={this.dismissable} children={children} />
      </Container>
    );
  }
}

export default Admin;
