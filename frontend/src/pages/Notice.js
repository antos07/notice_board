import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {edit, getById, remove} from "../api/notices";
import {listAll, create, remove as removeComment} from "../api/comments";
import {Notice as NoiceComponent} from "../components/Notice";
import {Button, Divider, List, notification, Space, Typography} from "antd";
import {getMe} from "../api/users";
import {isAxiosError} from "axios";
import {CommentForm} from "../components/CommentForm";
import {isLoggedIn} from "axios-jwt";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

export function Notice() {
    const {id} = useParams()
    const [notice, setNotice] = useState({})
    const [comments, setComments] = useState([])
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const [notificationInstance, contextHolder] = notification.useNotification()
    const [commentFormOpen, setCommentFromOpen] = useState(false)

    useEffect(() => {
        async function getNotice() {
            const notice = await getById(id)
            setNotice(notice)

            const comments = await listAll(id)
            setComments(comments)

            try {
                const user = await getMe()
                setUser(user)
            } catch (e) {
                if (!isAxiosError(e) && e.response.status !== 401) {
                    throw e;
                }
            }
        }

        getNotice()
        // eslint-disable-next-line
    }, [])

    async function createComment({text}) {
        try {
            const comment = await create(notice.id, text)
            const newComments = comments
            newComments.push(comment)
            setComments(newComments)
        } catch (e) {
            if (!isAxiosError(e)) {
                throw e
            }
            notificationInstance.error({message: e.response.data.detail || "Error", placement: "top"})
        }
    }

    return <>
        {contextHolder}
        <NoiceComponent
            notice={notice}
            isAuthor={user.username === notice.author}
            onSave={async (values) => {
                try {
                    const newNotice = await edit(notice.id, values.title, values.text)
                    setNotice(newNotice)
                } catch (e) {
                    let message = "Error"
                    if (isAxiosError(e)) {
                        message = e.response.data.detail || message
                    }
                    notificationInstance.error({message, placement: "top"})
                }
            }}
            onDelete={async () => {
                try {
                    await remove(notice.id)
                } catch (e) {
                    let message = "Error"
                    if (isAxiosError(e)) {
                        message = e.response.data.detail || message
                    }
                    notificationInstance.error({message, placement: "top"})
                    return
                }
                navigate('/')
            }}
        />
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
                return <List.Item
                    key={comment.id}
                    actions={(comment.author === user.username) && [
                        <Button type="link"><EditOutlined/></Button>,
                        <Button
                            type="link"
                            onClick={async () => {
                                await removeComment(notice.id, comment.id)
                                const newComments = comments.filter(
                                    filteredComment => filteredComment.id !== comment.id
                                )
                                setComments(newComments)
                            }}
                        >
                            <DeleteOutlined/>
                        </Button>
                    ]}
                >
                    <List.Item.Meta
                        title={<b>{comment.author}</b>}
                        description={(new Date(comment.created_at)).toUTCString()}
                    />
                    <Typography.Text>{comment.text}</Typography.Text>
                </List.Item>
            }}
            footer={(isLoggedIn() && <Button
                type="primary"
                onClick={() => setCommentFromOpen(true)}
            >Add</Button>)}
        />
        <CommentForm
            title={"Add comment"}
            open={commentFormOpen}
            onSave={async (values) => {
                await createComment(values)
                setCommentFromOpen(false)
            }}
            onCancel={() => setCommentFromOpen(false)}
        />
    </>
}