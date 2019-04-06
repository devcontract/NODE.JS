$(document).ready(function() {
    function passCheck() {
        if ($("#password").val() === $("#re_password").val()) {
            $("#re_password").removeClass("pass_border");

        } else {
            $("#re_password").addClass("pass_border");

        }
    }

    $("#password").on('input', function(){
        var input_val = $('#password').val();
        var input_length = $('#password').val().replace(/\s+/g, '').length;
        if (input_val != ""){
            $("#re_password_div").removeAttr("hidden").show();

        } else{
            $("#re_password").val('');
            $("#re_password_div").hide(function() {

            });
            $("#signup").attr("disabled","disabled");
        }
        if (input_length > 7){
            // $("#signup").removeAttr("disabled");
            $("#password").removeClass("pass_border");
        } else {
            $("#signup").attr("disabled","disabled");
            $("#password").addClass("pass_border");
        }
    });

    setInterval(function() {
        if($('#firstname').val() != '' && $('#lastname').val() != '' && $('#email').val() != '' && $('#password').val() != '' && $('#re_password').val() != '' && $("#checkbox").is(':checked')){
            $("#signup").removeAttr("disabled");
        } else {
            $("#signup").attr("disabled","disabled");
        }
    },200);

});