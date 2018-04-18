package ut.com.learnLab.markdown;

import org.junit.Assert;
import org.junit.Test;
import com.learnLab.markdown.api.PageDownMarkdown;
import static org.junit.Assert.assertNotNull;

public class PageDownMarkdownTest
{
    @Test
    public void testMarkdownJSInvocation() throws Exception
    {

        String text = "" +
                "A First Level Header\n" +
                "====================\n" +
                "\n" +
                "A Second Level Header\n" +
                "---------------------\n" +
                "\n\n" +
                "![Alt text](/path/to/img.jpg)";

        String markdown = new PageDownMarkdown().markdown(text);
        assertNotNull(markdown);
        Assert.assertTrue(markdown.contains("<h1>A First Level Header</h1>"));
        Assert.assertTrue(markdown.contains("<h2>A Second Level Header</h2>"));
    }

    @Test
    public void testXSSProtection() throws Exception
    {

        String text = "" +
                "A First Level Header\n" +
                "====================\n" +
                "\n" +
                "And this is <script>alert('xss')</script>" +
                "\n" +
                "A Second Level Header\n" +
                "---------------------";
        String markdown = new PageDownMarkdown().markdown(text);
        assertNotNull(markdown);
        Assert.assertTrue(markdown.contains("<h1>A First Level Header</h1>"));
        Assert.assertTrue(markdown.contains("<h2>A Second Level Header</h2>"));
        Assert.assertFalse(markdown.contains("<script>"));
    }

}
