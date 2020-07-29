import React, { useRef } from 'react';
import { Form } from '@unform/web';
import { Scope } from '@unform/core';
import * as Yup from 'yup'
import './App.css';


import Input from './components/Form/input';


const initialData = {
  email:'bruno@gmail.com',
  address:{
    city: "colombo"
  }
}

// const user ={
//   name: "bruno",
//     addres:{
//       street: "Rua teste",
//       number : 266,
//     }
// }

function App() {
  const formRef = useRef(null);

  async function handleSubmit(data, { reset }){
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string()
          .email('Digite um email válido')
          .required('O e-mail é obrigatório'),
        address: Yup.object().shape({
          city: Yup.string()
          .min(3, 'No mínimo 3 caracteres')
          .required('A cidade é obrigatória')
        })
      });

      await schema.validate(data, {
        abortEarly: false,
      })
      console.log(data);

      formRef.current.setErrors({});
      
      reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {
          // name: 'Nome obrigatório'
        };
        
        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        })

        formRef.current.setErrors(errorMessages);
      }
    }
  }
  
  return (
    <div className="App">
      <h1>Hello World</h1>

      <Form ref={formRef} initialData={initialData} onSubmit={handleSubmit}>
        <Input name="name"></Input>
        <Input type="email" name="email"></Input>
        <Scope path="address">
          <Input name="street"></Input>
          <Input name="neighborhood "></Input>
          <Input name="city"></Input>
          <Input name="state"></Input>
          <Input name="number"></Input>
        </Scope>
        <button type="submit">Enviar</button>
      </Form>
    </div>
  );
}

export default App;
