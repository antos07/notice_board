import {Button, Form, notification} from "antd";
import {create, listAll} from "../api/notices";
import {useEffect, useState} from "react";
import {NoticeList} from "../components/NoticeList";
import {isLoggedIn} from "axios-jwt";
import {NoticeCreationForm} from "../components/NoticeCreationForm";
import {isAxiosError} from "axios";

export function Notices() {
    const [notices, setNotices] = useState([])
    const [open, setOpen] = useState(false)
    const [form] = Form.useForm()
    const [notificationInstance, contextHolder] = notification.useNotification()

    useEffect(() => {
        async function getNotices() {
            const notices = await listAll()
            setNotices(notices)
        }

        getNotices()
    }, [])

    const onCreate = async (values) => {
        try {
            const newNotice = await create(values.title, values.text)
            setOpen(false);
            const newNotices = notices
            newNotices.push(newNotice)
            setNotices(newNotices)
        } catch (e) {
            if (!isAxiosError(e)) {
                throw e
            }
            notificationInstance.error({message: e.response.data.detail || "Error", placement: "top"})
        }

        console.log(notices)
    };

    return <>
        {contextHolder}
        <NoticeList
            notices={notices}
            style={{
                width: "50%",
                minWidth: 350
            }}
            footer={isLoggedIn() && <>
                <Button
                    type="primary"
                    onClick={() => {
                        setOpen(true)
                    }}
                >Add</Button>
                <NoticeCreationForm
                    open={open}
                    form={form}
                    onCreate={onCreate}
                    onCancel={() => {
                        setOpen(false)
                        form.resetFields()
                    }}
                />
            </>
            }
        />
    </>
}
