package com.learnLab.markdown.impl;

import com.atlassian.jira.component.ComponentAccessor;
import com.atlassian.jira.issue.RendererManager;
import com.atlassian.jira.issue.fields.renderer.IssueRenderContext;
import com.atlassian.jira.issue.fields.renderer.wiki.AtlassianWikiRenderer;
import com.atlassian.jira.util.JiraKeyUtils;
import com.learnLab.markdown.api.MarkdownHtmlGeneration;
import com.learnLab.markdown.api.PageDownMarkdown;
import org.apache.commons.lang.StringUtils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * The code to do the actual markdown generation
 */
public class JiraMarkdownProcessor
{
    private final RendererManager rendererManager;

    public JiraMarkdownProcessor(RendererManager rendererManager)
    {
        this.rendererManager = rendererManager;
    }

    public String markdown(final String text, final IssueRenderContext issueRenderContext)
    {
        if (StringUtils.isBlank(text))
        {
            return text;
        }
        final JiraMarkdownHtmlGeneration markdownHtmlGeneration = new JiraMarkdownHtmlGeneration(rendererManager, issueRenderContext);
        final PageDownMarkdown pageDownMarkdown = new PageDownMarkdown(markdownHtmlGeneration);

        String markdown = pageDownMarkdown.markdown(text);

        //
        // this is too unreliable.  It looks for :// somewhere and we dont always have that
        // so for now we avoid it.  It would be cool though
        //
        //markdown = JiraKeyUtils.linkBugKeys(markdown);
        markdown = replaceMentionsWithNames(markdown, issueRenderContext);

        return markdown;
    }

    private static final Pattern USER_PROFILE_WIKI_MARKUP_LINK_PATTERN = Pattern.compile("(\\[[~@]*[^\\\\,]+?\\])");

    private String replaceMentionsWithNames(String content, IssueRenderContext issueRenderContext)
    {
        final Matcher wikiMatcher = USER_PROFILE_WIKI_MARKUP_LINK_PATTERN.matcher(content);
        final StringBuffer sb = new StringBuffer();
        int cursor = 0;
        while (wikiMatcher.find())
        {
            sb.append(content.substring(cursor, wikiMatcher.start()));
            cursor = wikiMatcher.end();

            String markup = content.substring(wikiMatcher.start(), wikiMatcher.end());
            if (markup.endsWith("("))
            {
                sb.append(markup); // its a markdown [xxx](link)
            }
            else
            {
                renderUserLink(sb, markup, issueRenderContext);
            }
        }
        sb.append(content.substring(cursor));
        return sb.toString();
    }

    private void renderUserLink(StringBuffer sb, String markup, IssueRenderContext issueRenderContext)
    {
        // in order to get full user profile link rendering we end up using the wiki render to turn [~xxxxx] into a user profile link
        // freaky eh?  wiki in markup inside wiki?
        String wikiLink = rendererManager.getRendererForType(AtlassianWikiRenderer.RENDERER_TYPE).render(markup, issueRenderContext);
        // The wiki renderer sees that we are only rendering the name link,
        // and so it wraps it in paragraph tags which we do not want.
        wikiLink = wikiLink.replaceAll("<p>", "");
        wikiLink = wikiLink.replaceAll("</p>", "");
        sb.append(wikiLink);
    }
}
