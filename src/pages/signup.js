import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { Form } from '../components/Form';
import { supabase } from '../util/supabase';

const Signup = () => {
  const { register, handleSubmit } = useForm();
  const handleSignup = ({ email, password }) => {
    supabase.auth.signUp({ email, password });
  };

  const inputList = [
    {
      type: 'email',
      name: 'email',
      ref: register('email', { required: true }),
    },
    {
      type: 'password',
      name: 'password',
      ref: register('password', { required: true }),
    },
    {
      type: 'password',
      name: 'password',
      ref: register('passwordConf', { required: true }),
    },
  ];

  return (
    <Form
      onSubmit={handleSubmit(handleSignup)}
      inputList={inputList}
      buttonText='サインアップ'
    />
  );
};

export default Signup;
