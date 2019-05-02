const DEBUG_MODE = true;

const NUMBER = "NUMBER";
const EMAIL = "EMAIL";
const REQUIRED = "REQUIRED";
const TEXT = "TEXT";
const CPF = "CPF";
const CEP = "CEP";
const EXP_EMAIL = /^[a-zA-Z0-9_&!%?#$-.]+@[a-zA-Z0-9_-]+\.[a-z]{2,5}/;
const EXP_TEXT = /[a-zA-Z]/;
const EXP_CEP = /^[0-9]{5}-[0-9]{3}$/;
const EXP_HHMM = /\b(?:[01][0-9]|2[0-3]):[0-5][0-9]\b/;
const EXP_NUMBER = /^\d+$/;
var ok;



function consoleLog(msg){
    if (DEBUG_MODE)
        console.log(msg);
}

function checkForm() {
    ok = true;
    var msgError = "";
    var elementos =  document.querySelector(".formulario-dendron").elements;    
    for (var i = 0; i < elementos.length; i++) {
        if(elementos[i].getAttribute("checkError") === "true"){
            consoleLog('elemento nome: '+elementos[i].name);
            consoleLog('elemento valor: '+elementos[i].value);
            let whatsCheck = elementos[i].getAttribute("whatsCheck").split(",");
            consoleLog('o que checar: '+whatsCheck);
            for (var x=0;x<whatsCheck.length;x++){
                let checkReturn =  checkElement(elementos[i],whatsCheck[x]);
                if (checkReturn.length>0){
                    console.log('checkReturn: '+checkReturn);
                    msgError += (msgError.length>0 ? "\n" : "") + checkReturn;            
                }  
            } 
        } 
    }
    if (msgError.length>0){
        ok = false;
        alert(msgError);
    }
    return ok;
}

function checkElement(element, whatsCheck){
    let msgError = "";
    switch (whatsCheck){
        case REQUIRED:
            return checkRequired(element);
            //break;
        case NUMBER:
            return checkNumber(element);
            //break;
        case EMAIL:
            return checkEmail(element);
        case CPF:
            if (element.value !== ""){ 
                if(!valida_cpf(element.value)){
                    ok = false;
                    msgError =  "Preencha seu CPF corretamente.";
                }
            }
            break;
        case CEP: 
            if (element.value !== ""){
                if (!EXP_CEP.test(element.value)){
                    ok = false;
                    msgError =  "Preencha o CEP corretamente.";
                }
            }   
            break;
        case TEXT:   
            if (element.value !== ""){
                if (!EXP_TEXT.test(element.value)){
                    ok = false;
                    msgError =  "Preencha somente letras no campo "+element.name+".";
                    
                }
            }  
            break;     
    }
    return msgError;
}

function checkRequired(element){
    return  (element.value === "" ? "Preencha o campo "+element.name+" corretamente." : "");       
    
}

function checkNumber(element){        
        //console.log(!EXP_NUMBER.test(element.value));
        return (element.value !== "" && !EXP_NUMBER.test(element.value) ? "Preencha um valor numérico para o campo "+element.name+ "." : "");            

}

function checkEmail(element){
    return (element.value !== "" && !EXP_EMAIL.test(element.value) ? "O email "+element.value+ " é invalido." : "");

}

// Descrição aqui: https://www.devmedia.com.br/validar-cpf-com-javascript/23916

function valida_cpf(strCPF) {
    var Soma;
    var Resto;
    var cpf = strCPF.replace(/\W/g,'');
    Soma = 0;
    if (cpf == "00000000000") return false;
     
    for (var i=1; i<=9; i++){
        Soma = Soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
    } 
    Resto = (Soma * 10) % 11;
    
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(cpf.substring(9, 10)) ) return false;
    
    Soma = 0;
    for (var i = 1; i <= 10; i++){
        Soma = Soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
    } 
    Resto = (Soma * 10) % 11;
    
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(cpf.substring(10, 11) ) ) return false;

    return true;
}

function validar_cnpj(strCNPJ) {
    var cnpj = strCNPJ.replace(/\W/g,'');
    var b = [6,5,4,3,2,9,8,7,6,5,4,3,2];

    if(cnpj.length != 14)
        return false;

    if(/0{14}/.test(cnpj))
        return false;

    for (var i = 0, n = 0; i < 12; n += cnpj[i] * b[++i]);
    if(cnpj[12] != (((n %= 11) < 2) ? 0 : 11 - n))
        return false;

    for (var i = 0, n = 0; i <= 12; n += cnpj[i] * b[i++]);
    if(cnpj[13] != (((n %= 11) < 2) ? 0 : 11 - n))
        return false;

    return true;
};