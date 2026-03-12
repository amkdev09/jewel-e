import api from "../utils/axios";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;
const SORT_OPTIONS = ["latest", "price_asc", "price_desc"];
const METAL_TYPES = ["gold", "silver"];

/**
 * Build query params for list products API.
 * @param {Object} params
 * @param {number} [params.page=1]
 * @param {number} [params.limit=20]
 * @param {string} [params.categoryId]
 * @param {'gold'|'silver'} [params.metalType]
 * @param {number} [params.minPrice]
 * @param {number} [params.maxPrice]
 * @param {'latest'|'price_asc'|'price_desc'} [params.sortBy]
 * @returns {Object} query object for axios
 */
function buildListParams(params = {}) {
  const {
    page = DEFAULT_PAGE,
    limit = DEFAULT_LIMIT,
    categoryId,
    metalType,
    minPrice,
    maxPrice,
    sortBy,
  } = params;

  const query = {
    page: String(page),
    limit: String(limit),
  };

  if (categoryId != null && categoryId !== "") query.categoryId = String(categoryId);
  if (metalType && METAL_TYPES.includes(metalType)) query.metalType = metalType;
  if (minPrice != null && !Number.isNaN(Number(minPrice))) query.minPrice = String(minPrice);
  if (maxPrice != null && !Number.isNaN(Number(maxPrice))) query.maxPrice = String(maxPrice);
  if (sortBy && SORT_OPTIONS.includes(sortBy)) query.sortBy = sortBy;

  return query;
}

const productService = {
  /**
   * List products with pagination and filters.
   * API response: { success, data: { items, total, page, limit, totalPages } }
   * @param {Object} params - page, limit, categoryId, metalType, minPrice, maxPrice, sortBy
   * @returns {Promise<{ items: Array, total: number, page: number, limit: number, totalPages: number }>}
   */
  getProducts: async (params = {}) => {
    const response = await api.get("/products", {
      params: buildListParams(params),
    });

    const raw = response?.data;
    if (!raw?.success || raw.data == null) {
      throw new Error(raw?.message || "Failed to load products");
    }

    const data = raw.data;
    return {
      items: Array.isArray(data.items) ? data.items : [],
      total: Number(data.total) || 0,
      page: Number(data.page) || DEFAULT_PAGE,
      limit: Number(data.limit) || DEFAULT_LIMIT,
      totalPages: Number(data.totalPages) || 0,
    };
  },

  /**
   * Get a single product by ID.
   * GET /api/products/:id
   * @param {string} id - Product ID
   * @returns {Promise<Object>} Product object
   */
  getProductById: async (id) => {
    if (!id) throw new Error("Product ID is required");
    const response = await api.get(`/products/${id}`);
    const raw = response?.data;
    if (!raw?.success || raw.data == null) {
      throw new Error(raw?.message || "Product not found");
    }
    return raw.data;
  },
};

export default productService;
export { buildListParams, DEFAULT_LIMIT, DEFAULT_PAGE, METAL_TYPES, SORT_OPTIONS };
