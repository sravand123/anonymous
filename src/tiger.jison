%lex

%%
\s+					        {}
\n+                         {}
"/*"([^*]|\*+[^*/])*\*+"/"  {}
[0-9]+("."[0-9]+)?\b  return 'CONST' ;
\"([^\\\"]|\\.)*\" return 'STRING';
":="               return 'ASSIGN';
"if"               return 'IF';
"else"             return 'ELSE';
"then"             return 'THEN';
"end"              return 'END';
"in"               return 'IN';
"do"               return 'DO';
"to"               return 'TO';
"for"              return 'FOR';
"while"            return 'WHILE';
"array"            return 'ARRAY';
"function"         return 'FUNCTION';
"let"              return  'LET';
"+"                return 'PLUS';
"<="               return 'LEQ';
">="               return 'GEQ';
">"                return 'GRT';
"<"                return 'LE';
"="                return 'EQ';
"<>"               return 'NEQ';
"&&"                return 'AND';
"||"                return 'OR';

"-"                return 'MINUS';
"of"               return 'OF';
"nil"              return 'NIL';
"type"             return 'TYPE';
":"                return 'COLON';
"var"              return 'VAR';
"."                return 'DOT';
","                return 'COMMA';
"break"            return 'BREAK';
"/"                return 'DIV';
"*"                return 'MUL';
"("                return 'LPAREN';
")"                return 'RPAREN';
"["                return 'LSQPAREN';
"]"                return 'RSQPAREN';
"{"                return 'LCURLPAREN';
"}"                return 'RCURLPAREN';
";"                return 'SEMICOLON';
[a-z_A-Z]+[0-9]*[a-z_A-Z]*         return 'ID';
<<EOF>>               return 'EOF';


/lex 



%nonassoc 'THEN'
%nonassoc 'ELSE'
%nonassoc 'UMINUS'
%nonassoc 'OF'
%nonassoc 'DO'
%nonassoc 'ID'
%nonassoc 'LSQPAREN'
%nonassoc 'ASSIGN'

%left 'OR'
%left 'AND'
%nonassoc 'LEQ' 'GEQ' 'LE' 'GRT' 'EQ' 'NEQ'
%left 'PLUS' 'MINUS'  
%left 'MUL'  'DIV'          
%start SCRIPT

%% 

SCRIPT
    : PROGRAM
        {
            console.log(JSON.stringify( {
                type:"File",
                program:$1
            }));
            return $1;
        };

PROGRAM
    : EXP EOF
        {$$= {
            type:"Program",
            body:[
               $1
            ]
        };}
    | DECS EOF
         {$$= {
            type:"Program",
            body:$1
        };};



EXP     :  'NIL'   
            {$$ = {
                type:"NullLiteral"
            };}            
        |  CONST {
                    $$={type:"NumericLiteral",
                    value:Number($1)
                } ;} 
        |  STRING {
                    $$={type:"StringLiteral",
                    value:($1.slice(1, -1))
                } ;} 
        |  'LSQPAREN' ELEMENTS 'RSQPAREN'  {
                $$={
                    type:"ArrayExpression",
                    elements:$2
                };
        }                    
        |   'LCURLPAREN' RECS 'RCURLPAREN' { $$={
                    type:"ObjectExpression",
                    properties:$2
                };  }
        |  ID 'LPAREN' PARAMS 'RPAREN'   {
                $$={
                    type:"CallExpression",
                    callee:{

                        type:"Identifier",
                        name:$1
                    },
                    arguments:$3 ? $3: []
                };

       }
       |  'MINUS' EXP      %prec 'UMINUS'   {$$={
                                            type:"BinaryExpression",
                                            left:{
                                                type:"NumericLiteral",
                                                value:0
                                            },
                                            operator:'-',
                                            right:$2


                                    };}
