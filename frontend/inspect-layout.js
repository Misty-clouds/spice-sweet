const puppeteer = require('puppeteer');

async function inspectLayout() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1920, height: 1080 });
  
  try {
    console.log('Navigating to http://localhost:3000...');
    await page.goto('http://localhost:3000', { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    console.log('\n=== Page Layout Analysis ===\n');
    
    // Check for console errors
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    // Get computed styles of body and main elements
    const layoutInfo = await page.evaluate(() => {
      const body = document.body;
      const main = document.querySelector('main');
      const html = document.documentElement;
      
      const getStyles = (el, name) => {
        if (!el) return null;
        const styles = window.getComputedStyle(el);
        return {
          element: name,
          display: styles.display,
          position: styles.position,
          width: styles.width,
          height: styles.height,
          margin: styles.margin,
          padding: styles.padding,
          overflow: styles.overflow,
          backgroundColor: styles.backgroundColor,
          fontFamily: styles.fontFamily,
          fontSize: styles.fontSize,
          color: styles.color,
        };
      };
      
      return {
        html: getStyles(html, 'html'),
        body: getStyles(body, 'body'),
        main: getStyles(main, 'main'),
        bodyChildren: Array.from(body.children).map(child => ({
          tagName: child.tagName,
          id: child.id,
          className: child.className,
          display: window.getComputedStyle(child).display,
          position: window.getComputedStyle(child).position,
        })),
      };
    });
    
    console.log('HTML Styles:', JSON.stringify(layoutInfo.html, null, 2));
    console.log('\nBody Styles:', JSON.stringify(layoutInfo.body, null, 2));
    console.log('\nMain Styles:', JSON.stringify(layoutInfo.main, null, 2));
    console.log('\nBody Children:', JSON.stringify(layoutInfo.bodyChildren, null, 2));
    
    // Take a screenshot
    await page.screenshot({ path: 'layout-screenshot.png', fullPage: true });
    console.log('\n✓ Screenshot saved to layout-screenshot.png');
    
    // Check for CSS errors
    const cssErrors = await page.evaluate(() => {
      const errors = [];
      const sheets = Array.from(document.styleSheets);
      
      sheets.forEach((sheet, i) => {
        try {
          if (sheet.cssRules) {
            // Successfully accessed
          }
        } catch (e) {
          errors.push(`Sheet ${i}: ${e.message}`);
        }
      });
      
      return errors;
    });
    
    if (cssErrors.length > 0) {
      console.log('\n❌ CSS Loading Errors:', cssErrors);
    }
    
    // Get all loaded stylesheets
    const stylesheets = await page.evaluate(() => {
      return Array.from(document.styleSheets).map(sheet => ({
        href: sheet.href,
        disabled: sheet.disabled,
        rules: sheet.cssRules ? sheet.cssRules.length : 'blocked',
      }));
    });
    
    console.log('\n=== Loaded Stylesheets ===');
    console.log(JSON.stringify(stylesheets, null, 2));
    
    // Check for Tailwind classes
    const tailwindCheck = await page.evaluate(() => {
      const testDiv = document.createElement('div');
      testDiv.className = 'bg-red-500 text-white p-4';
      document.body.appendChild(testDiv);
      
      const styles = window.getComputedStyle(testDiv);
      const result = {
        backgroundColor: styles.backgroundColor,
        color: styles.color,
        padding: styles.padding,
        tailwindWorking: styles.backgroundColor !== 'rgba(0, 0, 0, 0)' && styles.backgroundColor !== 'transparent',
      };
      
      document.body.removeChild(testDiv);
      return result;
    });
    
    console.log('\n=== Tailwind CSS Check ===');
    console.log(JSON.stringify(tailwindCheck, null, 2));
    
    // Check for custom CSS variables
    const cssVars = await page.evaluate(() => {
      const root = document.documentElement;
      const styles = window.getComputedStyle(root);
      return {
        brandPrimary: styles.getPropertyValue('--brand-primary'),
        brandHover: styles.getPropertyValue('--brand-hover'),
      };
    });
    
    console.log('\n=== Custom CSS Variables ===');
    console.log(JSON.stringify(cssVars, null, 2));
    
  } catch (error) {
    console.error('Error inspecting page:', error.message);
  } finally {
    await browser.close();
  }
}

inspectLayout();
