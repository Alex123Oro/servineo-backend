import { OAuth2Client } from "google-auth-library";
import { IUser, User } from "../../models/user.model";

interface GoogleUser {
  email: string;
  name: string;
  picture?: string;
}

// Se crea el cliente OAuth usando la variable de entorno
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Verifica el token enviado por Google Login.
 * Retorna los datos del usuario si es válido.
 */
export async function verifyGoogleToken(token: string): Promise<GoogleUser | null> {
  try {
    // Validamos el token con Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) return null;

    // Retornamos solo lo necesario
    return {
      email: payload.email,
      name: payload.name || "Sin Nombre",
      picture: payload.picture || "",
    };
  } catch (error) {
    console.error("Error al verificar token de Google:", error);
    return null;
  }
}

/**
 * Busca un usuario cuyo proveedor sea Google
 * y cuyo providerId sea el email registrado.
 */
export async function findUserByEmail(email: string) {
  const user = await User.findOne({
    "authProviders.provider": "google",
    "authProviders.providerId": email,
  }).lean<IUser & { _id: string }>(); // tipado explícito

  if (!user) return null;

  return {
    ...user,
    _id: user._id.toString(),
  };
}


export async function checkUserExists(email: string): Promise<boolean> {
  const user = await findUserByEmail(email);
  return !!user;
}

export async function createUser(googleUser: GoogleUser) {
  const newUser = new User({
    name: googleUser.name,
    email: googleUser.email,
    url_photo: googleUser.picture || "",
    role: "requester",

    authProviders: [
      {
        provider: "google",
        providerId: googleUser.email,
        password: "",
      },
    ],
  });

  await newUser.save();

  const plain = newUser.toObject();

  return {
    ...plain,
    _id: plain._id.toString(),
  };
}
