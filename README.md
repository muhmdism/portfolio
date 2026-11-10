# Portfolio

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```
Keys: T tour, A agents, P pause, Esc stop tour. URL: `?agents=on` forces the animation, `?agents=off` disables it.

## Deploy free on Vercel
1. Push this folder to a GitHub repo.
2. vercel.com > Add New > Project > import the repo.
3. Framework is auto-detected as Next.js. Click Deploy.

CLI alternative: `npm i -g vercel && vercel --prod`.

## Edit
Content lives in `lib/data.ts`. Add `links: { live, code }` to a project to enable its buttons.
"# portfolio" 
