package com.learnLab.markdown.impl;

import com.learnLab.markdown.api.PageDownMarkdown;
import com.learnLab.markdown.api.ResourceReader;
import com.atlassian.jira.web.action.JiraWebActionSupport;


import java.io.StringWriter;

/**
 * An action to show help in
 */
public class MarkdownHelpAction extends JiraWebActionSupport
{
    @Override
    protected String doExecute() throws Exception
    {
        return SUCCESS;
    }

    public String getHelpHTML()
    {
        return new PageDownMarkdown().markdown(getHelpContents());
    }

    private String getHelpContents()
    {
        StringWriter sw = new StringWriter();
        new ResourceReader().readResource("templates/markdown-help.md", sw);
        return sw.toString();
    }
}
