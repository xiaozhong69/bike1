import React,{Component} from 'react';
import {Card ,Button,Modal} from 'antd';
import axios from "../../axios";
import './detail.less';
export default class OrderDetail extends Component{

    state = {
        orderInfo:{},
        start:{},
        end:{}
    }

    componentDidMount(){
        let orderId = this.props.match.params.orderId;
        if(orderId){
            this.getDetailInfo(orderId);
        }
    }

    isOk= ()=>{
        if(this.state.start.lat && this.state.start.lng && this.state.end.lat && this.state.end.lng){
            this.map.destroy();
            this.renderMap();
        }
    }
    
    // 地图
    renderMap(area){
        let _this = this;
        // 中心点坐标
        var center = new window.TMap.LatLng(this.state.start.lat?this.state.start.lat:40.043776, this.state.start.lng?this.state.start.lng:116.361221);
        // 定义map变量，调用 TMap.Map() 构造函数创建地图
            this.map = new window.TMap.Map(document.getElementById('orderDetailMap'),{
                center: center,   //设置地图中心点坐标
                zoom: 9.2,      //设置地图缩放级别
                pitch: 35.5,    //设置俯仰角
                rotation: 4   //设置地图旋转角度
            });

        //点击地图获取坐标
            this.map.on("click",function(evt){
                Modal.confirm({
                    title:'定位',
                    content:'请设置起点或者终点',
                    cancelText:'终点',
                    okText:'起点',
                    onCancel:()=>{
                        let start = {
                            lat : parseFloat(evt.latLng.getLat().toFixed(6)),
                            lng : parseFloat(evt.latLng.getLng().toFixed(6))
                        }
                        _this.setState({
                            start
                        })
                    },
                    onOk:()=>{
                        let end = {
                            lat : parseFloat(evt.latLng.getLat().toFixed(6)),
                            lng : parseFloat(evt.latLng.getLng().toFixed(6))
                        }
                        _this.setState({
                            end
                        })
                    }
                });
            })

        // 路径规划 起点/终点
            var startPosition = new window.TMap.LatLng(this.state.start.lat?this.state.start.lat:40.043776, this.state.start.lng?this.state.start.lng:116.361221); // 路线规划起点
            var endPosition = new window.TMap.LatLng(this.state.end.lat?this.state.end.lat:40.008637, this.state.end.lng?this.state.end.lng:116.398806); // 路线规划终点
        
            // 创造MultiMarker显示起终点标记
            var marker = new window.TMap.MultiMarker({
                
                id: 'marker-layer',
                map: this.map,
                styles: {
                start: new window.TMap.MarkerStyle({
                    width: 25,
                    height: 35,
                    anchor: { x: 16, y: 32 },
                    src: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/start.png',
                }),
                end: new window.TMap.MarkerStyle({
                    width: 25,
                    height: 35,
                    anchor: { x: 16, y: 32 },
                    src: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/end.png',
                }),
                },
                geometries: [
                {
                    id: 'start',
                    styleId: 'start',
                    position: startPosition,
                },
                {
                    id: 'end',
                    styleId: 'end',
                    position: endPosition,
                },
                ],
            });

        // 新建一个驾车路线规划类
            let driving = new window.TMap.service.Driving({
                mp: false, // 是否返回多方案
                policy: 'PICKUP,NAV_POINT_FIRST', // 规划策略
            });

        // 绘制路径折线
            driving.search({ from: startPosition, to: endPosition }).then((result) => {
                
                let polylineLayer = new window.TMap.MultiPolyline({
                    id: 'polyline-layer',
                    map: this.map,
                    styles: {
                    style_blue: new window.TMap.PolylineStyle({
                        color: '#3777FF',
                        width: 8,
                        borderWidth: 5,
                        borderColor: '#FFF',
                        lineCap: 'round',
                    }),
                    },
                    geometries: [
                    {
                        id: 'pl_1',
                        styleId: 'style_blue',
                        paths: result.result.routes[0].polyline,
                    },
                    ],
                }); 
            });

        //绘制多边形遮罩区
            
            let path = [];   //多边形的位置信息
            area.map((item)=>{
                path.push(new window.TMap.LatLng(item.lat, item.lon));
            });

            //初始化 polygon
            var polygon = new window.TMap.MultiPolygon({
                id: 'polygon-layer', //图层id
                map: this.map, //显示多边形图层的底图
                styles: { //多边形的相关样式
                    'polygon': new window.TMap.PolygonStyle({
                        'color': 'rgba(255,0,0,0.2)', //面填充色
                        'showBorder': true, // 是否显示边线
                        'borderColor': '#f00', //边线颜色
                        'borderWidth': 4, // 边线宽度
                    })
                },
                geometries: [
                    {
                        'id': 'polygon', //多边形图形数据的标志信息
                        'styleId': 'polygon', //样式id
                        'paths': path, //多边形的位置信息
                        'properties': { //多边形的属性数据
                            'title': 'polygon'
                        }
                    }
                ]
            })
            
    }

