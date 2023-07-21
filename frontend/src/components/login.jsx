import React, {useContext} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    //importing the updateUser from context so can update userid when logged in
    const { updateUser } = useContext(UserContext);

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const onChangeUsername = (newName) => {
        setUsername(newName);
    }

    const onChangePassword = (newPassword) => {
        setPassword(newPassword);
    }
    //username and password state variables that update when the user enters their password and username

    const onSubmit = (e) => {
        e.preventDefault();
        
        const loginData = {
            username: username,
            password: password
        }

        console.log(loginData);

        //post request to check for user credentials
        axios.post('https://typle-omega.vercel.app/login/', loginData)
        .then(res => {
            if (res.data.login === 'Login successful') {
                const userId = res.data.userId;
                //updates user with userID that was passed back from the post requeste
                updateUser(userId);
                navigate('/menu');
            } else {
                alert('Invalid username or password');
            }
        })
        .catch(error => console.log(error));

        onChangePassword('');
        onChangeUsername('');
        //post request to /login/ with axios to scan mongodb for matching username + password
    }

    return <div>
        <h1>Login below!</h1>
        <form onSubmit={onSubmit}>
                <div>
                    <label>Username: erere</label>
                    <input 
                        type="text"
                        required
                        value={username}
                        onChange={(e) => onChangeUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input 
                        type="text"
                        required
                        value={password}
                        onChange={(e) => onChangePassword(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        <Link to="/createUser">Create Account</Link>
    </div>
}

export default Login;
