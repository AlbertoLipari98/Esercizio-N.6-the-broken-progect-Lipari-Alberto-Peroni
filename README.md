# Lipari Bank Routing — Angular 19

Progetto Angular 19 standalone che implementa il sistema di routing per una
dashboard bancaria. Usa functional guards, resolver, lazy loading, preloading
selettivo e `withComponentInputBinding`.

---

## Avvio rapido

```bash
# 1. Installa le dipendenze
npm install

# 2. Avvia il server di sviluppo
ng serve

# 3. Apri il browser
# → http://localhost:4200
```

---

## Struttura del progetto

```
src/app/
├── app.component.ts          ← Shell con nav e router-outlet
├── app.routes.ts             ← Routing principale (lazy loading)
├── app.config.ts             ← provideRouter + withComponentInputBinding
├── core/
│   ├── guards/
│   │   ├── auth.guard.ts     ← Guard: utente autenticato?
│   │   └── role.guard.ts     ← Guard factory: ruolo corretto?
│   ├── services/
│   │   └── auth.service.ts   ← Signal currentUser, login(), isAuthenticated()
│   └── strategies/
│       └── selective-preloading.strategy.ts
├── features/
│   ├── auth/login/           ← LoginComponent (2 pulsanti)
│   ├── account/              ← Conto corrente + resolver + sub-route
│   └── admin/                ← Pannello admin (solo per ruolo 'admin')
└── shared/components/not-found/
```

---

## Scenari da testare

### Scenario 1 — Login come Cliente
1. Vai su `http://localhost:4200` (redireziona a `/dashboard`)
2. Verrai rediretto a `/login` dall'`authGuard`
3. Clicca **"Entra come Cliente"**
4. Dovresti essere rediretto a `/dashboard`
5. Attendi ~1 secondo (il resolver carica i dati del conto)
6. Vedrai il saldo e il nome di Mario Rossi

### Scenario 2 — Login come Admin e accesso area admin
1. Clicca **"Esci"** per fare logout
2. Clicca **"Entra come Admin"**
3. Verrai rediretto a `/admin`
4. Dovresti vedere il **Pannello Amministratore** con la lista utenti
5. Ora fai logout e accedi come **Cliente**, poi vai manualmente su `/admin`:
   - ⚠️ Cosa ti aspetti? Cosa succede effettivamente?

### Scenario 3 — Navigazione verso i Movimenti
1. Accedi come Cliente
2. Nella dashboard, clicca su **"Movimenti"**
3. L'URL cambia in `/dashboard/movimenti`
4. ⚠️ Cosa ti aspetti? Cosa vedi effettivamente?

---

## 🎯 Le 3 Missioni di Debug

### MISSIONE 1 — Il pannello Admin è troppo permissivo

**File suggerito:** `src/app/app.routes.ts`

**Sintomi:**
- Accedendo come semplice **cliente** e navigando manualmente verso `/admin`,
  il pannello amministratore viene mostrato regolarmente.
- La `roleGuard` dovrebbe bloccare l'accesso, ma sembra non fare nulla.
- Non viene loggato nessun warning in console da `roleGuard`.

**Domanda:** perché la guard non controlla il ruolo dell'utente?

---

### MISSIONE 2 — Nessun feedback durante il caricamento

**File suggerito:** `src/app/app.component.ts`

**Sintomi:**
- Dopo il login, l'applicazione rimane "bloccata" per circa 1 secondo
  prima di mostrare la dashboard.
- Non appare nessun indicatore visivo di caricamento (spinner, barra di progresso).
- Il resolver di `/dashboard` impiega 1 secondo per restituire i dati
  (vedi `AccountService.getAccountById` con `delay(1000)`), ma l'utente
  non lo sa e pensa che l'app sia bloccata.

**Domanda:** come puoi mostrare un feedback visivo durante la navigazione?

---

### MISSIONE 3 — I Movimenti non compaiono mai

**File suggerito:** `src/app/features/account/dashboard/account-dashboard.component.html`

**Sintomi:**
- Cliccando sul tab **"Movimenti"**, l'URL cambia correttamente
  in `/dashboard/movimenti`.
- La route è configurata come child route in `account.routes.ts`.
- Il `TransactionsComponent` esiste e funziona.
- Eppure la lista dei movimenti non appare mai nel DOM.

**Domanda:** perché Angular non sa dove renderizzare il componente figlio?

---

## Architettura routing

```
/                         → redirect a /dashboard
/login                    → LoginComponent
/dashboard                → AccountDashboardComponent  [authGuard + resolver]
/dashboard/movimenti      → TransactionsComponent      [child route]
/admin                    → AdminDashboardComponent    [authGuard + roleGuard]
/**                       → NotFoundComponent
```

## Concetti Angular 19 usati

| Concetto | File |
|---|---|
| Functional guard | `auth.guard.ts`, `role.guard.ts` |
| Guard factory | `role.guard.ts` → `roleGuard('admin')` |
| ResolveFn | `account.resolver.ts` |
| withComponentInputBinding | `app.config.ts` + input nel componente |
| Lazy loading (loadComponent/loadChildren) | `app.routes.ts` |
| Selective preloading | `selective-preloading.strategy.ts` |
| Signal (signal, input) | `auth.service.ts`, `account-dashboard.component.ts` |
| Router.events | `app.component.ts` |
| Child routes + router-outlet | `account.routes.ts` |
