import { getItem, setItem } from "@/utils/asyncStorage";

export const notifications = [
  {
    id: "1",
    title: "Welcome to Ne-Boc!",
    message:
      "Thanks for joining our community. Explore posts and connect with others.",
    date: "2023-12-12",
    read: false,
  },
  {
    id: "2",
    title: "New Post Alert",
    message: "Someone you follow just posted something new. Check it out!",
    date: "2023-12-11",
    read: false,
  },
  {
    id: "3",
    title: "Profile Update",
    message: "Your profile has been updated successfully.",
    date: "2023-12-10",
    read: true,
  },
  {
    id: "4",
    title: "Event Reminder",
    message: "Don't forget the community meetup tomorrow at 5 PM.",
    date: "2023-12-09",
    read: true,
  },
  {
    id: "5",
    title: "Security Alert",
    message:
      "We noticed unusual activity on your account. Please verify your login.",
    date: "2023-12-08",
    read: false,
  },
];

(async () => {
  const existing = await getItem("notifications");
  if (!existing) {
    await setItem("notifications", JSON.stringify(notifications));
  }
})();
