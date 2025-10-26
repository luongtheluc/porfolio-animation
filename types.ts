
export enum VideoCategory {
  COMMERCIAL = 'Commercial',
  PRODUCT = 'Product',
  MOTION_GRAPHIC = 'Motion Graphic',
  PERSONAL = 'Personal',
}

export interface VideoProject {
  id: number;
  title: string;
  client: string;
  category: VideoCategory;
  thumbnailUrl: string;
  videoUrl: string; // This would be a link to Vimeo, Cloudflare Stream, etc.
  description: string;
  year: number;
}
