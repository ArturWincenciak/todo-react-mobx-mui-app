# ToDo Lista - Interaktywne uczenie się z AI

## O projekcie
ToDo Lista to aplikacja do zarządzania zadaniami, która powstała jako efekt eksperymentu z nowym podejściem do nauki programowania - interaktywnego dialogu z AI. W przeciwieństwie do tradycyjnych tutoriali, cały proces tworzenia aplikacji odbywał się poprzez bezpośrednią rozmowę z ChatGPT, który dostosowywał przekazywaną wiedzę dokładnie do moich potrzeb.

## Koncepcja "Interaktywnego tutoriala"
Zamiast śledzić generyczne blogi i tutoriale, które często poruszają tematy nieistotne dla konkretnych potrzeb, zdecydowałem się na stworzenie "własnego tutoriala na żądanie" poprzez dialog z AI:

> "Interaktywny tutorial, z którym możesz rozmawiać. Zamiast czytać blogpost, który tylko częściowo odpowiada na Twoje potrzeby i wprowadza Cię w dziesiątki problemów, których nie musisz teraz rozwiązywać — stwórz swój własny tutorial, z którym możesz rozmawiać i dyskutować o podejmowanych decyzjach."

Korzyści takiego podejścia:
- Uczysz się dokładnie tego, czego potrzebujesz, bez zbędnych dygresji
- Możesz zadawać pytania w czasie rzeczywistym i natychmiast otrzymywać odpowiedzi
- Materiał jest dostosowany dokładnie do wersji bibliotek i narzędzi, których używasz
- Możesz dyskutować o alternatywnych rozwiązaniach i zrozumieć konsekwencje różnych decyzji architektonicznych


> "Zamiast tego siadasz i sam generujesz swój tutorial na podstawie rozmowy z AI, który w punkt, totalnie co do numerka wersji pakietów które używasz i frameworków, generuje ci tutoriał i prowadzi cię przez wszystkie szczegóły. Możesz sobie z nim porozmawiać, dopytując dlaczego taką a nie inną decyzję podjął i w czym ona się wiąże. Każde najgłupsze pytanie jakie chcesz zadać, to mu zadajesz i on ci odpowiada."
>

## Technologie
Aplikacja została zbudowana w oparciu o:
- **Frontend:**
    - React 18.2.0
    - TypeScript 5.8.3
    - Vite 6.3.5
    - MobX 6.13.7
    - Material UI 5.17.1
    - Axios 1.9.0

- **Narzędzia deweloperskie:**
    - ESLint 9.27.0
    - Prettier 3.5.3

## Funkcjonalności
- Dodawanie nowych zadań
- Oznaczanie zadań jako ukończone
- Usuwanie zadań
- Automatyczna synchronizacja z API
- Responsywny interfejs użytkownika

## Refleksje z procesu nauki
Tworzenie aplikacji w dialogu z AI okazało się wyjątkowo efektywnym sposobem nauki:

> "Myślę, że to jest o wiele lepszy i bardziej efektywny sposób uczenia się - możesz sam sobie szyć taki kurs czy blogpost na miarę dla siebie i z nim rozmawiać."
>

Zamiast sztywno określonego kursu, który zawsze w jakimś stopniu nie odpowiada indywidualnym potrzebom, interaktywne podejście pozwala na tworzenie w pełni spersonalizowanej ścieżki edukacyjnej.

## Dalszy rozwój
Ten projekt stanowi zarówno przykład aplikacji React/TypeScript, jak i demonstrację koncepcji interaktywnego uczenia się. W przyszłości aplikacja może zostać rozszerzona o:
- System rejestracji i logowania
- Kategoryzację zadań
- Przypomnienia i terminy
- Współdzielenie list zadań

## Licencja
Projekt dostępny na licencji MIT.

