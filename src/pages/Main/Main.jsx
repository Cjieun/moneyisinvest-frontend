import React from "react";
import GuestMain from "./GuestMain";
import UserMain from "./UserMain";

export default function Main() {
    return (
        <>
            {sessionStorage.getItem("token") === null ? <GuestMain /> : <UserMain />}
        </>
    )
}