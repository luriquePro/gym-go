// Arquivo de teste para validar o sistema de validação
// Este arquivo tem formatação intencionalmente ruim para testar o sistema

const   test   =   "hello world"   ;
const   another   =   {
  name:   "test"   ,
  value:   123   ,
  nested:   {
    deep:   true   ,
    array:   [1,2,3]   
  }
}   ;

function   badFormatting(   param1:   string   ,   param2:   number   )   {
  return   param1   +   param2   ;
}

export   {   test   ,   another   ,   badFormatting   }   ;
