export const fetchOrgItems = async (orgId: string) => {
  const itemsData = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/organizations/${orgId}/items`,
    {
      cache: "no-store",
      next: { tags: ["orgItems"] },
    },
  );
  const items = await itemsData.json();
  return items;
};
