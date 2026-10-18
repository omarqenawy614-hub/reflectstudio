// ============================================================
// VIDEOS section  ("Our Latest Videos")
// كل سطر في القايمة تحت = كارت واحد = فيديو واحد.
// لإضافة فيديو: حطه في src/assets/videos/ واعمل له import هنا.
// ============================================================

import brandFilm from "../assets/videos/reel-1.mp4";
import brandFilmPoster from "../assets/videos/reel-1.png";

export const videos = [
  { title: "CopyRight", src: brandFilm, poster: brandFilmPoster },
  { title: "Video 02", src: "", poster: "" },
  { title: "Video 03", src: "", poster: "" },
  { title: "Video 04", src: "", poster: "" },
  { title: "Video 05", src: "", poster: "" },
  { title: "Video 06", src: "", poster: "" },
];

export const videosSection = {
  eyebrow: "Showreel",
  title: ["Our Latest", "Videos"], // second word gets the gradient
};