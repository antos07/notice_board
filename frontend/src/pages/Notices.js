import {Notice} from "../components/Notice";

export function Notices() {
    return <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
        <Notice notice={{author: "test1", title: "title1", text: "some text1"}}/>
        <Notice notice={{author: "test2", title: "title2", text: "some text2"}}/>
        <Notice notice={{author: "test3", title: "title3", text: "some text3"}}/>
    </div>
}