var confirm_val;
var val;
$("input").each((element) => {
    $(element).keyup(function(){$("form").addClass("was-validated");});
});
$('#confirm-password').keyup(function(){
    confirm_val=$('#confirm-password').val();
    val=$("#password").val();
    if(confirm_val!=val){
        $('#confirm').html("password not matched.");
        $('#confirm').addClass("invalid-feedback");
    }
    else if(confirm_val!=""){
        $('#confirm').html("matched passwords.");
        $('#confirm').addClass("valid-feedback");
    }else{
        $('#confirm').addClass("valid-feedback");
    }});
    
$('#password').keyup(function(){
    confirm_val=$('#confirm-password').val();
    val=$("#password").val();
    if(confirm_val!=val){
        $('#confirm').html("password not matched.");
        $('#confirm').toggleClass("invalid-feedback");
    }
    else if(confirm_val!=""){
        $('#confirm').html("matched passwords.");
        $('#confirm').toggleClass("invalid-feedback");
    }else{
        $('#confirm').addClass("valid-feedback");
    }}
    );

