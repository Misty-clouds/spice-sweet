const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1440, height: 900 });
  
  try {
    console.log('🔍 Loading page...');
    await page.goto('http://localhost:3000', { 
      waitUntil: 'networkidle2',
      timeout: 10000 
    });
    
    console.log('✅ Page loaded successfully\n');
    
    // Take screenshot
    await page.screenshot({ path: 'layout-screenshot.png', fullPage: true });
    console.log('📸 Screenshot saved to layout-screenshot.png\n');
    
    // Check for horizontal scroll
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    
    console.log('📏 Layout Analysis:');
    console.log(`   Horizontal Scroll: ${hasHorizontalScroll ? '❌ YES (PROBLEM!)' : '✅ NO'}`);
    
    // Get body and html dimensions
    const dimensions = await page.evaluate(() => {
      const html = document.documentElement;
      const body = document.body;
      return {
        htmlWidth: html.scrollWidth,
        htmlClientWidth: html.clientWidth,
        bodyWidth: body.scrollWidth,
        bodyClientWidth: body.clientWidth,
        viewportWidth: window.innerWidth,
      };
    });
    
    console.log(`   HTML scroll width: ${dimensions.htmlWidth}px`);
    console.log(`   HTML client width: ${dimensions.htmlClientWidth}px`);
    console.log(`   Body scroll width: ${dimensions.bodyWidth}px`);
    console.log(`   Body client width: ${dimensions.bodyClientWidth}px`);
    console.log(`   Viewport width: ${dimensions.viewportWidth}px\n`);
    
    // Find elements causing overflow
    const overflowElements = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      const viewport = window.innerWidth;
      const problematic = [];
      
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const computed = window.getComputedStyle(el);
        
        if (rect.width > viewport || rect.right > viewport + 10) {
          problematic.push({
            tag: el.tagName.toLowerCase(),
            class: el.className,
            width: Math.round(rect.width),
            right: Math.round(rect.right),
            overflow: computed.overflow,
            overflowX: computed.overflowX,
          });
        }
      });
      
      return problematic.slice(0, 10); // Top 10
    });
    
    if (overflowElements.length > 0) {
      console.log('⚠️  Elements causing overflow:');
      overflowElements.forEach((el, i) => {
        console.log(`   ${i + 1}. <${el.tag}> (${el.class})`);
        console.log(`      Width: ${el.width}px, Right: ${el.right}px`);
        console.log(`      overflow-x: ${el.overflowX}\n`);
      });
    }
    
    // Check specific components
    const componentStyles = await page.evaluate(() => {
      const checks = {};
      
      // Navbar
      const nav = document.querySelector('nav');
      if (nav) {
        const computed = window.getComputedStyle(nav);
        checks.navbar = {
          background: computed.backgroundColor,
          position: computed.position,
          width: nav.getBoundingClientRect().width + 'px',
        };
      }
      
      // Hero section
      const hero = document.querySelector('section');
      if (hero) {
        const computed = window.getComputedStyle(hero);
        checks.hero = {
          background: computed.background,
          width: hero.getBoundingClientRect().width + 'px',
          overflow: computed.overflow,
          overflowX: computed.overflowX,
        };
      }
      
      // Main content
      const main = document.querySelector('main');
      if (main) {
        const computed = window.getComputedStyle(main);
        checks.main = {
          background: computed.background,
          width: main.getBoundingClientRect().width + 'px',
          maxWidth: computed.maxWidth,
        };
      }
      
      return checks;
    });
    
    console.log('🎨 Component Styles:');
    console.log(JSON.stringify(componentStyles, null, 2));
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
})();
