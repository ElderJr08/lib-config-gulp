const DEBUG_MODE = true;

const NUMBER = "NUMBER";
const EMAIL = "EMAIL";
const REQUIRED = "REQUIRED";
const TEXT = "TEXT";
const CPF = "CPF";
const CEP = "CEP";
const PHONE = "PHONE";
const CNPJ = "CNPJ";
const SELECT = "SELECT"
const CNPJ_CPF = "CNPJ/CPF";
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

function checkForm(classFormName) {
    ok = true;
    var msgError = "";
    //var elementos =  document.querySelector("."+classFormName).elements;
    var elementos =  $("."+classFormName+":last")[0].elements;

    $(elementos).on('keydown', function(){
        if($(this).next()[0].className === "error"){
            $(this).next().remove();
        }
    });

    for (var i = 0; i < elementos.length; i++) {
        if(elementos[i].getAttribute("checkError") === "true"){
            consoleLog('elemento nome: '+elementos[i].name);
            consoleLog('elemento valor: '+elementos[i].value);
            let whatsCheck = elementos[i].getAttribute("whatsCheck").split(",");
            consoleLog('o que checar: '+whatsCheck);
            for (var x=0;x<whatsCheck.length;x++){
                let checkReturn =  checkElement(elementos[i],whatsCheck[x],classFormName);
                consoleLog('checkReturn '+whatsCheck[x]+': '+checkReturn);
                if(checkReturn.length>0){
                    msgError += "\n"+checkReturn
                    if($(elementos[i]).next()[0].className !== "error"){
                        $(elementos[i]).after('<span class="error"><small style="color: #ff0000">*'+checkReturn+'</small></span>');
                    }
                }
                //(checkReturn.length>0 ? msgError += "\n"+checkReturn : "");
                //msgError += (checkReturn.length>0 ? "\n" : "") + checkReturn;
            } 
        } 
    }
    if (msgError.length>0){
        ok = false;
        //alert(msgError);
    }
    return ok;
}


function checkElement(element, whatsCheck, classFormName){
    switch (whatsCheck){
        case REQUIRED:
            return checkRequired(element);
        case NUMBER:
            return checkNumber(element);
        case EMAIL:
            return checkEmail(element);
        case PHONE:
            return checkPhone(element);
        case CPF:
            return checkCPF(element);
        case CNPJ:
            return checkCNPJ(element);
        case CNPJ_CPF:
            return checkCNPJCPF(element);
        case CEP: 
            return checkCEP(element);
        case TEXT:   
            return checkText(element);
        case SELECT:   
            let name = $(element.options)[0].getAttribute('name');
            return checkSelect(element, $('option[name="'+name+'"]:checked','.'+classFormName+':last')[0]);
    }
}
//return  (element.value === "" ? ($(element).after('<label style="color: #ff0000">*</label>'), "Preencha o campo "+element.name+" corretamente.") : ($(element).next().remove(), ""));       
function checkRequired(element){
    return  (element.value === "" ? "Preencha o campo "+element.name+" corretamente." : "");       
    
}

function checkSelect(select, options){
    var this_message = "";
    if(options.value === ""){
        this_message = "Preencha o campo "+select.name+" corretamente.";
    }else{
        if($(select).next()[0].className === "error"){
            $(select).next().remove();
        }
    }
    return  this_message; //(options.value === "" ? "Preencha o campo "+select.name+" corretamente." : "");       
    
}

function checkNumber(element){        
        //console.log(!EXP_NUMBER.test(element.value));
        return (element.value !== "" && !EXP_NUMBER.test(element.value) ? "Preencha um valor numérico para o campo "+element.name+ "." : "");
}

function checkText(element){
    return  (element.value !== "" && !EXP_TEXT.test(element.value) ? "Preencha somente com letras o campo "+element.name+"." : ""); 
}

function checkEmail(element){
    return (element.value !== "" && !EXP_EMAIL.test(element.value) ? "O email "+element.value+ " é invalido." : "");
}

function checkPhone(element){
    return (element.value !== "" && element.value.replace(/\W/g,'').length < 10 ? "O telefone"+element.value+" é inválido.": "");
}

function checkCPF(element){
    return (element.value !== "" && !validar_cpf(element.value) ? "O CPF "+element.value+" é inválido.": "");
}

function checkCNPJ(element){
    return (element.value !== "" && !validar_cnpj(element.value) ? "O CNPJ "+element.value+" é inválido.": "");
}

function checkCNPJCPF(element){
    var this_message = "";
    if(element.value !== ""){
        if(element.value.replace(/\W/g,'').length > 0 && element.value.replace(/\W/g,'').length<= 11){
            if(!validar_cpf(element.value)){
                this_message =  "O CPF "+element.value+" é inválido.";
            }
        }else{
            if(!validar_cnpj(element.value)){
                this_message =  "O CNPJ "+element.value+" é inválido.";
            }
        }
    }

    return this_message;
}

function checkCEP(element){
    return (element.value !== "" && !EXP_CEP.test(element.value) ? "O CEP "+element.value+" é inválido.": "");
}

// Descrição aqui: https://www.devmedia.com.br/validar-cpf-com-javascript/23916

function validar_cpf(strCPF) {
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