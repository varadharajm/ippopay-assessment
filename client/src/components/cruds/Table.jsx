import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Table = () => {
  const [cruds, setCruds] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    const getCruds = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/users/getAllUsers"
        );
        setCruds(response.data.data);
        setTotalRecords(response.data.data.length);
      } catch (error) {
        console.log("error", error);
      }
    };
    getCruds();
  }, []);

  // Pagination Start
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 8;
  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;
  const records = cruds && cruds.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(cruds && cruds.length / dataPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  const prePage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const changePage = (id) => {
    setCurrentPage(id);
  };

  const nextPage = () => {
    if (currentPage !== nPage) setCurrentPage(currentPage + 1);
  };
  // Pagination End

  return (
    <div className="container " style={{ minHeight: "85vh" }}>
      <div>
        <h2>
          Table View
          <p>
            <Link to="/cruds/new" className="btn btn-primary float-right">
              Create User
            </Link>
          </p>
        </h2>
        <hr />
      </div>

      <div className="table-responsive">
        <table className="table riped  table-hover table-bordered container">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Company Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Location</th>
              <th>View</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {records &&
              records.map((crud) => {
                return (
                  <tr key={crud.id}>
                    <td>{crud.first_name}</td>
                    <td>{crud.last_name}</td>
                    <td>
                      <Link to={`/cruds/${crud.id}`} className="link-line">
                        {crud.companyName}
                      </Link>
                    </td>
                    <td>{crud.phone}</td>
                    <td>{crud.email}</td>
                    <td>{crud.location}</td>
                    <td>
                      <Link
                        to={`/cruds/${crud.id}`}
                        className="btn btn-warning"
                      >
                        View
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/cruds/${crud.id}/edit`}
                        className="btn btn-success"
                      >
                        Edit
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/cruds/${crud.id}/delete`}
                        className="btn btn-danger"
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="row m-0">
          <div className="col-3">
            <p style={{ color: "#74788D" }}>
              Showing {currentPage} to {records && records.length} of{" "}
              {totalRecords} results
            </p>
          </div>
          <div className="col-9">
            <div></div>
            <nav>
              <ul className="pagination justify-content-end">
                <li className="page-item">
                  <a
                    className="page-link"
                    style={{ background: "#CED4DA" }}
                    onClick={prePage}
                  >
                    {`<`}
                  </a>
                </li>
                {numbers.map((n, i) => (
                  <li
                    className={`page-item ${currentPage === n ? `active` : ""}`}
                    key={i}
                  >
                    <a className="page-link" onClick={() => changePage(n)}>
                      {n}
                    </a>
                  </li>
                ))}
                <li className="page-item">
                  <a
                    className="page-link"
                    style={{ background: "#CED4DA" }}
                    onClick={nextPage}
                  >
                    {`>`}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
