import router from '@/router/index'

export let userRoutes = (menu) => {
  return new Promise((resolve, reject) => {
    let resRoutes = []
    menu.forEach(item => {
      let itemComponent = resolve => require([`@/pages${item.filePath}`], resolve)
      resRoutes.push({
        path: item.path,
        name: item.name,
        component: itemComponent,
        children: item.children && item.children.map(i => {
          let iComponent = resolve => require([`@/pages${i.filePath}`], resolve)
          return {
            path: i.path,
            name: i.name,
            component: iComponent,
            children: i.children && i.children.map(ii => {
              let iiComponent = resolve => require([`@/pages${ii.filePath}`], resolve)
              return {
                path: ii.path,
                name: ii.name,
                component: iiComponent
              }
            })
          }
        })
      })
    })
    let userRoutes = router.options.routes.concat(resRoutes)
    router.addRoutes(userRoutes)
    resolve()
  })
}
