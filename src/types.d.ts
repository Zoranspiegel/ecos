type followsT = 'following' | 'followers';

interface ImageState {
  file: ArrayBuffer | string | null;
  name: string;
  width?: number;
  height?: number;
}