|  EXP 'PLUS' EXP     {$$={
                                            type:"BinaryExpression",
                                            left:$1,
                                            operator:'+',
                                            right:$3


                                    };}                                              
        |  EXP 'MINUS' EXP             {$$={
                                            type:"BinaryExpression",
                                            left:$1,
                                            operator:'-',
                                            right:$3


                                    };} 

        |  EXP 'MUL' EXP               {$$={
                                            type:"BinaryExpression",
                                            left:$1,
                                            operator:'*',
                                            right:$3


                                    };}                                       
        |  EXP 'DIV' EXP                   {$$={
                                            type:"BinaryExpression",
                                            left:$1,
                                            operator:'/',
                                            right:$3


                                    };}                                   
        |  EXP 'LE' EXP                     {$$={
                                            type:"BinaryExpression",
                                            left:$1,
                                            operator:'<',
                                            right:$3


                                    };}                                 
        |  EXP 'GRT' EXP                   {$$={
                                            type:"BinaryExpression",
                                            left:$1,
                                            operator:'>',
                                            right:$3


                                    };}                                  
        |  EXP 'LEQ' EXP                   {$$={
                                            type:"BinaryExpression",
                                            left:$1,
                                            operator:'<=',
                                            right:$3


                                    };}                                   
        |  EXP 'GEQ' EXP                   {$$={
                                            type:"BinaryExpression",
                                            left:$1,
                                            operator:'>=',
                                            right:$3


                                    };}                                   
        |  EXP 'NEQ' EXP                   {$$={
                                            type:"BinaryExpression",
                                            left:$1,
                                            operator:'!=',
                                            right:$3


                                    };}                                   
        |  EXP 'EQ' EXP                    {$$={
                                            type:"BinaryExpression",
                                            left:$1,
                                            operator:'==',
                                            right:$3


                                    };}                                  
        |  EXP 'AND' EXP                   {$$={
                                            type:"LogicalExpression",
                                            left:$1,
                                            operator:'&&',
                                            right:$3


                                    };}                                   
        |  EXP 'OR' EXP                    {$$={
                                            type:"LogicalExpression",
                                            left:$1,
                                            operator:'||',
                                            right:$3


                                    };} 
         |  LVALUE           {
                                $$=$1;
                            }     
         |  LVALUE 'ASSIGN'  EXP    %prec 'ASSIGN'   {
                                                    $$={
                                                        type:"AssignmentExpression",
                                                        operator:'=',
                                                        left:$1,
                                                        right:$3

                                                    };
                                                } 
        |  'LPAREN' EXPS  'RPAREN' {$$=  {

                                            type:"CallExpression",
                                            callee:  {
                                                type:"ParenthesizedExpression",
                                                expression:{
                                                                type:"FunctionExpression",
                                                                async:false,
                                                                generator:false,
                                                                extra:{
                                                                    parenthesized:true
                                                                },
                                                                params:[],
                                                                body:{
                                                                    type:"BlockStatement",
                                                                    body:$2
                                                                    
                                                                }
                                            }
                                            },
                                        
                                         arguments:[]

                                        }  ;                     

                            }
        |  IF EXP THEN EXP          %prec 'THEN'    {

                                                        $$={
                                                            type:"IfStatement",
                                                            test:$2,
                                                            consequent:{
                                                                type:"BlockStatement",
                                                                body:[
                                                                    $4
                                                                ]
                                                            }
                                                        };
                                                    }                        
        |  IF EXP THEN EXP ELSE EXP  %prec 'ELSE'        { function helper(x,y){

                                                            return {

                                            type:"CallExpression",
                                            callee: {
                                                type:"ParenthesizedExpression",
                                                expression:{
                                                                type:"FunctionExpression",
                                                                async:false,
                                                                generator:false,
                                                                extra:{
                                                                    parenthesized:true
                                                                },
                                                                params:[],
                                                                body:{
                                                                    type:"BlockStatement",
                                                                    body:[
                                                                        {
                                                                            type:"IfStatement",
                                                                            test:$2,
                                                                            consequent:{
                                                                                type:"BlockStatement",
                                                                                body:  x
                                                                            },
                                                                            alternate:{
                                                                             type:"BlockStatement",
                                                                                body:y
                                                                            }
                                                                        }
                                                                    ]
                                                                    
                                                                }
                                            }
                                            },
                                         arguments:[]

                                        }
                                        };
                                        let temp1 = null;
                                        let temp2 = null;
                                         if ($4.type== "WhileStatement"){
                                                temp1=[
                                                    $4,
                                                    {
                                                         type:"ReturnStatement"
                                                         
                                                    }

                                                ];                                                                        
                                        }
                                        else if($4.type== "AssignmentExpression"){
                                             temp1=[
                                                    $4,
                                                    {
                                                         type:"ReturnStatement"
                                                         
                                                    }

                                                ];  
                                        }
                                         else if($4.type== "IfStatement" && !($4.alternate)){
                                             temp1=[
                                                    $4,
                                                    {
                                                         type:"ReturnStatement"
                                                         
                                                    }

                                                ];  
                                        }
                                          else if($4.type== "BreakStatement"){
                                             temp1=[
                                                    $4
                                                  
                                                ];  
                                        }

                                        else{

                                        temp1=[
                                            {
                                                 type:"ReturnStatement",
                                                 argument:$4
                                            }

                                        ];};
                                        if ($6.type== "WhileStatement"){
                                                temp2=[
                                                    $6,
                                                    {
                                                         type:"ReturnStatement"
                                                         
                                                    }

                                                ];                                                                        
                                        }
                                        else if($6.type== "AssignmentExpression"){
                                             temp2=[
                                                    $6,
                                                    {
                                                         type:"ReturnStatement"
                                                         
                                                    }

                                                ];  
                                        }
                                         else if($6.type== "BreakStatement"){
                                             temp2=[
                                                    $6
                                                  
                                                ];  
                                        }
                                         else if($6.type== "IfStatement" && !($6.alternate)){
                                             temp2=[
                                                    $6,
                                                    {
                                                         type:"ReturnStatement"
                                                         
                                                    }

                                                ];  
                                        }
                                        else{

                                        temp2=[
                                            {
                                                 type:"ReturnStatement",
                                                 argument:$6
                                            }

                                        ];};
                                        $$=helper(temp1,temp2);
                          
                                                       
                                        }                                        
   
         |  'WHILE' EXP 'DO' EXP  %prec 'DO'  {

                                            $$={
                                                type:"WhileStatement",
                                                test:$2,
                                                body:{
                                                    type:"BlockStatement",
                                                    body:[
                                                        $4
                                                    ]
                                                }
                                            };
                                        }
         |  'FOR' ID 'ASSIGN' EXP 'TO' EXP 'DO' EXP  
                                        { 

                                            let varDec = {
                                            type:"VariableDeclaration",
                                            declarations:[

                                                {
                                                    type:"VariableDeclarator",
                                                    id:{
                                                        type:"Identifier",
                                                        name:$2,
                                                        },
                                                    init:$4
                                                    

                                                }
                                            ],
                                            kind:"let"
                                            
                                                        
                                        };
                                        let comp = {
                                            type:"BinaryExpression",
                                            left:{
                                                type:"Identifier",
                                                name:$2
                                            },
                                            operator:'<=',
                                            right:$6


                                    }
                                        
                                        let inc = {
                                                type:"BinaryExpression",
                                                operator:'+',
                                                left:{
                                                    type:"Identifier",
                                                    name:$2
                                                },
                                                right:{
                                                type:"NumericLiteral",
                                                value:1
                                                }
                                            }
                                        let ass ={
                                                        type:"AssignmentExpression",
                                                        operator:'=',
                                                        left:{
                                                            type:"Identifier",
                                                            name:$2
                                                        },
                                                        right:inc

                                                    }
                                        let whileStm = {
                                                type:"WhileStatement",
                                                test:comp,
                                                body:{
                                                    type:"BlockStatement",
                                                    body:[
                                                        $8,ass
                                                    ]
                                                }
                                            }
                                            $$=  {

                                            type:"CallExpression",
                                            callee:{
                                                type:"ParenthesizedExpression",
                                                expression: {
                                                                type:"FunctionExpression",
                                                                async:false,
                                                                generator:false,
                                                                extra:{
                                                                    parenthesized:true,
                                                                    parenStart:1
                                                                },
                                                                id:null,
                                                                params:[],
                                                                body:{
                                                                    type:"BlockStatement",
                                                                    body:[
                                                                      varDec,whileStm
                                                                    ]
                                                                    
                                                                }
                                            }
                                            },
                                         arguments:[]

                                        }  ;                     

                            }  
         |  'LET' DECS 'IN' EXPS 'END'    
                                {$$=  {

                                            type:"CallExpression",
                                            callee:{
                                                type:"ParenthesizedExpression",
                                                expression: {
                                                                type:"FunctionExpression",
                                                                async:false,
                                                                generator:false,
                                                                extra:{
                                                                    parenthesized:true,
                                                                    parenStart:1
                                                                },
                                                                id:null,
                                                                params:[],
                                                                body:{
                                                                    type:"BlockStatement",
                                                                    body:[
                                                                        ...$2,...$4
                                                                    ]
                                                                    
                                                                }
                                            }
                                            },
                                         arguments:[]

                                        }  ;                     

                            } 
            | LVALUE 'DOT' ID 'LPAREN' PARAMS 'RPAREN' 
                            {
                                $$={
                                    type:"CallExpression",
                                    callee:{
                                            type:"MemberExpression",
                                            object:$1,
                                            property:{
                                                type:"Identifier",
                                                name:$3
                                            },
                                            computed:false
                                    },
                                    arguments:$5
                                };   
                            } 
   
            | BREAK 
                        {$$={
                                type:"BreakStatement"
                        }};






