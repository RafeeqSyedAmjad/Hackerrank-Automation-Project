const puppeteer = require('puppeteer');
const codeObj = require('./code');
// intiliaze our puppeteer and launch the  browser
const loginLink = 'https://www.hackerrank.com/auth/login';
const email = 'wenekeg443@doerma.com'
const password = 'ahmedsa1234A@'
let browserOpen = puppeteer.launch(
    {
        headless: false,
        // to open the chromium browser in full screen
        args: ['--start-maximized'],
        defaultViewport: null


    }
) 
let page
browserOpen.then(function(browserObj)
{
    // Go to a new page
    let browserOpenPromise = browserObj.newPage();
    return browserOpenPromise;

}).then(function(newTab){
    page = newTab;
    // open the hackerrank login page
    let hackerRankOpenPromise = page.goto(loginLink);
    return hackerRankOpenPromise;

}) .then(function(){
let emailIsEntered = page.type("input[id ='input-1']", email, { delay: 80 })
return emailIsEntered;
}) .then(function(){
let passwordIsEntered = page.type("input[id ='input-2']", password, { delay: 80 })
return passwordIsEntered;
}).then(function(){
    // click on the login button
    let loginButtonClicked = page.click("button[data-analytics='LoginPassword']", { delay: 30 });
    return loginButtonClicked;
}) .then(function(){
    // click on algorithms
    let clickOnAlgoPromise = waitAndClick(".topic-card a[data-attr1 = 'algorithms']",page);
    return clickOnAlgoPromise;
}).then(function(){
    // select Warmup in the SUBDOMAIN
    let getToWarmUp = waitAndClick("input[value = 'warmup']",page);
    return getToWarmUp;
}).then(function(){
    let waitfor3Seconds = page.waitFor(3000)
    return waitfor3Seconds;
}).then(function(){
    // click on Solve Challenge button

    let allChalengesPromise = page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled", { delay: 50 });
    return allChalengesPromise;
}).then(function(questionArr){
    console.log("number of questions",questionArr.length);
    let questionWillBeSolved = questionSolver(page,questionArr[0],codeObj.answers[0]);
    return questionWillBeSolved;
})




     




function waitAndClick(selector,cPage) {
    return new Promise(function(resolve, reject) {
        let waitForModelPromise = cPage.waitForSelector(selector)
        waitForModelPromise.then(function() {
            let clickModel = cPage.click(selector)
            return clickModel;
    }).then(function(){
        resolve();
    }).catch(function(err){
        reject();
    })
})
}
function questionSolver(page,question , answer) {
    return new Promise(function(resolve, reject) {
        let questionWillBeClicked = question.click()
        questionWillBeClicked.then(function(){
            let EditorInFocusPromise = waitAndClick(".monaco-editor.no-user-select.vs",page);
            return EditorInFocusPromise;
        }).then(function(){
            // click on check box Test against custom input
            return waitAndClick(".checkbox-input",page);
        }).then(function(){
            return page.waitForSelector("textarea.custominput",page);
        }).then(function(){
            // type in the text area
            return page.type("textarea.custominput",answer,{delay:30});
        }).then(function(){
            //Select all the code and cut it 
            let ctrlIsPressed = page.keyboard.down('Control');
            return ctrlIsPressed;
        }).then(function(){
            // select all the code
            let selectAll = page.keyboard.press('A', { delay: 100 });
            return selectAll;
        }).then(function(){
            // cut the code
            let cut = page.keyboard.press('X', { delay: 100 });
            return cut;
        }).then(function(){
            // paste the code
            let ctrlIsUnPressed = page.keyboard.up('Control');
            return ctrlIsUnPressed;
        }).then(function(){   
            let mainEditorInFocus = waitAndClick(".monaco-editor.no-user-select.vs",page);
            return mainEditorInFocus;
        }).then(function(){
            let ctrlIsPressed = page.keyboard.down('Control');
            return ctrlIsPressed;
        }).then(function(){
            // select all the code
            let selectAll = page.keyboard.press('A', { delay: 100 });
            return selectAll;
        }).then(function(){
            // paste the code
            let paste = page.keyboard.press('V', { delay: 100 });
            return paste;
        }).then(function(){
            let ctrlIsUnPressed = page.keyboard.up('Control');
            return ctrlIsUnPressed;
        }).then(function(){
            // click on submit button
            return page.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled",{delay:50});
        }).then(function(){
            // resolve
            resolve();
        }).catch(function(err){
            reject();
        })








    })
}
            






