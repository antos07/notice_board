import {Button, Form, Input, notification} from "antd";
import {useNavigate} from "react-router-dom";
import {isAxiosError} from "axios";
import {LockOutlined, UserOutlined, MailOutlined} from "@ant-design/icons";
import {register} from "../api/users";

export function Signup() {
    const [notificationInstance, contextHolder] = notification.useNotification();
    const navigate = useNavigate()

    const doSignup = async ({email, username, password}) => {
        try {
            await register(email, username, password)
        } catch (e) {
            if (!isAxiosError(e)) {
                throw e
            }
            console.log(e.response.data)
            notificationInstance.error({message: e.response.data.detail || "Error", placement: "top"})
            return
        }
        navigate('/login')
    }

    return <>
        {contextHolder}
        <Form
            name="basic"
            style={{maxWidth: 300, width: "100%"}}
            onFinish={doSignup}
        >
            <Form.Item
                name="email"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your Email!',
                    },
                ]}
            >
                <Input prefix={<MailOutlined className="site-form-item-icon"/>} placeholder="Email"
                       autoComplete="email" type="email"/>
            </Form.Item>

            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
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
                    Signup
                </Button>
            </Form.Item>
        </Form>
    </>
}