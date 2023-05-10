import {Button, Descriptions, Divider} from "antd";
import {useEffect, useState} from "react";
import {getMe} from "../api/users";
import {isLoggedIn} from "axios-jwt";
import {useNavigate} from "react-router-dom";
import {logout} from "../api/auth";
import {listMy} from "../api/notices";
import {NoticeList} from "../components/NoticeList";

export function Profile() {
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const [notices, setNotices] = useState([])

    useEffect(() => {
        async function getUser() {
            const user = await getMe()
            setUser(user)
        }

        async function getNotices() {
            const notices = await listMy()
            setNotices(notices)
        }

        if (!isLoggedIn()) {
            navigate('/login')
        } else {
            getUser()
            getNotices()
        }
    }, [])

    async function doLogout() {
        await logout()
        navigate('/')
    }

    return <div style={{width: "50%", minWidth: 350}}>
        <Descriptions
            title="Profile"
            column={1}
            extra={<Button type="primary" danger onClick={doLogout}>Logout</Button>}
        >
            <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
            <Descriptions.Item label="Username">{user.username}</Descriptions.Item>
        </Descriptions>
        <Divider children={"My notices"} orientation={"left"}/>
        <NoticeList notices={notices}/>
    </div>
}