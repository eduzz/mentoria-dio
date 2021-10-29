export default function decodeJWTToken<T>(token: string): T {
  try {
    const data = JSON.parse(window.atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;

    return currentTime > data.exp ? null : data;
  } catch (err) {
    return null;
  }
}
