import React, { useEffect, useState } from "react";
import settingsCss from "../Settings/settings.module.css";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth"; // Добавь этот импорт!
import { updateUserName } from "../../utilities/upDateUser";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function Settings() {
  const dispatich = useDispatch();
  const [newName, setNewName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setNewName(user.displayName || "");
        setEmail(user.email || "");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateUser = (e) => {
    e.preventDefault();
    dispatich(updateUserName(newName));
    toast.success("имя успешно изменено");
  };

  return (
    <div className={settingsCss.wrapper}>
      <div className={settingsCss.settings}>
        <h1>Editing your profile</h1>

        <div className={settingsCss.card}>
          <h2>Profile</h2>

          <form
            className={settingsCss.settingsForm}
            onSubmit={handleUpdateUser}
          >
            <div className={settingsCss.field}>
              <label>Name</label>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                type="text"
                placeholder="Name"
              />
            </div>

            <div className={settingsCss.field}>
              <label>Email</label>
              <input value={email} readOnly type="email" disabled />
            </div>

            <button type="submit">Save changes</button>
          </form>
        </div>
      </div>
    </div>
  );
}
