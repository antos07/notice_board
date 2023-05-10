import {List} from "antd";
import {Link} from "react-router-dom";

export function NoticeList({notices, style, footer}) {
    return <List
        itemLayout="vertical"
        bordered
        size="large"
        dataSource={notices}
        renderItem={(notice) => {
            return <List.Item key={notice.id}>
                <List.Item.Meta
                    title={<Link to={`${notice.id}`}>{notice.title}</Link>}
                    description={"by " + notice.author}
                />
                {notice.text}
            </List.Item>
        }}
        style={{
            textAlign: "left",
            ...style
        }}
        footer={footer}
    />
}