// https://developer.spotify.com/documentation/web-api/reference/get-playlist
// https://open.spotify.com/playlist/7GTZx8S2ECPWlO0LxIk7wo

export interface Block {
  cover: string;
  spotify?: string;
  track: string;
}

export type Ranks = "S" | "A+" | "A" | "B" | "C" | "F";
