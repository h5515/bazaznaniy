<!DOCTYPE html>
<html[available=lostpassword|register] class="page_form_style" [/available] lang="ru">

    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        <meta name="HandheldFriendly" content="true">
        <meta name="format-detection" content="telephone=no">
        <meta name="viewport" content="user-scalable=0, initial-scale=1.0, maximum-scale=1.0, width=device-width">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="default">
        <link rel="shortcut icon" href="/templates/Default/images/favicon.ico">
        <link href="/templates/Default/css/styles.css?v={VERSION}" type="text/css" rel="stylesheet">
        {* <link href="/kendo/styles/kendo.common.min.css?v=4{VERSION}" rel="stylesheet"> *}
        {* <link href="/kendo/styles/kendo.classic-main.css?v={VERSION}" rel="stylesheet"> *}
        <link href="/kendo/styles/kendo.default-main.min.css?v={VERSION}" rel="stylesheet">
        <title>База знаний ФТО</title>
        <script src="/engine/classes/js/jquery3.js"></script>
        <script src="/kendo/js/kendo.all.min.js"></script>
        <script src="/templates/Default/js/function.js"></script>
    </head>

    <body class="action-login">
        <img class="avtlogo" src="/images/logo-fto.svg">
        <div id="main" class="nosidebar" style="display: block;">
            <div id="content">
                <div class="titavt"><img src="/images/bzl.png">
                    <h1>База знаний</h1>
                </div>
                <div id="login-form">
                    <form id="formavtoriz" onsubmit="return false;">
                        <label for="username"><span class="spmarg k-icon k-i-user"></span>Пользователь</label>
                        <input type="text" name="login_name" id="login_name" tabindex="1">

                        <label for="password" style="margin-top: 10px;"><span
                                class="spmarg k-icon k-i-lock"></span>Пароль</label>
                        <input type="password" name="login_password" id="password" tabindex="2">
                        <input type="hidden" name="avtkey" value="jfdskal289234pfg$#84532">
                        <input type="submit" class="mbut" name="login" value="Вход" tabindex="3" id="login-submit">
                    </form>
                </div>
            </div>
        </div>
    </body>
    <script>
        $(function() {
            $('#login-submit').click(function(e) {
                var data = $('#formavtoriz').serializeArray();
                dataObj = {};
                $(data).each(function(i, field) {
                    dataObj[field.name] = field.value;
                });
                if ($.trim(dataObj['login_name']) == '') {
                    notification('Логин не может быть пустым.', 'warning');
                    return;
                }
                if ($.trim(dataObj['login_password']) == '') {
                    notification('Пароль не может быть пустым.', 'warning');
                    return;
                }

                kendo.ui.progress($("#formavtoriz"), true);
                $.ajax({
                    type: 'POST',
                    url: '/engine/ajax/login.php',
                    data: data,
                   // timeout: 300000, // in milliseconds
                    success: function(b) {
                        if (IsJsonString(b)) {
                            var bArray = JSON.parse(b);
                            if (bArray['session']=="undefinet"||bArray['session']==""){
                                notification('Ошибка: Не загрузилась сессия','error', time);
                            }else{
                                if (bArray['status']=="OK"){
                                    location.reload();
                                }
                            }
                        } else {
                                if (b.indexOf('MySQL error')) time = 8000
                                else time = 8000
                                notification('Ошибка: '+b,'error', time);
                                kendo.ui.progress($("#formavtoriz"), false);
                            }
                    },
                    error: function(request, status, err) {
                        if (status == 'timeout') {
                            notification('Ошибка: '+'Время ожидания сервера истекло. ' + err,'error', 8000)
                        } else {
                            notification('Ошибка: '+status + ' - ' + err,'error', 8000)
                        }
                        kendo.ui.progress($("#formavtoriz"), false);
                    }
                })
            })
        })
    </script>

</html>