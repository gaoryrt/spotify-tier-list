import styles from "./List.module.less";
import { data, Ranks } from "./env";
import React, { useState } from "react";

import { ReactSortable } from "react-sortablejs";

interface ItemType {
  id: number;
  name: string;
}

const LIST: { rank: Ranks; color: string }[] = [
  {
    rank: "S",
    color: "#FB676C",
  },
  {
    rank: "A+",
    color: "#FF8C00",
  },
  {
    rank: "A",
    color: "#FFD700",
  },
  {
    rank: "B",
    color: "#7FFF00",
  },
  {
    rank: "C",
    color: "#8f66ec",
  },
  {
    rank: "F",
    color: "#e76ce1",
  },
];

export function List() {
  const [tracks, setTracks] = useState({
    F: data.tracks.items.map((o) => {
      const t = o.track;
      return {
        name: t.name,
        artist: t.artists.map((a) => a.name).join(", "),
        cover: t.album.images[0].url,
      };
    }),
  });
  return LIST.map((o) => (
    <div className={styles.tierlist} key={o.rank}>
      <div className={styles.title} style={{ background: o.color }}>
        {o.rank}
      </div>
      <ReactSortable
        animation={150}
        group={{
          name: "shared",
          pull: true,
          put: true,
        }}
        list={tracks[o.rank] || []}
        setList={(newList) => {
          setTracks((prev) => ({
            ...prev,
            [o.rank]: newList,
          }));
        }}
        className={styles.blocklist}
      >
        {tracks[o.rank]?.map((o, index) => (
          <Card {...o} key={index} />
        ))}
      </ReactSortable>
    </div>
  ));
}

function Card({ name, artist, cover }) {
  return (
    <div className={styles.block}>
      <img src={cover} alt={name} />
      <svg height="100" width="100" xmlns="http://www.w3.org/2000/svg">
        <path
          id="my_path1"
          d="M 2 12 L 88 12 L 88 88 L 12 88 Z"
          fill="transparent"
        />
        <text>
          <textPath
            href="#my_path1"
            fill="#f0f2f3"
            fontSize={12}
            fontFamily="Gill Sans, sans-serif"
          >
            {name.toUpperCase()} {artist.toUpperCase()}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
