import ReviewForm from '../../../components/admin/forms/ReviewForm';
import { reviewApiService } from '../../../api/reviewApiService';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Review } from '../../../entities/review';

const EditReviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState<Review | null>(null);

  useEffect(() => {
    const fetchReview = async () => {
      const data = await reviewApiService.getReviewById(Number(id));
      setReview(data);
    };
    fetchReview();
  }, [id]);

  const handleSubmit = async (values: Omit<Review, 'id'>) => {
    await reviewApiService.updateReview(Number(id), values);
    navigate('/admin/reviews');
  };

  if (!review) return <div>Загрузка...</div>;

  const { id: _, ...initialValues } = review;

  return <ReviewForm initialValues={initialValues} onSubmit={handleSubmit} />;
};

export default EditReviewPage;
