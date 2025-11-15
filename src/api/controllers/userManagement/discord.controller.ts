import { Request, Response } from "express";
import { generarToken } from "../../../utils/generadorToken";
import { 
  getDiscordUser, 
  findUserByEmail, 
  createUserDiscord 
} from "../../../services/userManagement/discord.service";

export async function discordAuth(req: Request, res: Response) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send("No code provided");
  }

  try {
    const CLIENT_ID = process.env.DISCORD_CLIENT_ID!;
    const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET!;
    const FRONTEND_URL = process.env.FRONTEND_URL!;
    const BASE_URL = process.env.BASE_URL!;

    const redirect_uri = `${BASE_URL}/auth/discord/callback`;

    // === 1. Obtener token de Discord ===
    const tokenResp = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code.toString(),
        grant_type: "authorization_code",
        redirect_uri,
      }),
    });

    const tokenData = await tokenResp.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      throw new Error("No se pudo obtener access token");
    }

    // === 2. Obtener info del usuario en Discord ===
    const discordUser = await getDiscordUser(accessToken);
    if (!discordUser) throw new Error("No se pudo obtener info del usuario");

    // === 3. Verificar si existe, si no crearlo ===
    let dbUser = await findUserByEmail(discordUser.email);
    let isFirstTime = false;

    if (!dbUser) {
      dbUser = await createUserDiscord(discordUser);
      isFirstTime = true;
    }

    // === 4. Generar token de sesión ===
    const sessionToken = generarToken(
      dbUser._id.toHexString(),
      dbUser.name,
      dbUser.email,
      dbUser.url_photo
    );

    // === 5. Devolver mensaje igual que GitHub (con user incluido) ===
    return res.send(`
      <script>
        window.opener.postMessage({
          type: 'DISCORD_AUTH_SUCCESS',
          token: '${sessionToken}',
          isFirstTime: ${isFirstTime},
          user: ${JSON.stringify({
            id: dbUser._id.toHexString(),
            name: dbUser.name,
            email: dbUser.email,
            photo: dbUser.url_photo || null,
          })}
        }, '${FRONTEND_URL}');
        window.close();
      </script>
    `);

  } catch (err: any) {
    console.error("Error en Discord OAuth:", err.message);

    return res.send(`
      <script>
        window.opener.postMessage({
          type: 'DISCORD_AUTH_ERROR',
          message: '${err.message || "Error al autenticar con Discord"}'
        }, '${process.env.FRONTEND_URL}');
        window.close();
      </script>
    `);
  }
}
