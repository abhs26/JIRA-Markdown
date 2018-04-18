(function ()
{ // bb added global window object
    var output, Converter;
    if (typeof exports === "object" && typeof require === "function")
    { // we're in a CommonJS (e.g. Node.js) module
        output = exports;
        Converter = require("./Markdown.Converter").Converter;
    } else
    {
        output = Markdown;
        Converter = output.Converter;
    }

    //
    // BB add support for a shared secret that allows tags to pass through without change IF they contain the shared secret as a data attribute
    // Since the shared secret is a time stamp + random number and cant be pre-guess easily then its perfect as a shared secret to allow tags that
    // don't conform to the regex specs below
    //
    output.getSanitizingConverter = function (sharedSecret)
    {
        var converter = new Converter();

        converter.hooks.chain("postConversion", function (html)
        {
            return sanitizeHtml(html, sharedSecret);
        });
        converter.hooks.chain("postConversion", balanceTags);
        return converter;
    }

    function sanitizeHtml(html, sharedSecret)
    {
        return html.replace(/<[^>]*>?/gi, function (tag)
        {
            return sanitizeTag(tag, sharedSecret);
        });
    }

    // (tags that can be opened/closed) | (tags that stand alone)
    var basic_tag_whitelist = /^(<\/?(b|blockquote|code|del|dd|dl|dt|em|h1|h2|h3|i|kbd|li|ol|p|pre|s|sup|sub|strong|strike|ul|table|thead|tbody|tr|td|th)>|<(br|hr)\s?\/?>)$/i;

    //
    // BB - allowing class attribute
    //
    // <a href="url..." optional title>|</a>
    var a_white = /^(<a\shref="((https?|ftp):\/\/|\/)[-A-Za-z0-9+&@#\/%?=~_|!:,.;\(\)]+"(\stitle="[^"<>]+")?(\sclass="[^"<>]+")?\s?>|<\/a>)$/i;

    // <img src="url..." optional width  optional height  optional alt  optional title
    var img_white = /^(<img\ssrc="(https?:\/\/|\/)[-A-Za-z0-9+&@#\/%?=~_|!:,.;\(\)]+"(\swidth="\d{1,3}")?(\sheight="\d{1,3}")?(\salt="[^"<>]*")?(\stitle="[^"<>]*")?(\sclass="[^"<>]*")?\s?\/?>)$/i;

    var tcell_white = /^<(td|th)(\salign="(right|left|center)")?/i;

    function sanitizeTag(tag, sharedSecret)
    {
        if (tag.match(basic_tag_whitelist) || tag.match(a_white) || tag.match(img_white) || tag.match(tcell_white))
        {
            return tag;
        } else
        {
            if (sharedSecret)
            {
                var searchString = 'data-shared-secret="' + sharedSecret + '"';
                if (tag.indexOf(searchString) != -1)
                {
                    return tag.replace(searchString, "");
                }
            }
            return "";
        }
    }

    /// <summary>
    /// attempt to balance HTML tags in the html string
    /// by removing any unmatched opening or closing tags
    /// IMPORTANT: we *assume* HTML has *already* been
    /// sanitized and is safe/sane before balancing!
    ///
    /// adapted from CODESNIPPET: A8591DBA-D1D3-11DE-947C-BA5556D89593
    /// </summary>
    function balanceTags(html)
    {

        if (html == "")
            return "";

        var re = /<\/?\w+[^>]*(\s|$|>)/g;
        // convert everything to lower case; this makes
        // our case insensitive comparisons easier
        var tags = html.toLowerCase().match(re);

        // no HTML tags present? nothing to do; exit now
        var tagcount = (tags || []).length;
        if (tagcount == 0)
            return html;

        var tagname, tag;
        var ignoredtags = "<p><img><br><li><hr>";
        var match;
        var tagpaired = [];
        var tagremove = [];
        var needsRemoval = false;

        // loop through matched tags in forward order
        for (var ctag = 0; ctag < tagcount; ctag++)
        {
            tagname = tags[ctag].replace(/<\/?(\w+).*/, "$1");
            // skip any already paired tags
            // and skip tags in our ignore list; assume they're self-closed
            if (tagpaired[ctag] || ignoredtags.search("<" + tagname + ">") > -1)
                continue;

            tag = tags[ctag];
            match = -1;

            if (!/^<\//.test(tag))
            {
                // this is an opening tag
                // search forwards (next tags), look for closing tags
                for (var ntag = ctag + 1; ntag < tagcount; ntag++)
                {
                    if (!tagpaired[ntag] && tags[ntag] == "</" + tagname + ">")
                    {
                        match = ntag;
                        break;
                    }
                }
            }

            if (match == -1)
                needsRemoval = tagremove[ctag] = true; // mark for removal
            else
                tagpaired[match] = true; // mark paired
        }

        if (!needsRemoval)
            return html;

        // delete all orphaned tags from the string

        var ctag = 0;
        html = html.replace(re, function (match)
        {
            var res = tagremove[ctag] ? "" : match;
            ctag++;
            return res;
        });
        return html;
    }
})();
