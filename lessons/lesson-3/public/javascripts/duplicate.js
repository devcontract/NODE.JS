$(document).ready(function() {

    var inputCounter = [];

    function counterCheck(){
        if (inputCounter.length > 5){
            $("#signup").removeAttr("disabled");
        } else{
            $("#signup").attr("disabled","disabled");
        }
    };

    function passCheck(){
        if($("#password").val() === $("#re_password").val()){
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
    $("#password").focusout(function(e) {
        $(this).removeClass("pass_border");
    });

    $("#re_password").on('input', function(e) {
        passCheck();
    })

    $("input[type='checkbox']").change(function(e) {
        if(this.checked){
            inputCounter.push(e.target.id);
            console.log(inputCounter);
        } else {
            var index = inputCounter.indexOf(e.target.id);
            if (index > - 1){
                inputCounter.splice(index, 1);
                console.log(inputCounter);
            }
        }
        counterCheck();
    })

    $("input").focusout(function(e) {
        if ($(this).val() != ""){
            if (inputCounter.length > 0){
                for (var i = 0; i < inputCounter.length; i++){
                    if(inputCounter[i] === e.target.id){
                        return
                    }
                }
            }

            if(e.target.id === 'checkbox'){
                return;
            }

            inputCounter.push(e.target.id);
            console.log(inputCounter);
        } else {
            var index = inputCounter.indexOf(e.target.id);
            if (index > - 1){
                inputCounter.splice(index, 1);
                console.log(inputCounter);
            }
        }

        counterCheck();

    });

});