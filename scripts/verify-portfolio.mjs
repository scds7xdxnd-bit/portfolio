import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import puppeteer from 'puppeteer';

// Run against the production preview, not a development server.
const base=process.env.PORTFOLIO_BASE_URL||'http://127.0.0.1:4173';
const browser=await puppeteer.launch({headless:true});
const errors=[];
const page=await browser.newPage();
page.on('pageerror',error=>errors.push(error.message));
await mkdir('/tmp/portfolio-verification',{recursive:true});
const visibleRows=()=>page.$$eval('.sun-archive-item',els=>els.filter(e=>!e.hidden).length);
try {
  await page.setViewport({width:1440,height:1000});
  await page.goto(base,{waitUntil:'networkidle2'});
  assert.match(await page.$eval('h1',e=>e.innerText),/I want to be\s+the sun of Korea/);
  assert.equal(await visibleRows(),8);
  await page.click('.sun-archive-toggle');
  assert.equal(await visibleRows(),38,'All legacy portfolio entries remain discoverable');
  await page.click('[data-filter="builder"]');
  assert(await page.$$eval('.sun-archive-item:not([hidden])',els=>els.length>0&&els.every(e=>e.dataset.domain==='builder')));
  await page.type('#archive-search','LifeOS');
  assert.equal(await visibleRows(),1,'Search composes with the discipline filter');
  await page.click('[data-language="ko"]');
  assert.equal(await page.$eval('#archive-search',e=>e.value),'LifeOS');
  assert.equal(await visibleRows(),1,'Filtering survives language switching');
  await page.click('[data-language="en"]');
  await page.$eval('#archive-search',e=>{e.value='zz-no-match';e.dispatchEvent(new Event('input',{bubbles:true}));});
  assert.equal(await visibleRows(),0);
  assert.equal(await page.$eval('#archive-empty',e=>e.hidden),false);
  await page.click('.sun-search-trigger');
  await page.type('#sun-search-input','GLEAM');
  await page.keyboard.press('Enter');
  await page.waitForFunction(()=>document.querySelector('#entry-builder-6').open);
  assert.equal(await page.$eval('#sun-search',e=>e.open),false);
  assert.equal(await page.$eval('#entry-builder-6',e=>e.hidden),false,'Search reveals an entry beyond the collapsed archive');
  await page.keyboard.down('Control');await page.keyboard.press('k');await page.keyboard.up('Control');
  assert.equal(await page.$eval('#sun-search',e=>e.open),true);
  await page.keyboard.press('Escape');
  assert.equal(await page.$eval('#sun-search',e=>e.open),false);
  for(const id of ['engineer','linguist','builder','community','scholar']) {
    await page.goto(`${base}/#${id}`,{waitUntil:'networkidle2'});
    assert.equal(await page.$eval(`[data-place="${id}"]`,e=>e.getAttribute('aria-pressed')),'true');
    assert.equal(await page.$$eval('[data-place][aria-pressed="true"]',els=>els.length),1);
  }
  for(const width of [320,390,768,1024,1440]) {
    await page.setViewport({width,height:900});
    for(const lang of ['en','ko','zh']) {
      await page.click(`[data-language="${lang}"]`);
      assert.equal(await page.$eval('html',e=>e.lang),lang);
      const geometry=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,missing:[...document.images].filter(e=>e.complete&&!e.naturalWidth).map(e=>e.src)}));
      assert.equal(geometry.overflow,false,`No horizontal overflow at ${width}/${lang}`);
      assert.deepEqual(geometry.missing,[]);
      assert.equal(await page.$eval('[data-place="scholar"]',e=>e.getAttribute('aria-pressed')),'true');
    }
  }
  await page.setViewport({width:390,height:844});
  await page.click('[data-language="en"]');
  await page.click('.sun-menu');
  assert.equal(await page.$eval('.sun-menu',e=>e.getAttribute('aria-expanded')),'true');
  await page.keyboard.press('Escape');
  assert.equal(await page.$eval('.sun-menu',e=>e.getAttribute('aria-expanded')),'false');
  assert.equal(await page.$eval('.sun-menu',e=>e===document.activeElement),true);
  await page.click('.sun-menu');await page.click('#sun-nav-links a[href="#work"]');
  assert.equal(await page.$eval('.sun-menu',e=>e.getAttribute('aria-expanded')),'false');
  await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
  assert.equal(await page.$eval('.sun-button',e=>getComputedStyle(e).transitionDuration),'0s');
  await page.goto(base,{waitUntil:'networkidle2'});
  await page.screenshot({path:'/tmp/portfolio-verification/mobile-home.png'});
  assert.match(await page.$eval('.sun-hero-art img',e=>e.currentSrc),/dawn-mobile/);
  await page.evaluate(()=>document.getElementById('world').scrollIntoView({behavior:'instant'}));
  await page.screenshot({path:'/tmp/portfolio-verification/mobile-world.png'});
  const cvPaths={en:'/cv-en.pdf',ko:'/cv.pdf',zh:'/cv-zh.pdf'};
  for(const [lang,path] of Object.entries(cvPaths)){
    await page.click(`[data-language="${lang}"]`);
    assert.equal(await page.$eval('.sun-footer a[download]',e=>e.getAttribute('href')),path);
  }
  for(const path of ['/cv-en.pdf','/cv-zh.pdf','/cv-zh-hant.pdf','/cv.pdf']){
    const response=await fetch(base+path);assert.equal(response.status,200);assert.match(response.headers.get('content-type'),/pdf/);
  }
  await page.click('[data-language="en"]');
  await browser.defaultBrowserContext().overridePermissions(base,['clipboard-read','clipboard-write','clipboard-sanitized-write']);
  await page.click('.sun-copy-email');
  await page.waitForFunction(()=>document.querySelector('.sun-copy-status').textContent==='Email copied');
  assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),'ammarhakimikm03@gmail.com');
  const localLinks=await page.$$eval('a[href^="/"]',els=>[...new Set(els.map(e=>e.getAttribute('href').split('#')[0]))]);
  for(const path of localLinks){const res=await fetch(base+path);assert.equal(res.status,200,path);if(!path.endsWith('/')&&!path.endsWith('.html'))assert(!res.headers.get('content-type')?.includes('text/html'),`${path} must not fall back to homepage`);}
  for(const path of ['/projects/lifeos.html','/projects/reaction-simulator.html','/projects/pals.html','/opinions/','/opinions/does-quantum-chemistry-help.html','/opinions/chemical-potential.html','/opinions/engineering-under-uncertainty.html','/samsung-leadership-camp/']){
    await page.goto(base+path,{waitUntil:'networkidle2'});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`Mobile overflow: ${path}`);
    assert(await page.$('h1'),path);
    await page.screenshot({path:'/tmp/portfolio-verification/'+path.replace(/[^a-z0-9]/gi,'-')+'.png'});
  }
  await page.setViewport({width:1440,height:1000});await page.goto(base,{waitUntil:'networkidle2'});
  await page.screenshot({path:'/tmp/portfolio-verification/desktop-home.png'});
  const nojs=await browser.newPage();await nojs.setJavaScriptEnabled(false);await nojs.setViewport({width:390,height:844});await nojs.goto(base,{waitUntil:'networkidle2'});
  assert.match(await nojs.$eval('h1',e=>e.innerText),/sun of Korea/);
  assert.equal(await nojs.$$eval('.sun-archive-item',els=>els.length),38);
  assert.equal(await nojs.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await nojs.click('#entry-builder-0 summary');assert.equal(await nojs.$eval('#entry-builder-0',e=>e.open),true);
  const jsonld=await nojs.$eval('script[type="application/ld+json"]',e=>JSON.parse(e.textContent));assert.equal(jsonld['@graph'][0].name,'Taeyang Han');
  await nojs.close();
  assert.deepEqual(errors,[],'No browser runtime errors across the portfolio');
  console.log('PASS: production homepage, 38-entry archive, filters, search, 5 world routes, 15 locale/viewport combinations, mobile menu, reduced motion, clipboard, 4 CV downloads, 8 subpages, and no-JS content.');
} finally {await browser.close();}
