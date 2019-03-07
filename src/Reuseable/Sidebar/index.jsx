import React, { Component } from 'react'
import { SidebarStyle, SidebarIcon } from '../../style/init';
import { Link } from 'react-router-dom';
import icon from '../../assets/imgs/logo.svg';
// import { TiThLargeOutline, TiUserOutline } from 'react-icons/ti';
// import {colour} from '../../style/colour';

export default class Sidebar extends Component {

  state = {
    active: "index1",
    hover: ""
  }

  handleClick =(index)=> {
    this.setState({
      active: index
    }) 
  }

  handleMouseEvent = (index) => {
    this.setState({
      hover: index
    })
  }

  handleMouseLeave = () => {
    this.setState({
      hover: ''
    })
  }

  // logout users
  LogoutUser = (index)=>{
    // this.setState({active:index})
    localStorage.clear();
    this.props.history.push('/')
  }

  render() {

    return (
      <SidebarStyle>
            <SidebarIcon src={icon} alt="icon"/>

        <nav className="nav">
            <Link to="/" className={["text", this.state.active === 'index1' ? 'active' :null, this.state.hover === 'index1' ? 'hover' : null].join(' ')} onClick={() => this.handleClick( "index1" )} onMouseEnter={() => this.handleMouseEvent("index1")} onMouseLeave={() => this.handleMouseLeave()}>
              <img src={ this.state.active === 'index1' || this.state.active === 'index1' ? require('../../assets/imgs/icons/over-view.svg'): require('../../assets/imgs/icons/overview.svg')} className={["icon"]} alt="over-view"/>
            Overview
            </Link>

            <Link to="/add-videos" className={["text", this.state.active === 'index2' ? 'active' : null, this.state.hover === 'index2' ? 'hover' : null].join(' ')} onClick={() =>this.handleClick("index2")} onMouseEnter={() => this.handleMouseEvent("index2")} onMouseLeave={() => this.handleMouseLeave()}>
            <img src={this.state.hover === 'index2' || this.state.active === 'index2' ? require('../../assets/imgs/icons/addvideo.svg') : require('../../assets/imgs/icons/add-video.svg')}  className={["icon"]} alt="add-video"/>
                Add Videos
            </Link>

            <Link to="/video-list" className={["text", this.state.active === 'index3' ? 'active' : null, this.state.hover === 'index3' ? 'hover' : null ].join(' ')} onClick={(event) =>this.handleClick("index3")} onMouseEnter={() => this.handleMouseEvent("index3")} onMouseLeave={() => this.handleMouseLeave()}>
              <img src={this.state.hover === 'index3' || this.state.active === 'index3' ? require('../../assets/imgs/icons/videolist.svg') : require('../../assets/imgs/icons/video-list.svg')}  className={["icon"]} alt="video-list"/>
                Video List
            </Link>

            <Link to="/admin" className={["text", this.state.active === 'index4' ? 'active' : null, this.state.hover === 'index4' ? 'hover' : null].join(' ')} onClick={() =>this.handleClick("index4")} onMouseEnter={() => this.handleMouseEvent("index4")} onMouseLeave={() => this.handleMouseLeave()}>
              <img src={ this.state.hover === 'index4' || this.state.active === 'index4' ? require('../../assets/imgs/icons/admin-U.svg'): require('../../assets/imgs/icons/admin.svg')} className={["icon"]} alt="admin"/>
                Admin
            </Link>

            <Link to="/" id="logout" className={["text", this.state.active === 'index5' ? 'active' : null, this.state.hover === 'index5' ? 'hover' : null].join(' ')} onClick={ ()=> this.LogoutUser("index5") } onMouseEnter={() => this.handleMouseEvent("index5")} onMouseLeave={() => this.handleMouseLeave()}>
              <img src={ this.state.hover === 'index5' || this.state.active === 'index5' ? require('../../assets/imgs/icons/log-out.svg'): require('../../assets/imgs/icons/logout.svg')} className={["icon"]} alt="log-out"/>
                Log Out
            </Link>
        </nav>

      </SidebarStyle>
    )
  }
}
