/**
 * Load Razorpay checkout script once and expose Razorpay constructor.
 * Used for Pay Now flow; script is loaded only when user initiates payment.
 */

const SCRIPT_URL = "https://checkout.razorpay.com/v1/checkout.js";
const LOAD_TIMEOUT_MS = 15000;

let loadPromise = null;

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if (typeof window.Razorpay !== "undefined") {
        resolve(window.Razorpay);
        return;
      }
      const check = () => {
        if (typeof window.Razorpay !== "undefined") {
          resolve(window.Razorpay);
        } else {
          requestAnimationFrame(check);
        }
      };
      requestAnimationFrame(check);
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => {
      if (typeof window.Razorpay !== "undefined") {
        resolve(window.Razorpay);
      } else {
        reject(new Error("Razorpay not available after script load"));
      }
    };
    script.onerror = () => reject(new Error("Failed to load payment script"));
    document.body.appendChild(script);
  });
}

export function loadRazorpay() {
  if (!loadPromise) {
    loadPromise = Promise.race([
      loadScript(SCRIPT_URL),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Payment script timed out")), LOAD_TIMEOUT_MS)
      ),
    ]);
  }
  return loadPromise;
}
