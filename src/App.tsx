import React, { useEffect, useRef, useState } from 'react';
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
  const [seconds, setseconds] = useState<number>(3);
  const timerRef = useRef<number>();

  const { password, confirmPassword } = state;

  useEffect(() => {
    timerRef.current && clearInterval(timerRef.current);

    if (isFormValid) {
      timerRef.current = setInterval(() => {
        setseconds((s) => {
          if (s === 0) {
            setstate(initialFormState);
            setterms(false);
            setisFormValid(null);
            return 3;
          }
          
          return s - 1;
        });
      }, 1000);
    }
  }, [isFormValid])

  const handleChangeTerms = () => {
    setterms(prevState => !prevState);
  }

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const values: { value: string, status: boolean | null, }[] = Object.values(state);

    if (terms) {
      for (let i = 0; i < values.length; i++) {
        const { status } = values[i];

        if (status === false || status === null) {
          setisFormValid(false);
          return;
        };
      }

      setisFormValid(true);
    } else {
      alert('Please, accept terms and conditions.');
    }
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
            <>
              <SuccessfulMessage>Form sent successfully! </SuccessfulMessage>
              <Label>Form will be reseted in {seconds}</Label>
            </>
          )}
        </SendButtonContent>


      </Form>
    </main>
  );
};

export default App;
