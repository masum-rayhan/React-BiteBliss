import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { inputHelper, toastNotify } from "../../Helper";
import { apiResponse } from "../../Interfaces";
import { MainLoader } from "../../Components/Page/Common";
import { SD_Roles } from "../../Utils/SD";
import { useRegisterUserMutation } from "../../Apis/authApi";

const Register = () => {
  const [registerUser] = useRegisterUserMutation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    userName: "",
    name: "",
    password: "",
    role: "",
  });

  const handleInputUser = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const tempData = inputHelper(event, userInput);
    setUserInput(tempData);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const response: apiResponse = await registerUser({
      userName: userInput.userName,
      name: userInput.name,
      password: userInput.password,
      role: userInput.role,
    });

    if (response.data) {
      //console.log(response.data);
      toastNotify("User registered successfully");
      navigate("/login");
    } else if (response.error) {
      toastNotify(response.error.data.errorMessages[0], "error");
    }
    setLoading(false);
  };

  return (
    <div className="container text-center">
      {loading && <MainLoader />}
      <form method="post" onSubmit={handleSubmit}>
        <h1 className="mt-5">Register</h1>
        <div className="mt-5">
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Username"
              required
              name="userName"
              value={userInput.userName}
              onChange={handleInputUser}
            />
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              required
              name="name"
              value={userInput.name}
              onChange={handleInputUser}
            />
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              required
              name="password"
              value={userInput.password}
              onChange={handleInputUser}
            />
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <select
              className="form-control form-select"
              required
              name="role"
              value={userInput.role}
              onChange={handleInputUser}
            >
              <option value="">--Select Role--</option>
              <option value={`${SD_Roles.CUSTOMER}`}>Customer</option>
              <option value={`${SD_Roles.ADMIN}`}>Admin</option>
            </select>
          </div>
        </div>
        <div className="mt-5">
          <button type="submit" className="btn btn-success" disabled={loading}>
            Register
          </button>
        </div>
      </form>
    </div>
  ); 
};

export default Register;
