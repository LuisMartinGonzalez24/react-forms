import React from 'react';
import { Form } from './styledComponents/Form';

const App = () => {
  return (
    <main>
      <Form action=''>
        <label htmlFor=''>User</label>
        <input type='text' placeholder='User' />
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero iusto.
        </p>
      </Form>
    </main>
  );
};

export default App;
