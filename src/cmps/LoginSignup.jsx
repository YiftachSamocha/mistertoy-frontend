import { useState } from "react"
import { login, signup } from "../store/actions/user.actions.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { Input } from "@mui/base"

export function LoginSignup() {
    const [isSignup, setIsSignup] = useState(false)
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })

    function handleChange({ target }) {
        const { name, value } = target
        setCredentials({ ...credentials, [name]: value })
    }

    function onSubmit() {
        if (isSignup) {
            signup(credentials)
                .then(() => showSuccessMsg('Signed up successfully'))
                .catch(() => showErrorMsg('Cannot sign up'))
        }
        else {
            login(credentials)
                .then(() => showSuccessMsg('Logged in successfully'))
                .catch(() => showErrorMsg('Cannot log in'))
        }
    }
    return <section className="login-signup">
        <div>
            <label htmlFor="username">Username:</label>
            <Input aria-label="Demo input" placeholder="Enter Username..." name="username"
                value={credentials.username} onChange={handleChange} />
        </div>


        <div>
            <label htmlFor="password">Password</label>
            <Input aria-label="Demo input" placeholder="Enter Password..." name="password"
                value={credentials.password} onChange={handleChange} />
        </div>
        {isSignup && <div>
            <label htmlFor="fullname">Full Name:</label>
            <Input aria-label="Demo input" placeholder="Enter Full name..." name="fullname"
                value={credentials.fullname} onChange={handleChange} />
        </div>}

        <button onClick={onSubmit}>{isSignup ? 'Sign up' : 'Log in'}</button>

        <div className="message" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? 'Already signed up? Login' : 'New here? Sign up'}
        </div>


    </section>
}