import { getItem, setItem } from "@/utils/asyncStorage";

export interface PriceReport {
  id: string;
  itemId: string;
  price: number;
  location: {
    market: string;
    coordinates?: { lat: number; long: number };
  };
  picture?: string;
  user: {
    username: string;
    profilePicture?: string;
  };
  createdAt: string;
}

export const PriceReports = [
  {
    id: "rep_001",
    itemId: "itm_001", // Tomatoes
    price: 22,
    location: {
      market: "Makola Market",
      coordinates: { lat: 5.544, long: -0.206 },
    },
    picture: "https://example.com/tomatoes_price1.jpg",
    user: {
      username: "Akosua",
      profilePicture: "https://example.com/user1.jpg",
    },
    createdAt: "2025-12-01T09:12:00Z",
  },
  {
    id: "rep_002",
    itemId: "itm_004", // Rice 5kg
    price: 85,
    location: {
      market: "Kotokraba Market",
      coordinates: { lat: 5.103, long: -1.246 },
    },
    picture: "https://example.com/rice_price.jpg",
    user: {
      username: "Kwame",
      profilePicture: "https://example.com/user2.jpg",
    },
    createdAt: "2025-12-02T14:22:00Z",
  },
  {
    id: "rep_003",
    itemId: "itm_003", // Yam
    price: 18,
    location: {
      market: "Kejetia Market",
      coordinates: { lat: 6.688, long: -1.616 },
    },
    picture: "https://example.com/yam_price.jpg",
    user: {
      username: "Ama",
      profilePicture: "https://example.com/user3.jpg",
    },
    createdAt: "2025-12-03T12:45:00Z",
  },
  {
    id: "rep_004",
    itemId: "itm_005", // Eggs
    price: 39,
    location: {
      market: "Madina Market",
      coordinates: { lat: 5.668, long: -0.168 },
    },
    picture: "https://example.com/eggs_price.jpg",
    user: {
      username: "Nana",
      profilePicture: "https://example.com/user4.jpg",
    },
    createdAt: "2025-12-04T10:10:00Z",
  },
  {
    id: "rep_005",
    itemId: "itm_002", // Onions
    price: 15,
    location: {
      market: "Agbogbloshie Market",
      coordinates: { lat: 5.56, long: -0.233 },
    },
    picture: "https://example.com/onions_price.jpg",
    user: {
      username: "Esi",
      profilePicture: "https://example.com/user5.jpg",
    },
    createdAt: "2025-12-05T16:30:00Z",
  },
  {
    id: "rep_006",
    itemId: "itm_006", // Water
    price: 8,
    location: {
      market: "Tema Community 1 Market",
      coordinates: { lat: 5.675, long: -0.016 },
    },
    picture: "https://example.com/sachet_price.jpg",
    user: {
      username: "Kojo",
      profilePicture: "https://example.com/user6.jpg",
    },
    createdAt: "2025-12-06T08:30:00Z",
  },
  {
    id: "rep_007",
    itemId: "itm_001", // Tomatoes
    price: 25,
    location: {
      market: "Makola Market",
      coordinates: { lat: 5.544, long: -0.206 },
    },
    picture: "https://example.com/tomatoes_price2.jpg",
    user: {
      username: "Akosua",
      profilePicture: "https://example.com/user1.jpg",
    },
    createdAt: "2025-12-07T09:12:00Z",
  },
  // Additional mock reports for Tomatoes
  {
    id: "rep_008",
    itemId: "itm_001",
    price: 23,
    location: {
      market: "Kejetia Market",
      coordinates: { lat: 6.688, long: -1.616 },
    },
    picture: "https://example.com/tomatoes_price3.jpg",
    user: {
      username: "Ama",
      profilePicture: "https://example.com/user3.jpg",
    },
    createdAt: "2025-12-08T11:30:00Z",
  },
  {
    id: "rep_009",
    itemId: "itm_001",
    price: 24,
    location: {
      market: "Madina Market",
      coordinates: { lat: 5.668, long: -0.168 },
    },
    picture: "https://example.com/tomatoes_price4.jpg",
    user: {
      username: "Nana",
      profilePicture: "https://example.com/user4.jpg",
    },
    createdAt: "2025-12-09T14:45:00Z",
  },
  // Mock reports for Onions
  {
    id: "rep_010",
    itemId: "itm_002",
    price: 16,
    location: {
      market: "Makola Market",
      coordinates: { lat: 5.544, long: -0.206 },
    },
    picture: "https://example.com/onions_price2.jpg",
    user: {
      username: "Kwame",
      profilePicture: "https://example.com/user2.jpg",
    },
    createdAt: "2025-12-10T10:20:00Z",
  },
  {
    id: "rep_011",
    itemId: "itm_002",
    price: 14,
    location: {
      market: "Agbogbloshie Market",
      coordinates: { lat: 5.56, long: -0.233 },
    },
    picture: "https://example.com/onions_price3.jpg",
    user: {
      username: "Esi",
      profilePicture: "https://example.com/user5.jpg",
    },
    createdAt: "2025-12-11T15:10:00Z",
  },
  // Mock reports for Yam
  {
    id: "rep_012",
    itemId: "itm_003",
    price: 20,
    location: {
      market: "Kotokraba Market",
      coordinates: { lat: 5.103, long: -1.246 },
    },
    picture: "https://example.com/yam_price2.jpg",
    user: {
      username: "Kojo",
      profilePicture: "https://example.com/user6.jpg",
    },
    createdAt: "2025-01-09T13:00:00Z",
  },
  {
    id: "rep_013",
    itemId: "itm_003",
    price: 19,
    location: {
      market: "Tema Community 1 Market",
      coordinates: { lat: 5.675, long: -0.016 },
    },
    picture: "https://example.com/yam_price3.jpg",
    user: {
      username: "Akosua",
      profilePicture: "https://example.com/user1.jpg",
    },
    createdAt: "2025-01-12T08:45:00Z",
  },
  // Mock reports for Rice
  {
    id: "rep_014",
    itemId: "itm_004",
    price: 87,
    location: {
      market: "Madina Market",
      coordinates: { lat: 5.668, long: -0.168 },
    },
    picture: "https://example.com/rice_price2.jpg",
    user: {
      username: "Nana",
      profilePicture: "https://example.com/user4.jpg",
    },
    createdAt: "2025-01-10T16:30:00Z",
  },
  {
    id: "rep_015",
    itemId: "itm_004",
    price: 82,
    location: {
      market: "Kejetia Market",
      coordinates: { lat: 6.688, long: -1.616 },
    },
    picture: "https://example.com/rice_price3.jpg",
    user: {
      username: "Ama",
      profilePicture: "https://example.com/user3.jpg",
    },
    createdAt: "2025-01-13T12:15:00Z",
  },
  // Mock reports for Eggs
  {
    id: "rep_016",
    itemId: "itm_005",
    price: 41,
    location: {
      market: "Kotokraba Market",
      coordinates: { lat: 5.103, long: -1.246 },
    },
    picture: "https://example.com/eggs_price2.jpg",
    user: {
      username: "Kwame",
      profilePicture: "https://example.com/user2.jpg",
    },
    createdAt: "2025-01-11T09:00:00Z",
  },
  {
    id: "rep_017",
    itemId: "itm_005",
    price: 38,
    location: {
      market: "Tema Community 1 Market",
      coordinates: { lat: 5.675, long: -0.016 },
    },
    picture: "https://example.com/eggs_price3.jpg",
    user: {
      username: "Kojo",
      profilePicture: "https://example.com/user6.jpg",
    },
    createdAt: "2025-01-14T17:20:00Z",
  },
  // Mock reports for Water
  {
    id: "rep_018",
    itemId: "itm_006",
    price: 9,
    location: {
      market: "Makola Market",
      coordinates: { lat: 5.544, long: -0.206 },
    },
    picture: "https://example.com/sachet_price2.jpg",
    user: {
      username: "Esi",
      profilePicture: "https://example.com/user5.jpg",
    },
    createdAt: "2025-01-08T10:00:00Z",
  },
  {
    id: "rep_019",
    itemId: "itm_006",
    price: 7,
    location: {
      market: "Madina Market",
      coordinates: { lat: 5.668, long: -0.168 },
    },
    picture: "https://example.com/sachet_price3.jpg",
    user: {
      username: "Akosua",
      profilePicture: "https://example.com/user1.jpg",
    },
    createdAt: "2025-01-12T14:30:00Z",
  },
  // Mock reports for Plantain
  {
    id: "rep_020",
    itemId: "itm_007",
    price: 12,
    location: {
      market: "Kejetia Market",
      coordinates: { lat: 6.688, long: -1.616 },
    },
    picture: "https://example.com/plantain_price1.jpg",
    user: {
      username: "Kwame",
      profilePicture: "https://example.com/user2.jpg",
    },
    createdAt: "2025-01-09T11:45:00Z",
  },
  {
    id: "rep_021",
    itemId: "itm_007",
    price: 10,
    location: {
      market: "Agbogbloshie Market",
      coordinates: { lat: 5.56, long: -0.233 },
    },
    picture: "https://example.com/plantain_price2.jpg",
    user: {
      username: "Ama",
      profilePicture: "https://example.com/user3.jpg",
    },
    createdAt: "2025-01-11T13:20:00Z",
  },
  {
    id: "rep_022",
    itemId: "itm_007",
    price: 11,
    location: {
      market: "Tema Community 1 Market",
      coordinates: { lat: 5.675, long: -0.016 },
    },
    picture: "https://example.com/plantain_price3.jpg",
    user: {
      username: "Nana",
      profilePicture: "https://example.com/user4.jpg",
    },
    createdAt: "2025-01-13T16:00:00Z",
  },
];

(async () => {
  const existing = await getItem("priceReports");
  if (!existing) {
    await setItem("priceReports", JSON.stringify(PriceReports));
  }
})();
