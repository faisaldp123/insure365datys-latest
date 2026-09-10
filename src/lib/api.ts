const BASE_URL = "https://insure365days-backend.onrender.com/api";

export interface ContactPayload {
  name: string;
  mobile: string;
  dob?: string;
  alternativeMobile?: string;
  email?: string;
  insuranceType: string;
  brandType?: string;
  termAndPpt?: string;
  applicationNumber?: string;
  nomineeName?: string;
  nomineeDob?: string;
  shortAddress?: string;
  message?: string;
  remarks?: string;
}

export const postContact = async (data: ContactPayload) => {
  const res = await fetch(`${BASE_URL}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.status === 409) {
    // Matches the duplicate-applicationNumber response from contactController.js
    throw new Error("DUPLICATE_APPLICATION_NUMBER");
  }

  if (!res.ok) {
    throw new Error("Failed to submit contact");
  }

  return res.json();
};

export const checkApplicationNumber = async (applicationNumber: string): Promise<boolean> => {
  const res = await fetch(`${BASE_URL}/contact/check/${encodeURIComponent(applicationNumber)}`);

  if (!res.ok) {
    throw new Error("Failed to check application number");
  }

  const data = await res.json();
  return Boolean(data.exists);
};