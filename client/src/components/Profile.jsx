import React from "react";

function Profile (){
    const user = JSON.parse(localStorage.getItem("currentUser"));
    return(
        <div>
            <h1>My Profile</h1>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Is admin:{user.isAdmin ? "yes":"no"}</p>
        </div>
    )
}
export default Profile;