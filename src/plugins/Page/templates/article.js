export let name = "article";

export function Init(context,index) {
    DocNinja.routines.RegisterAction({
        plugin: context,
        name: 'Article',
        icon: '<div class="ga-plugin"><a data-action="add-page-article"><i class="ninja-file-text"></i>Article</a></div>',
        type: 'page',
        order: 10+index,
        supports: ['edit','compile','audio'],
        onclick: _onclick
    });
}

export function Compile(payload, mode = "view") {
    return new Promise(function(accept,fail) {
        fetch('./plugins/Page/templates/article.html').then(function(response) {
            if (!response.ok) throw response;
            response.text().then(function(template) {
                let fate = Handlebars.compile(template)({payload,mode,root:document.location.href.split('/').slice(0,-1).join('/')});
                accept(fate);
            })
        }).catch(function(m1ssing) {
            console.dir(m1ssing);
            fail(m1ssing);
        });
    });
}

function _onclick() {
    let newId = DocNinja.PurityControl.Nav.GetFileId(),
        fileInfo = {
            name: "New Article",
            kind: "plugin",
            plugin: "Page",
            template: "article",
            depth: 0,
            payload: {
                "html": `<h1>New article header</h1><p>${placeholderText(2)}</p>`,
                "attribution": "Image by SumOlguy on Unsplash",
                "image": "https://images.unsplash.com/photo-1472740378865-80aab8e73251?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            }
        };
    localforage.setItem(newId, fileInfo).then(function(obj) {
        DocNinja.PurityControl.Nav.Add(DocNinja.navItems, newId, fileInfo, null, "ready");
        window.setItemOrder();
        DocNinja.filePreview.Select(newId);
    });
}