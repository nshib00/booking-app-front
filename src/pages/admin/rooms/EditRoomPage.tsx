import RoomForm from '../../../components/admin/forms/RoomForm';
import { roomApiService } from '../../../api/roomApiService';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Room, RoomFormValues } from '../../../entities/room';

const EditRoomPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState<Room | null>(null);

  useEffect(() => {
    const fetchRoom = async () => {
      const data = await roomApiService.getRoomById(Number(id));
      setRoom(data);
    };
    if (id) {
      fetchRoom();
    }
  }, [id]);

  const handleSubmit = async (values: RoomFormValues) => {
    await roomApiService.updateRoom(Number(id), values);
    navigate('/admin/rooms');
  };

  if (!room) return <div>Загрузка...</div>;
  
  const { id: _, ...initialValues } = room;

  return <RoomForm initialValues={initialValues} onSubmit={handleSubmit} />;
};

export default EditRoomPage;
