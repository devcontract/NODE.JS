$(document).ready(function() {

    function checkStatus() {
        if( $('input').val() != '' &&
            $("#checkbox").is(':checked')){
            if(passCheck()){
                $("#signup_button").removeAttr("disabled");
            }
            } else {
            $("#signup_button").attr("disabled","disabled");
        }
    }


    function passCheck(){
        if($("#password").val() === $("#re_password").val()){
            $("#re_password").removeClass("pass_border");
            $("#signup").removeAttr("disabled");
            return true;
        } else {
            $("#re_password").addClass("pass_border");
            $("#signup_button").attr("disabled","disabled");
          return false;
        }
    }

    $("#password").on('input', function(){
        var input_val = $('#password').val();
        var input_length = $('#password').val().replace(/\s+/g, '').length;
        if (input_val != ""){
            $("#re_password_div").removeAttr("hidden").show();
        } else{
            $("#re_password").val('');
            $("#re_password_div").hide();
            $("#signup_button").attr("disabled","disabled");
        }
        if (input_length > 7){
            $("#password").removeClass("pass_border");
        } else {
            $("#signup_button").attr("disabled","disabled");
            $("#password").addClass("pass_border");
        }
    });


document.addEventListener('input', function() {
    passCheck();
    checkStatus();
});
    $("input[type='checkbox']").change(function() {
        passCheck();
        checkStatus();
    });

});


