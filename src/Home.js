import { Button, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Editor from './Editor';
import generator from '@babel/generator';
import ConsoleLogHTML from 'console-log-html';
import { grey } from '@material-ui/core/colors';
import {tiger} from './tiger';
//const parser = require('./tiger');
export default class Home extends React.Component {
    state = {
        code: "",
        output: []
    }
    lRef = React.createRef();
    setCode = (code) => {
        this.setState({ code: code })
    }
    logs = []
    handleRun = () => {
        this.logs=[];
        let logFun = `
        let log = (x) =>{
            console.log({
                type:'output',
                value:x
            })
        }\n
        let read = (x) =>{
            let value=  window.prompt(x,'')
            return value;
       }\n
      `
        try {
            let c = (generator(tiger.parse(this.state.code)))
            try{

                new Function(logFun + c.code)();
            }
            catch(err){
                console.log({type:'output',value:"Error"});
            }
        }
        catch (err) {
            console.log({type:'output',value:"Syntax Error"});
        }
    }
   
    componentDidMount() {
        const log = console.log.bind(console)
        console.log = (...args) => {
            for (let i = 0; i < args.length; i++) {
                if (args[i] && args[i].type === 'output') {
                    this.logs = [...this.logs, args[i].value];
                    this.setState({ output: this.logs });
                 }
            }
            log(...args)
        }
    }


    render() {
        return (
            <React.Fragment>
              
                <Grid container justify="center" alignItems="center">
                    <Grid item container xs={9}>





                        <Editor runCode= {this.handleRun} setCode={this.setCode}></Editor>

                    </Grid>
                    <Grid item xs={3}>

                        <div style={{ backgroundColor: grey[100], height: '77vh', width: '100%', maxHeight: '80vh', overflowY: 'auto', textAlign: 'left' }} ref={this.lRef}>
                            {this.state.output.map((el, index) => {
                                return <div style={{ color: 'grey' }}><span style={{ marginLeft: '10px' }}>{el}</span></div>
                            })}
                        </div>
                    </Grid>

                </Grid>
            </React.Fragment>
        )
    }
}