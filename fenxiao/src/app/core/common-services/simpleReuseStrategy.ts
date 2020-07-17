import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

export class SimpleReuseStrategy implements RouteReuseStrategy {
  cacheRouters: { [key: string]: any } = {};
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    // 只有在routerNeedReuse中的值可复用，route为上一次路由
    if (route.data && route.data.reuse) {
      return true;
    }
    return false;
  }
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    // 按path作为key存储路由快照&组件当前实例对象
    // path等同RouterModule.forRoot中的配置，route为上一次路由
    this.cacheRouters[route.routeConfig.path] = {
      snapshot: route,
      handle: handle,
      params: route.url[1] ? route.url[1].path : 'noParams',
    };
  }
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    // 在缓存中有的都认为允许还原路由，route为当前路由最后一级
    // 在有路由参数的情况下，根据参数变化，重新加载路由
    if (!!route.routeConfig && !!this.cacheRouters[route.routeConfig.path]) {
      if (!route.url[1]) {
        return true;
      }
      if (route.url[1].path !== this.cacheRouters[route.routeConfig.path].params) {
        return false;
      }
      return true;
    }
    return false;
    // return !!route.routeConfig && !!this._cacheRouters[route.routeConfig.path];
  }
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    // 从缓存中获取快照，若无则返回null，route为当前路由变化的每一级
    if (!route.routeConfig || !this.cacheRouters[route.routeConfig.path]) {
      return null;
    }
    return this.cacheRouters[route.routeConfig.path].handle;
  }
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    // 返回true时，继续判断下一级路由
    return future.routeConfig === curr.routeConfig;
  }
  deleteRouteSnapshot(name: string): void {
    if (this.cacheRouters[name]) {
      delete this.cacheRouters[name];
    }
    console.log('delete', this.cacheRouters, name);
  }
}
