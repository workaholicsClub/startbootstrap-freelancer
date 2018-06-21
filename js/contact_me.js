$(function () {

    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function ($form, event) {
            event.preventDefault(); // prevent default submit behaviour

            var name = $("input#name").val();
            var email = $("input#email").val();
            var message = $("textarea#message").val();

            var $this = $("#sendMessageButton");
            $this.prop("disabled", true);

            var slackWebhookUrl = 'https://hooks.slack.com/services/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';
            var messageData = {
                "username": "Промо-сайт",
                "icon_emoji": ":ghost:",
                "text": 'Заполнена заявка!\n*Имя:* '+name+'\n*Email:* '+email+'\n*Помощь требуется в:* '+message
            };

            $.ajax({
                url: slackWebhookUrl,
                type: "POST",
                data: 'payload='+JSON.stringify(messageData),
                cache: false,
                success: function () {
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success')
                        .html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>")
                        .append("<strong>Заявка успешно оправлена!</strong>")
                        .append('</div>');
                    $('#contactForm').trigger("reset");
                },
                error: function () {
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger')
                        .html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>")
                        .append(
                            $("<strong>")
                                .text("Возникла ошибка отправки заявки! Попробуйте позже или свяжитесь со мной по контактам, указанным ниже. Спасибо за понимание!")
                        )
                        .append('</div>');

                    $('#contactForm').trigger("reset");
                },
                complete: function () {
                    setTimeout(function () {
                        $this.prop("disabled", false);
                    }, 1000);
                }
            });
        },
        filter: function () {
            return $(this).is(":visible");
        }
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function () {
    $('#success').html('');
});
