(function ($) {

    var initPagedownEditor = function (e, context) {

        context = context || document.body;

        prettyPrint();


        $('.wmd-input',context).each(function () {

            var wmdinput = $(this);

            if (wmdinput.data('bound')) {
                return;
            }
            var idPostfix = wmdinput.attr('data-id-postfix');

            var converter = Markdown.getSharedSecretConverter();
            var showHelp = function () {
                window.open(contextPath + '/MarkdownHelpAction.jspa', 'markdown_renderer_notation_help', 'width=780, height=800, resizable, scrollbars=yes');
            };

            var helpConfig = { handler:showHelp };
            var editor = new Markdown.Editor(converter, "-" + idPostfix, null);
            editor.run();

            // turn on preview buttons
            $("#wmd-preview-button-" + idPostfix).bind('click', function (event) {
                event.preventDefault();
                $(this).toggleClass('selected');
                $("#wmd-preview-container-" + idPostfix).toggleClass('selected');
            });

            $("#wmd-help-button-" + idPostfix).bind('click', function (event) {
                event.preventDefault();
                showHelp();
            });

            prettyPrint();

        });
    };


    if (JIRA.Events && JIRA.Events.NEW_CONTENT_ADDED) {
        JIRA.bind(JIRA.Events.NEW_CONTENT_ADDED, initPagedownEditor);
    } else {
        $(initPagedownEditor);
    }

})(jQuery);