import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {SelectContainer, SelectStyle, SelectOptionBox,SelectOption} from '../../style/init';

export default class Select extends Component{
        static propTypes ={
        options: PropTypes.array.isRequired,
        getSelected: PropTypes.func.isRequired,
        defaultSelected:PropTypes.string.isRequired,
        onAddCategory: PropTypes.func.isRequired   
        }

        constructor(props){
            super(props);
            this.state ={
                _showOption: false,
                _selected :"" || props.defaultSelected,
                _modal: true,
            }
        }

        setSelected =(value, type)=>{
            this.setState({
                _selected: value,
                _showOption:false
            })

            this.props.getSelected(value, type);
        }
        onSelect =()=>{
            this.setState({_showOption: !this.state._showOption})
        }
        
        addCategory =(value, type)=>{
            this.setState({
                _showOption:false,
            })
            this.props.onAddCategory(value, type);
        }
        

       render(){
           const {_showOption, _selected, _modal} = this.state;
           const {addPlaceholder, options} = this.props;

           return(
            <SelectContainer>
                <SelectStyle  onClick = { this.onSelect }>
                    <p>{_selected}</p>
                    <img src={require('../../assets/imgs/downarrow.svg')} alt="downarrow" />
                </SelectStyle>

                    {_showOption === true ?
                    <SelectOptionBox>
                        {options.map((option, index) => {
                            return ( 
                            <SelectOption onClick = {() => this.setSelected(option.name) }
                                className = { _selected === option.name ? "active" : null }
                                key = { index } 
                                >
                                <p> { option.name } </p> 
                            </SelectOption>
                            )
                        })} 

                        
                    <SelectOption onClick={()=>this.addCategory(_modal, addPlaceholder)} >
                        <p>{addPlaceholder}</p>
                        <img src={require('../../assets/imgs/actions/Add.svg')} alt="add" />
                    </SelectOption>

                   </SelectOptionBox> :null}
            </SelectContainer>

           );
       }
}