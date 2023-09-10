import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showUser } from "../redux/userDetailSlice";
import { createGroup, deleteGroup } from "../redux/groupDetailSlice";
import { RootState, AppDispatch } from "../app/store";
import { Link } from "react-router-dom";


const Group: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [group, setGroup] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<
    { id: string; value: string | null }[]
  >([]);
  
  const { users, loading } = useSelector(
    (state: RootState) => state.userDetail
  );

  const {
    groups,
  } = useSelector((state: RootState) => state.groupDetail);

  useEffect(() => {
    dispatch(showUser());
  }, [dispatch]);

  if (loading) {
    return <h2>Loading</h2>;
  }
  const getGroupData = (e: any) => {
    setGroup(e.target.value);
  };
  const formData = {
    group: group,
    users: selectedUsers,
    id: Math.floor(Math.random() * 10000),
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(createGroup(formData));
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => ({
        id: option.value,
        value: option.textContent,
      })
    );
    setSelectedUsers(selectedOptions);
  };
  return (
    <div>
      <form className="w-50 mx-auto my-5" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={getGroupData}
          />
          <select
            value={selectedUsers.map((user) => user.id)}
            onChange={handleUserChange}
            multiple
          >
            {users &&
              users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <div>
          {groups &&
            groups.map((ele: any) => (
              <div key={ele.id} className="card w-50 mx-auto my-2">
                <div className="card-body">
                  <h5 className="card-title">{ele.group}</h5>
                  {ele.users.map((user: any) => (
                    <div key={user.id}>
                      <p>{user.value}</p>
                    </div>
                  ))}
                  <Link to={`/group/${ele.id}`} className="card-link">
                    Edit
                  </Link>
                  <button
                    onClick={() => dispatch(deleteGroup(ele))}
                    className="card-link"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </form>
    </div>
  );
};

export default Group;
