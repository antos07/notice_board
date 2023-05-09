import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getById} from "../api/notices";
import {listAll} from "../api/comments";
import {Notice as NoiceComponent} from "../components/Notice";
import {Divider, List} from "antd";

export function Notice() {
    const {id} = useParams()
    const [notice, setNotice] = useState({})
    const [comments, setComments] = useState([])

    useEffect(() => {
        async function getNotice() {
            const notice = await getById(id)
            setNotice(notice)

            const comments = await listAll(id)
            setComments(comments)
        }

        getNotice()
        // eslint-disable-next-line
    }, [])

    return <>
        <NoiceComponent notice={notice}/>
        <div style={{width: "50%", minWidth: 350}}>
            <Divider orientation="left">Comments</Divider>
        </div>
        <List
            bordered
            style={{
                width: "50%",
                minWidth: 350,
                textAlign: "left"
            }}
            dataSource={comments}
            renderItem={(comment) => {
                return <List.Item key={comment.id}>
                    <List.Item.Meta
                        title={<b>{comment.author}</b>}
                        description={(new Date(comment.created_at)).toUTCString()}
                    />
                    {comment.text}
                </List.Item>
            }}
        />
    </>
}