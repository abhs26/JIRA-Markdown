package com.learnLab.markdown.api;

import javax.script.*;
import java.io.*;

/**
 * This markdown generation code uses a JavaScript engine to invoke the same PageDown JS.
 * <p/>
 * This means the server side and client side are producing the same results.
 */
public class PageDownMarkdown
{
    private final MarkdownHtmlGeneration markdownHtmlGeneration;

    public PageDownMarkdown(MarkdownHtmlGeneration markdownHtmlGeneration)
    {
        this.markdownHtmlGeneration = markdownHtmlGeneration;
    }

    public PageDownMarkdown()
    {
        this.markdownHtmlGeneration = null;
    }

    public String markdown(final String markdownText)
    {
        final ClassLoader loader = ClassLoader.getSystemClassLoader();
        final ScriptEngineManager factory = new ScriptEngineManager(loader);
        final ScriptEngine engine = factory.getEngineByName("JavaScript");
        final Invocable invocableEngine = (Invocable) engine;
        try
        {
            final Bindings bindings = new SimpleBindings();
            bindings.put("javaHtmlGeneration", markdownHtmlGeneration);

            String js = getPageDownJS();

            Object pageDownConverter = engine.eval(js, bindings);
            return invocableEngine.invokeMethod(pageDownConverter, "makeHtml", markdownText) + "";
        }
        catch (ScriptException e)
        {
            throw runtimeAssertion(e);
        }
        catch (NoSuchMethodException e)
        {
            throw runtimeAssertion(e);
        }
    }

    private String getPageDownJS()
    {
        final StringWriter sw = new StringWriter();

        new ResourceReader()
                .readResource("pagedown/js/Markdown.Converter.js", sw)
                .readResource("pagedown/js/Markdown.Sanitizer.js", sw)
                .readResource("pagedown/js/Markdown.SharedSecret.js", sw);

        return sw.toString();
    }

    private RuntimeException runtimeAssertion(Exception e)
    {
        return new RuntimeException("This is really not expected and indicates something seriously wrong with the PageDown JavaScript code", e);
    }


}

