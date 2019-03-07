import styled from 'styled-components';
import { colour } from './colour';


export const InitContainer = styled.div `
    min-height:100vh;
    padding-left:25px;
    
`
export const SidebarStyle = styled.div `
    width:223px;
    height: 100vh;
    display:flex;
    position: fixed;
    flex-direction:column;
    box-sizing:border-box;
    padding-top:65px;
    background-color: ${colour.white};
    box-shadow:4px 0px 12px ${colour.shadow};
    justify-content:flex-start;
    align-items:center;

   .nav{
       width: 100%;
       margin-top:100px;
       display:flex;
       flex-wrap:nowrap;
       flex-direction:column;
       justify-content:center;
       text-align:left;
       position: relative;
       left: 0px;
        #logout{
        position: absolute;
        top: 175%;
        }
       a.text{
        padding: 15px 30px; 
        font-size:14px;
        font-family:MetropolisRegular;
        color:${colour.lightGray};  
        text-decoration:none;
        
           
            .icon{
                margin-right: 25px;
                font-size: 25px;            
            }
            .img-active{
                color:${colour.secondary} !important;
            }
            .img-hover{
                color:${colour.secondary} !important;
            }
        }

        .active{
            border-left: 2px solid ${colour.secondary} !important;
            border-radius: 0px 2px 2px 0px;
            color: ${colour.secondary} !important;
            font-weight:bold;
        }
        .hover{
            color: ${colour.secondary} !important;
        }
        
    }

`
export const SidebarIcon = styled.img `
    width: 60px;
    height: 50px;
    object-fit:cover;
    position: relative;
    left: -35px;
    object-position:center;
    
`
export const Container = styled.div `
display: flex;
flex-direction: column;
justify-content: center;
box-sizing: border-box;
margin-left: 223px;
margin-right:30px;
h2 {
    font-size:20px;
    letter-spacing: 2.5px;
    margin-bottom: 32px;
}

`
export const HeaderTitle = styled.div `
    width:100%;
    height:50px;
    display:flex;
    align-item:center;
    justify-content:space-between;
    margin-top:50px;
    margin-bottom:10px;
    h2{
        margin:0;
        letter-spacing:4px;
        font-size:20px;
        line-height:40px;
        font-family:MetropolisMedium;
    }
    button{
        font-size:13px;
        font-family:MetropolisRegular;
        outline:none;
        &:hover{
            color:${colour.white};
            background:${colour.secondary};
        }
    }
    div button#btn-cancel{
        margin-right:30px;
    }
    
    
`

export const ContentBox = styled.div `
    border-radius:5px;
    box-sizing:border-box;
    box-shadow: 0px 8px 18px ${colour.shadow};
    padding: 70px 54px;
    min-height:538px;
    background-color: ${colour.white};
`
export const Button = styled.button `
    width:${props => props.width};   
    height:${props => props.height};
    border: none;
    background: ${props=>props.bgColor};
    color:${props=>props.fontColor}
    border-radius: 5px;
    outline: none;
    cursor: pointer;
    :hover {
        color: white;
        background: ${colour.accentMedium};
    }
    &:disabled{
        cursor:not-allowed;
        &:hover{
            background: ${colour.secondary};
        }
    }
    
`

export const Row = styled.div `
    width:100%;
    display:flex;
    align-items:flex-start;
    justify-content:space-between;
    margin-bottom:0px;
    button{
        letter-spacing:4px;
        font-size:16px;
        font-family:MetropolisMedium
        outline:none;
    }
`
export const RowRight = styled.div `
    display:flex;
    align-items:flex-end;
    flex-direction:column;
    button{
        font-family:MetropolisMedium;
        letter-spacing:4px;
        position:relative;
        z-index:1000;
        outline:none;

       .fas{
        font-size: 1.5em;
        padding: 0px;
        margin-right: 10px;
       }
    }

`

