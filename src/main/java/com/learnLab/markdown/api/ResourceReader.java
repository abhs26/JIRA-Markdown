package com.learnLab.markdown.api;

import java.io.*;
import java.net.URL;

/**
 * A class to help with reading resources from within the plugin
 */
public class ResourceReader
{
    public ResourceReader readResource(String resource, Writer writer)
    {
        URL url = toURL(resource);
        if (url == null)
        {
            throw new RuntimeException("Cannot locate the resource : " + resource);
        }

        BufferedReader reader = null;
        try
        {
            InputStream is = url.openStream();
            reader = new BufferedReader(new InputStreamReader(is));
            String s;
            while ((s = reader.readLine()) != null)
            {
                writer.write(s);
                writer.append('\n');
            }
            writer.append('\n');
        }
        catch (IOException e)
        {
            throw new RuntimeException("Unable to load resource : " + url.toString(), e);
        }
        finally
        {
            closeIt(reader);
        }
        return this;
    }

    private URL toURL(String name)
    {
        return ResourceReader.class.getClassLoader().getResource(name);
    }

    private void closeIt(Reader reader)
    {
        try
        {
            if (reader != null)
            {
                reader.close();
            }
        }
        catch (IOException ignored)
        {
        }
    }


}
