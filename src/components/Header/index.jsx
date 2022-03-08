import React, { Component } from "react";
import { Row, Col } from "antd";
import axios from "axios";
import Util from "../../utils/utils";
import "./index.less";
export default class Header extends Component {
	state = {
		userName: "钟贞长",
		sysTime: "",
		weather: "",
	};
	componentDidMount() {
		let { setTime, getWeatherAPIData } = this;

		setTime();
		setInterval(() => {
			setTime();
		}, 1000);

		getWeatherAPIData();
		setInterval(() => {
			getWeatherAPIData();
		}, 3600000);
	}
	setTime = () => {
		let sysTime = Util.formateDate(new Date().getTime());
		this.setState({
			sysTime,
		});
	};
	getWeatherAPIData = () => {
		axios
			.get(
				"https://devapi.qweather.com/v7/weather/now?key=acb6e33ca23647c6bf6b1d36323754b3&location=101091101"
			)
			.then((res) => {
				let result = res.data.now.text;
				this.setState({
					weather: result,
				});
			});
	};
	render() {
		const { menuType } = this.props;
		return (
			<div className="header" style={{width:'100%'}}>
				<Row className="header-top">
					{menuType ? (
						<Col span='6' className="logo">
							<img src="/assets/logo-ant.svg" alt="" />
							<span>IMooc通用管理系统</span>
						</Col>
					) : (
						""
					)}
					<Col span={menuType ? 18 : 24}>
						<span>欢迎，{this.state.userName}</span>
						<a href="#">退出</a>
					</Col>
				</Row>
				{menuType ? (
					""
				) : (
					<Row className="breadcrumb">
						<Col span={4} className="breadcrumb-title">
							{this.props.menuName}
						</Col>
						<Col span={20} className="breadcrumb-right">
							<span className="time">{this.state.sysTime}</span>
							<span className="weather">
								{this.state.city} {this.state.weather}
							</span>
						</Col>
					</Row>
				)}
			</div>
		);
	}
}
