
## Instructions

### Clone the repository, download the submodules and install the dependencies

```bash
git clone https://github.com/DRincs-Productions/pixi-vn-renpy
cd pixi-vn-renpy
git submodule update --init --recursive
npm install
cd src/vscode-extension
git checkout test
```

What is src/vscode-extension? It is a submodule that contains the vscode extension https://github.com/BlackRam-oss/vscode-language-renpy . this repo have 2 branch:

* parser: the main branch
* test: a branch I created. where I removed the "vscode" engine binding. Difference between the 2 branches: https://github.com/BlackRam-oss/vscode-language-renpy/pull/3/files

### Run the project

```bash
npm test
```

What is `npm test`? It runs the test script. there is a 1 test file in the `test` folder, that runs the parser.

How to debug? If you use VScode it should automatically open a JS terminal for debugging. Then you can set breakpoints and run `npm test`
