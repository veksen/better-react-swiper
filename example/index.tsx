import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Swiper from '../.';

function Card(props) {
  return (
    <div
      style={{
        margin: '0 10px 20px',
        width: '100%',
        boxShadow: '0 0 6px rgba(0, 0, 0, 0.15)',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        color: '#105783',
      }}
    >
      <img
        src={`https://picsum.photos/300/200?image=${props.id}`}
        alt={props.content}
        style={{ pointerEvents: 'none', userSelect: 'none', width: '100%' }}
      />
      <div style={{ alignSelf: 'flex-start', padding: '7px' }}>
        {props.content}
      </div>
    </div>
  );
}

const App = () => {
  return (
    <div style={{ margin: '0 5px' }}>
      <Swiper
        items={[
          <Card id={1084} content="Lorem ipsum" />,
          <Card id={1081} content="Lorem ipsum" />,
          <Card id={1070} content="Lorem ipsum" />,
          <Card id={1050} content="Lorem ipsum" />,
          <Card id={1041} content="Lorem ipsum" />,
          <Card id={1039} content="Lorem ipsum" />,
        ]}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
