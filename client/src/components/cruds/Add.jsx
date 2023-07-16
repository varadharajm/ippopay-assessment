import React, { useState } from "react";
import axiox from "axios";
import { useNavigate } from "react-router-dom";

const Add = (props) => {
  const initialState = {
    first_name: "",
    last_name: "",
    companyName: "",
    phone: "",
    email: "",
    location: "",
    link: "",
    description: "",
  };
  const [crud, setCrud] = useState(initialState);

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    //if (!crud.companyName || !crud.email) return;
    const postCrud = async () => {
      try {
        const response = await axiox.post(
          "http://localhost:8000/api/users/addUser",
          crud
        );
        navigate(`/cruds/${response.data.data.id}`);
      } catch (error) {
        console.log("error", error);
      }
    };
    postCrud();
  }

  function handleChange(event) {
    setCrud({ ...crud, [event.target.name]: event.target.value });
  }

  function handleCancel() {
    navigate("/cruds");
  }

  return (
    <div
      className="container border rounded my-5"
      style={{ maxWidth: "600px" }}
    >
      <h1>Create User</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <label>First Name</label>
              <input
                name="first_name"
                type="text"
                required
                value={crud.first_name}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label>First Name</label>
              <input
                name="last_name"
                type="text"
                required
                value={crud.last_name}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>Company Name</label>
          <input
            name="companyName"
            type="text"
            required
            value={crud.companyName}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            name="phone"
            type="tel"
            pattern="(+91)-[0-9]{10}"
            required
            value={crud.phone}
            onChange={handleChange}
            className="form-control"
          />
          <small>Format: +91-XXXXXXXXXX</small>
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$"
            required
            value={crud.email}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            name="location"
            type="text"
            required
            value={crud.location}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Website/Social Link</label>
          <input
            name="link"
            type="url"
            value={crud.link}
            onChange={handleChange}
            className="form-control"
          />
          <small>Format: https://yourlink.ext</small>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            row="10"
            value={crud.description}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="btn-group my-2">
          <input type="submit" value="Submit" className="btn btn-primary" />
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
