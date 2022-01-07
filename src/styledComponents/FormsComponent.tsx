import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { colors } from '../theme/colors';
import { media } from '../theme/mediaQuery';

//! It is necessary to prepend the symbol "$" on props, because styled-components doesn't work

type IsValidProps = {
    readonly $isValid?: boolean | null;
}

const Form = styled.form`
    background-color: white;
    border-radius: 5px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;  
    padding: 30px;

    ${media.custom(800)} {
      display: block;
    }
`;

const Label = styled.label<IsValidProps>`
    display: block;
    font-weight: 700;
    padding: 10px 5px;
    min-height: 40px;
    cursor: pointer;

    ${props => props.$isValid === false && css`
        color: ${colors.error};
    `}
`;

const FormGroup = styled.div`
    position: relative;
    z-index: 90;
`;

const Input = styled.input<IsValidProps>`
    width: 100%;
    background-color: #fff;
    border-radius: 3px;
    height: 45px;
    line-height: 45px;
    padding: 0 40px 0 10px;
    transition: .3s ease all;
    border: 3px solid #0077b6;

    &:focus {
        border-color: ${colors.border};
        outline: none;
        box-shadow: 3px 0px 30px rgba(163, 163, 163, 0.4);
    }

    ${props => props.$isValid !== null && css`
        border-color: ${props.$isValid ? colors.successfull : colors.error + '!important'} ;
    `}
`;

const LegendError = styled.p<IsValidProps>`
    font-size: 12px;
    margin-bottom: 0;
    color: ${colors.error};
    display: none;

    ${props => props.$isValid === false && css`
        display: block;
    `}
`;

const ValidationIcon = styled(FontAwesomeIcon)<IsValidProps>`
    position: absolute;
    right: 10px;
    bottom: 14px;
    z-index: 100;
    font-size: 16px;
    opacity: 0;

    ${props => props.$isValid !== null && css`
        opacity: 1;
        color: ${props.$isValid ? colors.successfull : colors.error} !important;
    `}
`;

const TermsAndConditionsContent = styled.div`
    grid-column: span 2;
    
    input {
        margin-right: 10px;
    }
`;

const SendButtonContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-column: span 2;
`;

const Button = styled.button`
    height: 45px;
    line-height: 45px;
    width: 40%;
    background-color: #4a4e69;
    color: #fff;
    font-weight: bold;
    border:  none;
    border-radius: 3px;
    cursor: pointer;
    transition: .3s ease all;

    &:hover {
        background-color: #22223b;
        box-shadow: 3px 0px 30px rgba(163, 163, 163, 0.4);
    }
`;

const SuccessfulMessage = styled.p`
    font-size: 16px;
    color: ${colors.successfull};
    /* display: none; */
`;

const ErrorMessage = styled.p`
    height: 45px;
    line-height: 45px;
    background-color: #F66060;
    padding: 0px 15px;
    border-radius: 3px;
    grid-column: span 2;
    
    p {
        margin: 0;
    }

    b {
		margin-left: 10px;
	}
`;

export {
    Form,
    Label,
    FormGroup,
    Input,
    Button,
    LegendError,
    ValidationIcon,
    TermsAndConditionsContent,
    SendButtonContent,
    SuccessfulMessage,
    ErrorMessage,
};