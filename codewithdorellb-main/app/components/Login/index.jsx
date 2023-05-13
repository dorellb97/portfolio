import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {LOGIN_USER} from '../../apollo/auth'
import { AuthContext } from '../../hooks/AuthContext';
import { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from 'next/router';
import styles from './Login.module.scss'
import { useSelector } from 'react-redux';
import {CiLogin} from 'react-icons/ci'
import Swal from 'sweetalert2';

function LoginCom() {
  const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 3000,
    width: "400px",
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
    customClass: {
        container: 'custom-swal-font',
        title: 'custom-swal-font',
        content: 'custom-swal-font',
        confirmButton: 'custom-swal-font',
      },
  })
   const { user, logout } = useContext(AuthContext);
   const [errorsgr, setErrorsgr] = useState([]);
    const context = useContext(AuthContext) || "";
    const router = useRouter();
    const { auth } = useSelector((state) => state.auth);
    {auth ? router.push('/') : ""}
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(5, 'Password must be at least 5 characters')
      .max(40, 'Password must not exceed 40 characters'),
    // acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const [data, setData] = useState()

  const onSubmit = data => {
    setData(data)
    setTimeout(loginUser, 500)
  };
const [loginUser, {loading}] = useMutation(LOGIN_USER, {
        
  update(proxy, { data: {loginUser: userData}}){
    context.login(userData)
    router.push('/');
},
  onError: (error) => {
      Swal.fire(`Incorrect data: ${error}`);
      // Обработка ошибок вручную
    },

    onCompleted: (data) => {
      Toast.fire({
          icon: 'success',
          title: `Loading`
        })
    } ,
  
  variables: { about: data  },
});
  

  return (
    <div className={styles.back}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <p className={styles.title}>Hello admin</p>
        <div className={styles.part2}>
        <div>
          <p>Email</p>
          <input
            name="email"
            type="text"
            {...register('email')}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          />
          <p className={styles.errors}>{errors.email?.message}</p>
        </div>
        <div>
          <p>Password</p>
          <input
            name="password"
            type="password"
            {...register('password')}
          />
          <p className={styles.errors}>{errors.password?.message}</p>
        </div>
          <button type="submit" className={styles.login}>
            <CiLogin className={styles.iconl}/>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginCom;