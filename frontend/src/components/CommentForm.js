import {Form, Input, Modal} from "antd";

export function CommentForm({title, open, onSave, onCancel, initialValues}) {
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
                name="comment_form"
                initialValues={initialValues}
            >
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