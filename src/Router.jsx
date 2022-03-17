import React, {Component} from 'react';
import {HashRouter as Routers, Route, Switch, Redirect} from 'react-router-dom';
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
import Order from './pages/order/index';
import Common from './common';
import OrderDetail from './pages/order/detail';
import User from "./pages/user";
import BikeMap from "./pages/map/bikeMap";
import Bar from "./pages/echarts/bar";
import Pie from "./pages/echarts/pie";
import Line from "./pages/echarts/line";
import richText from "./pages/rich";
import permission from "./pages/permission";
import NoMatch from './pages/nomatch';

export default class Router extends Component {
    render() {
        return (
            <Routers>
                <App>
                    <Switch>
                        <Route path="/common" render={() =>
                            <Common>
                                <Route path="/common/order/detail/:orderId" component={OrderDetail}/>
                            </Common>
                        }/>
                        <Route path="/" render={() =>
                            <Admin>
                                <Switch>
                                    <Route path="/home" component={Home}/>
                                    <Route path="/ui/buttons" component={Buttons}/>
                                    <Route path="/ui/modals" component={Modals}/>
                                    <Route path="/ui/loadings" component={Loadings}/>
                                    <Route path="/ui/notification" component={Notice}/>
                                    <Route path="/ui/messages" component={Message}/>
                                    <Route path="/ui/tabs" component={Tab}/>
                                    <Route path="/ui/gallery" component={Gallery}/>
                                    <Route path="/ui/carousel" component={Carousels}/>
                                    <Route path="/form/login" component={FormLogin}/>
                                    <Route path="/form/reg" component={FormRegister}/>
                                    <Route path="/table/basic" component={BasicTable}/>
                                    <Route path="/table/high" component={HighTable}/>
                                    <Route path="/city" component={City}/>
                                    <Route path="/order" component={Order}/>
                                    <Route path="/user" component={User}/>
                                    <Route path="/map" component={BikeMap}/>
                                    <Route path="/charts/bar" component={Bar}/>
                                    <Route path="/charts/pie" component={Pie}/>
                                    <Route path="/charts/line" component={Line}/>
                                    <Route path="/rich" component={richText}/>
                                    <Route path="/permission" component={permission}/>
                                    <Redirect to={'/home'}/>
                                    <Route component={NoMatch}/>
                                </Switch>
                            </Admin>
                        }/>
                    </Switch>
                </App>
            </Routers>
        );
    }
}