    getDetailInfo = (orderId)=>{
        axios.ajax({
            url:'https://www.fastmock.site/mock/cd130387dae9bcda66a3b5f4a56fe7a0/order/detail',
            data:{
                params:{
                    orderId:orderId
                }
            }
        }).then((res)=>{
            if(res.code == 0){
                this.setState({
                    orderInfo:res.result
                })
            }
            this.renderMap(res.result.area);
        })
    }

    render(){
        let {orderInfo} = this.state;
        return(
            <div>
                <Card style={{marginLeft:70}}>
                    <div id="orderDetailMap" className='order-map'>
                        <div id="panel">
                            <h4>驾车路线规划</h4>
                            <div id="instruction"></div>
                        </div>
                    </div>
                    <div className="detail-items" style={{width:1150,marginLeft:110}}>
                        <div>
                            <div className="item-title">基础信息</div>
                            <ul className="detail-form">
                                <li>
                                    <div className="detail-form-left"></div>
                                    <div className="detail-form-content"><Button onClick={this.isOk}>重新规划</Button></div>
                                </li>
                                <li>
                                    <div className="detail-form-left">起点</div>
                                    <div className="detail-form-content">{this.state.end.lat?this.state.end.lat:40.043776}, {this.state.end.lng?this.state.end.lng:116.361221}</div>
                                </li>
                                <li>
                                    <div className="detail-form-left">终点</div>
                                    <div className="detail-form-content">{this.state.start.lat?this.state.start.lat:40.008637}, {this.state.start.lng?this.state.start.lng:116.398806}</div>
                                </li>
                                <li>
                                    <div className="detail-form-left">用车模式</div>
                                    <div className="detail-form-content">{orderInfo.mode == 1 ? '服务区':'停车点'}</div>
                                </li>
                                <li>
                                    <div className="detail-form-left">订单编号</div>
                                    <div className="detail-form-content">{orderInfo.order_sn}</div>
                                </li>
                                <li>
                                    <div className="detail-form-left">车辆编号</div>
                                    <div className="detail-form-content">{orderInfo.bike_sn}</div>
                                </li>
                                <li>
                                    <div className="detail-form-left">用户姓名</div>
                                    <div className="detail-form-content">{orderInfo.user_name}</div>
                                </li>
                                <li>
                                    <div className="detail-form-left">手机号码</div>
                                    <div className="detail-form-content">{orderInfo.mobile}</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="detail-items" style={{width:1150,marginLeft:110}}>
                        <div>
                            <div className="item-title">行驶轨迹</div>
                            <ul className="detail-form">
                                <li>
                                    <div className="detail-form-left">行驶起点</div>
                                    <div className="detail-form-content">{orderInfo.start_location}</div>
                                </li>
                                <li>
                                    <div className="detail-form-left">行程终点</div>
                                    <div className="detail-form-content">{orderInfo.end_location}</div>
                                </li>
                                <li>
                                    <div className="detail-form-left">行驶旅程</div>
                                    <div className="detail-form-content">{orderInfo.distance/1000}公里</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }
}