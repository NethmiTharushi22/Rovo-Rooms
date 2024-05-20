import React  from "react";
function Sucess({ message}){
    return (
        <div className="alert alert-success" role="alert">
            {message}
        </div>
    )
}

export default Sucess;