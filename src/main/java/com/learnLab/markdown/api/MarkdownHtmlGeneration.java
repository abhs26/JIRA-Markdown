package com.learnLab.markdown.api;

public interface MarkdownHtmlGeneration {

    String generateImageHTML(String sharedSecret, String url, String alt_text, String title);

    String generateLinkHTML(String sharedSecret, String url, String title, String linkText);
}
