import styled from 'styled-components';

export const ModalContainer = styled.div `
    position:fixed;
    top:0px;
    bottom:0px;
    left:0px;
    z-index:1050; 
    display:flex;
    justify-content:center;
    .activemodal{
        width:65%;
        height:75vh;
    }
`

export const ModalBox = styled.div `
    position: absolute;
    width:349px;
    height:275px;
    overflow:hidden;
    padding:25px 25px 10px 25px;
    margin:80px auto;
    box-sizing:border-box;
    z-index:1; 
    box-shadow:0px 4px 12px rgba(0, 0, 0, 0.12);
    background: #ffffff;
    border-radius:5px;
    .text{
        display: flex;
        flex-direction: column;
        align-items: center; 
        justify-content: center;
        margin: 30px 20px;
        margin-bottom: 50px;
        width: 250px;
        p{
            font-family: MetropolisRegular;
            font-size: 13px;
            letter-spacing: 1px;
        }
    }
    button{
        font-family:MetropolisMedium;
        letter-spacing:4px;
    }
    #margin-left{
        margin-right:53px;
    }
   
    .text-title{
        text-align: center;
        margin-bottom: 20px;
        font-family:MetropolisRegular;
        font-size:16px;
        text-transform:uppercase;
        font-weight:bold;
        p{color: #0070E4 !important};
    }
    .video-active{
        padding-top: 134% !important;
    }

    .react-sweet-progress-circle-outer{
        top: -655%;
        left: 35%;
        width:70px !important;
        height:70px !important;
    }
    form{
        .img-upload{
            margin-right: 15px;
            margin-left: 15px;

            .img-text{
                top: 20px;
            }
        }
        .img-input{
            width: 165px;
        }
    }
`
export const ModalBg = styled.div `
    width:100vw;
    height:100vh;
    z-index:0;
    background:rgba(0,0,0, .5);
    
`