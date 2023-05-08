import {Layout, Menu} from "antd";
import {Link} from "react-router-dom";
import {isLoggedIn} from "axios-jwt";

export function Header() {
    return (<Layout.Header>
        <Menu mode="horizontal" theme={"dark"} selectable={false}>
            <Menu.Item key="list-notices"><Link to={'notices'}>Notices</Link></Menu.Item>
            {
                !isLoggedIn() ? (
                    <>
                        <Menu.Item key="login" style={{marginLeft: 'auto'}}><Link to={"login"}>Login</Link></Menu.Item>
                        <Menu.Item key="signup"><Link to={"#"}>Sign up</Link></Menu.Item>
                    </>
                ) : (
                    <Menu.Item key="profile" style={{marginLeft: 'auto'}}><Link to={"#"}>Profile</Link></Menu.Item>
                )
            }
        </Menu>
    </Layout.Header>)
}