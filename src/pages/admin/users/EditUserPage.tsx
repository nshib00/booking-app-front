import UserForm from '../../../components/admin/forms/UserForm';
import { userApiService } from '../../../api/userApiService';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { User, UserBase } from '../../../entities/user';

const EditUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await userApiService.getUserById(id!);
        setUser(fetchedUser);
      } catch (error) {
        console.error('Ошибка при загрузке пользователя:', error);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (values: UserBase) => {
    await userApiService.updateUser(id!, values);
    navigate('/admin/users');
  };

  if (!user) return <div>Загрузка...</div>;

  return <UserForm initialValues={user} onSubmit={handleSubmit} />;
};

export default EditUserPage;
