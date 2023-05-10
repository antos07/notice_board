import {Button, Card, Space, Typography} from "antd";
import {NoticeForm} from "./NoticeForm";
import {useState} from "react";

export function Notice({notice, isAuthor, onDelete, onSave}) {
    const [open, setOpen] = useState(false)

    return <>
        <Card title={notice.title} style={{
            margin: 10,
            textAlign: "left",
            width: "50%",
            minWidth: 350,
            alignSelf: "center"
        }} extra={(
            isAuthor ?
                <Space.Compact>
                    <Button onClick={() => setOpen(true)}>Edit</Button>
                    <Button type="primary" danger onClick={onDelete}>Delete</Button>
                </Space.Compact>
                :
                "by " + notice.author
        )}>
            <Typography.Paragraph>{notice.text}</Typography.Paragraph>
        </Card>
        <NoticeForm
            open={open}
            title="Add a new notice"
            onSave={(values) => {
                onSave(values)
                setOpen(false)
            }}
            onCancel={() => {
                setOpen(false)
            }}
            initialValues={notice}
        />
    </>
}