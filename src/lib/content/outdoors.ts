export interface Trail {
  id: string;
  name: string;
  location: string;
  region: string;
  elevation?: string;
  distance?: string;
  date: string;
  description: string;
  tags: string[];
  photos: string[]; // URLs — replace with real links
}

export const trails: Trail[] = [
  {
    id: "gunung-slamet",
    name: "Gunung Slamet",
    location: "Purbalingga, Jawa Tengah",
    region: "Java",
    elevation: "3,428 m",
    distance: "~28 km",
    date: "2023",
    description:
      "My first ever hike — and somehow we picked the highest volcano in Central Java to start with. " +
      "My cousin had done this before and invited me along. I said yes without fully understanding what I was agreeing to. " +
      "We left Basecamp Bambangan at 10 PM, headlamps on, excited. That excitement lasted maybe two hours. " +
      "The higher we climbed, the more the mountain made its point: this is not a walk. " +
      "Every step above Post 3 felt like it cost double. Nearly ten hours of climbing to reach Post 5, " +
      "where we set up camp and collapsed. Then 3 AM — summit push. Cold, dark, quiet. " +
      "When we broke through the clouds and stood at the top, everything that hurt stopped mattering. " +
      "First summit. First victory. I get it now.",
    tags: ["volcano", "overnight", "summit", "Java", "first summit", "camping", "Slamet"],
    photos: []
  },
  {
    id: "gunung-prau",
    name: "Gunung Prau",
    location: "Dieng, Jawa Tengah",
    region: "Java",
    elevation: "2,590 m",
    distance: "~8 km",
    date: "2024",
    description:
      "Went up Prau with university friends — one of those trips that sounds casual until the mountain decides otherwise. " +
      "We started at 8 PM from the Dieng basecamp, expecting a straightforward four-hour climb. " +
      "What we got was rain from the first step to the last. Not drizzle — the kind of rain that soaks through everything " +
      "and turns every switchback into a mud slide. Dark, wet, cold, and slippery the whole way up. " +
      "Headlamps catching nothing but falling water and the boots of whoever was ahead of you. " +
      "Four hours of that, and we hit the summit at midnight. " +
      "Soaked through, exhausted, and somehow grinning. " +
      "The conditions were terrible. That's exactly what made it worth it.",
    tags: ["overnight", "summit", "Java", "rain", "Dieng", "Prau", "friends", "university"],
    photos: []
  },
  {
    id: "gunung-sindoro",
    name: "Gunung Sindoro",
    location: "Temanggung, Jawa Tengah",
    region: "Java",
    elevation: "3,150 m",
    date: "2024",
    description:
      "Sindoro is not a long hike. The distance is manageable, the trail is clear. " +
      "My knees did not get the memo. Somewhere past the midpoint, that familiar ache turned into something harder to ignore — " +
      "every step down felt like a conversation with a part of my body I usually take for granted. " +
      "I kept moving anyway. You do. " +
      "Then the summit. I don't know how to write this part. " +
      "There's a version of 'beautiful' that fits postcards and Instagram captions, and then there's what Sindoro's top actually looks like at that hour — " +
      "the kind of view that makes you go quiet, not because you have nothing to say, but because words would make it smaller. " +
      "The knees were worth it. They always are.",
    tags: ["summit", "Java", "Sindoro", "knee", "volcano", "scenic"],
    photos: []
  },
  {
    id: "gunung-sumbing",
    name: "Gunung Sumbing",
    location: "Wonosobo, Jawa Tengah",
    region: "Java",
    elevation: "3,371 m",
    date: "2024",
    description:
      "Sumbing via Garund — and the first thing I noticed was how few people were on the trail. " +
      "No queue at the basecamp, no crowd at the checkpoints, no one breathing down your neck on the narrow sections. " +
      "Just the mountain doing its thing and us doing ours. " +
      "There's a different quality to hiking when you're not racing anyone. " +
      "You actually look around. You stop when something is worth stopping for. " +
      "The trail from Garund is honest — it earns every meter of elevation — but the pace we kept made it feel almost meditative. " +
      "Sumbing sits right across from Sindoro and from the top you can see both worlds clearly. " +
      "Not the most crowded mountain, not the most famous route. " +
      "That's exactly why it's worth trying.",
    tags: ["summit", "Java", "Sumbing", "Garund", "volcano", "quiet", "scenic"],
    photos: []
  },
  {
    id: "gunung-gede",
    name: "Gunung Gede",
    location: "Cianjur, Jawa Barat",
    region: "Java",
    elevation: "2,958 m",
    date: "2024",
    description:
      "Gede via Gunung Putri is a different kind of hard. " +
      "Not the lung-burning vertical of a volcano — this one fights you with roots. " +
      "Big, ancient tree roots running across every section of trail, some as tall as your shin, " +
      "some hidden under leaf litter waiting for the wrong step. " +
      "You can't switch off. You pick your footing one move at a time, slow and deliberate, " +
      "the whole forest watching you figure it out. " +
      "Hours of that. And then the trail opens up and you're at Surken. " +
      "Suryakencana — a wide highland meadow sitting above the clouds, " +
      "ringed by mist on all sides like the world just stops at the edge. " +
      "It genuinely looks like a small island floating up there. " +
      "Edelweiss everywhere, the kind of silence that feels earned. " +
      "All those roots got us here. Worth every single one.",
    tags: ["summit", "West Java", "Gede", "Gunung Putri", "roots", "Surken", "Suryakencana", "camping", "above the clouds"],
    photos: []
  },
  {
    id: "gunung-gede-cibodas",
    name: "Gunung Gede — Cibodas",
    location: "Cianjur, Jawa Barat",
    region: "Java",
    elevation: "2,958 m",
    date: "2025",
    description:
      "Same mountain, completely different experience. " +
      "Cibodas in the middle of rainy season — not the smartest timing, but here we were. " +
      "The trail itself is kinder than Gunung Putri, fewer roots, less technical. " +
      "What it lacks in difficulty it makes up for in length. " +
      "It just keeps going. Long stretches of forest path that look the same for hours, " +
      "the kind of trail that tests your patience more than your legs. " +
      "Then the rain. Not a surprise given the season, but rain on a long trail changes everything — " +
      "every clay section turns glassy, every root becomes a trap. " +
      "I fell. Not a dramatic tumble, just the sudden kind where the ground is there and then it isn't. " +
      "Muddy, slightly bruised, slightly embarrassed, kept moving. " +
      "Gede doesn't care what route you took to get there. The top is the top.",
    tags: ["summit", "West Java", "Gede", "Cibodas", "rain", "rainy season", "slippery", "long trek"],
    photos: []
  },
  {
    id: "lembah-purba",
    name: "Lembah Purba",
    location: "Sukabumi, Jawa Barat",
    region: "Java",
    date: "2025",
    description:
      "Not a summit this time — Lembah Purba is a different kind of wild. " +
      "Went with an expedition crew, one guide assigned to our group, and the plan was simple: " +
      "go deep into the rainforest and see what it had. " +
      "It started with the suspension bridge. And when they say it might be the longest in Southeast Asia, " +
      "you sort of believe it once you're on it — " +
      "swaying slightly, the canopy dropping away on both sides, the far end looking further than it should. " +
      "You walk slowly. You hold the ropes. You keep moving. " +
      "After the bridge, the trail cuts through dense forest to a waterfall — " +
      "the kind that hits you with cold mist before you can even see it. " +
      "Worth every step. " +
      "Then the flying fox. Also long. Also high. " +
      "I won't pretend I wasn't scared at the launch point — " +
      "looking down at the treeline and being asked to just let go. " +
      "But the second you're in the air, the fear turns into something else entirely. " +
      "Fast, loud, ridiculous fun. " +
      "Lembah Purba doesn't ask you to suffer for the view. It just asks you to show up.",
    tags: ["rainforest", "West Java", "Sukabumi", "suspension bridge", "waterfall", "flying fox", "expedition", "adventure"],
    photos: []
  }
];

export const regions = [...new Set(trails.map(t => t.region))];
