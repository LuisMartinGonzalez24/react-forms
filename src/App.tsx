import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  ErrorMessage,
  Form,
  Label,
  SendButtonContent,
  SuccessfulMessage,
  TermsAndConditionsContent,
} from './styledComponents/FormsComponent';
import { faTimesCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import InputGroupComponent from './Components/InputGroupComponent';
import { strings } from './i18n/strings';
import { regularExpressions } from './utils/utilities';
import { FormState } from './interfaces/FormsInterfaces';

const initialFormState: FormState = {
  name: { value: '', status: null },
  user: { value: '', status: null },
  email: { value: '', status: null },
  phone: { value: '', status: null },
  password: { value: '', status: null },
  confirmPassword: { value: '', status: null },
}

const App = () => {

  const [state, setstate] = useState<FormState>(initialFormState);
  const [terms, setterms] = useState<boolean>(false);
  const [isFormValid, setisFormValid] = useState<boolean | null>(null);

  const { password, confirmPassword } = state;

  const handleChangeTerms = () => {
    setterms(prevState => !prevState);
  }

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const values: { value: string, status: boolean | null, }[] = Object.values(state);

    for (let i = 0; i < values.length; i++) {
      if (!values[i].status) return;
    }

    setisFormValid(prevState => !prevState);
  }


  const validatePasswordConfirm = () => {
    const passwordValue = password.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();

    if (passwordValue.length > 0) {
      const status: boolean = passwordValue === confirmPasswordValue;

      setstate(prevState => ({
        ...prevState,
        confirmPassword: {
          ...prevState.confirmPassword,
          status,
        }
      }))
    }
  }

  return (
    <main>
      <Form onSubmit={handleOnSubmit}>

        <InputGroupComponent
          state={state}
          changeState={setstate}
          name={'name'}
          labelText={'Name'}
          inputType={'text'}
          placeHolderText={'Name'}
          legendErrorText={strings.input_name_error_message}
          icon={faTimesCircle}
          regularExpression={regularExpressions.name}
        />

        <InputGroupComponent
          state={state}
          changeState={setstate}
          name={'user'}
          labelText={'User'}
          inputType={'text'}
          placeHolderText={'User'}
          legendErrorText={strings.input_user_error_message}
          icon={faTimesCircle}
          regularExpression={regularExpressions.user}
        />

        <InputGroupComponent
          state={state}
          changeState={setstate}
          name={'password'}
          labelText={'Password'}
          inputType={'password'}
          placeHolderText={'Password'}
          legendErrorText={strings.input_password_error_message}
          icon={faTimesCircle}
          regularExpression={regularExpressions.password}
        />

        <InputGroupComponent
          state={state}
          changeState={setstate}
          name={'confirmPassword'}
          labelText={'Confirm Password'}
          inputType={'password'}
          placeHolderText={'Confirm Password'}
          legendErrorText={strings.input_confirm_password_error_message}
          icon={faTimesCircle}
          customFuction={validatePasswordConfirm}
        />

        <InputGroupComponent
          state={state}
          changeState={setstate}
          name={'email'}
          labelText={'Email'}
          inputType={'email'}
          placeHolderText={'Email'}
          legendErrorText={strings.input_email_error_message}
          icon={faTimesCircle}
          regularExpression={regularExpressions.email}
        />

        <InputGroupComponent
          state={state}
          changeState={setstate}
          name={'phone'}
          labelText={'Phone Number'}
          inputType={'text'}
          placeHolderText={'888-888-8888'}
          legendErrorText={strings.input_phone_error_message}
          icon={faTimesCircle}
          regularExpression={regularExpressions.phone}
        />

        <TermsAndConditionsContent>
          <Label>
            <input
              type='checkbox'
              name='terms'
              id='terms'
              checked={terms}
              onChange={handleChangeTerms}
            />
            Accept terms and conditions
          </Label>
        </TermsAndConditionsContent>

        {isFormValid === false && (
          <ErrorMessage>
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <b>Error:</b> Please, complete the form correctly.
          </ErrorMessage>
        )}

        <SendButtonContent>
          <Button type='submit'>Send</Button>
          
          {isFormValid && terms && (
            <SuccessfulMessage>Form sent successfully! </SuccessfulMessage>
          )}
        </SendButtonContent>


      </Form>
    </main>
  );
};

export default App;
