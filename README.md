Inventory Application
---------------------

Item pools and their items from The Binding of Isaac, represented using PostgreSQL, Express, and Node.

Features
--------

- [x] MVC pattern which was kind of unnecessary because this is pretty simple
- [x] Add new items
- [x] Add new item pools
- [x] Add items to pools
- [x] Unique item and pool names
- [x] Delete and update items
- [x] Delete and update pools
- [x] Protection against injection attacks via express-validator
- [x] I wouldn't say good styling but it's good enough

How to use this project
-----------------------

Clone this repo and run `node index`.

Known Limitations
-----------------
"Bad" operations like adding an existing item or pool will silently fail.


Credits
-------

The Binding Of Isaac for the item names and pools
