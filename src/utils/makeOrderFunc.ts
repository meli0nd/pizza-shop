export const makeOrderFunc = (items: any) => {
  localStorage.setItem("order", JSON.stringify(items))
}
