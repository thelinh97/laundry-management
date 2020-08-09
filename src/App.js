import React from "react";
import "./App.css";
import { Layout } from "antd";
import Nav from "./components/Nav";
import AddOrder from "./components/AddOrder";
import SeeOrder from "./components/SeeOrder";
import Contact from "./components/Contact";
import Footerr from "./components/Footerr";
import { Switch, Route } from "react-router-dom";

const { Header, Footer, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header>
        <Nav />
      </Header>
      <Content>
        <Switch>
          <Route exact path="/" component={AddOrder} />
          <Route path="/seeOrder" component={SeeOrder} />
          <Route path="/contact" component={Contact} />
        </Switch>
      </Content>
      <Footer>
        <Footerr />
      </Footer>
    </Layout>
  );
}

export default App;
