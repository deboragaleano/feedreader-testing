/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Done: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URL defined', function() {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined(); // to be defined
                expect(feed.url.length).not.toBe(0); // not to be empty
            }
        });

        /* Done: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
    
        it('name defined', function() {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined(); 
                expect(feed.name.length).not.toBe(0); 
            }
        });
    });


    /* Done: Write a new test suite named "The menu" */
    describe('The menu', function() {

        /* Done: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.*/

        it('hidden menu', function() {
            let contains = document.body.classList.contains('menu-hidden'); 
            expect(contains).toBe(true);
        })

         /* Done: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.*/
        
        // Used jQuery

        it('working toggle on click', function () {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    })

    describe('Initial Entries', function() {
        let container = document.querySelector('div.feed');

        /* Done: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function(done) {
            loadFeed(1, done);
        })

        it('has a feed in container', function(done) {
            expect(container.children.length).toBeGreaterThan(0);
            done();
        })

    })

    describe('New Feed Selection', function() {
        let container = document.querySelector('div.feed');
        /* Done: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes. How is this test different from the previous test? Remember, loadFeed() is asynchronous. */
        let firstFeed, secondFeed; 

        beforeEach(function(done) {
            loadFeed(3, function() {
                firstFeed = container.innerHTML;
                loadFeed(2, function() {
                    secondFeed = container.innerHTML;
                    done(); 
                }); 
            })  
        })

        it('new feed is loaded', function() {
            // let container = document.querySelector('div.feed');
            // let entry = document.querySelector('article.entry'); 
            expect(firstFeed).not.toBe(secondFeed);
            // done();
        });
    });

     
}());
