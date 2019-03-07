import styled from 'styled-components';
import { colour } from '../../../style/colour';

export const LoginContainer = styled.div `
    display:flex;
    height:100vh;
    position:relative;
    bottom:70px;
    box-sizing:border-box;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    
`

export const LoginImage = styled.img `
    width: 60px;
    height: 50px;
   
`
export const LoginForm = styled.form `
    width:380px;  
    margin-top:50px; 
    button{
        font-family:MetropolisMedium;
        font-size:20px;
        letter-spacing:3px;
    }
`
export const LoginInput = styled.input `
    width:368px;
    height:50px;
    border-radius:5px;
    box-sizing:border-box;
    margin-bottom:10px;
    padding:0px 20px;
    background: rgba(0, 112, 228, 0.04);
    border: 1px solid rgba(151, 151, 151, 0.1);
    ::placeholder {
        color: ${colour.primary};
        text-align:center;
        opacity:0.7;
        font-size: 18px;
        font-size:Metropolismedium;
    }
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
    ::disabled{
        cursor:not-allowed;
    }
    
`