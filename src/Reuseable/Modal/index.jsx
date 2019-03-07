import React, { Component } from 'react'
import {ModalContainer,ModalBox,ModalBg} from '../../style/init';

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
        const {visible, dismiss, children} = this.props;

        return(
            <React.Fragment>
                {visible  ?
                <ModalContainer>
                    <ModalBox>
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