export const FormContainer = styled.div `
    width: ${props=>props.width};
    display:flex;
    flex-wrap:wrap;
    align-items:flex-start;
    justify-content:space-between;
  
`
export const Form = styled.form `
    width:45%;
    height:90px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:space-between;
    margin-bottom:25px;
    
    select{
        font-family: MetropolisRegular;
        font-size: 14px;
    }
`
export const ImageForm = styled.form `
    flex-direction:row;
    width:45%;
    height:90px;
    position:relative;
    top:15px;
    right:14px;
    display:flex;
    align-items:center;
    justify-content:space-between;
    .img-upload{
        width:135px;
        height:60px;
        margin-right: 15px;
        margin-left: 15px
        .img-text{
            color:#fff;
            position: relative;
            top: 25px;
            font-size: 0.8em;
            text-align: center;
        }
    }
    .img-input{
        width:150px;
        height:70px;
        input{
            width:108%;
        }
        
        #img-url{
            position: relative;
            top: -5px;
        }
       
    }
`
export const FormLabel = styled.label `
    width:100%;
    color: ${colour.secondary};
    font-size:14px;
    font-family:MetropolisRegular;
    padding-right:28px;
`
export const FormInput = styled.input `
    width:${props=> props.width};
    height:${props=> props.height};
    border-radius:3px;
    border:1px solid rgba(0, 0, 0, 0.180791);
    box-sizing:border-radius;
    font-family:MetropolisRegular;
    font-size:14px;
    outline:none;
    padding:0px 13px;
    
    ::placeholder{
        color: rgba(0,0,0,0.16);
        font-size: 12px;
    }
    :focus {
        background: rgba(225,244,156,0.16);
        border: 1px solid rgba(0,112,228,0.35);
        color: ${colour.secondary};
    }
    
`
export const CsvContainer = styled.div `
    width:100%;
    height:65px;
    border-radius:3px;
    border:1px solid rgba(0, 0, 0, 0.180791);
    box-sizing:border-radius;
    font-family:MetropolisRegular;
    font-size:14px;
    outline:none;
    padding:0px 13px;
    margin:10px 0px 20px 0px;
    display:flex;
    justify-content:center;
    align-items:center;
    cursor:pointer;
    .active{
        border-style:dotted;
    }
    .csv-para{
        letter-spacing:0px;
        font-size:11px;
        padding:10px 0px;
        
        .fa{
            padding-right: 4px;
            font-size: 13px;
        }
    }
`

export const FormUpload = styled.div `
    width:100%;
    height:${props => props.height};
    display:flex;    
    font-family:MetroplioMedium;
    flex-direction:column;
    background: #aeaea9;;
    border-radius: 2px;
    cursor:pointer;

   .video-text{
    color: #fff;
    position: relative;
    top: 0px;
    left: 50px;
    font-size: 15px;
    font-family: MetropolisRegular;
   }
    #hide{
        display:none;
    }
    #show{
        display:block;
    }
    .upload-text{
        position: relative;
        top: 45%;
        left: 30%;
        color: #fff; 
    }
    .react-sweet-progress {
        position: relative;
        left: 20%;
        top: 30%;
        width: 150px
    }
    .react-sweet-progress-circle-outer{
        top: 35%;
        left: 35%;
        width:70px !important;
        height:70px !important;
    }
    .react-sweet-progress-symbol-absolute{
        left:60% !important;
    }
    
    .video-react{
        background-color:#ffffff;
        padding-top:0px !important;
    }
    .video-active{
        padding-top: 128% !important;
    }
    .video-react .video-react-big-play-button{
        font-size:5em;
        width:0px;
        border:none;
        position:absolute;
        top:115px;
        left:35%;
    }
    .video-react .video-react-loading-spinner{
        top:150px;
    }
    .video-react .video-react-play-control {
        position: relative;
        top: -8px;
    }
    
    img{
        position: relative;
        left: -3%;
        right: 0%;
        top: 45%;
        bottom: 0%;
    }
    
`
export const Column = styled.div `
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between; 
    #header{
        height:70px;
    }

`

