import React from "react";
import { useSelector } from "react-redux";
import "./CustomModal.css";
import { RootState } from "../app/store";
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: "Male" | "Female";
}

interface CustomModalProps {
  id: string;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomModal: React.FC<CustomModalProps> = ({ id, setShowPopup }) => {
  const allusers = useSelector((state: RootState) => state.userDetail.users);

  const singleUser = allusers.filter((ele: User) => ele.id === id);
  console.log("singleuser", singleUser);

  if (singleUser.length === 0) {
    return null; // Return null if no user is found with the specified ID
  }

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button onClick={() => setShowPopup(false)}>Close</button>
        <h2>{singleUser[0].name}</h2>
        <h3>{singleUser[0].email}</h3>
        <h4>{singleUser[0].age}</h4>
        <p>{singleUser[0].gender}</p>
      </div>
    </div>
  );
};

export default CustomModal;