DEC :   'VAR' ID 'ASSIGN' EXP         {
                                        $$={
                                            type:"VariableDeclaration",
                                            declarations:[

                                                {
                                                    type:"VariableDeclarator",
                                                    id:{
                                                        type:"Identifier",
                                                        name:$2,
                                                        },
                                                    init:$4
                                                    

                                                }
                                            ],
                                            kind:"let"
                                            
                                                        
                                        };
                                    }                                          
        | 'FUNCTION' ID 'LPAREN' TYFIELDS 'RPAREN'   'EQ' EXP    {
                                                            $$={
                                                                type:"FunctionDeclaration",
                                                                id:{
                                                                    type:"Identifier",
                                                                    name:$2
                                                                
                                                                },
                                                                params:$4,
                                                                async:false,
                                                                generator:false,
                                                                body:{
                                                                    type:"BlockStatement",
                                                                    body:[
                                                                        {
                                                                            type:"ReturnStatement",
                                                                            argument:$7
                                                                        }
                                                                    ]
                                                                }
                                                            };
                                                        }  ;   

        

DECS :   
         DEC                                                                           {$$=[$1];}
        | DEC  DECS                                                            {$$=[$1,...$2];};
                
TYFIELDS :                                                                    {$$=[]}
        | TYFIELD 'COMMA' TYFIELDS                                              {$$=[$1,...$3];}
        | TYFIELD                                                             {$$=[$1];} ;

