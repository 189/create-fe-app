
import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import configurestore from './pub/store/configureStore';
import "./assets/styles/index.scss";
import UserBox from './components/UserBox';
import { UserInfoContext } from './context';
import Home from './pages/Home';
import About from './pages/About';
import Topics from './pages/Topics';


const store = configurestore();

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userInfo : {
                name : '数据请求中...'
            }
        };
    }

    componentDidMount(){
        setTimeout(() => {
            this.setState( (prev, state) => (
                {
                    userInfo : {
                        name : '奥巴马'
                    }
                }
            ));
        }, 3000);
    }

    render(){
        return (
            <div>
                <UserInfoContext.Provider value={this.state.userInfo}>
                    <UserBox></UserBox>
                </UserInfoContext.Provider>
                <Router>
                    <div>
                        <ul>
                            <li> <Link to="/">Home1</Link> </li>
                            <li> <Link to="/about">About</Link> </li>
                            <li> <Link to="/topics">Topics</Link> </li>
                        </ul>
                        <Route exact path="/" component={Home} />
                        <Route path="/about" component={About} />
                        <Route path="/topics" component={Topics} />
                    </div>
                </Router>
            </div>
        );
    }
};

console.log(store);
const node = document.querySelector('#wrap');
ReactDOM.render(<App />, node);

console.log('Wake up!');


