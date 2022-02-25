import React, { Component } from 'react';
import { Card, Carousel } from 'antd';

export default class carousel extends Component {

  contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

  imgStyle = {
    height:'240px',
    width:'100%'
  }

  render() {
    return (
      <div>
        <Card title="文字背景轮播" className='card-wrap'>
          <Carousel autoplay>
            <div>
              <h3 style={this.contentStyle}>1</h3>
            </div>
            <div>
              <h3 style={this.contentStyle}>2</h3>
            </div>
            <div>
              <h3 style={this.contentStyle}>3</h3>
            </div>
            <div>
              <h3 style={this.contentStyle}>4</h3>
            </div>
          </Carousel>
        </Card>
        <Card title="图片轮播" className='card-wrap'>
          <Carousel autoplay>
            <div>
              <img style={this.imgStyle} src="/carousel-img/carousel-1.jpg" alt="" />
            </div>
            <div>
              <img style={this.imgStyle} src="/carousel-img/carousel-2.jpg" alt="" />
            </div>
            <div>
              <img style={this.imgStyle} src="/carousel-img/carousel-3.jpg" alt="" />
            </div>
          </Carousel>
        </Card>
      </div>
    )
  }
}
