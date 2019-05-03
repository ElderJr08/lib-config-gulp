function setResponse(data){
    inbot.post('setvar',{
        'rua': data.bairro,
        'bairro': data.bairro,
        'cidade': data.localidade,
        'uf': data.uf
    })
}

function getCEP(cep, handleData){
    var CEP;
    if(typeof handleData !== "undefined"){
        if(typeof cep !== "number" && cep.replace(/\W/g,'').length === 8){
            CEP = cep.replace(/\W/g,'');
            $.get('https://viacep.com.br/ws/'+CEP+'/json', (data) =>{
                handleData(data);
            }
            );
        }else{
            console.log('Parâmetro inválido!');
            return false;
        }
    }else{
        console.log('handleData vazio');
    }
}


