import { useState } from "react";
import { login, signup } from "../store/actions/user.actions.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@mui/material';

export function LoginSignup() {
    const [isSignup, setIsSignup] = useState(false);

    async function onSubmit(values, { setSubmitting }) {
        if (isSignup) {
            try {
                await signup(values)
                showSuccessMsg('Signed up successfully')
                setSubmitting(false)
            }
            catch {
                showErrorMsg('Cannot sign up')
                setSubmitting(false)
            }
        } else {
            try {
                await login(values)
                showSuccessMsg('Logged in successfully')
                setSubmitting(false)
            }
            catch {
                showErrorMsg('Cannot log in')
                setSubmitting(false)
            }
        }
    }

    const SignupSchema = Yup.object().shape({
        username: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        fullname: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        password: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
    });

    const LoginSchema = Yup.object().shape({
        username: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        password: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
    });

    function CustomInput(props) {
        return (
            <TextField {...props} id="outlined-basic" variant="outlined" />
        );
    }

    return (
        <section className="login-signup">
            <div>
                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                        fullname: '',
                    }}
                    validationSchema={isSignup ? SignupSchema : LoginSchema}
                    onSubmit={onSubmit}
                >
                    {({ errors, touched, isSubmitting }) => (
                        <Form className='my-form'>
                            <Field as={CustomInput} name="username" label="Username" />
                            {errors.username && touched.username && (
                                <div>{errors.username}</div>
                            )}
                            <Field as={CustomInput} name="password" label="Password" type="password" />
                            {errors.password && touched.password && (
                                <div>{errors.password}</div>
                            )}

                            {isSignup && (
                                <>
                                    <Field as={CustomInput} name="fullname" label="Fullname" />
                                    {errors.fullname && touched.fullname && <div>{errors.fullname}</div>}
                                </>
                            )}

                            <button type="submit" disabled={isSubmitting}>{isSignup ? 'Sign up' : 'Log in'}</button>
                        </Form>
                    )}
                </Formik>
            </div>

            <div className="message" onClick={() => setIsSignup(!isSignup)}>
                {isSignup ? 'Already signed up? Login' : 'New here? Sign up'}
            </div>
        </section>
    );
}
