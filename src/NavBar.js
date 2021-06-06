import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router";

export default function NavBar(){
    const useStyles = makeStyles(() => ({
       brand:{
            textDecoration:'none',
            fontWeight:'bold',
            fontSize:'20px',
            fontFamily:'Dancing Script',
            marginLeft:'20px',
            color:'white'
            
       },
       link:{
        textDecoration:'none',
        fontWeight:'lighter',
        fontSize:'15px',
        fontFamily:'Poppins',
        marginLeft:'10px',
        marginRight:'10px',
        color:'white',
        cursor:'pointer'
       
       }
    }))
  
    const classes = useStyles();
    const history = useHistory();

    return (
       <div style={{display:'flex',flexDirection:'row',height:'8vh', alignItems:'center',backgroundColor:'#392e2d'}} >
        <div>
           <a className={classes.brand} >Anonymous</a>
        </div>
        <div style={{marginLeft:'auto', display:'flex',justifyContent:'space-around'}}>
           <a className={classes.link} onClick={()=>{history.push('/about')}} >About</a>
           <a className={classes.link} onClick={()=>{history.push('/demo')}} >Demo</a>
           <a className={classes.link} href="https://github.com/sravand123/anonymous"  >Github</a>
        </div>
       </div>
    )
}