import React from "react";
import userDefaultImage from "../../assets/user_image_icon.png";
import styles from "./userbox.module.scss";

const UserBox = (props) => {
  const { onClick, userName, userImage, isSelected } = props;

  return (
    <div className={styles.user_box} onClick={onClick}>
      <div
        className={styles.user_image}
        style={{ backgroundImage: `url(${userImage || userDefaultImage})` }}
      >
        {isSelected && (
          <div className={styles.checkIcon}>
            <i className="fa fa-check" />
          </div>
        )}
      </div>

      <div className={styles.user_name}>{userName}</div>
    </div>
  );
};

export default UserBox;
