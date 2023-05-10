import {Form, Input, Modal} from "antd";

export function NoticeCreationForm({form, open, onCreate, onCancel}) {
    return (
        <Modal
            open={open}
            title="Add a new notice"
            okText="Add"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="add_notice_form"
            >
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the title of the notice!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="text"
                    label="Text"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the text of the notice!',
                        },
                    ]}
                >
                    <Input type="textarea"/>
                </Form.Item>
            </Form>
        </Modal>
    );
}