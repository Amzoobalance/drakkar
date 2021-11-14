const Router = (routes = {}) => ({
    get: (urlOrHandler, handler) =>  Router(routes).register('GET', urlOrHandler, handler),
    post: (urlOrHandler, handler) => Router(routes).register('POST', urlOrHandler, handler),
    put: (urlOrHandler, handler) => Router(routes).register('PUT', urlOrHandler, handler),
    patch: (urlOrHandler, handler) => Router(routes).register('PATCH', urlOrHandler, handler),
    delete: (urlOrHandler, handler) => Router(routes).register('DELETE', urlOrHandler, handler),
    head: (urlOrHandler, handler) => Router(routes).register('HEAD', urlOrHandler, handler),
    options: (urlOrHandler, handler) => Router(routes).register('OPTIONS', urlOrHandler, handler),
    register: (method, urlOrHandler, handler) => {
        if (!routes[method]) {
            routes[method] = {};
        }
        if (typeof urlOrHandler !== 'string') {
            handler = urlOrHandler;
            urlOrHandler = '.*';
        }

        routes[method][urlOrHandler] = Array.isArray(handler) ? handler : [handler];

    },

    serve: (req, res) => {
        const { method } = req;

        const matchingUrl = Object.keys(routes[method]).find((key) => new RegExp(key).test(url))
   
   routes[method][matchingUrl].forEach((f) => f(req, res));

    }
});

module.exports = {
    Router,
}