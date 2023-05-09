import './App.css';
import {Header} from './components/Header'
import {Layout} from "antd";
import {Outlet} from "react-router-dom";

function App() {
    return (<div className="App">
        <Layout>
            <Header/>
            <Layout.Content style={{
                padding: 20,
                minHeight: 250,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
            }}>
                <Outlet/>
            </Layout.Content>
        </Layout>
    </div>);
}

export default App;
