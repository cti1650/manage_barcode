import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { Form } from '../components/Form';
import { supabase } from '../util/supabase';

const Forgot = () => {
  const { register, handleSubmit } = useForm();

  const handleResetPassword = ({ email }) => {
    supabase.auth.api.resetPasswordForEmail(email);
  };

  const inputList = [
    {
      type: 'email',
      name: 'email',
      ref: register('email', { required: true }),
    },
  ];

  return (
    <Form
      onSubmit={handleSubmit(handleResetPassword)}
      inputList={inputList}
      buttonText='パスワード再設定メール送信'
    />
  );
};

export default Forgot;
