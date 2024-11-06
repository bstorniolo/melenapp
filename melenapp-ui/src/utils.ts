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

    const watchRegex = /https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)&?/;
    const match2 = youtubeUrl.match(watchRegex);

    if (match2 && match2[1]) {
      const videoId = match2[1];
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

    
  
    // // Check if the URL matches the 'watch' format
    // if (watchRegex.test(youtubeUrl)) {
      
    //   return youtubeUrl.replace(
    //     watchRegex,
    //     'https://www.youtube.com/embed/$1?'
    //   ); 
    // }
    
    return youtubeUrl;
};


export const convertYoutubeWatchUrl = (youtubeUrl: string) => {
  return youtubeUrl.replace(
    /https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)&?/,
    'https://www.youtube.com/embed/$1?'
  );
};


//https://www.youtube.com/embed/gZcQNUSYrs8
//https://www.youtube.com/embed/watch?v=gZcQNUSYrs8&t=17s


//https://www.youtube.com/embed/gZcQNUSYrs8
//https://www.youtube.com/embed/gZcQNUSYrs8?si=6pbQSsspccceQl0G
//https://www.youtube.com/embed/gZcQNUSYrs8&t=17s&ab_channel=SIKANAEspa%C3%B1ol
//https://www.youtube.com/embed/gZcQNUSYrs8?si=6pbQSsspccceQl0G




//https://www.youtube.com/embed/gZcQNUSYrs8&t=17s&ab_channel=SIKANAEspa%C3%B1ol
//https://www.youtube.com/watch?v=gZcQNUSYrs8&t=17s&ab_channel=SIKANAEspa%C3%B1ol