export const MiniContent = styled.div `
    display: flex;
    flex-direction: column;
    width:${props=>props.width};
    
    .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
        height: 45px;
        h2 {
            font-size: 20px;
            letter-spacing: 0px;
            margin-bottom: 0px;
        }
        button{
            letter-spacing: 1px;
            font-size: 12px;
            outline:none;
            &:hover{
                background:${colour.secondary}
            }
        }
    }
    #map-line { 
        margin: 0;
        border:  1px solid ${colour.accentLight};
        position: relative;
        top: 65px;
    }
    .map-nav{
        height: 60px;
        width:100%;
        display: flex;
        position:relative;
        top: 65px;
        overflow:hidden;
        
        .swiper-container{
            display:flex;
            max-width: 80%;
            margin: 0px 10px 20px 30px;
            overflow:hidden;
            
            .active{
                border-top: 2px solid ${colour.secondary}
            }

            .swiper-wrapper{
                display:flex;
                max-width:100%;
                p{
                    padding: 10px 15px;
                    width:140px;
                    font-size: 11px;
                    text-align: center;
                    font-family: MetropolisRegular;
                    cursor:pointer;
                }
                
            }
            
           
        }
    }

    .group-icon{
        width: 45px;
        margin-right: 20px;
        margin-bottom: 18px;
        display: flex;
        justify-content: space-between;
        button{
            background:#ffffff;
            border:none;
            cursor:pointer;
            outline:none;
        }
    }
    
    .content {
        background: white;
        border-radius: 5px;
        box-shadow: 0px 8px 18px 0px ${colour.shadow};
        font-family:MetropolisRegular;
        
        section{
            display:flex;
            flex-direction:column;
            padding: 0px 20px;
            padding-top: 20px;
            
            #btn{
                font-size:18px;
                letter-spacing:2px;
                font-family:MetropolisRegular;
            }    
            input{
                width:100%;
                padding: 0px 10px;
                margin: 18px 0px;
            }
            #toggle-password{
                position: absolute;
                top: 100%;
                left: 41%;
            }
            .margin{
                margin:20px 0px 40px 0px;
            }
            #privilege{
                width:100%
                height:100%;
                margin-bottom:20px;
                
                .checkbox-div{
                    display:flex;
                    height:65px;
                    flex-direction:row;
                    align-items:center;
                    border:1px solid rgba(0, 0, 0, 0.180791);
                    padding:10px 5px 0px 5px;
                    margin-top:20px;
                    label{
                        
                        color:${colour.secondary}
                        
                    }
                    .boxes{
                        margin:0px;
                    }
                }
            }
            
            img#arrow{
                position: relative;
                top: -58px;
                bottom: 0px;
                left: 300px;
            }
            
            
            
        }
        .table-height{
            height:533px;
            
            span{
                display:flex;
                justify-content:center;
                align-items:center;
                margin:13px auto;
                .text{
                    text-decoration:none;
                }

                .link{
                    width: 20px;
                    height:20px;
                    border-radius: 2px;
                    border: 1px solid #D5E6FD;
                    color: ${colour.gray};
                    font-size:12px;
                    padding:3px;
                    margin: 0px 6px;
                    box-sizing: border-box;
                    text-align: center;
                    text-decoration: none;
                   
                }
            }
        }
      
    }
    
`

export const TableStyle = styled.div `
    height:${props=> props.height};
    width:100%;
    hr {
        width: 100%;
        margin: 0;
        border:  1px solid ${colour.accentLight};
    }
    hr:last-child{
        border:none;
    }
`
export const TableAdmin = styled.div `
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding:0px 25px;
    box-sizing:border-box;
    height:59px;
    p{
        font-size:11px;
        flex-basis:28%
    }

   p#previleges{
       display:flex;
       justify-content:space-between;
        align-items: center;
        
       span{
        width: 40px;
        line-height: 20px;
        height: 20px;
        text-align:center;
        border-radius:3px;
       }
       
       .prev-0{
            background:${colour.accentOrange};|
       }
       .prev-1{
            background:${colour.accentMedium}
       }
       .prev-2{
           background:${colour.accentOrange}
       }
       .prev-3{
           background:${colour.shadow}
       }
   }

    #group-icon{
        width: 60px;
        padding-left: 15px;
        display: flex;
        justify-content: space-between;
        
        button.hide{
            visibility:hidden;
        }

        button{
            background:#ffffff;
            border:none;
            cursor:pointer;
            outline:none;
        }
    }
    
`
export const TableOverview = styled.div `
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between; 
    padding: 0 34px;
    box-sizing: border-box;
    height: 59px;
    p {
        width: 110px;
        font-size: 11px;
    }
    p.name{
        width:120px;
    }
   
    p:last-child {
        padding-right:0px;
    }
    .header {
        font-family: MetropolisMedium;
    }
    
`

export const TableRow = styled.div `
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding:0px 20px;
    box-sizing:border-box;
    height:100px;
    p{
        font-size:11px;
        width:150px;
       
    }
    p{
        padding-left:15px;

    }
    #margin-left{
        margin-left:40px;
    }
    .headers {
        font-family: MetropolisMedium;
        width:140px;
    }
   
   .link{
    width: 205px;
   } 
  
    #group-icon{
        width: 60px;
        margin-left: 20px;
        display: flex;
        justify-content: space-between;
        button{
            background:#ffffff;
            border:none;
            cursor:pointer;
        }
    }
    
`
export const Checkbox = styled.input `
    border-radius:2px;
    border:1px solid #D5E6FD;
    box-sizing:border-box;

`

export const TableFooter = styled.div `
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end; 
    padding: 0 34px;
    box-sizing: border-box;
    height: 59px;
    span {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        height: 100%;
        text-decoration: none;
        font-family:MetropolisRegular;
        cursor:pointer;

        p {
            color: ${colour.secondary};
            margin-right: 16px;
            font-family:MetropolisRegular;
            font-size:14px;
        }
       
    }
`

