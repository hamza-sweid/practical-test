import { useEffect, useState } from 'react';
import style from '../styles/components/popup.module.scss';
import inputStyle from '../styles/common/input.module.scss';
import { User } from '../interface/users';

const Popup = ({
  user,
  onClose,
  onSubmit,
}: {
  user: User;
  onClose: any;
  onSubmit: any;
}) => {
  const [editedUser, setEditedUser] = useState(user);

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const handleInputChange = (event: any, key: string) => {
    console.log(event.target.value);
    setEditedUser({ ...editedUser, [key]: event.target.value });
  };

  const isBtnDisable = () => {
    return !editedUser.fullName;
  };

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = () => {
    onSubmit(editedUser);
  };

  return (
    <div className={style.popupContainer}>
      <div className={style.popup}>
        <h2>Edit User</h2>
        <label className={inputStyle.inputContainer}>
          <input
            type="text"
            value={editedUser.fullName}
            onChange={(e) => handleInputChange(e, 'fullName')}
          />
          <span>Full Name</span>
        </label>

        <div className={style.action}>
          <button disabled={isBtnDisable()} onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
