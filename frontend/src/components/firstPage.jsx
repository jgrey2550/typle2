import React from "react";
import { Link } from "react-router-dom";

function FirstPage() {
    return <div>
        <Link to="/login">Login</Link>
        <br />
        <Link to="/createUser">Create Account</Link>
    </div>
}

export default FirstPage;