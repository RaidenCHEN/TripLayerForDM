/// app.js
import React from 'react';

import {StaticMap} from 'react-map-gl';

import DeckGL from '@deck.gl/react';

import {TripsLayer} from '@deck.gl/geo-layers';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYWx0cmlhMTU0NDIiLCJhIjoiY2wzaGRwNndnMWIxbjNqcHZnaDRuZHU0aSJ9.SZ_Y3R16kJDCmuWguc_gZg';

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude:  114.07588200000001,
  latitude: 22.531816,
  zoom: 13,
  pitch: 0,
  bearing: 0
};

// var express = require('express')
// var path = require('path')
// var Data;
// 数据，格式就是这样，TODO：跟后端对接。
// const data = [
//   {waypoints: [
//           {coordinates: [-122.3907988,37.7623413], timestamp: 1554772579000},
//           {coordinates: [-122.3908298,37.7641706], timestamp: 1554772579010},
//           {coordinates: [-122.3912299,37.7623706], timestamp: 1554772579020},
//           {coordinates: [-122.4032298,37.7666706], timestamp: 1554772579030},
//           {coordinates: [-122.4031298,37.7732706], timestamp: 1554772579040},
//           {coordinates: [-122.4045298,37.7712706], timestamp: 1554772579050},
//           {coordinates: [-122.4024298,37.7767706], timestamp: 1554772579060},
//           {coordinates: [-122.4156298,37.7788706], timestamp: 1554772579070},
//           {coordinates: [-122.4187298,37.7836706], timestamp: 1554772579080},
//           {coordinates: [-122.4198298,37.7827706], timestamp: 1554772579090},
//           {coordinates: [-122.4194298,37.7898706], timestamp: 1554772579100},
//           {coordinates: [-122.4234298,37.7864706], timestamp: 1554772579110},
//           {coordinates: [-122.4232298,37.7975706], timestamp: 1554772579120},
//           {coordinates: [-122.4262298,37.7966706], timestamp: 1554772579130},
//           {coordinates: [-122.4312298,37.7922706], timestamp: 1554772579140},
//           {coordinates: [-122.4300298,37.7943706], timestamp: 1554772579150},
//           {coordinates: [-122.4395298,37.8093706], timestamp: 1554772579160},
//           {coordinates: [-122.4334298,37.8021706], timestamp: 1554772579170},
//           {coordinates: [-122.4423298,37.8002706], timestamp: 1554772579180},
//           {coordinates: [-122.4456298,37.8010706], timestamp: 1554772579190},
//           {coordinates: [-122.4485672,37.8040182], timestamp: 1554772580200}
//         ]
//   },
//   {waypoints: [
          
//           {coordinates: [-122.4262298,37.7966706], timestamp: 1554772579000},
//           {coordinates: [-122.4312298,37.7922706], timestamp: 1554772579010},
//           {coordinates: [-122.4300298,37.7943706], timestamp: 1554772579020},
//           {coordinates: [-122.4395298,37.8093706], timestamp: 1554772579030},
//           {coordinates: [-122.4334298,37.8021706], timestamp: 1554772579040},
//           {coordinates: [-122.4423298,37.8002706], timestamp: 1554772579050},
//           {coordinates: [-122.4456298,37.8010706], timestamp: 1554772579060},
//           {coordinates: [-122.4156298,37.7788706], timestamp: 1554772579070},
//           {coordinates: [-122.4187298,37.7836706], timestamp: 1554772579080},
//           {coordinates: [-122.4198298,37.7827706], timestamp: 1554772579090},
//           {coordinates: [-122.4194298,37.7898706], timestamp: 1554772579100},
//           {coordinates: [-122.4485672,37.8040182], timestamp: 1554772579110},
//           {coordinates: [-122.3907988,37.7623413], timestamp: 1554772579120},
//           {coordinates: [-122.3908298,37.7641706], timestamp: 1554772579130},
//           {coordinates: [-122.3912299,37.7623706], timestamp: 1554772579140},
//           {coordinates: [-122.4032298,37.7666706], timestamp: 1554772579150},
//           {coordinates: [-122.4031298,37.7732706], timestamp: 1554772579160},
//           {coordinates: [-122.4045298,37.7712706], timestamp: 1554772579170},
//           {coordinates: [-122.4024298,37.7767706], timestamp: 1554772579180},
//           {coordinates: [-122.4234298,37.7864706], timestamp: 1554772579190},
//           {coordinates: [-122.4232298,37.7975706], timestamp: 1554772580200}
//         ]
//   }
// ];

const MAP_STYLE = 'mapbox://styles/altria15442/cl3u2211q000o15qe408qgwhj';

export default class trip extends React.Component {
  state = {
    animation : 0,
    animationSpeed : 30,
    time : 0,
    getData : ''
  }

  // generateRandomColor(){
  //   const {getData} = this.state
    // getData.forEach(d => {
    //   console.log(d.color)
    // });
    // const r = Math.ceil(Math.random() * 255);
    // const g = Math.ceil(Math.random() * 255);
    // const b = Math.ceil(Math.random() * 255);
    // //console.log(randomColor)
    // return [r, g, b];
  // }
  // constructor(){
  //   super()
  //   this.state={
  //     getData:''
  //   }
  // }
  animate = () =>{
    const {animationSpeed, time} = this.state;
    //这里取余的300取决于数据量，公式为n = 数据量 * （平均）时间戳间隔，要保证比总时间大但不能大太多。
    this.setState({time : (time + animationSpeed) % 860000})
    this.setState({animation : window.requestAnimationFrame(this.animate)})
    // window.cancelAnimationFrame(animation);
    
  };

  componentDidMount(){
    this.setState({animation : window.requestAnimationFrame(this.animate)})
    this.handleclick()
    // this.generateRandomColor()
  }

  componentWillUpdate(){
    const {animation} = this.state;
    window.cancelAnimationFrame(animation);
  }

  componentWillUnmount(){
    const {animation} = this.state;
    window.cancelAnimationFrame(animation);
  }

  async handleclick(){
    const resp = await fetch('/test100.json');
    console.log(resp)
    const data = await resp.json()
    this.setState({getData: data})  ////赋值到本地数据
    // console.log(data[0]["waypoints"])
  }

  render(){
    const {time, getData} = this.state;
    const layers = [
      // new LineLayer({id: 'line-layer', data})
      new TripsLayer({
                    id: 'trip-layer',
                    data: getData,
                    getPath: d => d.waypoints,
                    getTimestamps: d => d.timestamps,
                    getColor: d => d.color,
                    opacity: 0.8,
                    widthMinPixels: 2,
                    fadeTrail: true,
                    trailLength: 10000,
                    currentTime: time
                  })
    ];
      return (
      <div className='App'>
        {/* <button onClick={this.handleclick.bind(this)}>点我发送请求</button> */}
      <div>
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
      >
        <StaticMap
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
          mapStyle={MAP_STYLE}
          // reuseMaps mapStyle={MAP_STYLE} preventStyleDiffing={true}
          />
      </DeckGL>
      </div>
      </div>
    );
  }
}