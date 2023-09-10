import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState, AppDispatch } from "../app/store";
import { updateGroup } from "../redux/groupDetailSlice";

interface Group {
  id: string;
  name: string;
  users: any;
  group?: string;
}

const EditGroup: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [updateData, setUpdateData] = useState<Group | undefined>();

  const { groups } = useSelector((state: RootState) => state.groupDetail);
  const { users, loading } = useSelector(
    (state: RootState) => state.userDetail
  );

  useEffect(() => {
    if (id && groups) {
      const singleGroup = groups.find(
        (group) => Number(group.id) === Number(id)
      );
      setUpdateData(singleGroup);
    }
  }, [id, groups]);
  const newData = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (updateData) {
      setUpdateData({ ...updateData, group: e.target.value});
    }
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (updateData) {
      dispatch(updateGroup(updateData));
      navigate("/group");
    }
  };
  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => ({
        id: option.value,
        value: option.textContent,
      })
    );
      setUpdateData((prevData: any) => ({
        ...prevData,
        users: selectedOptions,
      }));
  };
  return (
    <div>
      <h2 className="my-2">Edit the Group</h2>
      <form className="w-50 mx-auto my-5" onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            defaultValue={updateData?.group || ""}
            onChange={newData}
          />
        </div>
        {updateData && (
          <select
            //value={updateData.users.map((user: any) => user.id)}
            onChange={handleUserChange}
            multiple
          >
            {users &&
              users.map((user) => (
                <option
                  key={user.id}
                  value={user.id}
                  selected={updateData.users.some((u: any) => u.id === user.id)}
                >
                  {user.name}
                </option>
              ))}
          </select>
        )}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditGroup;
