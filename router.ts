import { Oak } from "./deps.ts";

const colors: string[] = [];

const router = new Oak.Router();

router
    .get('/', (ctx) => {
        ctx.response.body = `
          <html>
            <body>
              <form action="/" method="POST">
                <div>
                  <label for="color">Ingrese color</label>
                  <input type="text" placeholder="Ingrese el nombre del color" name="color" required>
                  <button type="submit">Aceptar</button>
                </div>
              </form>
              <div style="background-color:black">
                <h3 style="color:white">Colores ingresados</h3>
                <ul>
                  ${colors.map((color) => `<li style="color:${color}">${color}</li>`)}
                </ul>
              </div>
            </body>
          </html>
        `
    })
    .post('/', async (ctx) => {
        const data = await ctx.request.body().value;
        const params = new URLSearchParams(data);
        const color = params.get("color");
        colors.push(color);
        ctx.response.redirect('/');
    })

export default router;