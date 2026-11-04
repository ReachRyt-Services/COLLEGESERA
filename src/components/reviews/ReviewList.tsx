import { DatabaseReview } from '@/types/database';
import { Star, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ReviewListProps {
    reviews: DatabaseReview[];
}

const ReviewList = ({ reviews }: ReviewListProps) => {
    if (reviews.length === 0) {
        return (
            <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-lg border border-slate-100">
                <p>No reviews yet. Be the first to review!</p>
            </div>
        );
    }

    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4 bg-orange-50 p-4 rounded-lg border border-orange-100">
                <div className="text-3xl font-bold text-orange-600">{averageRating.toFixed(1)}</div>
                <div>
                    <div className="flex text-orange-500">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                className={`w-5 h-5 ${star <= Math.round(averageRating) ? 'fill-current' : 'text-orange-200'}`}
                            />
                        ))}
                    </div>
                    <div className="text-sm text-slate-600 mt-1">{reviews.length} reviews</div>
                </div>
            </div>

            <div className="space-y-4">
                {reviews.map((review) => (
                    <div key={review.id} className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                                    <User className="w-4 h-4 text-slate-400" />
                                </div>
                                <div>
                                    <div className="font-medium text-slate-900">{review.user_name || 'Anonymous'}</div>
                                    <div className="text-xs text-slate-500">
                                        {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
                                    </div>
                                </div>
                            </div>
                            <div className="flex text-orange-400">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`w-4 h-4 ${star <= review.rating ? 'fill-current' : 'text-slate-200'}`}
                                    />
                                ))}
                            </div>
                        </div>
                        {review.comment && (
                            <p className="text-slate-600 text-sm leading-relaxed">{review.comment}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewList;
