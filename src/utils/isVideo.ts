// detect video file on gallery images
const isVideo = (url: string) => {
  return /\.(mp4|webm|ogg|mov|avi|mkv|m4v)$/i.test(url);
};

const isYouTubeLink = (url: string) =>
  /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(url);

export const isMediaPlayable = (url: string) =>
  isVideo(url) || isYouTubeLink(url);
