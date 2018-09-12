const routes: any = {}

const Router = new Proxy({}, {
  get (obj, key) {
    !routes[key] && (routes[key] = {})

    return (url: string | Array<string>) => {
      return {
        to (joiner: any) {
          Array.isArray(url) ? url.forEach(item => {
            routes[key][item] = joiner
          }) : routes[key][url] = joiner

          return Router
        }
      }
    }
  }
})

export { routes, Router }
