'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/outline';
import { courseApi, CourseReview } from '@/lib/api/courses';

interface CourseReviewsProps {
  courseId: string;
}

export default function CourseReviews({ courseId }: CourseReviewsProps) {
  const [reviews, setReviews] = useState<CourseReview[]>([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const fetchedReviews = await courseApi.getCourseReviews(courseId);
        setReviews(fetchedReviews);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchReviews();
  }, [courseId]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const submittedReview = await courseApi.submitCourseReview(
        courseId, 
        newReview.rating, 
        newReview.comment
      );

      setReviews([submittedReview, ...reviews]);
      setNewReview({ rating: 0, comment: '' });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number, interactive = false, onChange?: (rating: number) => void) => {
    return Array.from({ length: 5 }, (_, index) => {
      const starProps = interactive 
        ? { 
            onClick: () => onChange && onChange(index + 1),
            className: 'cursor-pointer hover:text-yellow-500 transition' 
          }
        : {};

      return index < rating ? (
        <StarIcon 
          key={index} 
          className="h-5 w-5 text-yellow-500" 
          {...starProps} 
        />
      ) : (
        <StarOutlineIcon 
          key={index} 
          className="h-5 w-5 text-yellow-500" 
          {...starProps} 
        />
      );
    });
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">
        Course Reviews
      </h2>

      {/* Existing Reviews */}
      <div className="space-y-6 mb-8">
        {reviews.length === 0 ? (
          <p className="text-blue-700 text-center">
            No reviews yet. Be the first to review!
          </p>
        ) : (
          reviews.map(review => (
            <div 
              key={review.id} 
              className="border-b pb-4 last:border-b-0"
            >
              <div className="flex items-center space-x-4 mb-2">
                {review.user.image && (
                  <Image 
                    src={review.user.image} 
                    alt={review.user.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <div>
                  <h4 className="font-semibold text-blue-900">
                    {review.user.name}
                  </h4>
                  <div className="flex">
                    {renderStars(review.rating)}
                  </div>
                </div>
              </div>
              <p className="text-blue-700">{review.comment}</p>
              <span className="text-sm text-blue-500 mt-2 block">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Review Submission Form */}
      <form onSubmit={handleSubmitReview} className="space-y-4">
        <div>
          <label className="block text-blue-700 mb-2">
            Your Rating
          </label>
          <div className="flex">
            {renderStars(newReview.rating, true, (rating) => 
              setNewReview(prev => ({ ...prev, rating }))
            )}
          </div>
        </div>

        <div>
          <label className="block text-blue-700 mb-2">
            Your Review
          </label>
          <textarea
            value={newReview.comment}
            onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
            placeholder="Share your experience with this course"
            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-2 rounded">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || newReview.rating === 0}
          className={`
            w-full px-6 py-3 rounded-lg text-white font-semibold transition
            ${newReview.rating === 0 || loading
              ? 'bg-blue-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
            }
          `}
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
}
