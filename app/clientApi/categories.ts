export const fetchOrgCategories = async (orgId: string) => {
  const categoriesData = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/organizations/${orgId}/categories`,
    {
      cache: "no-store",
      next: { tags: ["orgCategories"] },
    },
  );
  const categories = await categoriesData.json();
  return categories;
};