TYFIELD: ID {
        $$={
                type:"Identifier",
                name:$1
            };
          
};


RECS    :                                                                 {$$=[];}
        | REC 'COMMA' RECS                                                {$$=[$1,...$3];}
        | REC                                                             {$$=[$1];}
        ;
REC     : ID 'COLON' EXP     {
                            $$={
                                type:"ObjectProperty",
                                key:{
                                    type:"Identifier",
                                    name:$1
                                },
                                value:$3,
                                computed:false,
                                method:false


                            }
                        };                                                   

ELEMENTS :                                                              {$$=[];}
        | EXP                                                           {$$=[$1];}
        | EXP 'COMMA' ELEMENTS                                          {$$=[$1,...$3];};
        


                                    
     
PARAMS  :                                                                 {$=[];}
        | PARAM                                                           {$$=[$1];}
        | PARAM COMMA PARAMS                                              {$$=[$1,...$3];};

PARAM   : EXP                                                             {$$=$1;};
 
LVALUE :  ID     %prec ID    
                            {
                                $$={
                                    type:"Identifier",
                                    name:$1
                                };
                            }                                             
        | LVALUE 'DOT'  ID      
                            {
                                $$={
                                    type:"MemberExpression",
                                    computed:false,
                                    object:$1,
                                    property:{
                                        type:"Identifier",
                                        name:$3
                                    }
                                };
                            }                                              
        | ID LSQPAREN EXP RSQPAREN %prec LSQPAREN   
                             {
                                $$={
                                    type:"MemberExpression",
                                    computed:true,
                                    object:{
                                        type:"Identifier",
                                        name:$1
                                    },
                                    property:$3
                                };
                            }                      
        | LVALUE LSQPAREN EXP RSQPAREN %prec LSQPAREN     
                            {
                                $$={
                                    type:"MemberExpression",
                                    computed:true,
                                    object:$1,
                                    property:$3
                                };
                            };    
         
EXPS    :                                                                     {$$=[
                                                                                    {
                                                                                        type:"ReturnStatement",

                                                                                    }
                                                                                    ];}
        | EXP                                                   {


                                                                    if ($1.type== "WhileStatement"){
                                                                            $$=[
                                                                                $1,
                                                                                {
                                                                                     type:"ReturnStatement"
                                                                                     
                                                                                }

                                                                            ];                                                                        
                                                                    }
                                                                    else if($1.type== "AssignmentExpression"){
                                                                         $$=[
                                                                                $1,
                                                                                {
                                                                                     type:"ReturnStatement"
                                                                                     
                                                                                }

                                                                            ];  
                                                                    }
                                                                     else if($1.type== "IfStatement" && !($1.alternate)){
                                                                         $$=[
                                                                                $1,
                                                                                {
                                                                                     type:"ReturnStatement"
                                                                                     
                                                                                }

                                                                            ];  
                                                                    }
                                                                     else if($1.type== "BreakStatement"){
                                                                         $$=[
                                                                                $1
                                                                              
                                                                            ];  
                                                                    }
                                                                    else{

                                                                    $$=[
                                                                        {
                                                                             type:"ReturnStatement",
                                                                             argument:$1
                                                                        }

                                                                    ];}                                        
                                                                }
        | EXP SEMICOLON EXPS                                                  {$$=[$1,...$3]; };
       