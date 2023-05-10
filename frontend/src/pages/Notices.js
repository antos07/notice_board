import {List} from "antd";
import {listAll} from "../api/notices";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {NoticeList} from "../components/NoticeList";

export function Notices() {
    const [notices, setNotices] = useState()

    useEffect(() => {
        async function getNotices() {
            const notices = await listAll()
            setNotices(notices)
        }

        getNotices()
    }, [])

    return <NoticeList notices={notices} style={{
            width: "50%",
            minWidth: 350
        }}/>
}