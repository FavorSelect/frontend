"use server";

export type Location = {
  country: string;
  flag: {
    emoji: string;
  };
};

export const getLocation = async (): Promise<Location> => {
  try {
    const res = await fetch("https://ipwho.is/");
    const data = await res.json();

    if (data.success) {
      return {
        country: data.country || "Unknown",
        flag: {
          emoji: data.flag?.emoji || "🏳️",
        },
      };
    } else {
      console.error("IP lookup failed:", data.message);
      return {
        country: "Unknown",
        flag: { emoji: "🏳️" },
      };
    }
  } catch (error) {
    console.error("Failed to fetch location:", error);
    return {
      country: "Unknown",
      flag: { emoji: "🏳️" },
    };
  }
};
