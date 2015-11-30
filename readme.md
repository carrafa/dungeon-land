DUNGEON LAND

This is an 8-bit diablo-style dungeon explorer.

The collision detecting for the walls is done by color.  Whenever your character is about to move to the next square, there's a function that checks to see if it's red.  If it is, it won't let you move.

The attacking is done by changing the source image for the characters.  If the source image is the attacking version, it will give out damage to another character that is near.


This was done mostly in Canvas, with some jQuery DOM manipulation to show the stats in the menu.
