import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons"
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Cancel } from "@material-ui/icons";

export default function Share({ refresh }) {
  const baseurl = process.env.REACT_APP_BASE_URL
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const [File, setFile] = useState(null);
  const disc = useRef();

  const uploadfileHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      disc: disc.current.value
    }

    if (File) {
      const data = new FormData();
      const filename = Date.now() + File.name;
      data.append('name', filename);
      data.append('file', File);

      newPost.img = filename;

      try {
        await axios.post(baseurl+"/upload", data);

      } catch (error) {
        console.log(error);
      }
    }

    try {
      await axios.post(baseurl+"/posts/", newPost);

    } catch (error) {
      console.log(error);
    }
    setFile(null);
    disc.current.value = ""
    refresh(true);
  }

  return (
    <div className="share">
      <form className="shareWrapper" onSubmit={uploadfileHandler}>
        <div className="shareTop">
          <img className="shareProfileImg" src={user.ProfilePicture ? PF + "person/" + user.ProfilePicture : PF + "person/BlankProfilePicture.jpg"} alt="" />
          <input
            placeholder={`What's in your mind ${user.username} ?`}
            className="shareInput" ref={disc}
          />
        </div>
        <hr className="shareHr" />
        {File && (
          <div className="shareImgContainer">
            <img src={URL.createObjectURL(File)} alt="" className="shareImg"></img>
            <Cancel className="shareCancelImg" onClick={() => {
              setFile(null);
            }} />

          </div>
        )}
        <div className="shareBottom">
          <div className="shareOptions">
            <label className="shareOption" htmlFor="file">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input style={{ display: "none" }} type="file" id="file" maxLength="1" accept=".jpg,.png,.jpeg" onChange={(e) => setFile(e.target.files[0])} />
            </label>

            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">Share</button>
        </div>
      </form>
    </div>
  );
}