const routeAction = {
  handleRoute(val: string) {
    return {
      type: 'routeChange',
      payload: val
    }
  }
}
export default routeAction; 