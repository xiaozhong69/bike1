import React, { Component } from 'react';
import { HashRouter as Routers, Route, Switch } from 'react-router-dom';
import Admin from './Admin';
import App from './App';
import Buttons from "./pages/ui/buttons";
import Modals from "./pages/ui/modals";
import Loadings from './pages/ui/loadings';
import Notice from './pages/ui/notice';
import Message from './pages/ui/message';
import Tab from "./pages/ui/tabs";
import Gallery from './pages/ui/gallery';
import Carousels from './pages/ui/carousel';
import Home from './pages/home';
import FormLogin from './pages/form/login';
import FormRegister from './pages/form/register';
import BasicTable from './pages/table/basicTable';
import HighTable from './pages/table/highTable';
import City from './pages/city/index';
import NoMatch from './pages/nomatch';
export default class Router extends Component {
    render() {
        return (
            <Routers>
                <App>
                    <Route path="/admin" render={() =>
                        <Admin>
                            <Switch>
                                <Route path="/admin/home" component={Home} />
                                <Route path="/admin/ui/buttons" component={Buttons} />
                                <Route path="/admin/ui/modals" component={Modals} />
                                <Route path="/admin/ui/loadings" component={Loadings} />
                                <Route path="/admin/ui/notification" component={Notice} />
                                <Route path="/admin/ui/messages" component={Message} />
                                <Route path="/admin/ui/tabs" component={Tab} />
                                <Route path="/admin/ui/gallery" component={Gallery} />
                                <Route path="/admin/ui/carousel" component={Carousels} />
                                <Route path="/admin/form/login" component={FormLogin} />
                                <Route path="/admin/form/reg" component={FormRegister} />
                                <Route path="/admin/table/basic" component={BasicTable} />
                                <Route path="/admin/table/high" component={HighTable} />
                                <Route path="/admin/city" component={City} />
                                <Route component={NoMatch} />
                            </Switch>
                        </Admin>
                    } />
                </App>
            </Routers>
        );
    }
}
