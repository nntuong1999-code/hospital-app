import { Button, PasswordInput, TextInput } from '@mantine/core'
import { IconHeart, IconHeartbeat } from '@tabler/icons-react'
import { useForm } from '@mantine/form';
import { Link, useNavigate } from 'react-router-dom';
import { log } from 'console';
import { loginUser } from '../Service/UserService';
import { errorNotification, successNotification } from '../Utility/NotificationUtil';
import { useState } from 'react';
const LoginPage = () => {
    const navigation = useNavigate();
    const [loading, setLoading] = useState(false);
    const form = useForm({

        initialValues: {
            email: '',
            password: '',
        },


        validate: {
            email: (value: string) =>
                /^\S+@\S+$/.test(value) ? null : "Invalid email",

            password: (value: string) =>
                value.trim().length === 0 ? "Password is required" : null,
        },
    });
    const handleSubmit = (values: typeof form.values) => {
        loginUser(values).then((_data) => {
            setLoading(true);
            successNotification("Login successful!");
            navigation('/dashboard');
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
                    <div className='self-center font-heading font-medium text-white text-xl'>Login</div>
                    <TextInput className='transition duration-300' {...form.getInputProps('email')} variant='unstyled' radius="md"
                        withAsterisk
                        placeholder="Email" />
                    <PasswordInput className='transition duration-300' {...form.getInputProps('password')} variant="unstyled" radius="md" withAsterisk placeholder="Password" />
                    <Button loading={loading} type='submit' radius={'md'} size='md' color='pink'>Login</Button>
                    <div className="text-neutral-100 text-sm text-center">Don't have an account? <Link to="/register" className='hover:underline'>Register</Link> </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
