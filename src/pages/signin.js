import { NextPage } from 'next';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Form } from '../components/Form';
import { supabase } from '../util/supabase';

// https://qiita.com/NozomuTsuruta/items/e730d037b679890e3d02

const Signin = () => {
  const { register, handleSubmit } = useForm();
  const handleSignin = ({ email, password }) => {
    supabase.auth.signIn({ email, password });
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
  ];

  return (
    <div className='h-full grid justify-items-center'>
      <Form
        onSubmit={handleSubmit(handleSignin)}
        inputList={inputList}
        buttonText='サインイン'
      >
        <Link href='/signup'>
          <a>signup</a>
        </Link>
        <Link href='/forgot'>
          <a>forgot</a>
        </Link>
      </Form>
    </div>
  );
};

export default Signin;
