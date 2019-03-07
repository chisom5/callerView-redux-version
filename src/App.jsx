import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Sidebar from './Reuseable/Sidebar';

import Login from './components/Login/index';
import Overview from './components/Overview/index';
import AddVideo from './components/AddVideo/index';
import VideoList from './components/VideoList/index';
import Admin from  './components/Admin/index';

import {InitContainer} from './style/init';

class App extends Component {
   

    render() {
        let view;
        const admin_token = localStorage.getItem('CallerView-XXX');

        if(admin_token){
            view =  (
                <React.Fragment>
                  <Sidebar />
 
                    <InitContainer>
                        <Switch>
                            <Route exact path="/" component={Overview}/>    
                            <Route  path="/add-videos" component={AddVideo}/> 
                            <Route  path="/video-list" component={VideoList}/>
                            <Route  path="/admin" component={Admin}/>    
                        </Switch> 
                    </InitContainer>
                </React.Fragment>
              );
        
        }else{
            view=(
                <React.Fragment>
                    <Switch>
                        <Route exact path="/" component={Login} />
                    </Switch>
                </React.Fragment>
            );
        }

        
        return ( 
                <Router>
                    {view}
                </Router>
            );
    }
    
}


export default App;