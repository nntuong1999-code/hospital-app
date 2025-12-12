import { notifications, Notifications } from '@mantine/notifications';
import { IconCheck } from "@tabler/icons-react"
import '@mantine/notifications/styles.css';


const successNotification = (message: string) => {
    // Hiển thị thông báo thành công
   notifications.show({
        title: 'Success',
        message: message,
         autoClose:3000,
        color: 'green',
        icon:<IconCheck/>,
        withBorder:true,
    
        className:"!border-green-500 !rounded-xl"
    })
}

const errorNotification = (message: string) => {
    // Hiển thị thông báo thành công
   notifications.show({
        title: 'Error',
        message: message,
        color: 'red',
        icon:<IconCheck/>,
        autoClose:3000,
        withBorder:true,
        className:"!border-red-500 !rounded-xl"
    })
}
export {successNotification, errorNotification};
