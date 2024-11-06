// src/utils/videoUtils.ts
export const extractVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

export const convertYoutubeUrl = (youtubeUrl:string) => {
    const regex = /youtu\.be\/([a-zA-Z0-9_-]+)/;
    const match = youtubeUrl.match(regex);
  
    if (match && match[1]) {
      const videoId = match[1];
      const params = new URLSearchParams(youtubeUrl.split('?')[1]); 

      if (params.has('t')) {
        const timeInSeconds = params.get('t');
        params.delete('t'); // Remove 't' parameter
        params.set('start', timeInSeconds || ''); // Add 'start' parameter with the same value
      }

      return `https://www.youtube.com/embed/${videoId}${params ? '?' + params : ''}`;
    }

    if (youtubeUrl.includes('/short/'))
    {
      return youtubeUrl.replace('/short/', '/embed/')
    }
    
    return youtubeUrl;
};