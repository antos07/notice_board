import {Button, Card, Space, Typography} from "antd";

export function Notice({notice, isAuthor, onDelete, onEdit}) {
    return <Card title={notice.title} style={{
        margin: 10,
        textAlign: "left",
        width: "50%",
        minWidth: 350,
        alignSelf: "center"
    }} extra={(
        isAuthor ?
            <Space.Compact>
                <Button onClick={onEdit}>Edit</Button>
                <Button type="primary" danger onClick={onDelete}>Delete</Button>
            </Space.Compact>
            :
            "by " + notice.author
    )}>
        <Typography.Paragraph>{notice.text}</Typography.Paragraph>
    </Card>
}