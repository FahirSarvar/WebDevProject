export const getAuth = () => {
  const saved = sessionStorage.getItem("jwt");
  return saved ? JSON.parse(saved) : false;
};
export const setAuth = (data) => sessionStorage.setItem("jwt", JSON.stringify(data));
export const clearAuth = () => sessionStorage.removeItem("jwt");