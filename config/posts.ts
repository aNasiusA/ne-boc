import { getItem, setItem } from "@/utils/asyncStorage";

export const Posts = [
  {
    id: 1,
    user: {
      profilePicture: "https://i.pravatar.cc/100?img=1",
      username: "Ama Serwaa",
      handle: "@amaserwaa",
      isVerified: true,
    },
    item: {
      name: "Rice",
      price: 12.5,
      location: {
        coordinates: { long: -0.2057, lat: 5.6037 },
        market: "Makola",
      },
      picture: "https://picsum.photos/200?1",
    },
    createdAt: "2025-12-11T08:15:00Z",
  },
  {
    id: 2,
    user: {
      profilePicture: "https://i.pravatar.cc/100?img=2",
      username: "Kojo Mensah",
      handle: "@kojomensah",
    },
    item: {
      name: "Tomatoes",
      price: 3.2,
      location: { coordinates: { long: -0.2167, lat: 5.6147 } },
      picture: "https://picsum.photos/200?2",
    },
    createdAt: "2025-12-11T09:02:00Z",
  },
  {
    id: 3,
    user: {
      profilePicture: "https://i.pravatar.cc/100?img=3",
      username: "Nana Yaa",
      handle: "@nanayaa",
      isVerified: true,
    },
    item: {
      name: "Yam",
      price: 4.5,
      location: {
        coordinates: { long: -0.218, lat: 5.6025 },
        market: "Circle",
      },
    },
    createdAt: "2025-12-10T14:20:00Z",
  },
  {
    id: 4,
    user: {
      profilePicture: "https://i.pravatar.cc/100?img=4",
      username: "Kwame Boateng",
      handle: "@kwameboateng",
    },
    item: {
      name: "Onions",
      price: 2.8,
      location: { coordinates: { long: -0.21, lat: 5.605 }, market: "Makola" },
      picture: "https://picsum.photos/200?3",
    },
    createdAt: "2025-12-10T16:45:00Z",
  },
  {
    id: 5,
    user: {
      profilePicture: "https://i.pravatar.cc/100?img=5",
      username: "Efua Kyei",
      handle: "@efuakyei",
      isVerified: true,
    },
    item: {
      name: "Palm Oil",
      price: 6.0,
      location: { coordinates: { long: -0.212, lat: 5.61 } },
    },
    createdAt: "2025-12-11T11:30:00Z",
  },
  {
    id: 6,
    user: {
      profilePicture: "https://i.pravatar.cc/100?img=6",
      username: "Yaw Agyapong",
      handle: "@yawagyapong",
    },
    item: {
      name: "Beans",
      price: 5.5,
      location: {
        coordinates: { long: -0.215, lat: 5.608 },
        market: "Kaneshie",
      },
      picture: "https://picsum.photos/200?4",
    },
    createdAt: "2025-12-09T13:10:00Z",
  },
  {
    id: 7,
    user: {
      profilePicture: "https://i.pravatar.cc/100?img=7",
      username: "Akosua Frimpong",
      handle: "@akosua",
      isVerified: true,
    },
    item: {
      name: "Fish",
      price: 10.2,
      location: { coordinates: { long: -0.22, lat: 5.607 } },
      picture: "https://picsum.photos/200?5",
    },
    createdAt: "2025-12-08T17:25:00Z",
  },
  {
    id: 8,
    user: {
      profilePicture: "https://i.pravatar.cc/100?img=8",
      username: "Kojo Antwi",
      handle: "@kojoantwi",
    },
    item: {
      name: "Bread",
      price: 1.5,
      location: { coordinates: { long: -0.207, lat: 5.603 }, market: "Circle" },
    },
    createdAt: "2025-12-11T10:05:00Z",
  },
  {
    id: 9,
    user: {
      profilePicture: "https://i.pravatar.cc/100?img=9",
      username: "Abena Asante",
      handle: "@abenaasante",
    },
    item: {
      name: "Eggs",
      price: 0.5,
      location: { coordinates: { long: -0.2185, lat: 5.6065 } },
      picture: "https://picsum.photos/200?6",
    },
    createdAt: "2025-12-10T08:40:00Z",
  },
  {
    id: 10,
    user: {
      profilePicture: "https://i.pravatar.cc/100?img=10",
      username: "Daniel Owusu",
      handle: "@danielowusu",
    },
    item: {
      name: "Milk",
      price: 2.0,
      location: {
        coordinates: { long: -0.2115, lat: 5.6095 },
        market: "Kaneshie",
      },
    },
    createdAt: "2025-12-09T12:55:00Z",
  },
  {
    id: 11,
    user: {
      profilePicture: "https://i.pravatar.cc/100?img=11",
      username: "Mavis Osei",
      handle: "@mavisosei",
    },
    item: {
      name: "Vegetables",
      price: 3.8,
      location: { coordinates: { long: -0.219, lat: 5.604 } },
      picture: "https://picsum.photos/200?7",
    },
    createdAt: "2025-12-08T14:15:00Z",
  },
  {
    id: 12,
    user: {
      profilePicture: "https://i.pravatar.cc/100?img=12",
      username: "Samuel Tetteh",
      handle: "@samueltetteh",
    },
    item: {
      name: "Maize",
      price: 1.2,
      location: { coordinates: { long: -0.213, lat: 5.607 }, market: "Makola" },
    },
    createdAt: "2025-12-11T09:50:00Z",
  },
  {
    id: 13,
    user: {
      profilePicture: "https://i.pravatar.cc/100?img=13",
      username: "Adwoa Nana",
      handle: "@adwoanana",
    },
    item: {
      name: "Cheese",
      price: 4.0,
      location: { coordinates: { long: -0.2085, lat: 5.6055 } },
      picture: "https://picsum.photos/200?8",
    },
    createdAt: "2025-12-11T13:20:00Z",
  },
  {
    id: 14,
    user: {
      profilePicture: "https://i.pravatar.cc/100?img=14",
      username: "Kwabena Amoah",
      handle: "@kwabenaamoah",
    },
    item: {
      name: "Butter",
      price: 3.5,
      location: {
        coordinates: { long: -0.2165, lat: 5.6085 },
        market: "Circle",
      },
    },
    createdAt: "2025-12-10T15:30:00Z",
  },
  {
    id: 15,
    user: {
      profilePicture: "https://i.pravatar.cc/100?img=15",
      username: "Esi Boateng",
      handle: "@esiboateng",
    },
    item: {
      name: "Sugar",
      price: 2.7,
      location: { coordinates: { long: -0.214, lat: 5.609 } },
      picture: "https://picsum.photos/200?9",
    },
    createdAt: "2025-12-09T10:50:00Z",
  },
  {
    id: 16,
    user: {
      profilePicture: "https://i.pravatar.cc/100?img=16",
      username: "Kojo Baffour",
      handle: "@kojobaffour",
    },
    item: {
      name: "Salt",
      price: 1.0,
      location: {
        coordinates: { long: -0.2125, lat: 5.606 },
        market: "Kaneshie",
      },
    },
    createdAt: "2025-12-11T07:45:00Z",
  },
  {
    id: 17,
    user: {
      profilePicture: "https://i.pravatar.cc/100?img=17",
      username: "Akua Mensah",
      handle: "@akuamensah",
    },
    item: {
      name: "Pepper",
      price: 2.3,
      location: { coordinates: { long: -0.2175, lat: 5.6075 } },
      picture: "https://picsum.photos/200?10",
    },
    createdAt: "2025-12-10T09:30:00Z",
  },
  {
    id: 18,
    user: {
      profilePicture: "https://i.pravatar.cc/100?img=18",
      username: "Yaw Asante",
      handle: "@yawasante",
    },
    item: {
      name: "Oil",
      price: 5.5,
      location: {
        coordinates: { long: -0.2105, lat: 5.6055 },
        market: "Makola",
      },
    },
    createdAt: "2025-12-08T11:20:00Z",
  },
  {
    id: 19,
    user: {
      profilePicture: "https://i.pravatar.cc/100?img=19",
      username: "Afia Owusu",
      handle: "@afiaowusu",
    },
    item: {
      name: "Chicken",
      price: 12.0,
      location: { coordinates: { long: -0.209, lat: 5.6025 } },
      picture: "https://picsum.photos/200?11",
    },
    createdAt: "2025-12-09T14:00:00Z",
  },
  {
    id: 20,
    user: {
      profilePicture: "https://i.pravatar.cc/100?img=20",
      username: "Kofi Appiah",
      handle: "@kofiappiah",
    },
    item: {
      name: "Goat Meat",
      price: 15.0,
      location: { coordinates: { long: -0.218, lat: 5.609 }, market: "Circle" },
    },
    createdAt: "2025-12-11T12:10:00Z",
  },
  {
    id: 21,
    user: {
      profilePicture: "https://i.pravatar.cc/100?img=21",
      username: "Ama Ofori",
      handle: "@amaofori",
    },
    item: {
      name: "Yoghurt",
      price: 3.0,
      location: { coordinates: { long: -0.2155, lat: 5.6065 } },
      picture: "https://picsum.photos/200?12",
    },
    createdAt: "2025-12-10T08:55:00Z",
  },
  {
    id: 22,
    user: {
      profilePicture: "https://i.pravatar.cc/100?img=22",
      username: "Daniela Smith",
      handle: "@danielasmith",
    },
    item: {
      name: "Cabbage",
      price: 1.8,
      location: {
        coordinates: { long: -0.211, lat: 5.6075 },
        market: "Makola",
      },
    },
    createdAt: "2025-12-09T13:40:00Z",
  },
  {
    id: 23,
    user: {
      profilePicture: "https://i.pravatar.cc/100?img=23",
      username: "Francis Baah",
      handle: "@francisbaah",
    },
    item: {
      name: "Plantain",
      price: 2.5,
      location: { coordinates: { long: -0.2145, lat: 5.608 } },
      picture: "https://picsum.photos/200?13",
    },
    createdAt: "2025-12-11T10:50:00Z",
  },
  {
    id: 24,
    user: {
      profilePicture: "https://i.pravatar.cc/100?img=24",
      username: "Rebecca Adjei",
      handle: "@rebeccaadjei",
    },
    item: {
      name: "Corn",
      price: 1.5,
      location: {
        coordinates: { long: -0.212, lat: 5.605 },
        market: "Kaneshie",
      },
    },
    createdAt: "2025-12-10T12:15:00Z",
  },
  {
    id: 25,
    user: {
      profilePicture: "https://i.pravatar.cc/100?img=25",
      username: "Emmanuel Darko",
      handle: "@emmanueldarko",
    },
    item: {
      name: "Cassava",
      price: 2.0,
      location: { coordinates: { long: -0.21, lat: 5.6035 } },
      picture: "https://picsum.photos/200?14",
    },
    createdAt: "2025-12-08T16:40:00Z",
  },
];

(async () => {
  const existing = await getItem("posts");
  if (!existing) {
    await setItem("posts", JSON.stringify(Posts));
  }
})();
