"use client";

import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { FiStar } from "react-icons/fi";
import { MdArrowOutward } from "react-icons/md";

import Pagination from "@/components/ui/Pagination";
import type {
  ApiListResponse,
  Review,
  ReviewableItem,
  ReviewableOrder,
} from "@/types/reviews";
import {
  getProductReviews,
  getReviewableOrders,
} from "@/services/orderService";
import ReviewModal from "./ReviewModal";
import { useAuthStore } from "@/zustand/authStore";
import ReviewCard from "./ReviewCard";
import ReviewableCard from "./ReviewableCard";
import ReviewCardSkeleton from "./ReviewCardSkeleton";
import ReviewableCardSkeleton from "./ReviewableCardSkeleton";

const PAGE_SIZE = 12;
type Tab = "pending" | "completed";

const FALLBACK_IMG = "/assets/wallet.jpeg";

export default function MyReviews() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<Tab>("pending");

  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewableProducts, setReviewableProducts] = useState<
    ReviewableItem[]
  >([]);

  const [page, setPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ReviewableItem | null>(null);

  const { token } = useAuthStore();

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!token) {
        setReviews([]);
        setReviewableProducts([]);
        return;
      }

      const reviewsRes = (await getProductReviews({
        token,
      })) as ApiListResponse<Review>;

      const reviewableOrdersRes = (await getReviewableOrders({
        token,
      })) as ApiListResponse<ReviewableOrder>;

      const safeReviews = Array.isArray(reviewsRes?.data)
        ? reviewsRes.data
        : [];
      const orders = Array.isArray(reviewableOrdersRes?.data)
        ? reviewableOrdersRes.data
        : [];

      const flattened: ReviewableItem[] = orders.flatMap((order) =>
        (order.cart ?? []).map((product) => ({
          orderId: order._id,
          orderDate: order.createdAt,
          product: {
            _id: product._id,
            title: product.title,
            image: product.image, // string or undefined
            price: product.price,
          },
        }))
      );

      setReviews(safeReviews);
      setReviewableProducts(flattened);
    } catch (e: any) {
      console.error(e);
      setError(e?.message ?? "Failed to fetch review data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  const sourceData = activeTab === "pending" ? reviewableProducts : reviews;
  const total = sourceData.length;

  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return sourceData.slice(startIndex, endIndex);
  }, [sourceData, page]);

  const openReviewModal = (item: ReviewableItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleReviewSuccess = async () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    await fetchAllData();
  };

  const renderEmptyState = (title: string, message: string) => (
    <div className="text-center py-16">
      <div className="flex justify-center text-[#12B47E] text-6xl mb-4">
        <FiStar />
      </div>
      <h2 className="font-semibold text-xl text-[#161616] dark:text-[#FFFFFF]">
        {title}
      </h2>
      <p className="text-[#6B7280] dark:text-[#E5E5E5] mt-1">{message}</p>
    </div>
  );

  if (loading) {
    return (
      <section aria-busy="true" className="py-6">
        <div className="w-full h-28 bg-gray-50 dark:bg-gray-800 animate-pulse rounded-xl border border-gray-200 dark:border-[#303030]" />
      </section>
    );
  }

  if (error) {
    return (
      <section aria-live="polite" className="text-center py-10">
        <p className="text-red-500 font-medium">{error}</p>
      </section>
    );
  }

  return (
    <div className="bg-[#FFF] dark:bg-[#161616] p-5 rounded-xl shadow-sm border border-[#DBDBDB] dark:border-[#303030]">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 border-b-2 border-gray-100 dark:border-[#303030] pb-4">
        <div className="flex items-center gap-3">
          <BsPencilSquare className="text-xl text-[#12B47E]" />
          <h2 className="text-2xl font-semibold text-[#161616] dark:text-[#FFFFFF]">
            Product Reviews
          </h2>
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 gap-2 mb-6 p-1 rounded-full bg-[#F3F4F6] dark:bg-[#1F1F1F] lg:flex lg:items-center lg:gap-2">
        <button
          onClick={() => setActiveTab("pending")}
          className={`w-full text-center px-2 lg:px-4 py-2 rounded-full text-xs lg:text-sm font-semibold transition-colors ${
            activeTab === "pending"
              ? "bg-[#12B47E] text-white shadow"
              : "bg-transparent text-[#6B7280] dark:text-[#E5E5E5] hover:bg-white dark:hover:bg-background-dark"
          }`}
        >
          Pending Reviews ({reviewableProducts.length})
        </button>

        <button
          onClick={() => setActiveTab("completed")}
          className={`w-full text-center px-2 lg:px-4 py-2 rounded-full text-xs lg:text-sm font-semibold transition-colors ${
            activeTab === "completed"
              ? "bg-[#12B47E] text-white shadow"
              : "bg-transparent text-[#6B7280] dark:text-[#E5E5E5] hover:bg-white dark:hover:bg-background-dark"
          }`}
        >
          Completed Reviews ({reviews.length})
        </button>
      </div>

      {/* Content */}
      {loading ? (
        activeTab === "pending" ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <ReviewableCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <ReviewCardSkeleton key={i} />
            ))}
          </div>
        )
      ) : total === 0 ? (
        renderEmptyState(
          activeTab === "pending"
            ? "No Pending Reviews"
            : "No Completed Reviews",
          activeTab === "pending"
            ? "You've reviewed all your delivered products!"
            : "You haven't written any reviews yet."
        )
      ) : activeTab === "pending" ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
          {(paginatedData as ReviewableItem[]).map((item) => (
            <ReviewableCard
              key={`${item.orderId}-${item.product._id}`}
              item={item}
              fallbackImg={FALLBACK_IMG}
              onWriteReview={openReviewModal}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {(paginatedData as Review[]).map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              fallbackImg={FALLBACK_IMG}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {total > 0 && (
        <Pagination
          page={page}
          pageSize={PAGE_SIZE}
          total={total}
          onPageChange={setPage}
          className="pt-6"
        />
      )}

      {/* Modal */}
      {selectedItem && (
        <ReviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          orderId={selectedItem.orderId}
          productId={selectedItem.product._id}
          onSuccess={handleReviewSuccess}
        />
      )}
    </div>
  );
}
