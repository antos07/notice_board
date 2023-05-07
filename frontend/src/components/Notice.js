import {Card, Typography} from "antd";

export function Notice({notice}) {
    return <Card title={notice.title} style={{
        margin: 10,
        textAlign: "left",
        width: "50%",
        minWidth: 300,
        alignSelf: "center"
    }} extra={"by " + notice.author}>
        <Typography.Paragraph>{notice.text}</Typography.Paragraph>
    </Card>
}