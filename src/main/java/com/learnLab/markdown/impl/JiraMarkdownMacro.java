package com.learnLab.markdown.impl;
import com.atlassian.jira.issue.Issue;
import com.atlassian.jira.issue.RendererManager;
import com.atlassian.jira.issue.fields.renderer.IssueRenderContext;
import com.atlassian.jira.issue.fields.renderer.wiki.AtlassianWikiRenderer;
import com.atlassian.renderer.RenderContext;
import com.atlassian.renderer.v2.RenderMode;
import com.atlassian.renderer.v2.macro.BaseMacro;
import com.atlassian.renderer.v2.macro.MacroException;

import java.util.Map;

/**
 * A JIRA wiki macro that can insert markdown text
 */
public class JiraMarkdownMacro extends BaseMacro
{

    private final RendererManager rendererManager;

    public JiraMarkdownMacro()
    {
        this.rendererManager = ComponentAccessor.getRendererManager();
    }
/*
    public JiraMarkdownMacro(RendererManager rendererManager)
    {
        this.rendererManager = rendererManager;
    }
*/
    public boolean isInline()
    {
        return true;
    }

    public boolean hasBody()
    {
        return true;
    }

    public RenderMode getBodyRenderMode()
    {
        return RenderMode.NO_RENDER;
    }

    public String execute(Map map, String body, RenderContext renderContext) throws MacroException
    {
        return new JiraMarkdownProcessor(rendererManager).markdown(body, buildIssueRenderContext(renderContext));
    }

    private IssueRenderContext buildIssueRenderContext(RenderContext renderContext)
    {
        Issue issue = (Issue) renderContext.getParam(AtlassianWikiRenderer.ISSUE_CONTEXT_KEY);
        return new IssueRenderContext(issue);
    }
}
