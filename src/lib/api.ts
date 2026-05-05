const BASE_URL = "https://insure365days-backend.onrender.com/api";

export interface ContactPayload {
  name: string;
  mobile: string;
  email?: string;
  message?: string;
}

export const postContact = async (data: ContactPayload) => {
  const res = await fetch(`${BASE_URL}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to submit contact");
  }

  return res.json();
};