import {Button, Descriptions} from "antd";
import {useEffect, useState} from "react";
import {getMe} from "../api/users";
import {isLoggedIn} from "axios-jwt";
import {useNavigate} from "react-router-dom";
import {logout} from "../api/auth";

export function Profile() {
    const [user, setUser] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        async function getUser() {
            const user = await getMe()
            setUser(user)
        }

        if (!isLoggedIn()) {
            navigate('/login')
        } else {
            getUser()
        }
    }, [])

    async function doLogout(){
        await logout()
        navigate('/')
    }

    return <Descriptions
        title="Profile"
        column={1}
        style={{width: "50%", minWidth: 350}}
        extra={<Button type="primary" danger onClick={doLogout}>Logout</Button> }
    >
        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
        <Descriptions.Item label="Username">{user.username}</Descriptions.Item>
    </Descriptions>
}