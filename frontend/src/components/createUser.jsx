import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function CreateUser() {
    const apiUrl = 'https://typle-omega.vercel.app';
    //switch to http://localhost:5000 when on local
    
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const onChangeUsername = (newName) => {
        setUsername(newName);
    }

    const onChangePassword = (newPassword) => {
        setPassword(newPassword);
    }
    //username and password state variables that update as user is entering info

    const onSubmit = (e) => {
        e.preventDefault();
        
        const user = {
            username: username,
            password: password
        }

        // console.log(user);
        //creates new user with info passed in and posts it to backend
        axios.post(`${apiUrl}/createUser/add`, user)
            .then(res => {
                const newUserId = res.data.userId;
                
                //gets back userID from post request
                const userStats = {
                    userId: newUserId,
                    levels: [],
                    topWPM: 0
                }

                //makes stats object for each user with userID
                axios.post(`${apiUrl}/createUser/addStats`, userStats)
                    .then(res => {
                        console.log(res.data)
                    });

                const defaultSkin = {
                    name: "Default",
                    owned: true
                }
                const userProfile = {
                    userId: newUserId,
                    coins: 0,
                    skins: [defaultSkin],
                    equiptSkin: "Default"
                }
                axios.post(`${apiUrl}/createUser/addProfile`, userProfile)
                    .then(res => {
                        console.log(res.data)
                    });
            });

        onChangePassword('');
        onChangeUsername('');
        //when submitted post request to /add which goes back to the backend through axios
    }

    return (
        <div>
            <h3>create new user</h3>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Username: </label>
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
            <Link to="/login">Login</Link>
        </div>
    );
}

export default CreateUser;
