import React from "react";
import { ActionIcon, Button } from '@mantine/core';
import { IconBellRingingFilled, IconLayoutSidebar, IconMenu2 } from '@tabler/icons-react';
import ProfileMenu from "./ProfileMenu";
import { Link } from "react-router-dom";
const Header = () => {
    return (
        <div className="w-full shadow-md h-16 flex justify-between px-5 items-center">

            <ActionIcon variant="transparent" size={"md"} aria-label="Settings">
                <IconMenu2 style={{ width: '90%', height: '90%' }} stroke={2} />
            </ActionIcon>
            <div className="flex gap-5 items-center">
             <Link to={"login"}>  <Button>Login</Button></Link> 
                <ActionIcon variant="transparent" size={"md"} aria-label="Settings">
                <IconBellRingingFilled style={{ width: '90%', height: '90%' }} stroke={2} />
            </ActionIcon>
            <ProfileMenu />
             </div>
        </div>
    )
}
export default Header