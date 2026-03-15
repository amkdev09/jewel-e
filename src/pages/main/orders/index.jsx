import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import orderService from "../../../services/orderService";
import useAuth from "../../../hooks/useAuth";
import useSnackbar from "../../../hooks/useSnackbar";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

const GRADIENT_BTN =
  "linear-gradient(90deg, #e879f9 0%, #a855f7 50%, #7c3aed 100%)";

/** Format amount as INR for display */
function formatPrice(value) {
  const n = Number(value);
  if (Number.isNaN(n)) return "₹0";
  return `₹${n.toLocaleString("en-IN")}`;
}

/** Format ISO date with time for display (e.g. 15 Mar 2026, 5:12 pm) */
function formatDateWithTime(isoString) {
  if (!isoString) return "—";
  try {
    const d = new Date(isoString);
    if (Number.isNaN(d.getTime())) return "—";
    const dateStr = d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const timeStr = d.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return `${dateStr}, ${timeStr}`;
  } catch {
    return "—";
  }
}

/** Human-readable status label */
function statusLabel(value) {
  if (!value || typeof value !== "string") return "—";
  return value.charAt(0).toUpperCase() + value.slice(1).replace(/_/g, " ");
}

/** Badge color by status (payment/order) */
function getStatusClass(status) {
  const s = (status || "").toLowerCase();
  if (["paid", "confirmed", "delivered", "shipped"].includes(s)) {
    return "bg-emerald-100 text-emerald-800";
  }
  if (["pending", "processing", "placed"].includes(s)) {
    return "bg-amber-100 text-amber-800";
  }
  if (["failed", "cancelled", "refunded"].includes(s)) {
    return "bg-red-100 text-red-800";
  }
  return "bg-gray-100 text-gray-700";
}

/** Format selected options for display (e.g. ringSize, purity, metalColor) */
function formatOptions(selectedOptions) {
  if (!selectedOptions || typeof selectedOptions !== "object") return null;
  const entries = Object.entries(selectedOptions).filter(
    ([, v]) => v != null && String(v).trim() !== ""
  );
  if (entries.length === 0) return null;
  return entries
    .map(([k, v]) => {
      const label = k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
      return `${label}: ${v}`;
    })
    .join(" · ");
}

/** Single line item inside an order */
function OrderLineItem({ item }) {
  const name = item?.name ?? "Product";
  const quantity = Number(item?.quantity) || 1;
  const price = Number(item?.price) || 0;
  const options = formatOptions(item?.selectedOptions);
  const lineTotal = quantity * price;

  return (
    <div className="flex flex-col gap-0.5 py-2 border-b border-[#f3f4f6] last:border-0 last:pb-0">
      <div className="flex justify-between items-start gap-2">
        <span className="text-[#231535] font-inter-medium text-sm flex-1 min-w-0">
          {name}
          {quantity > 1 && (
            <span className="text-[#6b7280] font-normal ml-1">× {quantity}</span>
          )}
        </span>
        <span className="text-[#4f3267] font-inter-semibold text-sm whitespace-nowrap">
          {formatPrice(lineTotal)}
        </span>
      </div>
      {options && (
        <p className="text-xs text-[#6b7280]">{options}</p>
      )}
    </div>
  );
}

const OrderCard = ({ order }) => {
  const navigate = useNavigate();
  const orderNumber = order?.orderNumber ?? order?._id ?? "—";
  const finalAmount = order?.finalAmount ?? order?.totalAmount ?? 0;
  const discountAmount = order?.discountAmount ?? 0;
  const paymentStatus = (order?.paymentStatus ?? "").toLowerCase();
  const orderStatus = order?.orderStatus ?? "";
  const createdAt = order?.createdAt ?? "";
  const items = Array.isArray(order?.items) ? order.items : [];
  const shipping = order?.shippingAddress;
  const isPaymentPending = paymentStatus === "pending";

  const handlePayNow = useCallback(() => {
    try {
      localStorage.setItem("activeOrder", JSON.stringify(order));
    } catch {
      // ignore
    }
    navigate("/checkout/payment", { replace: true });
  }, [navigate, order]);

  return (
    <article
      className="bg-white rounded-2xl border border-[#e5e7eb] shadow-sm overflow-hidden"
      data-order-id={order?._id}
    >
      {/* Header: order number + date + status badges */}
      <div className="px-4 pt-4 pb-2 flex flex-wrap items-center justify-between gap-2 border-b border-[#f3f4f6]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-inter-semibold text-[#231535] text-base">
            {orderNumber}
          </span>
          <span className="text-sm text-[#6b7280]">
            {formatDateWithTime(createdAt)}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span
            className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium ${getStatusClass(
              order?.paymentStatus
            )}`}
            title="Payment status"
          >
            Payment: {statusLabel(order?.paymentStatus)}
          </span>
          <span
            className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium ${getStatusClass(
              orderStatus
            )}`}
            title="Order status"
          >
            Order: {statusLabel(orderStatus)}
          </span>
        </div>
      </div>

      {/* Items list */}
      <div className="px-4 py-2">
        {items.map((item, index) => (
          <OrderLineItem
            key={item?.productId ? `${item.productId}-${index}` : `item-${index}`}
            item={item}
          />
        ))}
      </div>

      {/* Shipping (compact) */}
      {shipping && (shipping.city || shipping.state || shipping.name) && (
        <div className="px-4 py-2 bg-[#faf9fc] border-t border-[#f3f4f6]">
          <p className="text-xs text-[#6b7280]">
            <span className="font-inter-medium text-[#4b5563]">Ship to: </span>
            {[shipping.name, shipping.city, shipping.state]
              .filter(Boolean)
              .join(", ")}
          </p>
        </div>
      )}

      {/* Footer: total + Pay now */}
      <div className="px-4 py-4 bg-[#faf9fc] border-t border-[#e5e7eb] flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-sm text-[#6b7280]">Order total</span>
          {discountAmount > 0 && (
            <span className="text-sm text-[#6b7280] line-through">
              {formatPrice((finalAmount ?? 0) + discountAmount)}
            </span>
          )}
          <span className="font-inter-semibold text-[#231535] text-lg">
            {formatPrice(finalAmount)}
          </span>
        </div>
        {isPaymentPending && (
          <button
            type="button"
            onClick={handlePayNow}
            className="px-5 py-2.5 rounded-full text-sm font-inter-semibold text-white shadow-md hover:opacity-95 active:opacity-90 transition-opacity"
            style={{ background: GRADIENT_BTN }}
          >
            Pay now
          </button>
        )}
      </div>
    </article>
  );
};

