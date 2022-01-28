/* 
 *By JCSJ
 */

/** 
 * I tend to use the active attribute for element style changes so I made this function.
 * @param {HTMLElement} elem 
 * @param {String} attrib 
 */
function activate(elem, attrib = "active") {
  elem.toggleAttribute(attrib);
}

/**
 * @param {String} selector 
 * @returns HTMLElement | HTMLCollection
 */
function $(selector) {
  const selected = [];
  for (const arg of arguments) {
      const found = document.querySelectorAll(arg)

      selected.push(
          (found.length == 1) ? found[0] : found
      )
  }

  return (selected.length == 1) ? selected[0] : selected
};

/**
* Eases the creation of elements
* @param {String} tagName 
* @param {Object} attribsDictionary 
* @param {String[]} classList 
* @returns HTMLElement
*/
function $$(tagName, attribsDictionary = {}, classList = [], events = {}) {
  const elem = document.createElement(tagName)
    
  for (const key in attribsDictionary) {
    const val = attribsDictionary[key]
    elem.setAttribute(key, val)
  }

  for (const name of classList) {
      elem.classList.add(name)
  }

  for (const evType in events) {
    const handler = events[key]
    elem.addEventListener(evType, handler);
  }

  return elem
}

/**
 * 
 * Purpose: Prevents promise hell
 * Example:
 * let _string = await pull("./example.html", 0);
 * @param {String} req 
 * @param {Object} headers 
 * @param {Number} decodeAs 
 * @returns String | Object
 */
async function pull(req, headers, decodeAs=0) {
  const _$ = {
      text: 0,
      json: 1,
      blob: 2,
  }
  let _r;
  try {
      const res = await fetch(req, headers)
      switch (decodeAs) {
          /* case _$.blob:
              return res.blob(); */
          case _$.json:
              _r = res.json();
          break;
          default:
              _r = res.text();
      }

  } catch (err) {
      console.log(err);
      switch (decodeAs) {
          /* Todo:
          case _$.blob:
              return Blob; */
          case _$.json:
              _r = {};
          break;
          default:
              _r = "";
      }
  }

  return _r;
}