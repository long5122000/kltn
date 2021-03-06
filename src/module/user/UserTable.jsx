import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionDelete from "../../components/action/ActionDelete";
import ActionEdit from "../../components/action/ActionEdit";
import LabelStatus from "../../components/label/LabelStatus";
import Table from "../../components/table/Table";
import { db } from "../../firebase-app/firebase-config";
import { userRole, userStatus } from "../../utils/constants";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/auth-context";
const UserTable = () => {
  const { userInfo } = useAuth();
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const colRef = collection(db, "users");
    onSnapshot(colRef, (snapshot) => {
      const result = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUserList(result);
    });
  }, []);
  const renderLabelStatus = (status) => {
    switch (status) {
      case userStatus.ACTIVE:
        return <LabelStatus type="success">Active</LabelStatus>;

      case userStatus.PENDING:
        return <LabelStatus type="warning">Pending</LabelStatus>;

      case userStatus.BAN:
        return <LabelStatus type="danger">Rejected</LabelStatus>;

      default:
        break;
    }
  };
  const renderLabelRole = (role) => {
    switch (role) {
      case userRole.ADMIN:
        return "Admin";
      case userRole.MOD:
        return "Mod";
      case userRole.USER:
        return "User";

      default:
        break;
    }
  };
  const handleDeledeUser = async (user) => {
    if (userInfo?.role !== userRole.ADMIN) {
      Swal.fire("Failed", "You have no right to do this action", "warning");
      return;
    }
    const colRef = doc(db, "users", user.id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef);
        toast.success("Delete user successfully");
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const renderUserItem = (user) => (
    <tr key={user.id}>
      <td title={user.id}>{user.id.slice(0, 5) + "..."}</td>
      <td className="whitespace-nowrap">
        <div className="flex items-center gap-x-3">
          <img
            src={user?.avatar}
            alt=""
            className="object-cover w-10 h-10 rounded-md flex-shrink-0"
          />
          <div className="">
            <h3>{user?.fullname}</h3>
            <time className="text-sm text-gray-300">
              {new Date(user?.createdAt?.seconds * 1000).toLocaleDateString(
                "vi-VI"
              )}
            </time>
          </div>
        </div>{" "}
      </td>
      <td>{user?.username}</td>
      <td title={user?.email}>{user?.email.slice(0, 10) + "..."}</td>
      <td>{renderLabelStatus(Number(user?.status))}</td>
      <td>{renderLabelRole(user?.role)}</td>
      <td>
        <div className="flex items-center gap-x-3 text-gray-500">
          {userInfo?.role === userRole.ADMIN ? (
            <ActionEdit
              onClick={() => navigate(`/manage/update-user?id=${user.id}`)}
            ></ActionEdit>
          ) : (
            <ActionEdit></ActionEdit>
          )}

          <ActionDelete onClick={() => handleDeledeUser(user)}></ActionDelete>
        </div>
      </td>
    </tr>
  );

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Info</th>
            <th>Username</th>
            <th>Email Adress</th>
            <th>Status</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{userList.length > 0 && userList.map(renderUserItem)}</tbody>
      </Table>
    </div>
  );
};

export default UserTable;
