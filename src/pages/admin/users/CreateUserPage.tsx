import UserForm from '../../../components/admin/forms/UserForm';
import { userApiService } from '../../../api/userApiService';
import { useNavigate } from 'react-router-dom';
import { UserBase } from '../../../entities/user';

const CreateUserPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: UserBase) => {
    await userApiService.createUser(values);
    navigate('/admin/users');
  };

  return (
    <UserForm
      initialValues={{
        userName: '',
        email: '',
        firstName: '',
        lastName: '',
        birthDate: '',
        role: 'user',
      }}
      onSubmit={handleSubmit}
    />
  );
};

export default CreateUserPage;
