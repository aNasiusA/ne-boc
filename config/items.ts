export interface Item {
  id: string;
  name: string;
  category: string;
  pictures?: string[];
}

import { getItem, setItem } from "@/utils/asyncStorage";

export const Items: Item[] = [
  {
    id: "itm_001",
    name: "Tomatoes (Small Bowl)",
    category: "Vegetables",
    pictures: [
      "https://nutritionfacts.org/app/uploads/2019/01/2962762666_1237ff6eb4_o.jpg",
    ],
  },
  {
    id: "itm_002",
    name: "Onions (Medium Bowl)",
    category: "Vegetables",
    pictures: [
      "https://assets.farmjournal.com/dims4/default/6d7727c/2147483647/strip/false/crop/860x473+0+0/resize/860x473!/quality/90/?url=https%3A%2F%2Ffj-corp-pub.s3.us-east-2.amazonaws.com%2Fs3fs-public%2F2022-09%2Fonion_1.EDITjpg.jpg",
    ],
  },
  {
    id: "itm_003",
    name: "Yam (Medium Tuber)",
    category: "Roots & Tubers",
    pictures: [
      "https://media.post.rvohealth.io/wp-content/uploads/2023/09/whole-and-halved-raw-african-yam-732x549-thumbnail.jpg",
    ],
  },
  {
    id: "itm_004",
    name: "Rice – Royal Feast 5kg",
    category: "Grains",
    pictures: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkpp5mLEtW5iGU-B8nm-CN8PAe7styRDyNQg&s",
    ],
  },
  {
    id: "itm_005",
    name: "Eggs (Crate of 30)",
    category: "Protein",
    pictures: [
      "https://capecoastmall.com/wp-content/uploads/2024/07/eggs_brown_and_white_brasil_.width-820.jpg",
    ],
  },
  {
    id: "itm_006",
    name: "Sachet Water (Verna Pack)",
    category: "Drinks",
    pictures: [
      "https://konzoom.shop/cdn/shop/files/verna_750ml.jpg?v=1722288410",
    ],
  },
  {
    id: "itm_007",
    name: "Plantain (Finger)",
    category: "Fruits",
    pictures: [
      "https://media.istockphoto.com/id/2213799715/photo/many-organic-plantain-in-the-colombian-peasant-market-square-musa-x-paradisiaca.jpg?s=612x612&w=0&k=20&c=jyAjQwrugv152Zcv-KnNWejMih1w3peRdELqYSGE_w0=",
    ],
  },
];

(async () => {
  const existing = await getItem("items");
  if (!existing) {
    await setItem("items", JSON.stringify(Items));
  }
})();
