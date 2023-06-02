export interface UnsplashImage {
  description: string;
  width: number;
  height: number;
  user: {
    username: string;
  };
  urls: { raw: string };
}

export interface UnsplashSearchImage {
  results: UnsplashImage[];
}
