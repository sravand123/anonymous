import { Button, Grid } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import React, { useEffect, useRef, useState } from 'react';
export default function Editor(props) {
    const [lineNo, setLineNo] = useState(1);
    const divref = useRef(null);
    const handleChange = (e) => {
        let code = "";
        let children = divref.current.children;
        for (let i = 0; i < children.length; i++) {
            code += (children[i].textContent);
            code += ("\n");
        }

        props.setCode(code);
    }
    const numberRef = useRef(null);
    const pos = 1;
    useEffect(() => {

        document.execCommand("defaultParagraphSeparator", false, "div");

        divref.current.innerHTML = '<div><span>&nbsp;</span></div>';
        numberRef.current.innerHTML = `<div style="color:white;textAlign:center;fontSize:0.9em;">1</div>`
    }, [])
    const handleKeyUp = (e) => {

      
        if (e.keyCode === 8) {
            if (divref.current.textContent.length === 0) {
                var sel = window.getSelection();
                var range = sel.getRangeAt(0);
                var currentCaretPosition = getCaretPosition(divref.current);
                divref.current.innerHTML = '<div><span>&nbsp;</span></div>';
                numberRef.current.innerHTML = `<div style="color:white;textAlign:center;fontSize:0.9em">1</div>`
                var data = getCaretData(divref.current, currentCaretPosition);
                setCaretPosition(data);
            }
        }


    }

    const getParentDiv = (node) => {
        if (node.localName === 'div') return node;
        while (node.parentElement.localName !== 'div') {
            node = node.parentElement
        }
        return node.parentElement;
    }
    const getLineNo = (node) => {
        let children = divref.current.children;
        let parentNode = getParentDiv(node);
        for (let i = 0; i < children.length; i++) {
            if (children[i] == parentNode) {
                return i + 1;
            }
        }
        return 0;
    }
    const handleKeyDown = (e) => {

        if (e.keyCode == 13) {

            let len = divref.current.children.length + 1;
            if (lineNo < len) {


                for (let i = lineNo + 1; i <= len; i++) {

                    numberRef.current.innerHTML += `<div style="color:white;textAlign:center;fontSize:0.9em" >${i}</div>`


                }
                setLineNo(len);
            }
            var sel = window.getSelection();
            var range = sel.getRangeAt(0);


            var currentCaretPosition = getCaretPosition(divref.current);

            let node = getParentDiv(range.endContainer);
            if (node.textContent.trim().length > 0 && range.startOffset !== 0) {
                node.innerHTML = colorWords(node.textContent);
                var data = getCaretData(divref.current, currentCaretPosition);
                setCaretPosition(data);
            }






        }
        else if (e.keyCode === 8) {
            var sel = window.getSelection();
            var range = sel.getRangeAt(0);
            let div = getParentDiv(range.startContainer);
            if(range.collapsed && range.startOffset===0 &&  divref.current.firstChild === div){
                e.preventDefault();
                return;
            }
            let len;
            let flag = 0;
            if (range.collapsed) {

                len = divref.current.children.length - 1;
               
            }
            else {
                let e = getLineNo(range.endContainer);
                let s = getLineNo(range.startContainer);
                len = divref.current.children.length - (e - s);

            }
            


            if (len > 0 && (div.textContent.length === 0 || (range.startOffset == 0 ) || !range.collapsed)) {
              

                    if (lineNo > len) {
                        for (let i = lineNo; i > len; i--) {
                            let child = numberRef.current.children;
                            numberRef.current.removeChild(child[i - 1]);
                        }
    
    
    
                        setLineNo(len);
                    }
                }
            

        }

        else if (e.keyCode === 9) {
            e.preventDefault();

            var sel = window.getSelection();
            var range = sel.getRangeAt(0);
            var span = document.createElement('span');
            var tabNode = document.createTextNode("\u00a0\u00a0\u00a0\u00a0");
            span.appendChild(tabNode);
            range.insertNode(span);

            range.setStartAfter(tabNode);
            range.setEndAfter(tabNode);
            sel.removeAllRanges();
            sel.addRange(range);
            sel = window.getSelection();
            range = sel.getRangeAt(0);
            var currentCaretPosition = getCaretPosition(divref.current);


            let node = (getParentDiv(range.endContainer));
            node.innerHTML = colorWords(node.textContent);
            var data = getCaretData(divref.current, currentCaretPosition);

            setCaretPosition(data);
        }
        else if (e.keyCode === 32) {
            e.preventDefault();
            var sel = window.getSelection();

            var range = sel.getRangeAt(0);
            var span = document.createElement('span');
            var tabNode = document.createTextNode("\u00a0");
            span.appendChild(tabNode);
            range.insertNode(span);

            range.setStartAfter(tabNode);
            range.setEndAfter(tabNode);
            sel.removeAllRanges();
            sel.addRange(range);
            sel = window.getSelection();
            range = sel.getRangeAt(0);
            var currentCaretPosition = getCaretPosition(divref.current);
            let node = (getParentDiv(range.endContainer));

            node.innerHTML = colorWords(node.textContent);

            var data = getCaretData(divref.current, currentCaretPosition);

            setCaretPosition(data);

        }
        else if (e.keyCode == 90 && e.ctrlKey) {
            e.preventDefault();
        }

        else if (e.keyCode === 86 && e.ctrlKey) {
            e.preventDefault();

        }
        else if (e.keyCode === 88 && e.ctrlKey) {
            e.preventDefault();

        }
        if (e.keyCode == 90 && e.ctrlKey) {
            e.preventDefault();


        }
        else if (e.keyCode === 219 && e.shiftKey) {
            var sel = window.getSelection();
            var range = sel.getRangeAt(0);

            var tabNode = document.createTextNode("}");
            range.insertNode(tabNode);

            range.setStartBefore(tabNode);
            range.setEndBefore(tabNode);
            sel.removeAllRanges();
            sel.addRange(range);
            sel = window.getSelection();
            range = sel.getRangeAt(0);
        }
        else if (e.keyCode === 219) {
            var sel = window.getSelection();
            var range = sel.getRangeAt(0);

            var tabNode = document.createTextNode("]");
            range.insertNode(tabNode);

            range.setStartBefore(tabNode);
            range.setEndBefore(tabNode);
            sel.removeAllRanges();
            sel.addRange(range);
            sel = window.getSelection();
            range = sel.getRangeAt(0);
        }
        else if (e.keyCode === 57 && e.shiftKey) {
            var sel = window.getSelection();
            var range = sel.getRangeAt(0);

            var tabNode = document.createTextNode(")");
            range.insertNode(tabNode);

            range.setStartBefore(tabNode);
            range.setEndBefore(tabNode);
            sel.removeAllRanges();
            sel.addRange(range);
            sel = window.getSelection();
            range = sel.getRangeAt(0);
        }
        else if (e.keyCode === 222 && e.shiftKey) {
            var sel = window.getSelection();
            var range = sel.getRangeAt(0);

            var tabNode = document.createTextNode(`"`);
            range.insertNode(tabNode);

            range.setStartBefore(tabNode);
            range.setEndBefore(tabNode);
            sel.removeAllRanges();
            sel.addRange(range);
            sel = window.getSelection();
            range = sel.getRangeAt(0);
        }
        else if (e.keyCode === 222) {
            var sel = window.getSelection();
            var range = sel.getRangeAt(0);

            var tabNode = document.createTextNode(`'`);
            range.insertNode(tabNode);

            range.setStartBefore(tabNode);
            range.setEndBefore(tabNode);
            sel.removeAllRanges();
            sel.addRange(range);
            sel = window.getSelection();
            range = sel.getRangeAt(0);
        }

    }

    function getCaretPosition(el) {
        var caretOffset = 0, sel;
        if (typeof window.getSelection !== "undefined") {
            var range = window.getSelection().getRangeAt(0);
            var selected = range.toString().length;
            var preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(el);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            caretOffset = preCaretRange.toString().length - selected;
        }
        return caretOffset;
    }

    function getAllTextnodes(el) {
        var n, a = [], walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
        while (n = walk.nextNode()) a.push(n);
        return a;
    }
    function getCaretData(el, position) {
        var node, nodes = getAllTextnodes(el);
        for (var n = 0; n < nodes.length; n++) {
            if (position > nodes[n].nodeValue.length && nodes[n + 1]) {
                // remove amount from the position, go to next node
                position -= nodes[n].nodeValue.length;
            } else {
                node = nodes[n];
                break;
            }
        }
        // you'll need the node and the position (offset) to set the caret
        return { node: node, position: position };
    }

    function setCaretPosition(d) {
        var sel = window.getSelection(),
            range = document.createRange();
        range.setStart(d.node, d.position);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }
    const colorWords = (l) => {
        const keywords = ["for", "to", "do", "if", "then", "else", "var", "while", "let", "in", "end", "function", "end"]

        const words = [];
        let i = 0;
        while (i < l.length) {
            let space = "";
            let word = "";
            while ((l[i] === ' ' || l[i] == '\xa0') && i < l.length) {

                space += l[i];
                i++;
            }
            if (space.length > 0)
                words.push(space);
            while (l[i] !== ' ' && l[i] !== '\xa0' && i < l.length) {

                word += l[i];
                i++;
            }
            if (word.length > 0) {

                words.push(word);
            }

        }
        return words.map((word, index) => {
            if (keywords.indexOf(word.trim()) > -1) {

                return `<span style="color:yellow">${word}</span>`
            }
            else {
                return `<span style="color:white">${word}</span>`
            }
        }).join('');
    }
    return (

        <React.Fragment>
            <Grid container style={{ width: '100%', height: '80vh', borderRadius: '10px' }} justify="center" alignItems="center" >

                <Grid item container xs={1} justify="flex-end"   >
                    <Grid item xs={7} style={{ height: '7vh', backgroundColor: '#564543' }}>

                    </Grid>
                    <Grid item xs={7}>

                        <div ref={numberRef} id="number-line" style={{ marginLeft: 'auto', backgroundColor: '#564543', height: '70vh', fontFamily: 'source-code-pro, Menlo, Monaco, Consolas, Courier New,monospace' }}>
                        </div>
                    </Grid>



                </Grid>
                <Grid item container xs={11} >
                    <Grid item container xs={12} style={{ height: '7vh', backgroundColor: '#564543' }} justify="flex-end" alignItems="center" >
                        <Grid item>

                            <Button variant="contained" style={{ backgroundColor: "#e69500", textTransform: 'capitalize', marginRight: '10px' }} onClick={props.runCode}> Run Code</Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>

                        <div ref={divref} onContextMenu={(e) => { e.preventDefault() }} onInput={handleChange} style={{
                            backgroundColor: "#2F2625", border: 'none', outline: 'none', color: 'white', textAlign: 'left', wordWrap: 'none', overflowX: 'auto', overflowY: 'auto', width: '100%', maxWidth: '100%', height: '70vh', whiteSpace: 'nowrap', fontFamily: 'source-code-pro, Menlo, Monaco, Consolas, Courier New,monospace',
                        }} onKeyUp={handleKeyUp} onKeyDown={handleKeyDown} autoComplete="off" spellCheck="false" autoCorrect="off" data-gramm_editor="false" contentEditable="true">
                        </div>
                    </Grid>
                </Grid>
            </Grid>


        </React.Fragment>
    )
}