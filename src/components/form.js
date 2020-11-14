import React, { useState } from "react";
import storage, { db, timestamp } from "../Firebase/index";
import "./layout.css";
import ProgressBar from "./Loader";
const log = console.log;
const errLog = console.error;

const SubmissionForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [progressBar, setProgressBar] = useState(0);
  const [isHidden, setIsHidden] = useState(true);
  // if (e.target.files[0].size > 1024 * 1024 * 5)
  //   alert("File size cannot exceed more than 5MB");

  const handleChange = e => {
    if (e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleReset = () => {
    setEmail("");
    setName("");
    setImgUrl("");
    setFile(null);
  };

  const handleImageUpload = e => {
    const uploadTask = storage.ref(`images/${file.name}`).put(file);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgressBar(progress);
        setIsHidden(false);
        log(progress);
      },
      error => errLog(error),
      () => {
        storage
          .ref(`images`)
          .child(file.name)
          .getDownloadURL()
          .then(url => {
            setImgUrl(url);
            db.add({
              name: name,
              email: email,
              submitted: timestamp,
              imageURL: url,
            });
            setIsHidden(true);
          });
      }
    );
  };

  return (
    <div>
      <div>
        <input
          type="text"
          className="input"
          placeholder="Name"
          value={name}
          // autoComplete="name"
          onChange={e => setName(e.target.value)}
          required={true}
        />
      </div>
      <br />
      <div>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={email}
          // autoComplete="email"
          onChange={e => setEmail(e.target.value)}
          required={true}
        />
      </div>
      <div>
        <input
          className="filePicker"
          required={true}
          type="file"
          onChange={e => handleChange(e)}
        />
      </div>
      <button className="btn submit" onClick={e => handleImageUpload(e)}>
        Upload image
      </button>
      <br />
      <button className="btn reset" onClick={handleReset}>
        Reset form
      </button>
      <br />
      <div>
        <img src={imgUrl} alt="" width="250" />
      </div>
      {isHidden ? (
        ""
      ) : (
        <ProgressBar
          progress={progressBar}
          size={200}
          circleOneStroke="#161616dd"
          strokeWidth={10}
          circleTwoStroke="#f656fb"
        />
      )}
    </div>
  );
};

export default SubmissionForm;
