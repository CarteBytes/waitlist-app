export const loginUser = async (email: string, password: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    },
  );

  if (!response.ok) {
    const error = await response.json();
    alert(`Login failed: ${error.error}`);
    throw new Error(error);
  }

  const { session, user } = await response.json();

  return { session, user };
};
