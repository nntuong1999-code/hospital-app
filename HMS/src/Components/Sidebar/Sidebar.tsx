import React from "react";
import logo from "../../images/logo.png";
import { IconCalendarCheck, IconLayoutGrid, IconLockOpen, IconMoodHeart, icons, IconStethoscope, IconVaccine } from '@tabler/icons-react';
import { Center, Text } from '@mantine/core';
import { url } from "inspector";
import { NavLink } from "react-router-dom";

const links = [
    {
        name: "Dashboard", url: "/dashboard", icons: <IconLayoutGrid stroke={1.5} />
    },
    {
        name: "Doctors", url: "/doctors", icons: <IconStethoscope stroke={1.5} />
    },
    {
        name: "Patients", url: "/patients", icons: <IconMoodHeart stroke={1.5} />
    },
    {
        name: "Appointments", url: "/appointments", icons: <IconCalendarCheck stroke={1.5} />
    },
    {
        name: "Pharmacy", url: "/pharmacy", icons: <IconVaccine stroke={1.5} />
    }
]
const Sidebar = () => {
    return (
        <div className="flex">
            <div className="w-64"></div>
            <div className="w-64 fixed overflow-auto hide-scrollbar bg-gradient-to-b from-[#025d79] to-[#69d0e2] h-screen" >
                <div className="fixed z-[500] text-red-500 items-center gap-8">
                    <img src={logo} className="w-64 h-40" alt='img' />

                </div>
                <div className="pt-2 mt-40 bg-[#02587B] flex justify-center gap-2 font-heading font-bold text-xl text-white tracking-wide">
                    <IconLockOpen stroke={2} className="w-5 h-5" />
                    <Text size="md">Admin</Text>
                </div>
                <div className="flex flex-col gap-1">
                    {links.map((link) => (
                        <NavLink
                            key={link.url}
                            to={link.url}
                            className={({
                                isActive }) =>
                                `flex items-center gap-3 px-4 w-full font-medium text-neutral-900 py-2 rounded-lg transition-all
                            ${isActive ?
                                    "bg-primary-400" : " hover:bg-gray-100"}`
                            }
                        >
                            {link.icons}
                            <span>{link.name}</span>
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Sidebar