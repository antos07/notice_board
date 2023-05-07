import {Layout, Menu} from "antd";
import {Link} from "react-router-dom";

export function Header() {
    return (<Layout.Header>
        <Menu mode="horizontal" theme={"dark"}>
            <Menu.Item key="list-notices"><Link to={'notices'}>Notices</Link></Menu.Item>
            <Menu.Item key="open-profile" style={{marginLeft: 'auto'}}><Link to={"#"}>Profile</Link></Menu.Item>
        </Menu>
    </Layout.Header>)
}