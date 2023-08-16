import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser, showUser } from "../redux/userDetailSlice";
import CustomModal from "./CustomModal";
import { RootState, AppDispatch } from "../app/store";
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: "Male" | "Female";
}

const Read: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [id, setId] = useState<string | undefined>(); // Add type annotation

  const [radioData, setRadioData] = useState<string>(""); // Add type annotation

  const [showPopup, setShowPopup] = useState<boolean>(false); // Add type annotation

  const { users, loading, searchData } = useSelector((state: RootState) => state.userDetail);

  useEffect(() => {
    dispatch(showUser());
  }, [dispatch]);

  if (loading) {
    return <h2>Loading</h2>;
  }

  return (
    <div>
      {showPopup && id  && (
        <CustomModal id={id}  setShowPopup={setShowPopup} />
      )}
      <h2>All data</h2>
      <input
        className="form-check-input"
        name="gender"
        checked={radioData === ""}
        type="radio"
        onChange={(e) => setRadioData("")}
      />
      <label className="form-check-label">All</label>
      <input
        className="form-check-input"
        name="gender"
        checked={radioData === "Male"}
        value="Male"
        type="radio"
        onChange={(e) => setRadioData(e.target.value)}
      />
      <label className="form-check-label">Male</label>
      <input
        className="form-check-input"
        name="gender"
        value="Female"
        checked={radioData === "Female"}
        type="radio"
        onChange={(e) => setRadioData(e.target.value)}
      />
      <label className="form-check-label">Female</label>

      <div>
        {users &&
          users
          .filter((ele: User) => {
            if (searchData.length === 0) {
              return true;
            } else {
              return ele.name.toLowerCase().includes(searchData.toLowerCase());
            }
            })
            .filter((ele: any) => {
              if (radioData === "Male" || radioData === "Female") {
                return ele.gender === radioData;
              } else return true; // Keep all elements
            })

            .map((ele: any) => (
              <div key={ele.id} className="card w-50 mx-auto my-2">
                <div className="card-body">
                  <h5 className="card-title">{ele.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
                  <p className="card-text">{ele.gender}</p>
                  <button
                    className="card-link"
                    onClick={() => [setId(ele.id), setShowPopup(true)]}
                  >
                    View
                  </button>
                  <Link to={`/edit/${ele.id}`} className="card-link">
                    Edit
                  </Link>
                  <button
                    onClick={() => dispatch(deleteUser(ele.id))}
                    className="card-link"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Read;
