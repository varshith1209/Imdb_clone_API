# IMDb Frontend

Enterprise-grade React client for the Django IMDb API. Features a cinematic UI inspired by Netflix/Prime Video with:

- Tailwind CSS + shadcn/ui primitives
- Framer Motion micro-interactions
- React Router v6 routes + guarded areas
- React Query data layer + optimistic review mutations
- JWT AuthContext with auto refresh + LocalStorage persistence
- Review modal, animated watchlist grid, infinite-scroll feeds

## Getting started

```powershell
cd frontend
npm install
copy env.example .env.local   # update API URL if needed (PowerShell)
npm run dev                   # http://localhost:5173
```

`VITE_API_URL` defaults to `http://localhost:8000/api`. Override it for other environments.

### Production build

```bash
npm run build
npm run preview
```

Outputs a fully static bundle in `frontend/dist`.

## Backend linkage

1. `python manage.py runserver` from the Django root (`http://localhost:8000/api`).
2. Launch the Vite dev server (`npm run dev`).
3. Register or login (JWT tokens stored automatically).
4. Explore `/watchlist`, drill into `/watchlist/:id`, launch the review modal, and stream reviews with `/watchlist/:id/reviews/`.

> Tip: run `npm run build` before deployment and serve the `dist/` directory via your preferred CDN or static host.
