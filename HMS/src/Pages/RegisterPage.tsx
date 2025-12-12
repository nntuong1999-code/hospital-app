import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, Button, SegmentedControl } from "@mantine/core";
import { IconHeartbeat } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../Service/UserService";
import { errorNotification, successNotification } from "../Utility/NotificationUtil";
import { useState } from "react";


type RegisterFormValues = {
  name: string;
  email: string;
  type: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = () => {
       const navigation = useNavigate();
        const [loading, setLoading] = useState(false);
  const form = useForm<RegisterFormValues>({
    initialValues: {
      name: "",
      email: "",
      type: "PATIENT",
      password: "",
      confirmPassword: "",
    },

    validate: {
      name: (value) =>
        value.trim().length >= 2 ? null : "Tên phải có ít nhất 2 ký tự!",

      email: (value) =>
        /^\S+@\S+\.\S+$/.test(value) ? null : "Email không hợp lệ!",

      type: (value) =>
        value ? null : "Vui lòng chọn loại tài khoản!",

      password: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value
        )
          ? null
          : "Mật khẩu phải ≥8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt!",

      confirmPassword: (value, values) =>
        value === values.password ? null : "Mật khẩu nhập lại không khớp!",
    },
  });

  // Gọi API
  const handleSubmit = async (values: typeof form.values) => {
    console.log("Form Values:", values);
            registerUser(values).then((data) => {
                setLoading(true);
                successNotification("Registration successful!");
                navigation('/login');

            }).catch((error) => {
               
                errorNotification(error.response.data.errorMessagelease);
            }).finally(() => {
                setLoading(false);
            });

  };

  return (
   <div style={{ background: 'url("/bglogin.jpg")' }}
            className='flex flex-col h-screen w-screen !bg-cover !bg-center !bg-no-repeat items-center justify-center'>
            <div className="py-3 text-pink-500 flex gap-1 items-center">
                <IconHeartbeat size={45} stroke={2.5} />
                <span className='font-heading font-semibold text-4xl'>POLYCLINIC QUYNH MAI</span>
            </div>
            <div className="w-[450px] backdrop-blur-md p-10 py-8 rounded-lg">
                <form onSubmit={form.onSubmit(handleSubmit)} className='flex flex-col gap-3 [&_input]:placeholder-neutral-100 [&_.mantine-Input-input]:!border-white focus-within:[&_.mantine-Input-input]:!border-pink-500 [&_.mantine-Input-input]:!border [&_input]:!pl-2 [&_input]:!text-white [&_svg]:text-white'>
                    <div className='self-center font-heading font-medium text-white text-xl'>Register</div>
                    <SegmentedControl {...form.getInputProps('type')} className='[&_*]:!text-white' color='pink'  bg="none" fullWidth size='md' radius={'md'} data={[{label:'Patient',value:"PATIENT"}, {label:'Doctor',value:"Doctor"},{label:'Admin',value:"ADMIN"}]} />
                     <TextInput className='transition duration-300' {...form.getInputProps('name')} variant='unstyled' radius="md"
                        withAsterisk
                        placeholder="Name" />
                    <TextInput className='transition duration-300' {...form.getInputProps('email')} variant='unstyled' radius="md"
                        withAsterisk
                        placeholder="Email" />
                    <PasswordInput className='transition duration-300' {...form.getInputProps('password')} variant="unstyled" radius="md" withAsterisk placeholder="Password" />
                    <PasswordInput className='transition duration-300' {...form.getInputProps('confirmPassword')} variant="unstyled" radius="md" withAsterisk placeholder="Confirm Password" />
                    <Button loading={loading} type='submit' radius={'md'} size='md' color='pink'>Register</Button>
                    <div className="text-neutral-100 text-sm text-center">Don't have an account? <Link to="/login" className='hover:underline'>Login</Link> </div>
                </form>
            </div>
        </div>
  );
};

export default RegisterPage;
