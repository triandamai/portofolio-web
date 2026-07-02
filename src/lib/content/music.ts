export interface Track {
  id: string;
  title: string;
  artist: string;
  file: string; // path relative to /static, e.g. /music/track.mp3
}

// Add your MP3 files to /static/music/ and register them here
export const TRACKS: Track[] = [
  {
    id: 'jumanov-nice-memory',
    title: 'Nice Memmory',
    artist: 'Jumanov',
    file: '/music/nice-memory.mp3',
  },
  {
    id: 'kshmr-mystical-beginning',
    title: 'Mystical Beginning',
    artist: 'KSHMR',
    file: '/music/mystical-beginning.mp3',
  }
];
