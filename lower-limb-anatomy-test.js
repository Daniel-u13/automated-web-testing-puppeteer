const puppeteer = require('puppeteer');
const path = require('path');
const assert = require('assert');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: process.env.CHROME_PATH || undefined,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  const filePath = 'file://' + path.resolve(__dirname, 'lower-limb-anatomy-guide.html');
  await page.goto(filePath);

  console.log('--- Lower Limb Anatomy Guide Tests ---\n');
  let passed = 0;
  let failed = 0;

  function report(name, ok) {
    if (ok) {
      passed++;
      console.log(`  PASS: ${name}`);
    } else {
      failed++;
      console.log(`  FAIL: ${name}`);
    }
  }

  // 1. Page title
  const title = await page.title();
  report('Page title is correct', title === 'Lower Limb Anatomy Guide');

  // 2. Header renders
  const headerText = await page.$eval('header h1', el => el.textContent);
  report('Header h1 renders', headerText === 'Lower Limb Anatomy Guide');

  // 3. All 7 nav buttons present
  const navCount = await page.$$eval('nav button', btns => btns.length);
  report('All 7 navigation buttons present', navCount === 7);

  // 4. Overview section is visible by default
  const overviewVisible = await page.$eval('#section-overview', el =>
    el.classList.contains('visible')
  );
  report('Overview section visible by default', overviewVisible);

  // 5. Other sections hidden by default
  const hiddenSections = await page.$$eval(
    '.section:not(#section-overview)',
    sections => sections.every(s => !s.classList.contains('visible'))
  );
  report('Non-overview sections hidden by default', hiddenSections);

  // 6. Navigate to Bones section
  await page.click('button[data-section="bones"]');
  const bonesVisible = await page.$eval('#section-bones', el =>
    el.classList.contains('visible')
  );
  const overviewHidden = await page.$eval('#section-overview', el =>
    !el.classList.contains('visible')
  );
  report('Clicking Bones tab shows bones section', bonesVisible && overviewHidden);

  // 7. Bones table has correct rows
  const boneRows = await page.$$eval('#bones-table tbody tr', rows => rows.length);
  report('Bones table has 8 rows', boneRows === 8);

  // 8. Navigate to Muscles section
  await page.click('button[data-section="muscles"]');
  const musclesVisible = await page.$eval('#section-muscles', el =>
    el.classList.contains('visible')
  );
  report('Muscles section displays on click', musclesVisible);

  // 9. Navigate to Nerves section and check table
  await page.click('button[data-section="nerves"]');
  const nerveRows = await page.$$eval('#nerves-table tbody tr', rows => rows.length);
  report('Nerves table has 7 rows', nerveRows === 7);

  // 10. Navigate to Vasculature section
  await page.click('button[data-section="vasculature"]');
  const arteriesRows = await page.$$eval('#arteries-table tbody tr', rows => rows.length);
  report('Arteries table has 7 rows', arteriesRows === 7);

  // 11. Expandable cards work (go back to overview)
  await page.click('button[data-section="overview"]');
  const glutealCard = await page.$('.region-card[data-card="gluteal"]');
  await glutealCard.click();
  const isExpanded = await page.$eval(
    '.region-card[data-card="gluteal"]',
    el => el.classList.contains('expanded')
  );
  report('Card expands on click', isExpanded);

  // 12. Card collapses on second click
  await glutealCard.click();
  const isCollapsed = await page.$eval(
    '.region-card[data-card="gluteal"]',
    el => !el.classList.contains('expanded')
  );
  report('Card collapses on second click', isCollapsed);

  // 13. Quiz section and answering
  await page.click('button[data-section="quiz"]');
  const quizQuestions = await page.$$eval('.quiz-question', qs => qs.length);
  report('Quiz has 10 questions', quizQuestions === 10);

  // 14. Answer all quiz questions correctly
  const correctAnswers = ['c', 'b', 'd', 'a', 'c', 'b', 'a', 'd', 'c', 'b'];
  for (let i = 0; i < correctAnswers.length; i++) {
    await page.click(`input[name="q${i + 1}"][value="${correctAnswers[i]}"]`);
  }
  await page.click('#check-quiz-btn');

  const scoreText = await page.$eval('#quiz-score', el => el.textContent);
  report('Perfect quiz score shows 10/10', scoreText.includes('10 / 10'));

  // 15. All feedback shows correct
  const allCorrect = await page.$$eval('.quiz-feedback.correct', els => els.length);
  report('All 10 feedbacks show correct', allCorrect === 10);

  // 16. Clinical section has cards
  await page.click('button[data-section="clinical"]');
  const clinicalCards = await page.$$eval(
    '#section-clinical .region-card',
    cards => cards.length
  );
  report('Clinical section has 4 topic cards', clinicalCards === 4);

  // 17. Active nav button styling
  const activeBtn = await page.$eval('nav button.active', el =>
    el.getAttribute('data-section')
  );
  report('Active nav button tracks current section', activeBtn === 'clinical');

  // Summary
  console.log(`\n--- Results: ${passed} passed, ${failed} failed, ${passed + failed} total ---`);

  await browser.close();

  if (failed > 0) {
    process.exit(1);
  }
})().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
