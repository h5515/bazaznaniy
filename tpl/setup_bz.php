<?php
session_start();
define('DATALIFEENGINE', true);
define('ROOT_DIR', dirname(__FILE__) . '../../');
define('ENGINE_DIR', ROOT_DIR . 'engine');
include ENGINE_DIR . '/data/config.php';
require_once ENGINE_DIR . '/classes/mysql.php';
require_once ENGINE_DIR . '/data/dbconfig.php';
require_once ENGINE_DIR . '/modules/functions.php';

?>
<style>
    .k-form-clear {
        display: none !important;
    }
</style>
<div class="">
    <div id="validation-success"></div>
    <form id="setupbzform" action="/php/setup_bz.php" method="post">
        <div id="settabstrip">
            <ul>
                <li class="k-state-active"><span class="fa fa-file-text-o"></span> Статьи</li>
                <li class=""><span class="fa fa-commenting-o"></span> Комментарии</li>
            </ul>
        </div>
    </form>
</div>

<script>
    
    $(document).ready(function() {
        var validationSuccess = $("#validation-success");


        $("#settabstrip").kendoForm({
            orientation: "vertical",
            formData: {
                Username: "johny",
                Email: "john.doe@email.com",
                Password: "pass123",
                Birth: new Date(),
                Agree: false
            },
            messages: {
                submit: "Сохранить"
            },
            items: [{
                    type: "group",
                    items: [{
                            field: "Username",
                            label: "Username:",
                            validation: {
                                required: {
                                    message: "The field is required"
                                },
                                pattern: {
                                    value: "[a-z A-Z]+",
                                    message: "Invalid input"
                                }
                            },
                            hint: "Only lower and upper case letters are allowed"
                        },
                        {
                            field: "Email",
                            label: "Email:",
                            validation: {
                                required: true,
                                email: true
                            }
                        },
                        {
                            field: "Password",
                            label: "Password:",
                            validation: {
                                required: true
                            },
                            hint: "Hint: enter alphanumeric characters only.",
                            editor: function(container, options) {
                                $('<input type="password" id="Password" name="' + options.field + '" title="Password" required="required" autocomplete="off" aria-labelledby="Password-form-label" data-bind="value: Password" aria-describedby="Password-form-hint"/>')
                                    .appendTo(container)
                                    .kendoTextBox();
                            }
                        },
                        {
                            field: "Birth",
                            label: {
                                text: "Date of birth:",
                                optional: true
                            }
                        },
                        {
                            field: "Agree",
                            label: "Agree to Terms:",
                            validation: {
                                required: true
                            }
                        }
                    ]
                },
                {
                    type: "group",
                    items: [{
                        field: "User",
                        label: "User:",
                        validation: {
                            required: {
                                message: "The field is required"
                            },
                            pattern: {
                                value: "[a-z A-Z]+",
                                message: "Invalid input"
                            }
                        },
                        hint: "Only lower and upper case letters are allowed"
                    }],
                }

            ],
            formatLabel: function(field) {
                return field + ":";
            },
            validateField: function(e) {
                validationSuccess.html("");
            },
            submit: function(e) {
                e.preventDefault();
                validationSuccess.html("<div class='k-messagebox k-messagebox-success'>Form data is valid!</div>");
            },

        });

        $('#setupbzform fieldset').replaceWith(function() {
            return $("<div />", {
                html: $(this).html()
            });
        });

       //$("#setupbzform div").not('.k-form-field, .settabstrip').eq(0).appendTo('#settabstrip');
       $('#setupbzform .k-form-buttons').appendTo('#setupbzform');
        $("#settabstrip").kendoTabStrip({
        animation: {
            open: {
                effects: "fadeIn"
            }
        }
         });
    });
</script>