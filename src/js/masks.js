/*
 Mascara
    Regex:
    --> \d/ = somente números
    --> \D/ = caractere que não tenha número; 
    --> g = global
    --> numero de exemplo : (11)99525-7794
    --> d{0,2} = 2 primeiros digitos (11)
    --> d{0,5} = 5 digitos antes do traço (99525)
    --> d{0,4} = 4 ultimos digitos (7794)
*/

function phone_mask(input) {
    input.addEventListener('input', function (e) {
        var x;
        if(e.target.value.replace(/\D/g, '').length<=10){
            x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,4})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        }else{
            // passa para o x os valores encontrados no match em formato de array separados pelo tamanho dos digitos.
            x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
            // operador ternário (if/else)
            //enquanto !x[2] for true o campo value é preenchido com x[1], quando !x[2] passar a ser igual a false é aplicado a mascara de acordo com o x.
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        }
    });

    return false;
}

function cpf_or_cnpj_mask(input) {
    input.addEventListener('input', function (e) {
        var x;
        if(e.target.value.replace(/\D/g, '').length <= 11){
            x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/);
            e.target.value = !x[2] ? x[1] : x[1] + (x[2] ? '.' + x[2] : '') + (x[3] ? '.' + x[3] : '') + (x[4] ? '-' + x[4] : '');
        }else { 
            x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/);
            e.target.value = !x[2] ? x[1] : x[1] + (x[2] ? '.' + x[2] : '') + (x[3] ? '.' + x[3] : '') + (x[4] ? '/' + x[4] : '') + (x[5] ? '-' + x[5] : '');
        }
    });

    return false;
}

function cpf_mask(input){
    input.addEventListener('input', function (e) {
        var x;
        x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/);
        e.target.value = !x[2] ? x[1] : x[1] + (x[2] ? '.' + x[2] : '') + (x[3] ? '.' + x[3] : '') + (x[4] ? '-' + x[4] : '');
    });

}

function cnpj_mask(input){
    input.addEventListener('input', function (e) {
        var x;
        x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/);
        e.target.value = !x[2] ? x[1] : x[1] + (x[2] ? '.' + x[2] : '') + (x[3] ? '.' + x[3] : '') + (x[4] ? '/' + x[4] : '') + (x[5] ? '-' + x[5] : '');
    });

}