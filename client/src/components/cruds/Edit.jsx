import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Edit = (props) => {
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

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(
    function () {
      async function updateCrud() {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/users/getUser/${id}`
          );
          setCrud(response.data.data);
        } catch (error) {
          console.log(error);
        }
      }
      updateCrud();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props]
  );

  function handleSubmit(event) {
    event.preventDefault();
    async function updateCrud() {
      try {
        await axios.post(
          `http://localhost:8000/api/users/updateUser/${crud.id}`,
          crud
        );
        navigate(`/cruds/${crud.id}`);
      } catch (error) {
        console.log(error);
      }
    }
    updateCrud();
  }

  function handleChange(event) {
    setCrud({ ...crud, [event.target.name]: event.target.value });
  }

  function handleCancel() {
    navigate(`/cruds/${crud.id}`);
  }

  return (
    <div
      className="container border rounded my-5"
      style={{ maxWidth: "600px" }}
    >
      <h1>Edit {`${crud.first_name && crud.first_name.toUpperCase()}`}</h1>
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
            row="5"
            value={crud.description}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="btn-group py-2">
          <button type="submit" className="btn btn-primary">
            Update
          </button>
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

export default Edit;
