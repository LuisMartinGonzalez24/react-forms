import React, { Dispatch, HTMLInputTypeAttribute, SetStateAction } from 'react';
import { faCheckCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, Input, Label, LegendError, ValidationIcon } from '../styledComponents/FormsComponent';
import { FormNames, FormState } from '../interfaces/FormsInterfaces';

interface Props {
    state: FormState;
    changeState: Dispatch<SetStateAction<FormState>>
    id?: string;
    name: FormNames;
    inputType: HTMLInputTypeAttribute;
    labelText: string;
    legendErrorText: string;
    placeHolderText: string;
    regularExpression?: RegExp;
    icon: IconDefinition;
    customFuction?: () => void;
}

const InputGroupComponent = ({
    state,
    changeState,
    id,
    name,
    inputType,
    labelText,
    placeHolderText,
    legendErrorText,
    regularExpression,
    icon,
    customFuction
}: Props) => {

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeState(prevState => ({
            ...prevState,
            [name]: {
                ...prevState[name],
                value: e.target.value,
            }
        }))
    }

    const validateInput = () => {
        if (regularExpression && regularExpression !== undefined) {
            const status: boolean = regularExpression.test(state[name].value);

            changeState(prevState => ({
                ...prevState,
                [name]: {
                    ...prevState[name],
                    status,
                }
            }))
        }

        if(customFuction && customFuction !== undefined ){
        	customFuction();
        }
    }

    return (
        <div>
            <Label htmlFor={id || name} $isValid={state[name].status}>
                {labelText}
            </Label>
            <FormGroup>
                <Input
                    name={name}
                    id={id || name}
                    type={inputType}
                    $isValid={state[name].status}
                    placeholder={placeHolderText}
                    value={state[name].value}
                    onChange={handleOnChange}
                    onKeyUp={validateInput}
                    onBlur={validateInput}
                />
                <ValidationIcon
                    icon={state[name].status ? faCheckCircle :icon}
                    $isValid={state[name].status}
                />
            </FormGroup>

            <LegendError $isValid={state[name].status}>
                {legendErrorText}
            </LegendError>
        </div>
    )
}

export default InputGroupComponent;