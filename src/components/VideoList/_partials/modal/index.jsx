import React, { Component } from 'react'
import {ModalContainer,ModalBox,ModalBg} from './modalStyle';

import PropTypes from 'prop-types';

/*
visible:boolean,
dismiss: function on click on Close.
*/

export default class Modal extends Component{
   
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        dismiss: PropTypes.func.isRequired
    }
   
    render(){ 
        const {visible, dismiss, children, styles} = this.props;
        let a;
        a =(styles)? 'activemodal': null

        return(
            <React.Fragment>
                {visible  ?
                <ModalContainer>
                    <ModalBox className={a}>
                        {children}
                   
                    </ModalBox>
                    
                    <ModalBg onClick={dismiss} />

                </ModalContainer>
                :null        
                }

                </React.Fragment>

        )
    }
}
