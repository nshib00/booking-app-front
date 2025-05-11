import HotelForm from '../../../components/admin/forms/HotelForm';
import { hotelApiService } from '../../../api/hotelApiService';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Hotel, HotelFormValues } from '../../../entities/hotel';

const EditHotelPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState<Hotel | null>(null);

  useEffect(() => {
    const fetchHotel = async () => {
      const data = await hotelApiService.getHotelById(Number(id));
      setHotel(data);
    };
    fetchHotel();
  }, [id]);

  const handleSubmit = async (values: HotelFormValues) => {
    await hotelApiService.updateHotel(Number(id), values);
    navigate('/admin/hotels');
  };

  if (!hotel) return <div>Загрузка...</div>;

  const { id: _, minRoomPrice: __, ...initialValues } = hotel;

  return <HotelForm initialValues={initialValues} onSubmit={handleSubmit} />;
};

export default EditHotelPage;
