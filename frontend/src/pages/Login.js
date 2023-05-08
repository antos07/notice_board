import {Button, Form, Input, notification} from "antd";
import {login} from "../api/auth";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {isAxiosError} from "axios";
import {useNavigate} from "react-router-dom";

export function Login() {
    const [notificationInstance, contextHolder] = notification.useNotification();
    const navigate = useNavigate()

    const doLogin = async ({username, password}) => {
        try {
            await login(username, password)
        } catch (e) {
            if (!isAxiosError(e)) {
                throw e
            }
            console.log(e.response.data.detail)
            notificationInstance.error({message: e.response.data.detail || "Error", placement: "top"})
            return
        }
        navigate('/')
    }

    return <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
        {contextHolder}
        <Form
            name="basic"
            style={{maxWidth: 300, width: "100%"}}
            onFinish={doLogin}
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                        max: 150
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"
                       autoComplete="username"/>
            </Form.Item>

            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon"/>}
                    placeholder="Password"
                    autoComplete="current-password"
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" style={{width: "100%"}}>
                    Login
                </Button>
            </Form.Item>
        </Form>
    </div>
}