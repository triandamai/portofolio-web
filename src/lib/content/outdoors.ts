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
    id: "bukit-bangkirai",
    name: "Bukit Bangkirai Canopy Walk",
    location: "Kutai Kartanegara, East Kalimantan",
    region: "Kalimantan",
    elevation: "±80 m",
    distance: "~5 km",
    date: "2023",
    description:
      "Dipterocarp rainforest with a suspension canopy bridge 30 m above the floor. " +
      "The kind of place that reminds you the natural world does not care about your sprint velocity. " +
      "Dense, humid, loud with birds. Highly recommend going at dawn.",
    tags: ["rainforest", "canopy walk", "Kalimantan", "wildlife"],
    photos: []
  },
  {
    id: "derawan-island",
    name: "Derawan Islands Trek & Snorkel",
    location: "Berau, East Kalimantan",
    region: "Kalimantan",
    date: "2022",
    description:
      "Coastal walk across Derawan island chain, then into the water. Sea turtles everywhere — " +
      "they surface right next to you like it's completely normal. Jellyfish lake on Kakaban " +
      "is unlike anything I've seen. Salt water, no stingers, thousands of jellyfish just drifting.",
    tags: ["coastal", "snorkeling", "Kalimantan", "islands", "wildlife"],
    photos: []
  },
  {
    id: "gunung-batu-raya",
    name: "Batu Raya Highland",
    location: "Central Kalimantan",
    region: "Kalimantan",
    elevation: "±1,100 m",
    distance: "~12 km",
    date: "2022",
    description:
      "Highland trail through peat forest that transitions into mossy montane jungle near the ridge. " +
      "The air changes completely around 800 m. Leech country — bring gaiters. " +
      "Summit view on a clear morning is worth every vertical metre.",
    tags: ["highland", "montane", "Kalimantan", "summit"],
    photos: []
  },
  {
    id: "kepulauan-seribu",
    name: "Kepulauan Seribu Day Hike",
    location: "North Jakarta, Jakarta",
    region: "Java",
    date: "2024",
    description:
      "Island-hopping day trip off the Jakarta coast. Less dramatic than Kalimantan but " +
      "close enough for a weekend reset without leaving the city orbit. Good for when the " +
      "Jakarta traffic is winning and you need to see the horizon.",
    tags: ["islands", "coastal", "Java", "day trip"],
    photos: []
  },
  {
    id: "gunung-gede",
    name: "Gunung Gede Pangrango",
    location: "West Java",
    region: "Java",
    elevation: "2,958 m",
    distance: "~22 km",
    date: "2024",
    description:
      "Overnight summit hike. Leave Cibodas at midnight, summit by 5 am for the sunrise. " +
      "Volcanic crater with sulphur vents, edelweiss fields on the way up, the whole deal. " +
      "My legs argued with me for a week afterwards but the view at dawn was worth the negotiation.",
    tags: ["volcano", "overnight", "summit", "Java", "edelweiss"],
    photos: []
  }
];

export const regions = [...new Set(trails.map(t => t.region))];
