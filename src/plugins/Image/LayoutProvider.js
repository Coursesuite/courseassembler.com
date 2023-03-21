
let i = new LayoutProvider('.main', {
    supports: ['size','position','bias'],
    input: obj.payload,
    output: function(obj) {
    }
});

class LayoutProvider {
    constructor(where, options) {
        this.supports = options.supports;
        this.data = options.input;
        this.callback = options.output;
        this.target = where;
        Setup()
    }

    static Providers = [];

    static Setup() {
 		import('./providers.js').then((module) => {
			module.providers.forEach((provider,index) => {
				Providers.push({"Name": provider.name, "Plugin": provider});
				if (typeof provider.Init === 'function') {
					provider.Init(this, index);
				}
			})
		});
    }

    static Render() {
    
    }

}