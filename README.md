# Interaktywny tutorial, z którym możesz rozmawiać

> ## Zamiast czytać blogpost, który tylko częściowo odpowiada na Twoje potrzeby i wprowadza Cię w dziesiątki problemów, których nie musisz teraz rozwiązywać — stwórz swój własny tutorial, z którym możesz rozmawiać i dyskutować o podejmowanych decyzjach.

# App z React 18 + TypeScript + MobX + MUI 5 + Axios

**Projekt powstał jako kurs frontendu dla backend developera, stworzony w trakcie rozmowy z ChatGPT.**

To, co tutaj widzicie, to **totalne streszczenie i skrócenie dwóch dni intensywnych rozmów z ChatGPT.**

Na początku poprosiłem go, żeby od zupełnych podstaw wytłumaczył mi, jak zacząć pracę z frontendem. Celem tego tekstu w README nie jest pokazanie efektu końcowego — bo taki każdy może sobie sam zbudować. Chodzi raczej o zaszczepienie pomysłu i podzielenie się sposobem, w jaki można uczyć się nowych rzeczy — czyli przez generowanie tutoriala na żywo, skrojonego idealnie pod Twoje potrzeby i poziom.

---

### 🔍 Skąd wiedziałem, jaki wybrać stack technologiczny?

Rozpocząłem pracę nad nowym projektem, który odziedziczyłem po innym zespole. **Stos technologiczny był już wybrany** – React 18 + TypeScript + MobX + MUI 5.

Chciałem zrozumieć szczegóły i podstawy, dlatego poprosiłem ChatGPT, by poprowadził mnie **na bardzo prostym, zrozumiałym kodzie**, w domenie tak trywialnej jak TODO lista.

To pozwoliło mi **skupić się na architekturze, składni i podejmowanych decyzjach** – a nie na złożoności samej logiki biznesowej.

---

### Jak wyglądała współpraca?

Po otrzymaniu pierwszych wskazówek, które wdrożyłem krok po kroku (i przy których oczywiście pojawiały się błędy i problemy), **mogłem na bieżąco dopytywać o każdy szczegół.**

Gdy coś nie działało — pisałem. Gdy miałem wątpliwości — dopytywałem. Gdy chciałem kolejną funkcjonalność — ChatGPT pamiętał kontekst i **prowadził mnie dalej**, proponując zmiany, które **rozumiałem i przepisywałem ręcznie (nie kopiowałem!).**

W trakcie rozwoju aplikacji **pojawiło się dziesiątki pytań, dygresji, „dlaczego tak, a nie inaczej”** — i wszystko to **omawialiśmy w dialogu**.

---

### ✨ Magia

Nie był to tylko wpis na blogy. To był **interaktywny proces nauki** reagujący na moje tempo, moje pytania i mój styl pracy.

A co najlepsze — **mogłem z tym tutorialem rozmawiać.**

Nie tylko czytać. Nie tylko próbować coś zrozumieć i potem frustrować się na własną rękę. Szukać rozwiażać w internetach, bezskutecznie i nieefektywnie (jak to zwykle bywa gdy się jest początkującym w danym obszarze).

Gdy pojawiały się dziesiątki pytań, błędów, problemów — **wszystko omawialiśmy wspólnie, na żywo**.

---

### 🔥 Szał totalny

**Idzie nowe.** Teraz tutoriale są **szyte na miarę**, pod Twoje potrzeby, kontekst i projekt.

I możesz z nimi **rozmawiać** – a nie tylko je czytać.

**Szok. Totalny.**

---

## 📚 Dalej (jako totalne streszczenie)

* stack technologiczny,
* strukturę projektu,
* kod źródłowy krok po kroku,
* wytłumaczenie wzorców, składni i decyzji architektonicznych,
* praktyczne porady i dobre praktyki.

---

## 🧱 Stack technologiczny

* **React 18** – biblioteka UI
* **TypeScript** – typowany JavaScript
* **MobX 6** – zarządzanie stanem aplikacji
* **Material UI 5 (MUI)** – gotowe komponenty interfejsu
* **Axios** – komunikacja HTTP z API
* **Vite** – ultraszybki bundler
* **.NET 8 Minimal API** – stub backend (mock)

---

## 📁 Struktura katalogów (monorepo)

```
todo-monorepo/
├── backend/
│   └── TodoApi/               # .NET 8 minimal API (mock)
├── frontend/
│   ├── src/
│   │   ├── api/              # Warstwa komunikacji z backendem
│   │   ├── components/       # Komponenty UI
│   │   ├── stores/           # Store MobX
│   │   └── App.tsx           # Główny komponent aplikacji
```

---

## 🚀 Uruchomienie projektu

### Frontend:

```bash
cd frontend
npm install
npm run dev
```

### Backend:

