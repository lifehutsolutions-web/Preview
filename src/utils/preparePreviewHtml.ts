/**
 * Utility to sanitize and prepare HTML content for live iframe previews.
 * Prevents the iframe from navigating internally or scrolling parent window
 * when links, buttons, or forms inside the preview template are clicked.
 */
export function preparePreviewHtml(rawHtml: string): string {
  if (!rawHtml) return '';

  const interceptorScript = `
<style>
  html, body {
    overscroll-behavior: contain !important;
  }
</style>
<script>
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll or handle hash anchors safely inside iframe WITHOUT scrolling parent window
    document.addEventListener('click', function(e) {
      var anchor = e.target.closest('a');
      if (!anchor) return;

      var href = anchor.getAttribute('href');
      if (!href) return;

      // Handle in-page smooth hash links (e.g. #courses, #reviews)
      if (href.startsWith('#')) {
        e.preventDefault();
        if (href === '#' || href === '') {
          return;
        }
        try {
          var targetEl = document.querySelector(href);
          if (targetEl) {
            // Use iframe window.scrollTo instead of scrollIntoView to avoid parent window scrolling
            var targetTop = targetEl.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({ top: targetTop, behavior: 'smooth' });
          }
        } catch (err) {
          console.warn('Invalid anchor selector:', href);
        }
        return;
      }

      // Handle javascript: void
      if (href.startsWith('javascript:')) {
        return;
      }

      // For all external or absolute URLs (e.g. https://...), force opening in top new window
      if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//')) {
        e.preventDefault();
        window.open(href, '_blank', 'noopener,noreferrer');
        return;
      }

      // For relative links, prevent navigating iframe to parent app root
      if (href.startsWith('/') || href.startsWith('./') || href.startsWith('../')) {
        e.preventDefault();
        console.info('Prevented relative preview iframe navigation to:', href);
        return;
      }
    }, true);

    // Prevent form submits from navigating iframe
    document.addEventListener('submit', function(e) {
      e.preventDefault();
      var form = e.target;
      if (form) {
        alert('Form submission captured in live preview mode!');
      }
    }, true);

  });
})();
</script>
`;

  let processedHtml = rawHtml;

  // 1. Inject <base target="_blank"> if <head> exists, or prepend if not
  if (processedHtml.includes('<head>')) {
    processedHtml = processedHtml.replace(
      '<head>',
      '<head>\n<base target="_blank">'
    );
  } else if (processedHtml.includes('<HEAD>')) {
    processedHtml = processedHtml.replace(
      '<HEAD>',
      '<HEAD>\n<base target="_blank">'
    );
  } else {
    processedHtml = '<base target="_blank">\n' + processedHtml;
  }

  // 2. Inject interceptor script before </body> or at the end
  if (processedHtml.includes('</body>')) {
    processedHtml = processedHtml.replace('</body>', `${interceptorScript}\n</body>`);
  } else if (processedHtml.includes('</BODY>')) {
    processedHtml = processedHtml.replace('</BODY>', `${interceptorScript}\n</BODY>`);
  } else {
    processedHtml = processedHtml + interceptorScript;
  }

  return processedHtml;
}
