export const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || "D95SB63C77UDVJEHBPK0";

declare global {
  interface Window {
    ttq: any;
  }
}

export const page = () => {
  if (typeof window !== "undefined") {
    if (!window.ttq || typeof window.ttq.page !== "function") {
      setTimeout(page, 500);
      return;
    }
    window.ttq.page();
  }
};

export const track = (event: string, data?: Record<string, any>) => {
  if (typeof window !== "undefined") {
    if (!window.ttq || typeof window.ttq.track !== "function") {
      // Retry in 500ms if script hasn't loaded yet
      setTimeout(() => track(event, data), 500);
      return;
    }

    if (data) {
      // Remove top-level undefined, null, or empty string fields
      const cleanData: Record<string, any> = {};
      for (const [key, val] of Object.entries(data)) {
        if (val !== undefined && val !== null && val !== "") {
          cleanData[key] = val;
        }
      }
      window.ttq.track(event, Object.keys(cleanData).length > 0 ? cleanData : undefined);
    } else {
      window.ttq.track(event);
    }
  }
};

export const generateContentId = (name: string): string => {
  if (!name) return "unknown-product";
  const normalized = name.toLowerCase().trim();
  
  if (normalized.includes("test")) return "trial-1h";

  let type = "standard";
  if (normalized.includes("premium")) type = "premium";
  if (normalized.includes("vip")) type = "vip";

  let duration = "unknown";
  if (normalized.includes("12")) duration = "12-month";
  else if (normalized.includes("6")) duration = "6-month";
  else if (normalized.includes("3")) duration = "3-month";
  else if (normalized.includes("1")) duration = "1-month";

  return `${type}-${duration}`;
};

export const viewHome = () => {
  // Fire ViewContent without contents for homepage, but to prevent warnings, skip contents if empty
  track("ViewContent", { 
    content_type: "homepage"
  });
};

export const viewSubscription = (packageName: string, packagePrice: string) => {
  if (!packageName || !packagePrice) return;
  track("ViewContent", {
    contents: [
      {
        content_id: generateContentId(packageName),
        content_type: "product",
        content_name: packageName,
        quantity: 1
      }
    ],
    value: Number(packagePrice),
    currency: "EUR"
  });
};

export const searchChannels = () => {
  track("Search", { 
    query: "Sélection" 
  });
};

export const clickTestButton = () => {
  track("ClickButton", { 
    button_name: "Essai Découverte 1H" 
  });
};

export const startTrial = () => {
  track("StartTrial");
};

export const initiateCheckout = (packageName: string, packagePrice: string) => {
  if (!packageName || !packagePrice) return;
  track("InitiateCheckout", {
    contents: [
      {
        content_id: generateContentId(packageName),
        content_type: "product",
        content_name: packageName,
        quantity: 1
      }
    ],
    value: Number(packagePrice),
    currency: "EUR"
  });
};

export const completePayment = (packageName: string, packagePrice: string) => {
  if (!packageName || !packagePrice) return;
  track("CompletePayment", {
    contents: [
      {
        content_id: generateContentId(packageName),
        content_type: "product",
        content_name: packageName,
        quantity: 1
      }
    ],
    value: Number(packagePrice),
    currency: "EUR"
  });
};

export const contact = () => {
  track("Contact");
};
