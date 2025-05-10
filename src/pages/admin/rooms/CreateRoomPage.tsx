import RoomForm from '../../../components/admin/forms/RoomForm';
import { roomApiService } from '../../../api/roomApiService';
import { useNavigate } from 'react-router-dom';
import { RoomFormValues } from '../../../entities/room';

const CreateRoomPage = () => {
  const navigate = useNavigate();

  const initialValues: RoomFormValues = {
    hotelId: 0,
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    imageUrl: '',
    imageFile: undefined,
  };

  const handleSubmit = async (values: RoomFormValues) => {
    await roomApiService.createRoom(values);
    navigate('/admin/rooms');
  };

  return <RoomForm initialValues={initialValues} onSubmit={handleSubmit} />;
};

export default CreateRoomPage;
