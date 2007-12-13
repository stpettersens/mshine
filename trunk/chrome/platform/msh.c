/* 
 Moonshine environment for Lua-based
 services in Mozilla Firefox web browser
 Copyright (c) 2007 Sam Saint-Pettersen.

 This program is released "as is" under
 the GNU General Public License V3.
*/ 
#include <stdio.h>
#include <stdlib.h>
#include "lua/lua.h"
#include "lua/lauxlib.h"
#include "lua/lualib.h"
int main(int argc, char *argv[])
{
    // declare a new lua state and load libraries
    lua_State *L = luaL_newstate();
    luaL_openlibs(L);

    // print title
    printf("\nMoonshine core interpreter\n\n");
 
    // invoke module loading
    luaL_dofile(L, "modules/modules.lua"); 

    // if argument is provided; run msh app
    if(argv != NULL)
    {   
        luaL_dofile(L, argv[1]);
    }
    // otherwise; display prompt
    else 
    {
        printf("\nUsage: msh <mshapp>\n");
    }

    // close current lua state    
    lua_close(L);

    // print a new line
    printf("\n");

    return 0;
}
