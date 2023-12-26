window.global ||= window


export const staticGlobal = {
  assets: {}
}
export const getAssetUrl = (path: string) => {
  if (!path) return ""
  if (path.substring(0, 4) !== "/src") return path

  return staticGlobal?.assets[path]
}

