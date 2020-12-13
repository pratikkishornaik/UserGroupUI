import React, { useEffect, useRef, useState } from "react";
import classnames from "classnames";

import { getUserDetails } from "../service/service";
import UserProfileIcon from "../assets/user_image_icon.png";
import UserBox from "../components/UserBox/UserBox";

import styles from "./create-group.module.scss";

const CreateGroup = () => {
  const initialFormData = {
    group_name: "",
    group_description: "",
  };

  const fileUploader = useRef(null);
  const [file, setFile] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [sortOrder, setSortOrder] = useState(0);
  const [formData, setFormData] = useState(initialFormData);

  const sortIcon = sortOrder ? "fa fa-chevron-down" : "fa fa-chevron-up";

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    const resp = await getUserDetails();
    if (resp.data) {
      setUsers(resp.data.sort(sortUsers));
    }
  };

  const onInputValueChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const renderUsers = () => {
    return users.map((user) => {
      return (
        <div className={styles.user} key={user.id}>
          <UserBox
            userName={user.name}
            userImage={user.Image || ""}
            onClick={() => onUserClick(user.id)}
            isSelected={selectedUsers.has(user.id)}
          />
        </div>
      );
    });
  };

  const onUserClick = (userId) => {
    const updatedUser = new Set(selectedUsers);
    if (updatedUser.has(userId)) {
      updatedUser.delete(userId);
    } else updatedUser.add(userId);
    setSelectedUsers(updatedUser);
  };

  const sortUsers = () => {
    setSortOrder(!sortOrder);
    setUsers(users.sort(compare));
  };

  const compare = (a, b) => {
    const user1 = sortOrder ? a : b;
    const user2 = sortOrder ? b : a;

    if (user1.name < user2.name) {
      return -1;
    }
    if (user1.name > user2.name) {
      return 1;
    } else return 0;
  };

  const openFileUploader = () => {
    fileUploader.current.click();
  };

  const onFileSelect = async (e) => {
    setFile(e.target.files?.[0]);
    startFileUpload(e.target.files?.[0]);
  };

  const startFileUpload = async (fileObj) => {
    //File upload API call
  };

  const onSubmit = () => {
    console.log("Selected Users", [...selectedUsers], formData);
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <h3>Create Group</h3>
      </div>

      <div className={styles.group_details}>
        <div className={styles.group_image_container}>
          <div
            style={{
              backgroundImage: `url(${
                (file && URL.createObjectURL(file)) || UserProfileIcon
              })`,
            }}
            className={styles.group_image}
          />
          <div className={styles.group_logo_upload} onClick={openFileUploader}>
            <i className="fa fa-camera" />
            <span>Group Logo</span>
          </div>
          <input
            type="file"
            ref={fileUploader}
            style={{ display: "none" }}
            onChange={onFileSelect}
          />
        </div>

        <div className={styles.group_info}>
          <div className={styles.fields}>
            <label>Name</label>
            <input
              placeholder="Group name"
              name="group_name"
              onChange={onInputValueChange}
            />
          </div>
          <div className={styles.fields}>
            <label>Description</label>
            <input
              placeholder="Group description"
              name="group_description"
              onChange={onInputValueChange}
            />
          </div>
        </div>
      </div>
      <div onClick={sortUsers}>
        Sort Users <i className={sortIcon} />
      </div>

      <div className={styles.user_details}>{renderUsers()}</div>

      <div className={styles.button_container}>
        <button
          className={classnames(styles.button, styles.success)}
          onClick={onSubmit}
        >
          Update
        </button>

        <button className={classnames(styles.button, styles.cancle)}>
          Remove
        </button>
      </div>
    </div>
  );
};
export default CreateGroup;
