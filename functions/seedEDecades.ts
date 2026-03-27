import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

const EDECADES_APP_ID = '6992ac595576405eeacfea16';

const notableFigures = [
  { name: "Michael Jackson", title: "King of Pop", description: "The best-selling music artist of all time, known for the moonwalk, Thriller, and revolutionizing pop music and music videos.", decade_name: "1980s", category: "Music", notable_work: "Thriller (1982)", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Michael_Jackson_Cannes_1997.jpg/440px-Michael_Jackson_Cannes_1997.jpg" },
  { name: "Elvis Presley", title: "The King of Rock and Roll", description: "Cultural icon who brought rock and roll to mainstream America, blending country, gospel, and R&B into a revolutionary new sound.", decade_name: "1950s", category: "Music", notable_work: "Hound Dog (1956)", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Elvis_Presley_promoting_Jailhouse_Rock.jpg/440px-Elvis_Presley_promoting_Jailhouse_Rock.jpg" },
  { name: "The Beatles", title: "The Fab Four", description: "The most influential band in history, leading the British Invasion and shaping the sound of the 1960s and beyond.", decade_name: "1960s", category: "Music", notable_work: "Abbey Road (1969)", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/The_Fabs.JPG/440px-The_Fabs.JPG" },
  { name: "Muhammad Ali", title: "The Greatest", description: "Three-time world heavyweight boxing champion and civil rights activist, widely regarded as the greatest boxer of all time.", decade_name: "1960s", category: "Sports", notable_work: "Rumble in the Jungle (1974)", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Muhammad_Ali_NYWTS.jpg/440px-Muhammad_Ali_NYWTS.jpg" },
  { name: "Marilyn Monroe", title: "Hollywood Icon", description: "The most iconic actress of the 1950s, known for Some Like It Hot and Gentlemen Prefer Blondes — a true cultural phenomenon.", decade_name: "1950s", category: "Film", notable_work: "Some Like It Hot (1959)", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Marilyn_Monroe_in_1952.jpg/440px-Marilyn_Monroe_in_1952.jpg" },
  { name: "Martin Luther King Jr.", title: "Civil Rights Leader", description: "Baptist minister and leader of the American civil rights movement, famous for his I Have a Dream speech in Washington D.C. in 1963.", decade_name: "1960s", category: "Activist", notable_work: "I Have a Dream Speech (1963)", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Martin_Luther_King%2C_Jr..jpg/440px-Martin_Luther_King%2C_Jr..jpg" },
  { name: "Madonna", title: "Queen of Pop", description: "Iconic pop star and cultural provocateur who redefined pop music, fashion, and female empowerment throughout the 1980s.", decade_name: "1980s", category: "Music", notable_work: "Like a Virgin (1984)", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Madonna_-_Home_%28cropped%29.png/440px-Madonna_-_Home_%28cropped%29.png" },
  { name: "Prince", title: "The Purple One", description: "Multi-instrumentalist and musical genius who blended funk, rock, R&B and pop into a unique sound that defined the 1980s.", decade_name: "1980s", category: "Music", notable_work: "Purple Rain (1984)", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Prince_at_Coachella_001.jpg/440px-Prince_at_Coachella_001.jpg" },
  { name: "Tupac Shakur", title: "Hip-Hop Legend", description: "One of the most iconic rappers of all time whose lyrical storytelling addressed social issues, street life, and the Black experience in America.", decade_name: "1990s", category: "Music", notable_work: "All Eyez on Me (1996)" },
  { name: "The Notorious B.I.G.", title: "Biggie Smalls", description: "Brooklyn-born rapper widely considered one of the greatest of all time, known for his storytelling ability and smooth delivery.", decade_name: "1990s", category: "Music", notable_work: "Ready to Die (1994)" },
  { name: "Michael Jordan", title: "His Airness", description: "Six-time NBA champion and cultural phenomenon who transcended basketball to become the greatest athlete of the 20th century.", decade_name: "1990s", category: "Sports", notable_work: "6 NBA Championships with Chicago Bulls", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Michael_Jordan_in_2014.jpg/440px-Michael_Jordan_in_2014.jpg" },
  { name: "David Bowie", title: "Ziggy Stardust", description: "Rock icon and chameleon who reinvented himself multiple times — from glam rock to soul to new wave — influencing generations of artists.", decade_name: "1970s", category: "Music", notable_work: "Heroes (1977)", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/David_Bowie_-_TopPop_1974_05.png/440px-David_Bowie_-_TopPop_1974_05.png" },
  { name: "Bruce Lee", title: "The Dragon", description: "Martial artist, actor, and philosopher who revolutionized martial arts cinema and became a global cultural icon of the 1970s.", decade_name: "1970s", category: "Film", notable_work: "Enter the Dragon (1973)" },
  { name: "Aretha Franklin", title: "Queen of Soul", description: "The greatest female vocalist in American music history, whose powerful voice and emotionally charged performances defined soul music.", decade_name: "1960s", category: "Music", notable_work: "Respect (1967)" },
  { name: "Jimi Hendrix", title: "Guitar God", description: "Considered the greatest electric guitarist in history, his psychedelic performances at Woodstock and beyond changed rock forever.", decade_name: "1960s", category: "Music", notable_work: "Purple Haze (1967)" },
  { name: "Oprah Winfrey", title: "Queen of All Media", description: "Talk show host, producer, and philanthropist who built a media empire and became one of the most influential women of the 20th century.", decade_name: "1990s", category: "Media", notable_work: "The Oprah Winfrey Show (1986–2011)" },
  { name: "Eminem", title: "Slim Shady", description: "Detroit rapper who became the best-selling hip-hop artist of all time, known for rapid-fire delivery and provocative lyrics.", decade_name: "2000s", category: "Music", notable_work: "The Marshall Mathers LP (2000)" },
  { name: "Tiger Woods", title: "Golf Legend", description: "Dominated professional golf in the late 1990s and 2000s, winning 15 major championships and becoming one of the most famous athletes on Earth.", decade_name: "2000s", category: "Sports", notable_work: "Masters Championship (1997, 2001, 2002, 2005)" },
  { name: "Audrey Hepburn", title: "Timeless Icon", description: "Actress and humanitarian who became a style icon of the 1950s and 60s, starring in Breakfast at Tiffany's and Roman Holiday.", decade_name: "1950s", category: "Film", notable_work: "Breakfast at Tiffany's (1961)", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Audrey_Hepburn_in_Sabrina_1954_trailer_crop.jpg/440px-Audrey_Hepburn_in_Sabrina_1954_trailer_crop.jpg" },
  { name: "Bruce Springsteen", title: "The Boss", description: "Rock icon from New Jersey whose blue-collar anthems captured the American dream and made him one of the defining voices of the 1970s and 80s.", decade_name: "1970s", category: "Music", notable_work: "Born to Run (1975)" },
];

const historicalEvents = [
  { title: "Moon Landing — Apollo 11", description: "On July 20, 1969, NASA astronauts Neil Armstrong and Buzz Aldrin became the first humans to walk on the Moon, marking one of humanity's greatest achievements.", decade_name: "1960s", year: 1969, category: "Science & Technology", impact_level: "Global", location_name: "The Moon", is_verified: true },
  { title: "Woodstock Music Festival", description: "400,000 people gathered in upstate New York for a three-day concert that became the defining moment of the counterculture movement and 1960s peace generation.", decade_name: "1960s", year: 1969, category: "Culture & Music", impact_level: "National", location_name: "Bethel, New York", is_verified: true },
  { title: "Fall of the Berlin Wall", description: "On November 9, 1989, the Berlin Wall fell, symbolizing the end of the Cold War and the reunification of East and West Germany after 28 years of division.", decade_name: "1980s", year: 1989, category: "Politics", impact_level: "Global", location_name: "Berlin, Germany", is_verified: true },
  { title: "The Civil Rights Act of 1964", description: "Landmark legislation that outlawed discrimination based on race, color, religion, sex, or national origin — a turning point in the American civil rights movement.", decade_name: "1960s", year: 1964, category: "Politics", impact_level: "National", location_name: "Washington D.C., USA", is_verified: true },
  { title: "Assassination of JFK", description: "President John F. Kennedy was assassinated on November 22, 1963 in Dallas, Texas, shocking the nation and the world and ending the era of Camelot.", decade_name: "1960s", year: 1963, category: "Politics", impact_level: "Global", location_name: "Dallas, Texas", is_verified: true },
  { title: "Vietnam War Ends", description: "The fall of Saigon on April 30, 1975 marked the end of the Vietnam War, the longest and most controversial military conflict in U.S. history.", decade_name: "1970s", year: 1975, category: "War & Conflict", impact_level: "Global", location_name: "Saigon, Vietnam", is_verified: true },
  { title: "The AIDS Crisis Begins", description: "In 1981 the CDC reported the first cases of what would become known as AIDS, triggering a global health crisis that devastated communities worldwide.", decade_name: "1980s", year: 1981, category: "Health", impact_level: "Global", location_name: "United States", is_verified: true },
  { title: "9/11 Terrorist Attacks", description: "On September 11, 2001, hijacked planes struck the World Trade Center and Pentagon, killing nearly 3,000 people and permanently changing global security and foreign policy.", decade_name: "2000s", year: 2001, category: "War & Conflict", impact_level: "Global", location_name: "New York City, USA", is_verified: true },
  { title: "The Internet Goes Public", description: "The World Wide Web was opened to the public in 1991 by Tim Berners-Lee, fundamentally transforming communication, commerce, and culture forever.", decade_name: "1990s", year: 1991, category: "Science & Technology", impact_level: "Global", location_name: "CERN, Switzerland", is_verified: true },
  { title: "End of Apartheid in South Africa", description: "Nelson Mandela was released from prison in 1990 and elected president in 1994, marking the end of apartheid and the beginning of a new democratic South Africa.", decade_name: "1990s", year: 1994, category: "Politics", impact_level: "Global", location_name: "South Africa", is_verified: true },
  { title: "Tiananmen Square Protests", description: "In 1989, pro-democracy protesters gathered in Beijing's Tiananmen Square. The iconic image of Tank Man became one of the most powerful symbols of resistance of the 20th century.", decade_name: "1980s", year: 1989, category: "Politics", impact_level: "Global", location_name: "Beijing, China", is_verified: true },
  { title: "First iPhone Launched", description: "Apple CEO Steve Jobs unveiled the first iPhone on January 9, 2007, revolutionizing the mobile phone industry and changing how the world communicates.", decade_name: "2000s", year: 2007, category: "Science & Technology", impact_level: "Global", location_name: "San Francisco, USA", is_verified: true },
  { title: "Chernobyl Nuclear Disaster", description: "On April 26, 1986, reactor No. 4 at the Chernobyl Nuclear Power Plant exploded in Ukraine, causing the worst nuclear accident in history.", decade_name: "1980s", year: 1986, category: "Disaster", impact_level: "Global", location_name: "Pripyat, Ukraine", is_verified: true },
  { title: "Obama Elected President", description: "On November 4, 2008, Barack Obama was elected as the 44th President of the United States, becoming the first African American to hold the nation's highest office.", decade_name: "2000s", year: 2008, category: "Politics", impact_level: "Global", location_name: "United States", is_verified: true },
  { title: "The Korean War Begins", description: "In 1950, North Korean forces crossed the 38th parallel, beginning a conflict that would kill millions and leave the Korean peninsula divided to this day.", decade_name: "1950s", year: 1950, category: "War & Conflict", impact_level: "Global", location_name: "Korean Peninsula", is_verified: true },
];

const artifacts = [
  { title: "Sony Walkman", description: "The original portable music player released in 1979 that changed how people listened to music forever. A defining symbol of 1980s youth culture.", decade_name: "1980s", category: "Electronics", year: 1979, condition: "Vintage", story: "The Walkman made music personal and portable for the first time, letting people create their own soundtrack to life." },
  { title: "Rubik's Cube", description: "The mechanical puzzle invented in 1974 by Ernő Rubik became the best-selling toy of all time, with over 350 million sold worldwide.", decade_name: "1980s", category: "Toys & Games", year: 1980, condition: "Vintage", story: "The Rubik's Cube craze swept the world in the early 1980s, spawning competitions, books, and a generation of obsessed puzzle solvers." },
  { title: "VHS Tape — Star Wars", description: "Home video release of Star Wars on VHS in 1982, which helped launch the home video revolution and changed how families watched movies.", decade_name: "1980s", category: "Entertainment", year: 1982, condition: "Good", story: "Renting or owning movies on VHS was revolutionary — it meant you could watch your favorite films whenever you wanted at home." },
  { title: "Vinyl Record — Thriller", description: "Michael Jackson's Thriller LP, the best-selling album of all time with over 66 million copies sold worldwide. A perfect example of 1980s pop culture at its peak.", decade_name: "1980s", category: "Music", year: 1982, condition: "Excellent", story: "Owning the Thriller vinyl was a rite of passage in the 1980s. The album stayed on the charts for over two years." },
  { title: "Original Apple Macintosh", description: "The first Macintosh computer released on January 24, 1984 introduced the graphical user interface to the masses and started the personal computing revolution.", decade_name: "1980s", category: "Electronics", year: 1984, condition: "Vintage", story: "Steve Jobs unveiled it with the famous '1984' Super Bowl commercial. It was the first computer regular people could actually use." },
  { title: "Cassette Mixtape", description: "The handmade mixtape was the ultimate personal gift of the 1970s-1990s — a carefully curated selection of songs recorded from the radio or other tapes.", decade_name: "1980s", category: "Music", year: 1985, condition: "Good", story: "Making someone a mixtape meant spending hours perfecting the track list. It was the most personal way to say I like you." },
  { title: "Lava Lamp", description: "The groovy lava lamp invented in the 1960s became synonymous with 1970s hippie and psychedelic culture, decorating dorm rooms and living spaces everywhere.", decade_name: "1970s", category: "Home Decor", year: 1963, condition: "Vintage", story: "Originally called the Astro Lamp, the lava lamp became a symbol of relaxation and counterculture throughout the 1960s and 70s." },
  { title: "Atari 2600 Console", description: "The Atari 2600 brought arcade games into living rooms across America, launching the home video game industry in the late 1970s.", decade_name: "1970s", category: "Toys & Games", year: 1977, condition: "Vintage", story: "Games like Space Invaders, Pac-Man, and Pitfall gave families a new shared experience — gathered around the TV with a joystick in hand." },
  { title: "Polaroid Camera", description: "The Polaroid instant camera became a pop culture icon of the 1970s, delivering printed photos in minutes and creating a new form of spontaneous photography.", decade_name: "1970s", category: "Photography", year: 1972, condition: "Good", story: "Shaking a Polaroid photo was a universal experience of the 1970s and 80s. Andy Warhol was famously obsessed with his Polaroid camera." },
  { title: "The Rotary Telephone", description: "The rotary dial telephone dominated American homes from the 1940s through the 1970s, representing a golden age of home communication.", decade_name: "1950s", category: "Electronics", year: 1950, condition: "Vintage", story: "Families had one phone in the house, usually in the kitchen or hallway. Teenagers would stretch the cord as far as it would go for privacy." },
  { title: "Pong Arcade Machine", description: "The first commercially successful video game, Pong was released in 1972 and launched the entire video game industry.", decade_name: "1970s", category: "Toys & Games", year: 1972, condition: "Vintage", story: "Seeing a Pong machine in a bar or arcade in 1972 was mind-blowing. People lined up to play a simple game of virtual ping pong for hours." },
  { title: "Jukebox", description: "The neon-lit jukebox was the heart and soul of every 1950s diner and soda shop, where teenagers gathered to play their favorite records for a nickel.", decade_name: "1950s", category: "Music", year: 1950, condition: "Vintage", story: "The jukebox wasn't just a music machine — it was the centerpiece of teenage social life in the 1950s, sparking dances and romances." },
  { title: "Original Nike Air Jordans", description: "The Air Jordan 1, released in 1985, changed sneaker culture forever. Michael Jordan wore them and was fined $5,000 per game by the NBA for violating uniform rules.", decade_name: "1980s", category: "Fashion", year: 1985, condition: "Vintage", story: "Nike paid the fines and used them in ads. The controversy made the shoes legendary and launched a sneaker culture that still thrives today." },
  { title: "Disco Ball", description: "The mirrored disco ball became the ultimate symbol of 1970s nightlife, scattering light across dance floors from Studio 54 to local clubs across America.", decade_name: "1970s", category: "Entertainment", year: 1975, condition: "Good", story: "Under the disco ball, everyone was a star. The Studio 54 disco ball became so iconic it now hangs in the Smithsonian." },
  { title: "Gameboy", description: "Nintendo's original Game Boy, released in 1989, put video games in kids' pockets and launched the handheld gaming revolution.", decade_name: "1990s", category: "Electronics", year: 1989, condition: "Good", story: "With Tetris bundled in, the Game Boy sold 1 million units in just two weeks in the US. Whole family road trips revolved around who got to hold it." },
];

const mediaContent = [
  { title: "Thriller — Music Video", description: "Michael Jackson's 14-minute Thriller music video directed by John Landis in 1983 is the most influential music video ever made, revolutionizing the art form.", decade_name: "1980s", content_type: "Music Video", category: "Music", year_recorded: 1983, creator_name: "Michael Jackson", is_featured: true },
  { title: "Star Wars — A New Hope", description: "George Lucas's 1977 space epic that changed cinema forever, spawning the most successful franchise in entertainment history and defining a generation.", decade_name: "1970s", content_type: "Film", category: "Film", year_recorded: 1977, creator_name: "George Lucas", is_featured: true },
  { title: "The Fresh Prince of Bel-Air", description: "Will Smith's iconic 1990s sitcom that blended comedy with social commentary and launched the career of one of Hollywood's biggest stars.", decade_name: "1990s", content_type: "TV Show", category: "Television", year_recorded: 1990, creator_name: "NBC", is_featured: true },
  { title: "Nirvana — Smells Like Teen Spirit", description: "The 1991 music video that launched grunge into the mainstream, made Nirvana global superstars, and defined the sound of Generation X.", decade_name: "1990s", content_type: "Music Video", category: "Music", year_recorded: 1991, creator_name: "Nirvana", is_featured: true },
  { title: "I Love Lucy", description: "The pioneering 1950s sitcom starring Lucille Ball that became one of the most beloved TV shows in history and set the template for American situation comedy.", decade_name: "1950s", content_type: "TV Show", category: "Television", year_recorded: 1951, creator_name: "CBS", is_featured: true },
  { title: "Saturday Night Fever", description: "The 1977 film starring John Travolta that defined the disco era and made the Bee Gees' soundtrack the best-selling album of its time.", decade_name: "1970s", content_type: "Film", category: "Film", year_recorded: 1977, creator_name: "John Badham" },
  { title: "Saved by the Bell", description: "The quintessential Saturday morning 1990s teen sitcom that defined a generation's high school experience and launched multiple careers.", decade_name: "1990s", content_type: "TV Show", category: "Television", year_recorded: 1989, creator_name: "NBC" },
  { title: "Purple Rain — Prince", description: "Prince's 1984 concert film and album that became a cultural phenomenon, showcasing one of the most electrifying performers of the 20th century.", decade_name: "1980s", content_type: "Film", category: "Music", year_recorded: 1984, creator_name: "Prince" },
  { title: "The Godfather", description: "Francis Ford Coppola's 1972 masterpiece is widely considered the greatest film ever made, transforming American cinema and pop culture forever.", decade_name: "1970s", content_type: "Film", category: "Film", year_recorded: 1972, creator_name: "Francis Ford Coppola", is_featured: true },
  { title: "Eminem — Lose Yourself", description: "The Oscar-winning anthem from the 2002 film 8 Mile became one of the best-selling rap songs of all time and defined early 2000s hip-hop.", decade_name: "2000s", content_type: "Music Video", category: "Music", year_recorded: 2002, creator_name: "Eminem" },
  { title: "Friends", description: "The iconic 1990s-2000s sitcom about six friends living in New York City became the most-watched TV show of its era and remains endlessly rewatchable.", decade_name: "1990s", content_type: "TV Show", category: "Television", year_recorded: 1994, creator_name: "NBC", is_featured: true },
  { title: "The Matrix", description: "The 1999 sci-fi action film that blew audiences' minds with its bullet-time special effects and philosophical themes about reality and consciousness.", decade_name: "1990s", content_type: "Film", category: "Film", year_recorded: 1999, creator_name: "The Wachowskis", is_featured: true },
  { title: "The Dark Side of the Moon — Pink Floyd", description: "Pink Floyd's 1973 masterpiece spent over 900 weeks on the Billboard charts and is one of the best-selling albums in history.", decade_name: "1970s", content_type: "Album", category: "Music", year_recorded: 1973, creator_name: "Pink Floyd" },
  { title: "Seinfeld", description: "The self-described show about nothing that ran from 1989 to 1998 became one of the most influential and quoted sitcoms in television history.", decade_name: "1990s", content_type: "TV Show", category: "Television", year_recorded: 1989, creator_name: "NBC" },
  { title: "Back to the Future", description: "Robert Zemeckis's 1985 time-travel comedy became the highest-grossing film of that year and one of the most beloved films of the 1980s.", decade_name: "1980s", content_type: "Film", category: "Film", year_recorded: 1985, creator_name: "Robert Zemeckis", is_featured: true },
];

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const results: Record<string, any> = {};

    // Seed Notable Figures
    const figureResults = [];
    for (const figure of notableFigures) {
      try {
        const r = await base44.asServiceRole.entities.NotableFigure.create(figure);
        figureResults.push({ ok: true, name: figure.name });
      } catch (e) {
        figureResults.push({ ok: false, name: figure.name, error: e.message });
      }
    }
    results.notableFigures = figureResults;

    // Seed Historical Events
    const eventResults = [];
    for (const event of historicalEvents) {
      try {
        const r = await base44.asServiceRole.entities.HistoricalEvent.create(event);
        eventResults.push({ ok: true, title: event.title });
      } catch (e) {
        eventResults.push({ ok: false, title: event.title, error: e.message });
      }
    }
    results.historicalEvents = eventResults;

    // Seed Artifacts
    const artifactResults = [];
    for (const artifact of artifacts) {
      try {
        const r = await base44.asServiceRole.entities.Artifact.create(artifact);
        artifactResults.push({ ok: true, title: artifact.title });
      } catch (e) {
        artifactResults.push({ ok: false, title: artifact.title, error: e.message });
      }
    }
    results.artifacts = artifactResults;

    // Seed Media Content
    const mediaResults = [];
    for (const media of mediaContent) {
      try {
        const r = await base44.asServiceRole.entities.MediaContent.create(media);
        mediaResults.push({ ok: true, title: media.title });
      } catch (e) {
        mediaResults.push({ ok: false, title: media.title, error: e.message });
      }
    }
    results.mediaContent = mediaResults;

    return Response.json({
      success: true,
      summary: {
        notableFigures: figureResults.filter(r => r.ok).length,
        historicalEvents: eventResults.filter(r => r.ok).length,
        artifacts: artifactResults.filter(r => r.ok).length,
        mediaContent: mediaResults.filter(r => r.ok).length,
      },
      details: results,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});
// Fri Mar 27 19:07:45 UTC 2026
