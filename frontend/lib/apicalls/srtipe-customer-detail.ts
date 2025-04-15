export const getStripeCustomerDetailById = async (userId: string) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_CONAI_BACKEND_URL}/api/stripe-customer-details/${userId}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken") || "",
      },
    }
  ).then((res) => {
    return res.json();
  });
};
