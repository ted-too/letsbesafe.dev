export type Thumbnail = {
  url?: string;
  width: number;
  height: number;
};

export type Platform = "YT";

export interface SearchResult {
  id: string;
  url: string;
  platform: Platform;
  title: string;
  thumbnail?: Thumbnail;
  thumbnails?: Thumbnail[];
}

export type AudioFormat = {
  itag: number;
  bitrate: number;
  duration: number;
  size: number;
};

export type VideoFormat = {
  itag: number;
  audioItag: number;
  quality: number;
  duration: number;
  size: number;
};

export interface Formats {
  audio: AudioFormat[];
  video: VideoFormat[];
}
