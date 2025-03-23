const puppeteer = require('puppeteer');
const axios = require('axios');
const fs = require('fs');
const userAgent = require('user-agents');
const chalk = require('chalk'); // Use chalk v4.1.2

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
    const referralCode = await new Promise((resolve) => {
        process.stdout.write("Enter Referral Code: ");
        process.stdin.once("data", (data) => resolve(data.toString().trim()));
    });

    const numAccounts = await new Promise((resolve) => {
        process.stdout.write("How many accounts to create? ");
        process.stdin.once("data", (data) => resolve(parseInt(data.toString().trim())));
    });

    for (let i = 0; i < numAccounts; i++) {
        // Generate User Data
        const response = await axios.get('https://randomuser.me/api/');
        const user = response.data.results[0];
        const firstName = user.name.first.toLowerCase();
        const lastName = user.name.last.toLowerCase();
        const randomNumber = Math.floor(100 + Math.random() * 900);
        const email = `${firstName}.${lastName}${randomNumber}@gmail.com`;
        const password = "Qwerty123123";
        const randomUserAgent = new userAgent().toString();

        const browser = await puppeteer.launch({
            headless: "new", // Use the new headless mode
            args: ['--no-sandbox', '--disable-setuid-sandbox'] // Add these flags
        });
        const page = await browser.newPage();

        await page.setUserAgent(randomUserAgent);
        await page.setViewport({ width: 1366, height: 768 });

        await page.goto('https://app.depined.org/onboarding', { waitUntil: 'networkidle2' });

        // Click Register Button
        await page.waitForSelector("div._option_1txyf_99 > span");
        await page.click("div._option_1txyf_99 > span");
        await delay(1000);

        // Fill Registration Form
        await page.waitForSelector("#email");
        await page.type('#email', email);
        await delay(500);
        await page.type('#password', password);
        await delay(500);
        await page.type('#password2', password);
        await delay(500);
        await page.click("div._btnWrapper_hr86v_34 > div"); // Click register

        // Fill Username
        await delay(2000);
        await page.waitForSelector("#root > div._onboardingWrap_10wzg_1 > div._center_10wzg_61._centerShow_10wzg_71 > div._onBoardWrapper_10wzg_414 > div._onBoard_10wzg_414._onBoard1_10wzg_483._onBoard1Active_10wzg_492 > div._formField_10wzg_295 > div._input_10wzg_121 > input[type=text]");
        await page.type("#root > div._onboardingWrap_10wzg_1 > div._center_10wzg_61._centerShow_10wzg_71 > div._onBoardWrapper_10wzg_414 > div._onBoard_10wzg_414._onBoard1_10wzg_483._onBoard1Active_10wzg_492 > div._formField_10wzg_295 > div._input_10wzg_121 > input[type=text]", firstName + randomNumber);
        await delay(2000);
        await page.waitForSelector("#root > div._onboardingWrap_10wzg_1 > div._center_10wzg_61._centerShow_10wzg_71 > div._onBoardWrapper_10wzg_414 > div._onBoard_10wzg_414._onBoard1_10wzg_483._onBoard1Active_10wzg_492 > div._btnWrap_10wzg_236 > div");
        await page.click("#root > div._onboardingWrap_10wzg_1 > div._center_10wzg_61._centerShow_10wzg_71 > div._onBoardWrapper_10wzg_414 > div._onBoard_10wzg_414._onBoard1_10wzg_483._onBoard1Active_10wzg_492 > div._btnWrap_10wzg_236 > div");

        // Select Role
        await delay(2000);
        await page.waitForSelector("#root > div._onboardingWrap_10wzg_1 > div._center_10wzg_61._centerShow_10wzg_71 > div._onBoardWrapper_10wzg_414 > div._onBoard_10wzg_414._onBoard2_10wzg_501._onBoard2Active_10wzg_506 > div._formField_10wzg_295 > div._input_10wzg_121 > div > div._selectedBox_10wzg_149");
        await page.click("#root > div._onboardingWrap_10wzg_1 > div._center_10wzg_61._centerShow_10wzg_71 > div._onBoardWrapper_10wzg_414 > div._onBoard_10wzg_414._onBoard2_10wzg_501._onBoard2Active_10wzg_506 > div._formField_10wzg_295 > div._input_10wzg_121 > div > div._selectedBox_10wzg_149");
        await delay(2000);
        await page.waitForSelector("#root > div._onboardingWrap_10wzg_1 > div._center_10wzg_61._centerShow_10wzg_71 > div._onBoardWrapper_10wzg_414 > div._onBoard_10wzg_414._onBoard2_10wzg_501._onBoard2Active_10wzg_506 > div._formField_10wzg_295 > div._input_10wzg_121 > div > div._selectOptionWrap_10wzg_177._active_10wzg_195 > div:nth-child(4)");
        await page.click("#root > div._onboardingWrap_10wzg_1 > div._center_10wzg_61._centerShow_10wzg_71 > div._onBoardWrapper_10wzg_414 > div._onBoard_10wzg_414._onBoard2_10wzg_501._onBoard2Active_10wzg_506 > div._formField_10wzg_295 > div._input_10wzg_121 > div > div._selectOptionWrap_10wzg_177._active_10wzg_195 > div:nth-child(4)");
        await delay(2000);
        await page.waitForSelector("#root > div._onboardingWrap_10wzg_1 > div._center_10wzg_61._centerShow_10wzg_71 > div._onBoardWrapper_10wzg_414 > div._onBoard_10wzg_414._onBoard2_10wzg_501._onBoard2Active_10wzg_506 > div._btnWrap_10wzg_236 > div");
        await page.click("#root > div._onboardingWrap_10wzg_1 > div._center_10wzg_61._centerShow_10wzg_71 > div._onBoardWrapper_10wzg_414 > div._onBoard_10wzg_414._onBoard2_10wzg_501._onBoard2Active_10wzg_506 > div._btnWrap_10wzg_236 > div");

        // Enter Referral Code (if provided)
        if (referralCode) {
            await delay(2000);
            await page.waitForSelector("#root > div._onboardingWrap_10wzg_1 > div._center_10wzg_61._centerShow_10wzg_71 > div._onBoardWrapper_10wzg_414 > div._onBoard_10wzg_414._onBoard3_10wzg_515._onBoard3Active_10wzg_520 > div._formField_10wzg_295._formField2_10wzg_305 > div > div:nth-child(1) > div._icon_10wzg_637");
            await page.click("#root > div._onboardingWrap_10wzg_1 > div._center_10wzg_61._centerShow_10wzg_71 > div._onBoardWrapper_10wzg_414 > div._onBoard_10wzg_414._onBoard3_10wzg_515._onBoard3Active_10wzg_520 > div._formField_10wzg_295._formField2_10wzg_305 > div > div:nth-child(1) > div._icon_10wzg_637");
            await page.waitForSelector("#accesscode");
            await page.type("#accesscode", referralCode);
            await delay(2000);
            await page.waitForSelector("#modal > div > div._modalWrap_9eurj_28 > div > div._modalBody_1snkv_7._modalBody2_1snkv_158 > div > div > div > div > div:nth-child(4) > div > div._btnWrapper_1wkut_65 > div");
            await page.click("#modal > div > div._modalWrap_9eurj_28 > div > div._modalBody_1snkv_7._modalBody2_1snkv_158 > div > div > div > div > div:nth-child(4) > div > div._btnWrapper_1wkut_65 > div");
        }

        // Retrieve JWT Token
        await delay(5000);
        const jwtToken = await page.evaluate(() => localStorage.getItem('token'));

        if (jwtToken) {
            console.log(chalk.green.bold(`✅ Account Created:`));
            console.log(chalk.blue(`Email: ${email}`));
            console.log(chalk.blue(`Password: ${password}`));
            console.log(chalk.blue(`Token: ${jwtToken}\n`));

            const accountData = `Email: ${email}\nPassword: ${password}\n\n`;
            const tokenData = `${jwtToken}\n`;
            fs.appendFileSync('accounts.txt', accountData, 'utf8');
            fs.appendFileSync('tokens.txt', tokenData, 'utf8');
        } else {
            console.log(chalk.red("Token not found."));
        }

        await browser.close();
    }

    console.log(chalk.green.bold("\nAll accounts created successfully!"));
    process.exit();
})();
