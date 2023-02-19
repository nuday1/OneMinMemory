import React, { useContext, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import axios from "axios";
// import axios from "axios";

import PlaylistContext from "../../../shared/context/playlist-context";
// import PlaylistShow from "./PlaylistShow";
import "./Playlist.css";
import PlaylistMain from "./PlaylistMain";
import PlaylistTrans from "./PlaylistTrans";

const Playlist = () => {
  const playlistCtx = useContext(PlaylistContext);
  const [{ isover }, newplayimg] = useDrop(() => ({
    accept: ["image"],
    drop: (item) => inputnewplay(item.url),
    collect: (monitor) => ({
      isover: monitor.isOver(),
    }),
  }));

  const inputnewplay = (url => {
    axios
      .post("http://localhost:5000/output/inputnewplay", {
        url: url,
      })
      .then((res) => {
        playlistCtx.addToPlaylist(res.data);
      });
  })

  return (
    <div className="playlist_layout">
      <div className="playlist_main" >
        {playlistCtx.playlist.map((data, i) => (
          <PlaylistMain
            duration={data.duration}
            url={data.url}
            select={data.select}
            i={i}
          />
        ))}
      <div className="playlist_space" ref={newplayimg}/>
      </div>
      <div className="playlist_transition">
        {playlistCtx.playlist.map((data, i) => (
          <PlaylistTrans
            duration={data.duration}
            transition={data.transition}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Playlist;
