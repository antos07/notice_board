import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getById} from "../api/notices";
import {Notice as NoiceComponent} from "../components/Notice";
import {Divider, List} from "antd";

export function Notice() {
    const {id} = useParams()
    const [notice, setNotice] = useState({})

    useEffect(() => {
        async function getNotice() {
            const notice = await getById(id)
            setNotice(notice)
        }

        getNotice()
        // eslint-disable-next-line
    }, [])

    for (let i = 0; i < 100000; i++) {

    }

    return <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    }}>
        <NoiceComponent notice={notice}/>
        <div style={{width: "50%", minWidth: 350}}>
            <Divider orientation="left">Comments</Divider>
        </div>
        <List
            borderedList
            style={{
                width: "50%",
                minWidth: 350
            }}
        >
        </List>
    </div>
}