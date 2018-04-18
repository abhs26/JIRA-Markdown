package com.learnLab.markdown.impl;

import com.learnLab.markdown.api.MarkdownHtmlGeneration;
import com.atlassian.jira.issue.RendererManager;
import com.atlassian.jira.issue.fields.renderer.IssueRenderContext;
import com.atlassian.jira.issue.fields.renderer.wiki.AtlassianWikiRenderer;
import org.apache.commons.lang.StringUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * This understands JIRA constructs such as attachments
 */
public class JiraMarkdownHtmlGeneration implements MarkdownHtmlGeneration
{
    public static final Pattern HTTP_URL = Pattern.compile("^http[s]*:https?:\\/\\/");
    public static final Pattern P_TAGS = Pattern.compile("^<p>(.*)</p>$");
    private final RendererManager rendererManager;
    private final IssueRenderContext issueRenderContext;

    public JiraMarkdownHtmlGeneration(RendererManager rendererManager, IssueRenderContext issueRenderContext)
    {
        this.rendererManager = rendererManager;
        this.issueRenderContext = issueRenderContext;
    }

    public String generateImageHTML(String sharedSecret, String url, String alt_text, String title)
    {
        StringBuilder sb = new StringBuilder("!");
        if (HTTP_URL.matcher(url).find())
        {
            sb.append(url);
        }
        else
        {
            sb.append(url).append("|thumbnail");
        }
        addWikiAttr(sb, "alt", alt_text);
        addWikiAttr(sb, "title", title);

        sb.append("!");

        return addSharedSecret(sharedSecret, "img", render(sb.toString()));
    }

    public String generateLinkHTML(String sharedSecret, String url, String title, String linkText)
    {
        StringBuilder sb = new StringBuilder()
                .append("[")
                .append(linkText)
                .append('|')
                .append(url);
        if (StringUtils.isNotBlank(title))
        {
            sb.append('|').append(title);
        }

        sb.append("]");

        return addSharedSecret(sharedSecret, "a", render(sb.toString()));
    }

    private void addWikiAttr(StringBuilder sb, String name, String value)
    {
        if (StringUtils.isNotBlank(value))
        {
            appendChar(sb, '|', ',');
            sb.append(name).append('=').append(value).append(',');
        }
    }

    private boolean appendChar(StringBuilder sb, final char c, char ifnotChar)
    {
        if (sb.charAt(sb.length() - 1) != ifnotChar)
        {
            sb.append(c);
            return true;
        }
        return false;
    }

    private String render(String wikiText)
    {
        return rendererManager.getRendererForType(AtlassianWikiRenderer.RENDERER_TYPE).render(wikiText, issueRenderContext);
    }

    private String addSharedSecret(String sharedSecret, String selector, String html)
    {
        // wiki rendering puts <p> tags that we dont want
        Matcher matcher = P_TAGS.matcher(html);
        if (matcher.matches())
        {
            html = matcher.group(1);
        }

        Document frag = Jsoup.parseBodyFragment(html);
        frag.select(selector).attr("data-shared-secret", sharedSecret);
        return frag.body().html();
    }
}
