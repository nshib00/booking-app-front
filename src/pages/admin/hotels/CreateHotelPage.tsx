import HotelForm from '../../../components/admin/forms/HotelForm';
import { hotelApiService } from '../../../api/hotelApiService';
import { useNavigate } from 'react-router-dom';
import { HotelFormValues } from '../../../entities/hotel';

const CreateHotelPage = () => {
  const navigate = useNavigate();

  const initialValues: HotelFormValues = {
    name: '',
    description: '',
    city: '',
    address: '',
    starRating: 0,
    imageUrl: '',
    services: [],
    rooms: [],
  };

  const handleSubmit = async (values: HotelFormValues) => {
    await hotelApiService.createHotel(values);
    navigate('/admin/hotels');
  };

  return <HotelForm initialValues={initialValues} onSubmit={handleSubmit} />;
};

export default CreateHotelPage;
