# BEM-NODE generator

> Yeoman generator for BEM-NODE. Lets you quickly create BEM-components (blocks, elements, modifiers) with supportet techs.

## Usage

To learn how to install and use Yeoman see [this tutorial](http://yeoman.io/learning/).

Within project's directory run `yo bem-node` to start configuration.

## Generators

* [bem-node](#app)
* [bem-node:block](#block)
* [bem-node:elem](#elem)
* [bem-node:mod](#mod)

### App

Sets up project.

Arguments: _none_

Wizard:

__blocks root__  
Blocks hierarchy root.
Default: `blocks`

__types separation__  
Whether the project is divided to logical components (e.g. data, desktop, common, etc.)
Default: `true`

[__types list__]  
If project has types separation, specifies list of blocks types.

Default: `list of directories inside blocks-root folder`

Produces `.yo-rc.json`.

### Block

Creates new block.

Arguments:

_name_ - block's name

Wizard:

[__block type__]  
Block's type if project divided by blocks types

__block template__  
Is block have template or not

__block parts__  
Parts (techs) which block consist of.

Available techs:

* common
* priv
* js
* less
* deps

Produces for each selected tech:  
(_blocks root_)/[(_block type_)]/(_name_).[(_tech_)].js

### Elem

Creates new element for block.

Arguments:

_name_ - element's name

Wizard:

[__block type__] - see [bem-node:block](#block)

__element template__ - see [bem-node:block](#block)

__block name__  
Name of block for which element creating

__element parts__ see [bem-node:block](#block)

Produces for each selected tech: 

(_blocks root_)/[(_block type_)]/(_block name_)/(_block name_)_(_name_).[(_tech_)].js

### Mod

Creates modification for block or element.

Arguments:

_name_ - name of modification  
_value_ - value of modification

Wizard:

[__block type__] - see [bem-node:block](#block)

__modification template__ - see [bem-node:block](#block)

__block name__ - see [bem-node:elem](#elem)

__element name__  
If creating modification for element specify element's name or leave it empty otherwise

__modification parts__ see [bem-node:block](#block)

Producesfor each selected tech: 

(_blocks root_)/[(_block type_)]/(_block name_)/[(_elemnet name_)]/(_block name_)[__(_element name_)](_name_)_ (_value_).[(_tech_)].js
