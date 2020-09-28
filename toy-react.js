export function createElement(type, attributes, ...children) {
    let el;
    
    // 普通的 element
    if(typeof type === 'string') {
        el = new ElementWrapper(type);
    }
    // 自定义组件
    else {
        el = new type();
    }
    for(let attr in attributes) {
        el.setAttribute(attr, attributes[attr])
    }
    
    const insertChildren = (children) => {
        children.forEach(child => {
            if(typeof child === 'string') {
                child = new TextWrapper(child);
            }

            // 递归添加子节点
            if(child instanceof Array) {
                insertChildren(child);
            } else {
                el.appendChild(child);
            }
        })
    }

    insertChildren(children);

    return el;
}

export function render(component, parentElement) {
    parentElement.appendChild(component.root);
}

export class Component {
    constructor () {
        this.props = Object.create(null);
        this.children = [];
        // 私有属性
        this._root = null
    }

    get root() {
        if(!this._root) {
            this._root = this.render().root;
        }

        return this._root;
    }

    setAttribute(name, value) {
        this.props[name] = value;
    }

    appendChild(component) {
        this.children.push(component);
    }
}

class ElementWrapper {
    constructor(type) {
        this.root = document.createElement(type);
    }

    setAttribute(name, value) {
        this.root.setAttribute(name, value)
    }

    appendChild(component) {
        this.root.appendChild(component.root)
    }
}

class TextWrapper {
    constructor(content) {
        this.root = document.createTextNode(content);
    }
}