const MyOrders = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { showSnackbar } = useSnackbar();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const limit = DEFAULT_LIMIT;

  const fetchOrders = useCallback(async () => {
    if (!isLoggedIn) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await orderService.getMyOrders(page, limit);
      if (res?.success && res?.data) {
        setData(res.data);
      } else {
        setError(res?.message ?? "Failed to load orders.");
      }
    } catch (err) {
      const msg =
        err?.message ??
        err?.response?.data?.message ??
        "Unable to load orders. Please try again.";
      setError(msg);
      showSnackbar(msg, "error");
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn, page, limit, showSnackbar]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    if (!isLoggedIn && !loading) {
      navigate("/login", { state: { from: "/orders" } });
    }
  }, [isLoggedIn, loading, navigate]);

  const items = data?.items ?? [];
  const totalPages = data?.totalPages ?? 0;
  const total = data?.total ?? 0;
  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  if (!isLoggedIn) {
    return null;
  }

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-[#faf9fc] flex items-center justify-center">
        <p className="text-[var(--primary-color-c)] font-inter-regular">
          Loading orders…
        </p>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="min-h-screen bg-[#faf9fc] flex flex-col items-center justify-center px-4">
        <p className="text-[#6b7280] font-inter-regular mb-4 text-center">
          {error}
        </p>
        <button
          type="button"
          onClick={() => {
            setError(null);
            fetchOrders();
          }}
          className="px-4 py-2 rounded-lg font-inter-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: "linear-gradient(to right, #e56eeb, #8863fb)" }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9fc] font-inter-regular">
      <header className="w-full border-b border-[#e5e7eb] bg-white sticky top-0 z-10">
        <div className="max-w-[800px] mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              className="p-1 rounded-full hover:bg-[#f3f4f6] transition-colors"
              aria-label="Back"
              onClick={() => navigate(-1)}
            >
              <svg
                className="w-6 h-6 text-[#4b5563]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h1 className="text-lg font-inter-semibold text-[#231535]">
              My Orders
            </h1>
            <div className="w-8" aria-hidden />
          </div>
        </div>
      </header>

      <main className="max-w-[800px] mx-auto px-4 md:px-8 py-6 pb-12">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <p className="text-[#6b7280] font-inter-regular mb-4">
              You haven&apos;t placed any orders yet.
            </p>
            <button
              type="button"
              onClick={() => navigate("/jewellery")}
              className="px-4 py-2 rounded-lg font-inter-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(to right, #e56eeb, #8863fb)" }}
            >
              Start shopping
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm text-[#6b7280] mb-4">
              {total} order{total !== 1 ? "s" : ""} found
            </p>
            <ul className="space-y-4" role="list">
              {items.map((order) => (
                <li key={order._id}>
                  <OrderCard order={order} />
                </li>
              ))}
            </ul>

            {totalPages > 1 && (
              <nav
                className="mt-6 flex items-center justify-center gap-3"
                aria-label="Orders pagination"
              >
                <button
                  type="button"
                  disabled={!hasPrev || loading}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1.5 rounded-lg border border-[#e5e7eb] bg-white font-inter-regular text-sm text-[#374151] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f9fafb] transition-colors"
                >
                  Previous
                </button>
                <span className="text-sm text-[#6b7280]">
                  Page {page} of {totalPages}
                </span>
                <button
                  type="button"
                  disabled={!hasNext || loading}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-3 py-1.5 rounded-lg border border-[#e5e7eb] bg-white font-inter-regular text-sm text-[#374151] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f9fafb] transition-colors"
                >
                  Next
                </button>
              </nav>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default MyOrders;
