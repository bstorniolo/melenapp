export interface Exercise {
    id: string;
    title: string;
    thumbnailUrl: string;
    videoUrl: string;
    level: string;
    category: string;
    tags: string;
    isFavorite: boolean;
    isCompleted: boolean;
    isTodo: boolean;
  }