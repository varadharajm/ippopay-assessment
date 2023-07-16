import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const Details = (props) => {
  const [crud, setCrud] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(
    function () {
      async function getCrudById() {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/users/getUser/${id}`
          );
          setCrud(response.data.data);
        } catch (error) {
          console.log("error", error);
        }
      }
      getCrudById();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props]
  );

  async function handleDelete() {
    try {
      await axios.delete(`http://localhost:8000/api/users/deletUser/${id}`);
      navigate("/cruds");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container my-5" style={{ maxWidth: "600px" }}>
      <h2>{`${crud.first_name && crud.first_name.toUpperCase()} ${
        crud.last_name && crud.last_name.toUpperCase()
      }`}</h2>
      <hr />
      <p>
        <b>Company Name</b>: {crud.companyName}
      </p>

      <p>
        <b>Phone</b>: <a href={`tel:+${crud.phone}`}>+{crud.phone} </a>
      </p>

      <p>
        <b>Email</b>: {crud.email}
      </p>
      <p>
        <b>Location</b>: {crud.location}
      </p>
      <p>
        <b>Link</b> :
        <a href={` ${crud.link}`} target="_blank" rel="noreferrer">
          {crud.link}
        </a>
      </p>
      <p>
        <b>Description</b>: <p align="justify">{crud.description}</p>
      </p>
      <p>
        <small>
          <b>ID</b>: {crud.id}
        </small>
      </p>
      <div className="btn-group ">
        <Link to={`/cruds/${crud.id}/edit`} className="btn btn-primary">
          Edit
        </Link>
        <button onClick={handleDelete} className="btn btn-danger">
          Delete
        </button>
        <Link to="/cruds" className="btn btn-secondary">
          Close
        </Link>
      </div>
      <hr />
    </div>
  );
};

export default Details;
