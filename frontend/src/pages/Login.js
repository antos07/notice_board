import {Button, Form, Input} from "antd";
import {login} from "../api/auth";

export function Login() {
    const doLogin = async ({username, password}) => {
        const res = await login(username, password)
        console.log(res)
    }

    return <Form
        name="basic"
        labelCol={{span: 8}}
        wrapperCol={{span: 16}}
        style={{maxWidth: 600}}
        initialValues={{remember: true}}
        onFinish={doLogin}
    >
        <Form.Item
            label="Username"
            name="username"
            rules={[{required: true, message: 'Please input your username!', max: 150}]}
        >
            <Input autoComplete={'username'}/>
        </Form.Item>

        <Form.Item
            label="Password"
            name="password"
            rules={[{required: true, message: 'Please input your password!'}]}
        >
            <Input.Password  autoComplete={'current-password'}/>
        </Form.Item>

        <Form.Item wrapperCol={{offset: 8, span: 16}}>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>
    </Form>
}