
$(function() {
    /* Ensures that allFeeds variables have been defined and not empty.*/
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('URL defined', function() {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined(); 
                expect(feed.url.length).not.toBe(0); 
            }
        });
    
        it('name defined', function() {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined(); 
                expect(feed.name.length).not.toBe(0); 
            }
        });
    });

    /*Ensures that menu element is hidden by default and that the toggle works on click*/
    describe('The menu', function() {
        it('hidden menu', function() {
            let contains = document.body.classList.contains('menu-hidden'); 
            expect(contains).toBe(true);
        })
        
        // Jasmine jQuery
        it('working toggle on click', function () {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    })

    /* Ensures that the loadFeed function works and that it has at least 1 entry in the container*/
    describe('Initial Entries', function() {
        let container = document.querySelector('div.feed');

        // Asynchronous test
        beforeEach(function(done) {
            loadFeed(0, done);
        })

        it('has a feed in container', function(done) {
            expect(container.children.length).toBeGreaterThan(0);
            done();
        })
    })

     /*Ensures that a new feed is loaded and that the content actually changes*/
    describe('New Feed Selection', function() {
        let container = document.querySelector('div.feed');
        let firstFeed, secondFeed; //global scope to be able to access these variables later

        beforeEach(function(done) {
            loadFeed(0, function() {
                // gets first copy of the feed's HTML when it's loaded
                firstFeed = container.innerHTML;
                loadFeed(1, function() {
                    // gets second copy 
                    secondFeed = container.innerHTML;
                    done(); 
                }); 
            })  
        })

        it('new feed is loaded and content changes', function() {
            expect(firstFeed).not.toBe(secondFeed);
        });
    });
}());
