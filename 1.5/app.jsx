import './app.css';
import React, { useState, useEffect, useCallback } from 'react';
import { Stage, Layer, Rect, Text, Line, Image } from 'react-konva';
import turtleImage from './tt.png';
import {readFileSync} from 'fs'
import Jison from 'jison';
import jsBeautify from 'js-beautify';
import { examples } from './examples';

const jisonSource = readFileSync(__dirname + '/parser.jison', 'utf-8')
const parser = new Jison.Parser(jisonSource);

export function LogoTurtle({ x = 0, y = 0, rotate = 0 }) {
  const [turtleImageObject, setTurtleImageObject] = useState(null);

  useEffect(() => {
    const imageObject = new window.Image();
    imageObject.src = turtleImage;
    imageObject.onload = () => {
      setTurtleImageObject(imageObject);
    }
  }, []);

  return (turtleImageObject &&
    <Image
      x={x}
      y={y}
      rotation={rotate}
      image={turtleImageObject}
      width={31}
      height={31}
      offset={{
        x: 15,
        y: 15,
      }}
    />)
}

export function LogoLine({ points }) {
  return <Line
    stroke={'green'}
    points={points}
  />
}

export function LogoStage(props) {
const { width, height, turtle, lines } = props;
  return (<Stage width={width} height={height}>
    <Layer>
      <LogoTurtle {...turtle} />
      {lines.map((points, i) => 
      <LogoLine key={i} points={points} />)}
    </Layer>
  </Stage>)
}

export function App() {

  const [stageState, setStageState] = useState({
    width: 800,
    height: 600,
    turtle: { x: 800 / 2, y: 600 / 2, rotate: 0 },
    lines: [],
    isDraw: false,
  });

  const [code, setCode] = useState('');
  const [output, setOutput] = useState();

  const run = useCallback(() => {
    try {
      const toR = a => a * 0.017453293;
      const jsCode = jsBeautify.js_beautify(parser.parse(code));
      const drawFunc = new Function('logo', jsCode);

      const logo = {
        state: JSON.parse(JSON.stringify(stageState)),
        drawStart() {
          this.state.isDraw = true;
          this.state.lines.push([
            this.state.turtle.x,
            this.state.turtle.y,
          ]);
        },

        drawEnd() {
          this.state.isDraw = false;
        },

        clockwise(n) {
          this.state.turtle.rotate -= n
        },

        anticlockwise(n) {
          this.state.turtle.rotate += n
        },

        goAhead(n) {
          const { x: x0, y: y0, rotate } = this.state.turtle;
          const x1 = x0 - n * Math.sin(toR(rotate))
          const y1 = y0 - n * Math.cos(toR(rotate))
          this.state.turtle.x = x1;
          this.state.turtle.y = y1;
          if (this.state.isDraw) {
            const points = this.state.lines[this.state.lines.length - 1];
            points.push(x1, y1);
          }
        },

        goOrigin() {
          this.state.turtle = {
            x: this.state.width / 2,
            y: this.state.height / 2,
            rotate: 0,
          }
        }
      };

      debugger;
      drawFunc(logo);
      setStageState(logo.state);
      setOutput(jsCode);
    } catch (err) {
      setOutput(err.toString());
    }
  }, [code, stageState]);

  const reset = useCallback(() => {
    setStageState(stageState);
  }, []);

  return (<div>
    <h2>画布</h2>
    <div className="title">
      <img src={turtleImage}/>
      <h1>会画画的小乌龟</h1>
    </div>

    <div className="content">
      <div className="stage-container">
        <LogoStage {...stageState} />
      </div>
    </div>

    <div className="operation-panel">
      <h2>代码</h2>
      <div>
        <button onClick={run}>执行</button>
        <button onClick={reset}>重置</button>
      </div>
      <div className="code">
        <textarea value={code} onChange={e => setCode(e.target.value)} />
        <textarea disabled value={output}/>
      </div>

      <div>
        <h2>一些例子</h2>
        {examples.map(c => <div><pre>{c}</pre></div>)}
      </div>
    </div>
  </div>)
}