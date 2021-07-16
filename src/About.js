import { Button, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import Example from "./Example";

export default function About() {
    const useStyles = makeStyles(() => ({
        code: {
            backgroundColor: '#2F2625',
            outline:'none',
            color: 'white',
            width:'100%',
            maxHeight:'50vh',
            resize:'none',
            border:'none',
            padding:'0px'
           

        }
    }))
    const classes = useStyles();
    return (
        <React.Fragment>
            <Grid container justify="center">
                <Grid item xs={7}>
                    <h3>What is Anonymous?</h3>
                    <p style={{ fontFamily: 'Poppins' }}>
                        Anonymous is a fully functional, programming language which transpiles to javascript .
                        This language is inspired from a programming language called Tiger.
                    </p>
                </Grid>
                <Grid item xs={7}>
                    <h3>What is the purpose of this language?</h3>
                    <p style={{ fontFamily: 'Poppins' }}>
                        Anonymous is created for fun .It doesn't have  any use cases right now.
                     </p>
                </Grid>
                <Grid item xs={7}>
                    <h3>Examples</h3>
                </Grid>
               <Grid item xs={11} sm={7} style={{textAlign:'left'}}>
                <h4>1. Hello World!!</h4>
                <p> Lets start with hello world program . To print something you can use log method  </p>
               <Example code={
`
 log("Hello World!!")
`
               } index={1} ></Example>

               </Grid>
               <Grid item xs={11} sm={7} style={{textAlign:'left'}}>
               <h4>2. Variable Declaration</h4>
               <Example code={
`
    var x:=42
    
    var y:="Hello World"
`
               } index={2}></Example>
              
               </Grid>
               <Grid item xs={11} sm={7} style={{textAlign:'left'}}>
               <h4>3. Let statement</h4>
               <Example code={
`
  let
    var x:=0
  
  in
    
    x:= read("Enter a Value");
    log(x)
  
  end    
`
               } index={5} ></Example>
            </Grid>

               <Grid item xs={11} sm={7} style={{textAlign:'left'}}>
               <h4>4. For Loop</h4>
               <Example code={
`
    for id:=0 to 10 do 
        log(id)
`
               } index={3}></Example>
              
               </Grid>
               <Grid item xs={11} sm={7} style={{textAlign:'left'}}>
               <h4>5. While Loop</h4>
               <Example code={
`
    let
        var x:=0
    in
        while x<10 do
        (
            log(x);
            x:=x+1
        )
    end
`
               } index={4} ></Example>
               </Grid>
               <Grid item xs={11} sm={7} style={{textAlign:'left'}}>
               <h4>6. Functions</h4>
               <Example code={
`
    let
        function f(x) = x+1
    in
       log(f(10))
    end
`
               } index={6} ></Example>
               <Example code={
`
    let
        function fact(x) = if x<=1 then 1 
                           else x* fact(x-1)
    in
       log(fact(10))
    end
`
               } index={7} ></Example>
               </Grid>
          


            </Grid>
          

        </React.Fragment>
    )
}