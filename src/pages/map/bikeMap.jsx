import React,{Component} from "react";
import {Card,Form} from "antd";
import axios from "../../axios";
import BaseForm from "../../components/BaseForm";

export default class bikeMap extends Component{

    state = {
        total_count:''
    }
    map = ''
    params = ''

    formList = [
        {
            type:'CITY',
            placeholder:'全部',
            // initialValue:0,
            width:100,
            list:[
                {id:0,name:'全部'},
                {id:1,name:'北京'},
                {id:2,name:'天津'},
                {id:3,name:'秦皇岛'},
                {id:4,name:'海口'},
            ]
        },
        {
            type:'时间查询'
        },
        {
            type:'SELECT',
            label:'订单状态',
            placeholder:'全部',
            field:'status',
            // initialValue:0,
            width:120,
            list:[
                {id:0,name:'全部'},
                {id:1,name:'进行中'},
                {id:2,name:'行程结束'},
            ]
        }
    ]

    requestList = ()=>{
        axios.ajax({
            url:'https://www.fastmock.site/mock/65c4b04b51a2f451bd297cdf1446ba59/map/bike_list',
            data:{
                params:this.params
            }
        }).then(res=>{
            if(res.code === 0){
                this.setState({
                    total_count:res.result.total_count
                })
            }
            this.renderMap(res);
        })
    }

    renderMap = (res)=>{

        // 获取路径规划的起点、终点坐标
        let gps1 = res.result.route_list[0].split(',');
        let bike_start = new window.TMap.LatLng(gps1[1], gps1[0]);
        let gps2 = res.result.route_list[res.result.route_list.length-1].split(',');
        let bike_end = new window.TMap.LatLng(gps2[1], gps2[0]);

        //地图初始化参数
        let center = new window.TMap.LatLng(gps2[1]-0.04, gps2[0]);
        this.map = new window.TMap.Map(document.getElementById('container'), {
            center: center,//设置地图中心点坐标
            zoom: 11,   //设置地图缩放级别
            pitch: 30.5,  //设置俯仰角
            rotation: 4,    //设置地图旋转角度
            baseMap: {			//底图设置（参数为：VectorBaseMap对象）
                type: 'vector',	//类型：失量底图
                features: ['base', 'building2d']  //仅渲染：道路及底面(base) + 2d建筑物(building2d)，以达到隐藏文字的效果

            }
        });

        //绘制多边形遮罩区
        let path = [];   //存储多边形的位置信息
        res.result.service_list.map((item)=>{
            path.push(new window.TMap.LatLng(item.lat, item.lon));
        });
        let polygon = new window.TMap.MultiPolygon({  //初始化 polygon
            id: 'polygon-layer', //图层id
            map: this.map, //显示多边形图层的底图
            styles: { //多边形的相关样式
                'polygon': new window.TMap.PolygonStyle({
                    'color': 'rgba(255,0,0,0.2)', //面填充色
                    'showBorder': true, // 是否显示边线
                    'borderColor': '#f00', //边线颜色
                    'borderWidth': 5, // 边线宽度
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

        //获取每个车辆marker的坐标
        let bike_marker = [];
        res.result.bike_list.map((item,index)=>{
            let lat_point = item.split(',')[1];
            let lng_point = item.split(',')[0];
            let finally_point = new window.TMap.LatLng(lat_point, lng_point);
            bike_marker.push({
                id: index,
                styleId: 'bike_marker',
                position: finally_point,
            })
        })

        // 创造MultiMarker显示起终点标记
        let marker = new window.TMap.MultiMarker({
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
                bike_marker: new window.TMap.MarkerStyle({
                    width: 25,
                    height: 35,
                    anchor: { x: 16, y: 32 },
                    src: '/assets/bike.jpg',
                })
            },
            geometries: [
                {
                    id: 'start',
                    styleId: 'start',
                    position: bike_start,
                },
                {
                    id: 'end',
                    styleId: 'end',
                    position: bike_end,
                },
                ...bike_marker
            ],
        });

        // 新建一个驾车路线规划类
        let driving = new window.TMap.service.Driving({
            mp: false, // 是否返回多方案
            policy: 'PICKUP,NAV_POINT_FIRST', // 规划策略
        });
        // 绘制路径折线
        driving.search({ from: bike_start, to: bike_end }).then((result) => {
            let polylineLayer = new window.TMap.MultiPolyline({
                id: 'polyline-layer',
                map: this.map,
                styles: {
                    style_blue: new window.TMap.PolylineStyle({
                        color: '#3777FF',
                        width: 4,
                        borderWidth: 3,
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
    }

    //点击查询
    handleFilterSubmit =(filterParams)=>{
        this.params = filterParams;
        this.requestList();
    }

    componentDidMount() {
        this.requestList();
    }

    render() {
        let {total_count} = this.state;
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit} />
                </Card>
                <Card>
                    <div>共{total_count}辆车</div>
                    <div id='container' style={{height:600}}></div>
                </Card>
            </div>
        )
    }
}