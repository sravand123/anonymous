import { Button, Grid, makeStyles } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import generator from '@babel/generator';
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

const parser = require('./tiger');

export default function Example(props) {
    const [output, setOutput] = useState([]);
    const useStyles = makeStyles(() => ({
        code: {
            backgroundColor: '#2F2625',
            outline: 'none',
            color: 'white',
            width: '100%',
            height: '40vh',
            maxHeight: '40vh',
            resize: 'none',
            border: 'none',
            padding: '0px',
            overflowY: 'auto'


        },
        console: {
            backgroundColor: '#2F2625',
            outline: 'none',
            color: 'white',
            width: '100%',
            height: '46vh',
            resize: 'none',
            border: 'none',
            padding: '0px',
            
        },
        output: {
            height:'40vh',
            maxHeight: '40vh',
            overflow: 'auto'
        }
    }))
    const [code, setCode] = useState("");

    const logs = useRef([]);
    const classes = useStyles();
    useEffect(() => {
        setCode(props.code)
        const log = console.log.bind(console)
        console.log = (...args) => {
            for (let i = 0; i < args.length; i++) {
                if (args[i].type === props.index) {
                    logs.current = [...logs.current, args[i].value];
                    setOutput(logs.current);

                }
            }
            log(...args)
        }
    }, [props])
    const handleRun = () => {
        logs.current = [];


        let logFun = `
        let log = (x) =>{
            console.log({
                type:${props.index},
                value:x
            })
        }\n
      `
        try {
            let c = (generator(parser.parse(code)))
            console.log(c.code);
            new Function(logFun + c.code)();
        }
        catch (err) {
            console.log({
                type:props.index,
                value:"Error"
            });
        }
    }
    return (
        <>
            <Grid item container xs={12} style={{ borderRadius: '10px' }} justify='space-around'>

                <Grid item xs={8} sm={6}>
                    <div style={{ height: '6vh', width: '100%', backgroundColor: '#564543', textAlign: 'right' }}>
                        <Button variant="contained" onClick={handleRun} style={{ backgroundColor: "#e69500", textTransform: 'capitalize', marginRight: '10px', fontSize: '10px', padding: '7px', marginTop: '2px' }} > Run Code</Button>
                    </div>
                    <textarea onChange={(e) => {
                        setCode(e.target.value)
                    }} rows={10} value={code} spellCheck='false' autoComplete='off' data-gramm_editor="false" autoCorrect='off' className={classes.code}>

                    </textarea>
                </Grid>
                <Grid item xs={8} sm={4} className={classes.console} >
                    <div >

                        <div style={{ height: '6vh', width: '100%', backgroundColor: '#564543', textAlign: 'left' }}>
                            <span style={{ margin: '5px', fontSize: '15px', fontFamily: 'Poppins' }}>Output</span>
                        </div>


                        <div style={{ textAlign: 'left' }} className={classes.output}>
                        <PerfectScrollbar>
                            {output.map((el, index) => {
                                return <div style={{ color: 'white' }} key={index}><span style={{ marginLeft: '10px' }}>{el}</span></div>
                            })}
                        </PerfectScrollbar>
                        </div>
                    </div>
                </Grid>

            </Grid>
        </>
    )
}