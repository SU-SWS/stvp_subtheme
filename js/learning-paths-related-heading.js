/**
 * @file
 * Replaces "More Spotlights" with "More Learning Paths" on Learning Paths news.
 *
 * Uses body.stvp-learning-path-news-page (set in preprocess_html). Scans <main>
 * on full load and each BigPipe fragment so late-loaded view blocks are covered.
 */
(function (Drupal) {
  'use strict';

  function replaceMoreSpotlights(root) {
    if (!root || !root.nodeType) {
      return;
    }
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    const toUpdate = [];
    let textNode;
    while ((textNode = walker.nextNode())) {
      if (textNode.nodeValue && textNode.nodeValue.indexOf('More Spotlights') !== -1) {
        toUpdate.push(textNode);
      }
    }
    toUpdate.forEach((tn) => {
      tn.nodeValue = tn.nodeValue.replace(/More Spotlights/g, 'More Learning Paths');
    });
  }

  Drupal.behaviors.stvpLearningPathsRelatedHeading = {
    attach(context) {
      if (!document.body.classList.contains('stvp-learning-path-news-page')) {
        return;
      }
      if (context.nodeType === Node.DOCUMENT_NODE) {
        const main = document.querySelector('main') || document.body;
        replaceMoreSpotlights(main);
        return;
      }
      replaceMoreSpotlights(context);
    },
  };
})(Drupal);