```bash
cd backend/TodoApi
dotnet run
```

---

## 🔧 Integracja z HTTP API przez Axios

**Plik `src/api/todoApi.ts`**:

```ts
import axios from 'axios';

export interface TodoDto {
  id: number;
  title: string;
  done: boolean;
}

const API = axios.create({
  baseURL: 'http://localhost:5128/api/todos',
  headers: { 'Content-Type': 'application/json' },
});

export const fetchTodos = async () => (await API.get<TodoDto[]>('/')).data;
export const addTodo = async (title: string) => (await API.post<TodoDto>('/', { id: 0, title, done: false })).data;
export const toggleTodo = async (id: number) => (await API.patch<TodoDto>(`/${id}/toggle`)).data;
export const deleteTodo = async (id: number) => await API.delete(`/${id}`);
```

---

## 📦 Store MobX (`TodoStore.ts`)

```ts
import { makeAutoObservable, runInAction } from 'mobx';
import * as api from '../api/todoApi';

export class TodoStore {
  todos: api.TodoDto[] = [];
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async loadTodos() {
    this.loading = true;
    this.error = null;
    try {
      const data = await api.fetchTodos();
      runInAction(() => (this.todos = data));
    } catch {
      runInAction(() => (this.error = 'Error loading tasks'));
    } finally {
      runInAction(() => (this.loading = false));
    }
  }

  async addTodo(title: string) {
    this.loading = true;
    this.error = null;
    try {
      const newTodo = await api.addTodo(title);
      runInAction(() => this.todos.push(newTodo));
    } catch {
      runInAction(() => (this.error = 'Error adding task'));
    } finally {
      runInAction(() => (this.loading = false));
    }
  }

  async toggleTodo(id: number) {
    this.loading = true;
    this.error = null;
    try {
      const toggled = await api.toggleTodo(id);
      runInAction(() => {
        const i = this.todos.findIndex((t) => t.id === id);
        if (i !== -1) this.todos[i] = toggled;
        else this.error = 'Task not found';
      });
    } catch {
      runInAction(() => (this.error = 'Error toggling task'));
    } finally {
      runInAction(() => (this.loading = false));
    }
  }

  async removeTodo(id: number) {
    this.loading = true;
    this.error = null;
    try {
      await api.deleteTodo(id);
      runInAction(() => (this.todos = this.todos.filter((t) => t.id !== id)));
    } catch {
      runInAction(() => (this.error = 'Error removing task'));
    } finally {
      runInAction(() => (this.loading = false));
    }
  }
}

export const todoStore = new TodoStore();
```

---

## 🧩 Komponenty UI

### `App.tsx`

```tsx
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, CircularProgress, Container, Typography, Alert } from '@mui/material';
import AddTodoFrom from './components/AddTodoFrom';
import TodoList from './components/TodoList';
import { todoStore } from './stores/TodoStore';

const App = observer(() => {
  useEffect(() => {
    const load = async () => {
      await todoStore.loadTodos();
    };
    load();
  }, []);

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          TO-DO List
        </Typography>
        <AddTodoFrom />
        {todoStore.error && <Alert severity="error">{todoStore.error}</Alert>}
        {todoStore.loading ? <CircularProgress sx={{ mt: 2 }} /> : <TodoList />}
      </Box>
    </Container>
  );
});

export default App;
```

---

## 🤯 Czego się nauczyliśmy?

### 🔸 `runInAction()` – dlaczego i kiedy

* używamy po `await`, żeby MobX śledził zmiany w stanie
* grupuje zmiany jako jedną reakcję

### 🔸 `useEffect()` z `async`

* nie można dawać `async () => {}` bezpośrednio
* trzeba stworzyć wewnętrzną funkcję `load()` i ją wywołać

### 🔸 `observer()`

* owijamy komponenty, które korzystają z MobX observable
* pozwala im reagować na zmiany (np. `todoStore.todos`)

### 🔸 Error handling

* błędy przechwytywane w `store`
* pokazywane w UI (`<Alert>` z MUI)
* opcjonalnie logowane

---

## ✅ Co można dodać dalej?

* Snackbar zamiast Alert
* Filtrowanie zadań (ukończone, aktywne)
* Validacja formularza (min długość)
* Testy MobX i komponentów
* Autoryzacja (token w axios)
* Responsywny layout z MUI Grid

---

## 📚 Podsumowanie

Ten kurs nauczył Cię nie tylko jak stworzyć TODO listę, ale też **jak prawidłowo myśleć w świecie React + MobX**, rozumieć cykl życia komponentów, efekty uboczne, mutowanie stanu i integrację z backendem.

Dzięki temu fundamentowi możesz teraz swobodnie rozwijać aplikację — i masz dobry punkt wejścia w frontend.

Miłego kodzenia! 🚀
