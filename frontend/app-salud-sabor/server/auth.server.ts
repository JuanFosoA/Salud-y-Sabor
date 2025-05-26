import { authToken } from "./token";

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(authToken.login, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: email,
        password: password 
        }),
    });

    
    const token = await response.headers.get("Authorization");
    const data = await response.json();
    if (!response.ok)
      throw new Error(data|| "Error al iniciar sesión");
    
    return { token: token?.replace("Bearer ", ""), body: data };
  } catch (error) {
    throw error;
  }
};

export const register = async (
  name: string,
  user: string,
  email: string,
  password: string
) => {
  try {
    const response = await fetch(authToken.register, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        username: user,
        email: email,
        password: password,
        roles: []
      }),
    }); 
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Error al registrarse");

    return data;
  } catch (error) {
    throw error;
  }
};

export const validateToken = async (token: string | null): Promise<boolean> => {
  if (!token) {
    console.log("No hay token");
    return false;
  }
  try {
    const response = await fetch(authToken.validator, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.ok;
  } catch (error) {
    console.error("Error validando el token:", error);
    return false;
  }
};