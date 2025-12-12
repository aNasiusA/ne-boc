import { getItem, setItem } from "@/utils/asyncStorage";

export const Settings = [
  {
    id: "1",
    name: "Edit Profile",
    link: "/profile/edit",
  },

  {
    id: "3",
    name: "Notifications",
    link: "/settings/notifications",
  },
  {
    id: "4",
    name: "Location Permissions",
    link: "/settings/location",
  },
  {
    id: "5",
    name: "Manage Saved Locations",
    link: "/settings/saved-locations",
  },
  {
    id: "6",
    name: "Price Alerts",
    link: "/settings/price-alerts",
  },
  {
    id: "7",
    name: "Contribution History",
    link: "/settings/contributions",
  },
  {
    id: "8",
    name: "Appearance",
    link: "/settings/appearance",
  },
  {
    id: "9",
    name: "Language",
    link: "/settings/language",
  },
  {
    id: "10",
    name: "Privacy & Data",
    link: "/settings/privacy",
  },
  {
    id: "11",
    name: "About Ne boɔ",
    link: "/settings/about",
  },
  {
    id: "12",
    name: "Help & Support",
    link: "/settings/support",
  },
];

(async () => {
  const existing = await getItem("settings");
  if (!existing) {
    await setItem("settings", JSON.stringify(Settings));
  }
})();

export const Support = [
  {
    id: "1",
    name: "Help Center",
    link: "/support/help-center",
  },
  {
    id: "2",
    name: "Terms of Service",
    link: "/support/terms-of-service",
  },
  {
    id: "3",
    name: "Privacy Policy",
    link: "/support/privacy-policy",
  },
];

(async () => {
  const existing = await getItem("support");
  if (!existing) {
    await setItem("support", JSON.stringify(Support));
  }
})();

export const Auth = [
  {
    id: "1",
    name: "Change Password",
    link: "/auth/change-password",
  },
  {
    id: "2",
    name: "Two-Factor Authentication",
    link: "/auth/2fa",
  },
  {
    id: "3",
    name: "Manage Devices",
    link: "/auth/devices",
  },
  {
    id: "4",
    name: "Logout",
    link: "/auth/logout",
  },
];

(async () => {
  const existing = await getItem("auth");
  if (!existing) {
    await setItem("auth", JSON.stringify(Auth));
  }
})();
