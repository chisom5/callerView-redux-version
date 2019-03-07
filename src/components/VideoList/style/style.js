import styled from 'styled-components';

export const Section = styled.div `
    width:84%;
    display:flex;
    
    .searchbar{
        img{
            position: relative;
            right: 0px;
            left: -40px;
            top:0px;
        }
    
    }
    .select-style{
        display:flex;
        justify-content:space-evenly;
        width:45%;
        select{
            width:170px;
            border-radius: 3px;
            border: 1px solid rgba(0,0,0,0.180791);
            padding: 0px 5px;
        }
    }
`
export const SearchBar = styled.input `
    width: 446px; 
    height: 45px;
    border-radius: 3px;
    border: 1px solid rgba(0,0,0,0.180791);
    ::placeholder{
        font-family:MetropolisRegular;
        padding-left:10px;
    }
    
`