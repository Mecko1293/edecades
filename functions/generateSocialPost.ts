export default async function generateSocialPost(req, res) {
  const decades = ['1910s', '1920s', '1930s', '1940s', '1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s'];
  const randomDecade = decades[Math.floor(Math.random() * decades.length)];
  
  const topics = {
    music: 'Did you know? The first jazz recordings changed music forever.',
    sports: 'Legendary athletes continue to inspire generations.',
    culture: 'Every decade has a story worth celebrating.',
    history: 'History lives in the moments we remember.',
    innovation: 'From the past, inspiration for the future.'
  };
  
  const topicKeys = Object.keys(topics);
  const randomTopic = topicKeys[Math.floor(Math.random() * topicKeys.length)];
  const hashtags = `#${randomDecade} #Nostalgia #eDecades #History #CultureTrivia`;
  
  const post = `🎭 ${topics[randomTopic]}\n\nExplore ${randomDecade} memories and stories at eDecades.com\n\n${hashtags}`;
  
  return { post, decade: randomDecade, topic: randomTopic };
}