export const SelectContainer = styled.div `
    width:100%;
    position:relative;
    width:${props=>props.width};
    .option{
        min-height:160px;
    }
`

export const SelectStyle = styled.div `
    display:flex;
    align-items:center;
    justify-content:space-between;
    border:1px solid #A2CBF6;
    padding:21px;
    box-sizing:border-box;
    border-radius:3px;
    border: 1px solid rgba(0,0,0,0.2);
    width:100%;
    height:${props=>props.height};
    background:#ffffff;
    p:{
        font-size:14px;
        color:${colour.secondary};
        width:80%;
    }
    :hover{
        background: rgba(107, 126, 172, 0.05);
        border: 1px solid rgba(0,112,228,0.35);
    }
`

export const SelectOptionBox = styled.div `
    top: 45px;
    width: 100%;
    min-height: 120px;
    max-height: 120px;
    overflow: auto;
    position: absolute;
    border-radius: 5px;
    z-index:1;
    border: 1px solid rgba(0,112,228,0.35);
    background: ${colour.white};
    .active {
        background: rgba(107,126,172,0.05);
        p {
            color: ${colour.secondary};
        }
    }
    
   
`
export const SelectOption = styled.div `
     width: 100%;
    height: 40px;
    display: flex;
    padding: 0 21px;
    box-sizing: border-box;
    align-items: center;
    cursor:pointer;
    justify-content:space-between;
    p{
        font-size:13px;
        color:${colour.primary};
        
    }
    :hover{
        background: rgba(107,126,172,0.05);
        p{
            color:${colour.secondary}
        }
    }
`
export const ModalContainer = styled.div `
    position:fixed;
    top:0;
    left:0;
    bottom:0;
    z-index: 1050;
    display:flex;
    justify-content:center;
`
export const ModalBox = styled.div `
    position: absolute;
    width:349px;
    min-height:275px;
    max-height:275px;
    overflow:hidden;
    padding:30px 25px 10px 25px;
    margin:80px auto;
    box-sizing:border-box;
    z-index:1; 
    box-shadow:0px 4px 12px rgba(0, 0, 0, 0.12);
    background:${colour.white};
    border-radius:5px;
    
    input{
        margin-bottom:20px;
    }
    .checkbox-div{
        display: flex;
        height: 65px;
        margin: 20px 0px;
        border:1px solid rgba(0, 0, 0, 0.180791);
        padding: 20px 5px 0px 5px;
        
        input{
            width: 277px;
            padding:0px 10px;
            margin:5px 0px;
        } 
        label{
            font-size:15px;
            color:${colour.secondary}
            font-size:MetropolisRegular;
        }
    }
    #csv-field{
        align-items:center;
        display:flex;
        flex-direction:column;
        
        #border {
            border-color:green;
            border-style:dashed;
        }
    }
    p{
        text-align:center;
        letter-spacing:2px;
        margin-bottom:20px;
        font-family:MetropolisMedium;

    }
    
    .csv-text{
        font-size:12px;
        font-family:MetropolisRegular;
        letter-spacing:0px;
        text-decoration:none;
        position:relative;
        left:0px;
        color:${colour.secondary}
    }
    ::placeholder{
        font-family:MetropolisRegular;
    }
    #placeholder{
        text-align:center;
        font-family:MetropolisRegular;
    }
    .input-field{
        width:100%;
        height: 60px;
        text-align:center;
        font-family:MetropolisRegular;
    }
    
    button{
        font-family:MetropolisMedium;
        letter-spacing:4px;
    }
    #margin-left{
        margin-right:53px;
    }
    .text{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 30px 50px;
        width: 200px;
        img{
            width:100px;
            margin-bottom:20px;
        }
        p{
            font-family:MetropolisRegular;
            font-size:12px;
            letter-spacing:2px;
        }
    }
    
`
export const ModalBg = styled.div `
    width:100vw;
    height:100vh;
    z-index:0;
    background:rgba(0,0,0, .5);
    
`
export const BoxList = styled.div `
    width: 100%;
    height: 124px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 38px;
`

export const BoxItemStyle = styled.div `
    width: 32%;
    background: ${colour.white};
    border-radius: 5px;
    height: 100%;
    display: flex;
    align-items: center;
    box-shadow: 0px 8px 18px 0px ${colour.shadow};
    padding: 20px;
    box-sizing: border-box;
    .icon {
        width: 84px;
        height: 91px;
        background: ${colour.secondary};
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 32px;
    }
    .text {
        height: 64px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        p {
            font-size:15px;
            color: ${colour.primary}
        }
        h1 {
            font-size: 32px;
            color: ${colour.primary}
        }
    }
`