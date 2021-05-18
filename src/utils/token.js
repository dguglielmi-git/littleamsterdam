import jwtDecode from "jwt-decode";
import { TOKEN } from "./constants";

export function setToken(token) {
  localStorage.setItem(TOKEN, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN);
}

export function decodeToken(token) {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.log(error);
    return null;
  }


}

export function removeToken() {
  localStorage.removeItem(TOKEN);
}