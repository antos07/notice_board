import {Form, Input, Modal} from "antd";

export function NoticeForm({title, open, onSave, onCancel, initialValues}) {
    const [form] = Form.useForm()
    return (
        <Modal
            open={open}
            title={title}
            okText="Save"
            cancelText="Cancel"
            onCancel={() => {
                onCancel()
                form.resetFields()
            }}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onSave(values);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="add_notice_form"
                initialValues={initialValues}
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