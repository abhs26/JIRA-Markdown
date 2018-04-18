package ut.com.learnLab.markdown;

import org.junit.Test;
import com.learnLab.markdown.api.MyPluginComponent;
import com.learnLab.markdown.impl.MyPluginComponentImpl;

import static org.junit.Assert.assertEquals;

public class MyComponentUnitTest
{
    @Test
    public void testMyName()
    {
        MyPluginComponent component = new MyPluginComponentImpl(null);
        assertEquals("names do not match!", "myComponent",component.getName());
    }
}