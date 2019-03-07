import React from 'react'
import {Column, TableStyle, TableRow, Checkbox} from '../../style/init';
import axios from 'axios';
import API from '../../api/constant.js';
import toastr from 'toastr';
import deleteIcon from '../../assets/imgs/actions/deleteIcon.svg';
import editIcon from '../../assets/imgs/actions/editIcon.svg';

class Table extends React.Component {
    constructor( props ) {
        super( props )
        this.state = {
            Headers : [],
            Body : [],
            uploadables : []
        }
    }

    componentWillMount() {
        if( typeof this.props.isForCSV !== 'undefined' && this.props.isForCSV ) {
            let splitted = this.props.Content.split( '\n' )
            let Headers = splitted[ 0 ].split( ',' )
          
            let Body = splitted.slice( 1 )
            // Body.fliter('');

            Headers.push( ' ' )
            Headers.unshift( ' ' )

            this.setState({ Headers, Body })
        }
    }

    componentDidMount() {
        this.props.confirmBtn.current.onclick = this.confirm.bind( this )
    }

    removeRow( index ) {
        this.setState({ 
            Body : this.state.Body.filter( ( row, i ) => index !== i ), 
            uploadables : this.state.uploadables.filter( i => i !== index ) 
        })
    }

    check( index, e ) {
        this.setState({ uploadables : e.target.checked ? [ ...this.state.uploadables, index ] : this.state.uploadables.filter( i => i !== index ) } )
    }

    confirm( e ) {
        let videos = this.state.uploadables;
        const token = localStorage.getItem('token')

        if( videos.length ) {
            for( let index in videos ) {
                let videoData = this.state.Body[ index ].split( ',') 

                axios({
                    url: `${API.baseUrl}/video/create `,
                    method: 'post',
                    data: {
                    name: videoData[0],
                    link: videoData[1],
                    category: videoData[2],
                    region: videoData[3],
                    releaseDate: videoData[4],
                },

                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }).then(res =>{
                    toastr.success('Vidoes successfully added');
                    this.setState({ Body : this.state.Body.filter( ( row, i ) => i !== videos[ index ] ), uploadables : [] } )
                })
                .catch(err => console.log(err));

            }
        }
    }

    render() {

        return (
            <React.Fragment>
                {this.props.Editable?
                    <TableStyle>
                        <Column>

                            <TableRow>
                                    { this.state.Headers.map((head,index)=>{return (<p key={index} className="header">{head}</p>)})}
                            </TableRow>
                            <hr/>

                           

                            {this.state.Body.map((row,index)=>{
                                    // row = row.split( ',' ).map( ( column, i ) => <p key={i}>{ column }</p> )
                                    // row.unshift( <Checkbox type="checkbox" checked={ this.state.uploadables.includes( index )} onChange={ this.check.bind( this, index )} /> )
                                    const content = row.split(',');
                                    return (
                                        <React.Fragment key={index}>
                                            <TableRow>
                                            <Checkbox type="checkbox" checked={ this.state.uploadables.includes( index )} onChange={ this.check.bind( this, index )} />
                                                 <p>{content[0].replace(/"/g,'')}</p>
                                                 <p>{content[1]}</p>
                                                 <p>{content[2]}</p>
                                                 <p>{content[3]}</p>
                                                 <p>{content[4]}</p>
                                                 <p>{content[5]}</p> 
 
                                               <div id="group-icon">
                                                    <button onClick={ this.removeRow.bind( this, index )}><img src={deleteIcon} alt="delete-icon" /></button>
                                                    <button><img src={editIcon} alt="edit-icon" /></button>
                                               </div>
                                            </TableRow>
                                            <hr/>
                                        </React.Fragment>
                                    )
                                })}

                    </Column>

                    </TableStyle>
                    : null
                }
            </React.Fragment>
        );
    }
}

export default Table; 
