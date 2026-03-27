import { useState } from "react";

const DECADES_DATA = {
  "1920s": {
    emoji: "🎷",
    tagline: "The Roaring Twenties",
    colors: ["#FFD700", "#000000", "#C0A060", "#8B0000", "#F5DEB3", "#2F2F2F"],
    colorNames: ["Gatsby Gold", "Jet Black", "Champagne", "Art Deco Red", "Cream", "Charcoal"],
    fashion: [
      { label: "Flapper Dress", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Flapper_Couple.jpg/400px-Flapper_Couple.jpg", desc: "Drop-waist dresses with fringe, meant for dancing the Charleston" },
      { label: "Cloche Hat", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/1920s_Portrait.jpg/400px-1920s_Portrait.jpg", desc: "Bell-shaped hats pulled low over bobbed hair — the ultimate 20s look" },
      { label: "Men's Pinstripe Suits", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Al_Capone_in_1930.jpg/400px-Al_Capone_in_1930.jpg", desc: "Wide-lapel pinstripe suits worn by gangsters and gentlemen alike" },
      { label: "Art Deco Jewelry", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Art_Deco_jewelry.jpg/400px-Art_Deco_jewelry.jpg", desc: "Geometric, bold jewelry inspired by Egyptian and Greek motifs" },
    ],
    inventions: [
      { name: "Television", year: 1927, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Baird_television_1926.jpg/400px-Baird_television_1926.jpg", desc: "John Logie Baird demonstrated the first working TV in 1926" },
      { name: "Penicillin", year: 1928, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Alexander_Fleming.jpg/400px-Alexander_Fleming.jpg", desc: "Alexander Fleming's discovery of penicillin changed medicine forever" },
      { name: "Talking Pictures", year: 1927, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/JazzSingerAlJolson.jpg/400px-JazzSingerAlJolson.jpg", desc: "The Jazz Singer became the first synchronized-sound feature film" },
    ],
    culture: ["Charleston dance craze", "Speakeasies & bootleg gin", "Jazz music everywhere", "Women's suffrage", "Rise of cinema"],
  },
  "1930s": {
    emoji: "🎬",
    tagline: "The Golden Age of Hollywood",
    colors: ["#708090", "#2F4F4F", "#8B7355", "#C0A060", "#F5F5DC", "#4A4A4A"],
    colorNames: ["Steel Gray", "Depression Green", "Khaki", "Champagne", "Ivory", "Shadow"],
    fashion: [
      { label: "Bias-Cut Gowns", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Jean_Harlow_MGM_photo.jpg/400px-Jean_Harlow_MGM_photo.jpg", desc: "Sleek, body-skimming silk gowns inspired by Hollywood starlets" },
      { label: "Wide-Leg Trousers", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Fred_Astaire_1936.JPG/400px-Fred_Astaire_1936.JPG", desc: "High-waisted, wide-leg trousers on men — relaxed elegance" },
      { label: "Fedora Hats", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Humphrey_Bogart_in_Casablanca_trailer.jpg/400px-Humphrey_Bogart_in_Casablanca_trailer.jpg", desc: "The fedora was THE hat of the 1930s — worn by everyone from gangsters to movie stars" },
    ],
    inventions: [
      { name: "Nylon", year: 1935, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Nylon_stockings_1940s.jpg/400px-Nylon_stockings_1940s.jpg", desc: "DuPont invented nylon — the first fully synthetic fiber — revolutionizing stockings" },
      { name: "Radar", year: 1935, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Radar_screen_1940s.jpg/400px-Radar_screen_1940s.jpg", desc: "Robert Watson-Watt developed the first practical radar system in 1935" },
      { name: "Jet Engine", year: 1937, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Whittle_W2-700_jet_engine.jpg/400px-Whittle_W2-700_jet_engine.jpg", desc: "Frank Whittle's jet engine prototype changed aviation forever" },
    ],
    culture: ["Great Depression", "The New Deal", "Big Band & Swing", "Hollywood golden era", "Radio becomes king"],
  },
  "1940s": {
    emoji: "✈️",
    tagline: "The War Years & Victory",
    colors: ["#8B0000", "#4169E1", "#F5DEB3", "#228B22", "#C0A060", "#2F2F2F"],
    colorNames: ["Victory Red", "Navy Blue", "Wheat", "Army Green", "Brass", "Blackout"],
    fashion: [
      { label: "Military Uniforms", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Us_army_1943.jpg/400px-Us_army_1943.jpg", desc: "Military influence shaped all fashion — even civilian clothes had structured shoulders" },
      { label: "Rosie the Riveter Style", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/We_Can_Do_It%21.jpg/400px-We_Can_Do_It%21.jpg", desc: "Women entered the workforce wearing practical overalls and headscarves" },
      { label: "Victory Rolls Hairstyle", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Rita_Hayworth_-_publicity.JPG/400px-Rita_Hayworth_-_publicity.JPG", desc: "Rolled curls framing the face — the signature hairstyle of 1940s women" },
    ],
    inventions: [
      { name: "Atomic Bomb", year: 1945, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Trinity_shot_color.jpg/400px-Trinity_shot_color.jpg", desc: "The Manhattan Project produced the atomic bomb, ending WWII and changing history" },
      { name: "Microwave Oven", year: 1945, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Raytheon_Radarange_microwave_oven_1965.jpg/400px-Raytheon_Radarange_microwave_oven_1965.jpg", desc: "Percy Spencer accidentally discovered microwave cooking while working on radar" },
      { name: "Computer (ENIAC)", year: 1945, img: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Eniac.jpg", desc: "ENIAC — the first general-purpose electronic computer — filled an entire room" },
    ],
    culture: ["World War II", "Rationing & Victory Gardens", "Swing dancing", "Rise of suburbia", "Birth of the teenager"],
  },
  "1950s": {
    emoji: "🎸",
    tagline: "Rock & Roll Is Born",
    colors: ["#FF69B4", "#00CED1", "#FF4500", "#FFFF00", "#98FB98", "#000000"],
    colorNames: ["Poodle Pink", "Turquoise", "Flame Red", "Sunny Yellow", "Mint", "Black"],
    fashion: [
      { label: "Poodle Skirt", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Teen_girl_dancing_1950s.jpg/400px-Teen_girl_dancing_1950s.jpg", desc: "Full circle skirts with a poodle appliqué — the ultimate teen fashion statement" },
      { label: "Greaser Style", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Elvis_Presley_promoting_Jailhouse_Rock.jpg/400px-Elvis_Presley_promoting_Jailhouse_Rock.jpg", desc: "Leather jackets, slicked-back hair, and tight jeans — the rebel look" },
      { label: "New Look Silhouette", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Dior_1947.jpg/400px-Dior_1947.jpg", desc: "Christian Dior's hourglass 'New Look' — nipped waist and full skirt" },
      { label: "Cat Eye Sunglasses", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Audrey_Hepburn_in_Sabrina_1954_trailer_crop.jpg/400px-Audrey_Hepburn_in_Sabrina_1954_trailer_crop.jpg", desc: "Upswept cat-eye frames were the must-have accessory of every 50s woman" },
    ],
    inventions: [
      { name: "Color TV", year: 1953, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/RCA_CT-100_color_TV.jpg/400px-RCA_CT-100_color_TV.jpg", desc: "RCA launched commercial color television in 1953, changing entertainment forever" },
      { name: "Credit Card", year: 1950, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Diners_Club_Card_1950s.jpg/400px-Diners_Club_Card_1950s.jpg", desc: "The Diners Club card — the world's first credit card — launched in 1950" },
      { name: "DNA Double Helix", year: 1953, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/DNA_Structure%2BKey%2BLabelled.pn_NoBB.png/400px-DNA_Structure%2BKey%2BLabelled.pn_NoBB.png", desc: "Watson and Crick discovered the double helix structure of DNA in 1953" },
    ],
    culture: ["Birth of rock & roll", "Drive-in movies & diners", "Cold War anxiety", "TV becomes king", "Baby Boom"],
  },
  "1960s": {
    emoji: "☮️",
    tagline: "Peace, Love & Revolution",
    colors: ["#FF6347", "#4169E1", "#FFFF00", "#FF69B4", "#90EE90", "#FF8C00"],
    colorNames: ["Tomato Red", "Royal Blue", "Psychedelic Yellow", "Hot Pink", "Lime", "Tangerine"],
    fashion: [
      { label: "Mini Skirt", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Twiggy_1967.JPG/400px-Twiggy_1967.JPG", desc: "Mary Quant's mini skirt became the ultimate symbol of 1960s liberation" },
      { label: "Mod Fashion", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Mia_Farrow_1960s.jpg/400px-Mia_Farrow_1960s.jpg", desc: "Bold geometric prints and space-age silhouettes — London's Mod scene" },
      { label: "Hippie Style", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Woodstock_redmond_hair.JPG/400px-Woodstock_redmond_hair.JPG", desc: "Tie-dye, bell-bottoms, flower crowns — the counterculture look of the late 60s" },
      { label: "Go-Go Boots", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Nancy_Sinatra_These_Boots.jpg/400px-Nancy_Sinatra_These_Boots.jpg", desc: "White knee-high boots worn with mini skirts — a defining 60s accessory" },
    ],
    inventions: [
      { name: "Internet (ARPANET)", year: 1969, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Arpanet_logical_map%2C_march_1977.png/400px-Arpanet_logical_map%2C_march_1977.png", desc: "ARPANET — the precursor to the internet — sent its first message in 1969" },
      { name: "Moon Landing", year: 1969, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Aldrin_Apollo_11_original.jpg/400px-Aldrin_Apollo_11_original.jpg", desc: "Apollo 11 put humans on the Moon — the greatest technological achievement ever" },
      { name: "Laser", year: 1960, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Laser_Interference.JPG/400px-Laser_Interference.JPG", desc: "Theodore Maiman built the first working laser in 1960" },
    ],
    culture: ["Civil Rights Movement", "Moon Landing", "Woodstock", "British Invasion", "Counterculture & Vietnam protests"],
  },
  "1970s": {
    emoji: "🪩",
    tagline: "Disco, Funk & Freedom",
    colors: ["#FF8C00", "#8B4513", "#DAA520", "#556B2F", "#CD853F", "#FF6347"],
    colorNames: ["Burnt Orange", "Brown", "Harvest Gold", "Avocado Green", "Earth Tone", "Rust"],
    fashion: [
      { label: "Bell-Bottom Jeans", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Bell-bottoms.jpg/400px-Bell-bottoms.jpg", desc: "Flared jeans that widened dramatically below the knee — the 70s signature" },
      { label: "Disco Outfit", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Saturday_Night_Fever_1977.jpg/400px-Saturday_Night_Fever_1977.jpg", desc: "Polyester jumpsuits, platform shoes, and open shirts — dance floor fashion" },
      { label: "Afro Hairstyle", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Angela_Davis_%28Jill_Freedman%29.jpg/400px-Angela_Davis_%28Jill_Freedman%29.jpg", desc: "The Afro became a powerful symbol of Black pride and identity in the 1970s" },
      { label: "Platform Shoes", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Platform_shoes_1970s.jpg/400px-Platform_shoes_1970s.jpg", desc: "Towering platform soles worn by both men and women on the disco dance floor" },
    ],
    inventions: [
      { name: "Personal Computer", year: 1975, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Apple_I_Computer.jpg/400px-Apple_I_Computer.jpg", desc: "The Altair 8800 (1975) and Apple I (1976) kicked off the PC revolution" },
      { name: "VHS Video Tape", year: 1976, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/VHS-Video-Tape-Top-Transparent.png/400px-VHS-Video-Tape-Top-Transparent.png", desc: "JVC's VHS format won the format war and put movies in living rooms everywhere" },
      { name: "Mobile Phone", year: 1973, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/DynaTAC8000X.jpg/400px-DynaTAC8000X.jpg", desc: "Motorola engineer Martin Cooper made the first cell phone call in 1973" },
    ],
    culture: ["Disco & Studio 54", "Watergate scandal", "Punk rock emergence", "The Brady Bunch era", "Gas crisis & inflation"],
  },
  "1980s": {
    emoji: "🕹️",
    tagline: "Neon, Synth & Power",
    colors: ["#FF1493", "#00FFFF", "#FF4500", "#9400D3", "#00FF00", "#FFD700"],
    colorNames: ["Hot Pink", "Electric Blue", "Neon Orange", "Purple", "Neon Green", "Gold"],
    fashion: [
      { label: "Power Suit with Shoulder Pads", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Alexis_Carrington_Dynasty_1980s.jpg/400px-Alexis_Carrington_Dynasty_1980s.jpg", desc: "Massive shoulder pads defined the power-dressing era of the 1980s" },
      { label: "Acid Wash Jeans", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Acid-wash-jeans.jpg/400px-Acid-wash-jeans.jpg", desc: "Bleached and distressed denim was everywhere in the mid to late 80s" },
      { label: "Track Suits & Sneakers", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Run_DMC_1986.jpg/400px-Run_DMC_1986.jpg", desc: "Run-DMC made Adidas tracksuits and shell-toe sneakers a cultural statement" },
      { label: "Big Hair & Perms", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Cindy_Lauper_1984.jpg/400px-Cindy_Lauper_1984.jpg", desc: "The bigger the hair, the better — perms and teased styles were everything" },
    ],
    inventions: [
      { name: "Apple Macintosh", year: 1984, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Macintosh_128k_transparency.png/400px-Macintosh_128k_transparency.png", desc: "The 1984 Mac introduced the graphical user interface to mainstream consumers" },
      { name: "Nintendo Entertainment System", year: 1985, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/NES-Console-Set.jpg/400px-NES-Console-Set.jpg", desc: "The NES saved the video game industry after the 1983 crash and made gaming mainstream" },
      { name: "CD Player", year: 1982, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Sony-CDP-101-CD-Player.jpg/400px-Sony-CDP-101-CD-Player.jpg", desc: "Sony's first CD player launched in 1982, delivering crystal-clear digital audio" },
    ],
    culture: ["MTV launches", "Reagan era", "Hip-hop rises", "AIDS crisis", "Yuppie culture & Wall Street"],
  },
  "1990s": {
    emoji: "📼",
    tagline: "Grunge, Hip-Hop & the Internet",
    colors: ["#9370DB", "#20B2AA", "#FF6347", "#32CD32", "#FFD700", "#DC143C"],
    colorNames: ["Grunge Purple", "Teal", "Tomato", "Slime Green", "Gold", "Crimson"],
    fashion: [
      { label: "Grunge Style", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Kurt_Cobain_1993_cropped_retouched.jpg/400px-Kurt_Cobain_1993_cropped_retouched.jpg", desc: "Flannel shirts, ripped jeans, and combat boots — Kurt Cobain's anti-fashion became fashion" },
      { label: "Windbreaker & Baggy Jeans", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Will_Smith_Fresh_Prince.jpg/400px-Will_Smith_Fresh_Prince.jpg", desc: "Bright windbreakers, backward caps, and baggy jeans were peak 90s street style" },
      { label: "Slip Dress", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Winona_Ryder_1993.jpg/400px-Winona_Ryder_1993.jpg", desc: "The minimalist slip dress worn over a t-shirt captured 90s effortless cool" },
      { label: "Platform Sneakers", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Spice_Girls_1997.jpg/400px-Spice_Girls_1997.jpg", desc: "The Spice Girls made chunky platform sneakers a global phenomenon" },
    ],
    inventions: [
      { name: "World Wide Web", year: 1991, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/First_Web_Server.jpg/400px-First_Web_Server.jpg", desc: "Tim Berners-Lee's World Wide Web went public in 1991 — the world changed overnight" },
      { name: "PlayStation", year: 1994, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/PlayStation-SCPH-1000-with-Controller.jpg/400px-PlayStation-SCPH-1000-with-Controller.jpg", desc: "Sony's PlayStation revolutionized gaming with 3D graphics and CD-ROM games" },
      { name: "DVD", year: 1997, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/DVD_logo.svg/400px-DVD_logo.svg", desc: "The DVD replaced VHS and launched the home theater revolution of the late 90s" },
    ],
    culture: ["Rise of the internet", "Grunge & hip-hop dominance", "The Simpsons era", "Clinton years", "Y2K panic"],
  },
  "2000s": {
    emoji: "💿",
    tagline: "Y2K, iPods & Reality TV",
    colors: ["#1E90FF", "#FF6347", "#00CED1", "#FF69B4", "#9ACD32", "#FF8C00"],
    colorNames: ["Digital Blue", "Tomato", "Y2K Teal", "Bubblegum Pink", "Matrix Green", "Orange"],
    fashion: [
      { label: "Low-Rise Jeans", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Britney_Spears_2000.jpg/400px-Britney_Spears_2000.jpg", desc: "Ultra-low waistbands paired with belly tops — the defining 2000s silhouette" },
      { label: "Velour Tracksuit", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Paris_Hilton_2006.jpg/400px-Paris_Hilton_2006.jpg", desc: "Juicy Couture velour tracksuits were the status symbol of early 2000s celebrity culture" },
      { label: "Graphic Tees", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Eminem_2009.jpg/400px-Eminem_2009.jpg", desc: "Oversized graphic tees with bold logos or band names were everywhere in the 2000s" },
    ],
    inventions: [
      { name: "iPod", year: 2001, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/IPod_classic_1G.svg/400px-IPod_classic_1G.svg", desc: "Apple's iPod put 1,000 songs in your pocket and killed the portable CD player overnight" },
      { name: "Facebook", year: 2004, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/400px-Facebook_Logo_%282019%29.png", desc: "Mark Zuckerberg launched Facebook in 2004 from his Harvard dorm room" },
      { name: "iPhone", year: 2007, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/IPhone_1G.svg/400px-IPhone_1G.svg", desc: "Steve Jobs revealed the first iPhone in 2007 — the device that changed everything" },
    ],
    culture: ["9/11 & the War on Terror", "Reality TV explosion", "MySpace generation", "Harry Potter mania", "Social media begins"],
  },
  "2010s": {
    emoji: "📱",
    tagline: "Social Media & the Smartphone Era",
    colors: ["#FF1744", "#00BCD4", "#FF9800", "#9C27B0", "#4CAF50", "#2196F3"],
    colorNames: ["Instagram Red", "Twitter Blue", "Amber", "Snapchat Purple", "WhatsApp Green", "Facebook Blue"],
    fashion: [
      { label: "Athleisure", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Lululemon_store.jpg/400px-Lululemon_store.jpg", desc: "Yoga pants and leggings left the gym and became everyday wear for millions" },
      { label: "Hypebeast Streetwear", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Supreme_Logo.svg/400px-Supreme_Logo.svg", desc: "Supreme, Off-White, and limited-edition sneakers defined 2010s hype culture" },
      { label: "Normcore", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Steve_Jobs_Headshot_2010-CROP2.jpg/400px-Steve_Jobs_Headshot_2010-CROP2.jpg", desc: "Deliberately plain, unremarkable clothing as a fashion statement — Steve Jobs was the icon" },
    ],
    inventions: [
      { name: "iPad", year: 2010, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/IPad_2_Wi-Fi_White.jpg/400px-IPad_2_Wi-Fi_White.jpg", desc: "Apple's iPad launched in 2010 and created the modern tablet category" },
      { name: "Tesla Electric Car", year: 2012, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/2012_Tesla_Model_S_--_NHTSA_1.jpg/400px-2012_Tesla_Model_S_--_NHTSA_1.jpg", desc: "The Tesla Model S proved electric cars could be fast, beautiful, and desirable" },
      { name: "Instagram", year: 2010, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/400px-Instagram_icon.png", desc: "Instagram launched in 2010, turning everyone into a photographer and creating influencer culture" },
    ],
    culture: ["Rise of influencers", "Netflix binge culture", "BLM movement", "Avengers era", "Streaming kills cable"],
  },
};

const DECADE_KEYS = ["1920s","1930s","1940s","1950s","1960s","1970s","1980s","1990s","2000s","2010s"];

const TAB_OPTIONS = ["Fashion", "Colors", "Inventions", "Culture"];

export default function DecadeVisuals() {
  const [activeDec, setActiveDec] = useState("1980s");
  const [activeTab, setActiveTab] = useState("Fashion");

  const dec = DECADES_DATA[activeDec];

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#07070f", minHeight: "100vh", color: "#fff" }}>

      {/* HERO */}
      <div style={{
        background: "linear-gradient(135deg, #0d0d1f 0%, #1a0a2e 50%, #0d1f0d 100%)",
        borderBottom: "1px solid rgba(255,215,0,0.12)",
        padding: "48px 24px 36px", textAlign: "center"
      }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>🎨</div>
        <h1 style={{ fontSize: 42, fontWeight: 900, margin: "0 0 10px", letterSpacing: -1 }}>
          Decade <span style={{ color: "#FFD700" }}>Visual Archive</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 18, maxWidth: 560, margin: "0 auto" }}>
          Fashion, colors, inventions, and culture — visually documented across every decade.
        </p>
      </div>

      {/* DECADE SELECTOR */}
      <div style={{ overflowX: "auto", borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(0,0,0,0.4)", scrollbarWidth: "none" }}>
        <div style={{ display: "flex", padding: "0 16px", minWidth: "max-content" }}>
          {DECADE_KEYS.map(d => {
            const info = DECADES_DATA[d];
            const isActive = activeDec === d;
            return (
              <button key={d} onClick={() => setActiveDec(d)} style={{
                padding: "16px 20px", border: "none", background: "none",
                color: isActive ? "#FFD700" : "rgba(255,255,255,0.45)",
                fontWeight: isActive ? 800 : 500, fontSize: 15, cursor: "pointer",
                borderBottom: isActive ? "3px solid #FFD700" : "3px solid transparent",
                transition: "all 0.2s", whiteSpace: "nowrap",
              }}>
                {info.emoji} {d}
              </button>
            );
          })}
        </div>
      </div>

      {/* DECADE HEADER */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
          <div style={{ fontSize: 52 }}>{dec.emoji}</div>
          <div>
            <h2 style={{ fontSize: 36, fontWeight: 900, margin: 0, color: "#FFD700" }}>{activeDec}</h2>
            <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,0.5)", fontSize: 18 }}>{dec.tagline}</p>
          </div>
        </div>

        {/* TAB BAR */}
        <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
          {TAB_OPTIONS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: "10px 22px", borderRadius: 30, fontWeight: 700, fontSize: 14,
              cursor: "pointer", border: "none", transition: "all 0.2s",
              background: activeTab === tab
                ? "linear-gradient(135deg, #FFD700, #FF8C00)"
                : "rgba(255,255,255,0.08)",
              color: activeTab === tab ? "#000" : "rgba(255,255,255,0.7)",
            }}>
              {tab === "Fashion" ? "👗 " : tab === "Colors" ? "🎨 " : tab === "Inventions" ? "💡 " : "🌍 "}
              {tab}
            </button>
          ))}
        </div>

        {/* FASHION TAB */}
        {activeTab === "Fashion" && (
          <div>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: "#FFD700", marginBottom: 20 }}>
              👗 {activeDec} Fashion Looks
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20, marginBottom: 40 }}>
              {dec.fashion.map((item, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.05)", borderRadius: 20,
                  border: "1px solid rgba(255,255,255,0.1)", overflow: "hidden",
                  transition: "transform 0.2s, border-color 0.2s",
                }}
                  onMouseOver={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "rgba(255,215,0,0.4)"; }}
                  onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                >
                  <div style={{ height: 220, overflow: "hidden", background: "rgba(0,0,0,0.3)" }}>
                    <img src={item.img} alt={item.label}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                      onError={e => { e.target.style.display = "none"; e.target.parentNode.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:64px">👗</div>`; }}
                    />
                  </div>
                  <div style={{ padding: "16px" }}>
                    <div style={{ fontWeight: 800, fontSize: 16, color: "#fff", marginBottom: 6 }}>{item.label}</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* COLORS TAB */}
        {activeTab === "Colors" && (
          <div>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: "#FFD700", marginBottom: 8 }}>
              🎨 {activeDec} Color Palette
            </h3>
            <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: 28, fontSize: 14 }}>
              The signature colors that defined the look and feel of this decade.
            </p>
            {/* Big palette display */}
            <div style={{ display: "flex", borderRadius: 20, overflow: "hidden", height: 120, marginBottom: 32, boxShadow: "0 8px 40px rgba(0,0,0,0.5)" }}>
              {dec.colors.map((c, i) => (
                <div key={i} style={{ flex: 1, background: c, position: "relative", cursor: "pointer", transition: "flex 0.3s" }}
                  onMouseOver={e => e.currentTarget.style.flex = "2"}
                  onMouseOut={e => e.currentTarget.style.flex = "1"}
                >
                  <div style={{
                    position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)",
                    background: "rgba(0,0,0,0.6)", color: "#fff", fontSize: 10, fontWeight: 700,
                    padding: "3px 8px", borderRadius: 20, whiteSpace: "nowrap", letterSpacing: 0.5
                  }}>{c}</div>
                </div>
              ))}
            </div>
            {/* Color swatches with names */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 16, marginBottom: 40 }}>
              {dec.colors.map((c, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.05)", borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.1)", overflow: "hidden"
                }}>
                  <div style={{ height: 80, background: c }} />
                  <div style={{ padding: "12px 14px" }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#fff" }}>{dec.colorNames[i]}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 3, fontFamily: "monospace" }}>{c}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Gradient preview */}
            <div style={{
              borderRadius: 20, padding: 24,
              background: `linear-gradient(135deg, ${dec.colors[0]}, ${dec.colors[1]}, ${dec.colors[2]})`,
              marginBottom: 40, textAlign: "center"
            }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{dec.emoji}</div>
              <div style={{ fontWeight: 900, fontSize: 24, color: "#fff", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
                {activeDec} Gradient
              </div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", marginTop: 6 }}>{dec.tagline}</div>
            </div>
          </div>
        )}

        {/* INVENTIONS TAB */}
        {activeTab === "Inventions" && (
          <div>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: "#FFD700", marginBottom: 20 }}>
              💡 {activeDec} Game-Changing Inventions
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24, marginBottom: 40 }}>
              {dec.inventions.map((item, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.05)", borderRadius: 20,
                  border: "1px solid rgba(255,255,255,0.1)", overflow: "hidden", display: "flex", flexDirection: "column"
                }}>
                  <div style={{ height: 200, background: "rgba(0,0,0,0.4)", position: "relative", overflow: "hidden" }}>
                    <img src={item.img} alt={item.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={e => { e.target.style.display = "none"; e.target.parentNode.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:72px">💡</div>`; }}
                    />
                    <div style={{
                      position: "absolute", top: 12, right: 12,
                      background: "rgba(0,0,0,0.7)", color: "#FFD700",
                      padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700
                    }}>{item.year}</div>
                  </div>
                  <div style={{ padding: 20, flex: 1 }}>
                    <div style={{ fontWeight: 900, fontSize: 18, color: "#fff", marginBottom: 8 }}>{item.name}</div>
                    <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CULTURE TAB */}
        {activeTab === "Culture" && (
          <div>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: "#FFD700", marginBottom: 20 }}>
              🌍 {activeDec} Defining Cultural Moments
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16, marginBottom: 40 }}>
              {dec.culture.map((item, i) => (
                <div key={i} style={{
                  background: `linear-gradient(135deg, ${dec.colors[i % dec.colors.length]}22, ${dec.colors[(i+1) % dec.colors.length]}11)`,
                  border: `1px solid ${dec.colors[i % dec.colors.length]}44`,
                  borderRadius: 20, padding: "24px 20px",
                  display: "flex", alignItems: "center", gap: 14,
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    background: dec.colors[i % dec.colors.length],
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 20, fontWeight: 900, color: "#000"
                  }}>{i + 1}</div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#fff", lineHeight: 1.4 }}>{item}</div>
                </div>
              ))}
            </div>

            {/* Color-accented decade banner */}
            <div style={{
              borderRadius: 24, padding: "32px", marginBottom: 40,
              background: `linear-gradient(135deg, ${dec.colors[0]}33, ${dec.colors[1]}22, ${dec.colors[2]}11)`,
              border: `1px solid ${dec.colors[0]}44`
            }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>{dec.emoji}</div>
              <h3 style={{ fontSize: 28, fontWeight: 900, color: "#fff", margin: "0 0 10px" }}>
                The {activeDec}: {dec.tagline}
              </h3>
              <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7, fontSize: 15, maxWidth: 600 }}>
                The {activeDec} was defined by a unique intersection of politics, pop culture, technology, and fashion. 
                From the streets to the silver screen, these were the moments and movements that shaped a generation 
                and left a lasting mark on history.
              </p>
            </div>
          </div>
        )}

      </div>

      {/* FOOTER */}
      <div style={{ textAlign: "center", padding: "40px 24px", borderTop: "1px solid rgba(255,255,255,0.07)", marginTop: 20 }}>
        <a href="https://benevolent-decade-dive-now.base44.app" style={{
          background: "linear-gradient(135deg, #FFD700, #FF8C00)",
          color: "#000", padding: "14px 32px", borderRadius: 50,
          fontWeight: 900, fontSize: 16, textDecoration: "none", display: "inline-block"
        }}>
          ← Back to eDecades
        </a>
        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 12, marginTop: 20 }}>
          eDecades Visual Archive · Decade by Decade
        </p>
      </div>

      <style>{`::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
}
