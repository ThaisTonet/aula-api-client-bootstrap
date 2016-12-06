function listagem() {
    $.getJSON("https://pure-island-41431.herokuapp.com/api/pessoa", function (dados) {
        $("#aulasapicontainer").html("");
        
        var tabela = "<table class=\"table table-houver\">"  
       
              +" <thead>"
              +"    <tr>"
              +"        <th>ID</th>"
              +"        <th>Nome</th>"
              +"        <th>E-mail</th>"
              +"        <th>Telefone</th>"
              +"        <th>Ação</th>"
              +"     </tr>"
              +" </thead>"
              +" <tbody>";
      
      $.each(dados,function(indice, objeto) {
          tabela += " <tr>"
                     +" <td>"+objeto.id+ "</td>"
                     +" <td>"+objeto.name+"</td>"
                     +" <td>"+objeto.mail+"</td>"
                     +" <td>"+objeto.phone+"</td>"
                     +" <td><a href=\"#\" data-toggle=\"tooltip\" data-placement=\"left\" title=\"Excluir\" onclick=\"excluir ("+objeto.id+")\"> <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span> </a>"
                     +"     <a href=\"#\" data-toggle=\"tooltip\" data-placement=\"left\" title=\"Alterar\"  onclick=\"alterar ("+objeto.id+")\"> <span class=\"glyphicon glyphicon-pencil\" aria-hidden=\"true\"></span> </a></td>"
                  +"</tr>";
                  
      });
                  
                  tabela +="</tbody></table>";
 $("#aulasapicontainer").html(tabela);

    });
}

function excluir(id){
    $.ajax({
        type: "DELETE",
        url: "https://pure-island-41431.herokuapp.com/api/pessoa"+id,
        success: function (){
            alert("Sucesso! Pessoa Excluida.");
            listagem(); 
        }
    });
}

var id_alterar;
function alterar(id){
    $("#aulasapicontainer").html("");
    $.ajax({
        type:"GET",
        url:"formulario.html",
        success: function(formulario){
           $("#aulasapicontainer").html(formulario); 
           $("#confirmar_salvar").click(confirmar_alterar);
           id_alterar=id;
           $.getJSON("https://pure-island-41431.herokuapp.com/api/pessoa/"+id_alterar, function (dados){
               $("#InputNome").val(dados.name);
               $("#InputEmail").val(dados.mail);
               $("#InputPhone").val(dados.phone);
           });
        }
    });
}

function confirmar_alterar(){
    var dados = "{"
    +"\"name\":\""+ $("#InputNome").val()+"\","
    +"\"mail\":\""+ $("#InputEmail").val()+"\"," 
    +"\"phone\":\""+ $("#InputPhone").val()+"\""
    +"}";
    console.log(dados);
    
    $.ajax({
        type: "PATCH",
        url: "https://pure-island-41431.herokuapp.com/api/pessoa/"+id_alterar,
        data: dados,
        success: function (){
            alert("Sucesso! Pessoa Cadastrada.");
            listagem(); 
        },
        contenType: "application/json;charset=UTF-8",
    });
}


function cadastro_form(){
    $("#aulasapicontainer").html("");
    $.ajax({
        type:"GET",
        url:"formulario.html",
        success: function(formulario){
           $("#aulasapicontainer").html(formulario); 
           $("#confirmar_salvar").click(confirmar_cadastro);
        }
    });
}

function confirmar_cadastro(){
    var dados = "{"
    +"\"name\":\""+ $("#InputNome").val()+"\","
    +"\"mail\":\""+ $("#InputEmail").val()+"\"," 
    +"\"phone\":\""+ $("#InputPhone").val()+"\""
    +"}";
    console.log(dados);
    
    $.ajax({
        type: "POST",
        url: "https://pure-island-41431.herokuapp.com/api/pessoa",
        data: dados,
        success: function (){
            alert("Sucesso! Pessoa Cadastrada.");
            listagem(); 
        },
        contenType: "application/json;charset=UTF-8",
    });
}

listagem();
$("#listagem").click(listagem);
$("#cadastrar").click(cadastro_form);


$(document): ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
});
