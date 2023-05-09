import {List} from "antd";
import {listAll} from "../api/notices";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export function Notices() {
    const [notices, setNotices] = useState()

    useEffect(() => {
        async function getNotices() {
            const notices = await listAll()
            setNotices(notices)
        }

        getNotices()
    }, [])

    return <List
        itemLayout="vertical"
        bordered
        size="large"
        dataSource={notices}
        renderItem={(notice) => {
            return <List.Item key={notice.id}>
                <List.Item.Meta
                    title={<Link to={`${notice.id}`}>{notice.title}</Link>}
                    description={"by " + notice.author}
                />
                {notice.text}
            </List.Item>
        }}
        style={{
            textAlign: "left",
            width: "50%",
            minWidth: 350
        }}
    />
}