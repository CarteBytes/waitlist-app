export const fetchUser = async (userId: string) => {
  const userData = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userId}`,
    {
      cache: "no-store",
      next: { tags: ["user", userId] },
    },
  );
  const user = await userData.json();
  return user;
};
