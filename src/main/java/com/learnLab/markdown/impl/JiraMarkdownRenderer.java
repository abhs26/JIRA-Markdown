package com.learnLab.markdown.impl;

import com.atlassian.jira.issue.RendererManager;
import com.atlassian.jira.issue.fields.renderer.IssueRenderContext;
import com.atlassian.jira.issue.fields.renderer.JiraRendererPlugin;
import com.atlassian.jira.plugin.renderer.JiraRendererModuleDescriptor;
import com.atlassian.jira.component.ComponentAccessor;

/**
 * A JIRA markdown field renderer
 */
public class JiraMarkdownRenderer implements JiraRendererPlugin
{
    public static final String RENDERER_TYPE = "atlassian-jira-markdown-renderer";

    private JiraRendererModuleDescriptor jiraRendererModuleDescriptor;

    private final RendererManager rendererManager;


    public JiraMarkdownRenderer( )
    {

        this.rendererManager = ComponentAccessor.getRendererManager();

    }

    public String render(String value, IssueRenderContext context)
    {
        return new JiraMarkdownProcessor(rendererManager).markdown(value, context);
    }

    public String renderAsText(String value, IssueRenderContext context)
    {
        return value;
    }

    public String getRendererType()
    {
        return RENDERER_TYPE;
    }

    public Object transformForEdit(Object rawValue)
    {
        return rawValue;
    }

    public Object transformFromEdit(Object editValue)
    {
        return editValue;
    }

    public void init(JiraRendererModuleDescriptor jiraRendererModuleDescriptor)
    {
        this.jiraRendererModuleDescriptor = jiraRendererModuleDescriptor;
    }

    public JiraRendererModuleDescriptor getDescriptor()
    {
        return jiraRendererModuleDescriptor;
    }

}